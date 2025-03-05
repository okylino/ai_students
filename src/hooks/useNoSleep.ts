import NoSleep from 'nosleep.js';
import { useEffect, useMemo } from 'react';

const useNoSleep = (enabled = true) => {
  const noSleep = useMemo(() => new NoSleep(), []);

  useEffect(() => {
    if (!enabled) return () => {};

    const enableNoSleep = async () => {
      if (!enabled || noSleep.isEnabled) return;
      await noSleep.enable();
    };

    window.addEventListener('click', enableNoSleep);

    return () => {
      window.removeEventListener('click', enableNoSleep);
      noSleep.disable();
    };
  }, [noSleep, enabled]);
};

export default useNoSleep;
