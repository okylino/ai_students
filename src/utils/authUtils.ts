export const clearLoginData = () => {
  const keepDeviceId = localStorage.getItem('deviceId');
  localStorage.clear();
  if (keepDeviceId) {
    localStorage.setItem('deviceId', keepDeviceId);
  }
};
