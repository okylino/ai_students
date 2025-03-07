interface CancelableFn<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

export const throttle = <T extends (...args: any[]) => any>(fn: T, ms: number): CancelableFn<T> => {
  let executeTimeStamp: number | null = null;
  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    if (!executeTimeStamp || executeTimeStamp + ms < now) {
      executeTimeStamp = now;
      fn(...args);
    }
  };

  throttled.cancel = () => {
    executeTimeStamp = null;
  };

  return throttled;
};

export const debounce = <T extends (...args: any[]) => any>(fn: T, ms: number): CancelableFn<T> => {
  let timerId: NodeJS.Timeout | null = null;
  const debounced = (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
    }, ms);
  };

  debounced.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
};
