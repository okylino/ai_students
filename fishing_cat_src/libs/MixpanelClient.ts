import mixpanel from 'mixpanel-browser';

export interface MixpanelClientInstance {
  identify(userId: string): void;
  reset(): void;
  setUserProperties(properties: Record<string, unknown>): void;
  track(event: string, data?: Record<string, unknown>): void;
}

class MixpanelClient {
  private static instance: MixpanelClientInstance;

  private initialized = false;

  private constructor() {
    if (!this.initialized) {
      mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
        debug: import.meta.env.VITE_NODE_ENV !== 'production',
      });
      this.initialized = true;
    }
  }

  private static throwNoInstanceError() {
    throw new Error('MixpanelClient is not initialized. Call getInstance() first.');
  }

  // Singleton instance getter
  public static getInstance(): MixpanelClientInstance {
    if (!MixpanelClient.instance) {
      MixpanelClient.instance = new MixpanelClient();
    }
    return MixpanelClient.instance;
  }

  // Identify a user with Mixpanel
  public identify(userId: string): void {
    if (!this.initialized) {
      MixpanelClient.throwNoInstanceError();
    }
    mixpanel.identify(userId);
  }

  // Reset the user in Mixpanel
  public reset(): void {
    if (!this.initialized) {
      MixpanelClient.throwNoInstanceError();
    }
    mixpanel.reset();
  }

  // Set user properties with Mixpanel
  public setUserProperties(properties: Record<string, unknown>): void {
    if (!this.initialized) {
      MixpanelClient.throwNoInstanceError();
    }
    mixpanel.people.set(properties);
  }

  // Track an event in Mixpanel
  public track(event: string, data: Record<string, unknown> = {}): void {
    if (!this.initialized) {
      MixpanelClient.throwNoInstanceError();
    }
    mixpanel.track(event, data);
  }

  public static setIsLogin(isLogin: boolean = false) {
    mixpanel.people.set({ is_login: isLogin });
  }

  public static setSeatNumber(seatNumber: number) {
    mixpanel.people.set({ seat_number: seatNumber });
  }

  public static registerRoomName(roomName: string) {
    mixpanel.register({ room_name: roomName });
  }
}

export default MixpanelClient;
