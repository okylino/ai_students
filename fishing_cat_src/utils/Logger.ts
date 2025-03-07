import MixpanelClient, { type MixpanelClientInstance } from '@fishing_cat/libs/MixpanelClient';

import { getUserIdByLessonId } from './userIdUtils';

/**
 * Example for user interaction
 * ================================
 *
 * Track an example event with dynamic properties
 * Logger.trackEvent('Lesson Started');
 * */

/**
 * Example for logs
 * ================================
 * 1. Set the log level (only messages of this level or higher will be logged)
 * Logger.setLogLevel('info');
 *
 * 2. Identify a user and set properties
 * Logger.identifyUser('user123', { email: 'user@example.com', name: 'John Doe' });
 *
 * 3. Log events at different levels
 * Logger.debug('This is a debug message'); // Won't log if log level is 'info'
 * Logger.info('User navigated to homepage');
 * Logger.warn('API response time is slow');
 * Logger.error('Failed to load user data');
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
type PlatformType = 'Mac' | 'Windows' | 'Android' | 'iOS' | 'Unknown';
type LoggerProps = {
  client: string;
  version: string;
  platform: PlatformType;
};

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
};

const MIXPANEL_EVENTS: Record<LogLevel, string> = {
  debug: 'Debug Log',
  info: 'Info Log',
  warn: 'Warning Log',
  error: 'Error Log',
};

interface LoggerInterface {
  setLogLevel(level: LogLevel): void;
  log(level: LogLevel, message: string, data?: Record<string, unknown>): void;
  debug(message: string, data?: Record<string, unknown>): void;
  info(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
  error(message: string, data?: Record<string, unknown>): void;
  identifyUser(userId: string, properties?: Record<string, unknown>): void;
  resetUser(): void;
  trackEvent(name: string, properties?: Record<string, unknown>): void;
}

class Logger {
  private static instance: LoggerInterface;

  private currentLogLevel: LogLevel = 'error'; // Default log level

  private mixpanelClient: MixpanelClientInstance;

  private loggerProps: LoggerProps = {
    client: Logger.getClientType(),
    version: Logger.getVersion(),
    platform: Logger.getPlatform(),
  };

  private constructor() {
    this.mixpanelClient = MixpanelClient.getInstance();
  }

  public static getInstance(): LoggerInterface {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Set the logging level (e.g., 'info' will log only 'info', 'warn', and 'error' levels)
  public setLogLevel(level: LogLevel): void {
    this.currentLogLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.currentLogLevel];
  }

  private static getVersion(): string {
    return import.meta.env.VITE_APP_VERSION.split('-')[0] || 'Unknown';
  }

  private static getClientType(): string {
    return 'Student Web';
  }

  public log(level: LogLevel, message: string, data?: Record<string, unknown>): void {
    if (this.shouldLog(level)) {
      const logData = {
        level,
        message,
        ...this.loggerProps,
        ...(data && { data }),
        timestamp: new Date().toISOString(),
      };

      // Track the log event with Mixpanel
      try {
        this.mixpanelClient.track(MIXPANEL_EVENTS[level], logData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Failed to track log event: ${error.message}`, logData);
        } else {
          console.error('Failed to track log event: Unknown error occurred', logData);
        }
      }
    }
  }

  public debug(message: string, data?: Record<string, unknown>): void {
    this.log('debug', message, data);
  }

  public info(message: string, data?: Record<string, unknown>): void {
    this.log('info', message, data);
  }

  public warn(message: string, data?: Record<string, unknown>): void {
    this.log('warn', message, data);
  }

  public error(message: string, data?: Record<string, unknown>): void {
    this.log('error', message, data);
  }

  // Identify the user in Mixpanel and set optional properties
  public identifyUser(userId: string, properties?: Record<string, unknown>): void {
    if (!userId || typeof userId !== 'string') {
      console.error('Invalid userId for identifyUser');
      return;
    }

    this.mixpanelClient.identify(userId);
    if (properties) {
      this.mixpanelClient.setUserProperties(properties);
    }
  }

  public resetUser(): void {
    this.mixpanelClient.reset();
  }

  // Detects the platform based on the user agent
  private static getPlatform(): PlatformType {
    const { userAgent } = navigator;
    if (/Mac/.test(userAgent)) return 'Mac';
    if (/Win/.test(userAgent)) return 'Windows';
    if (/Android/.test(userAgent)) return 'Android';
    if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS';
    return 'Unknown';
  }

  // Track event with additional properties
  public trackEvent(name: string, properties?: Record<string, unknown>): void {
    const queryParams = new URLSearchParams(window.location.search);
    const lessonId = queryParams.get('lessonId') ?? 'unknown';
    const roomId = queryParams.get('roomId') ?? 'unknown';
    const userId = getUserIdByLessonId({ lessonId });
    const deviceId = window.localStorage.getItem('deviceId') ?? 'unknown';
    const props = {
      ...this.loggerProps,
      room_id: roomId,
      user_id: userId,
      lesson_id: lessonId,
      device_id: deviceId,
    };

    if (properties) {
      Object.assign(props, properties);
    }

    this.mixpanelClient.track(name, props);
  }
}

export default Logger.getInstance();
