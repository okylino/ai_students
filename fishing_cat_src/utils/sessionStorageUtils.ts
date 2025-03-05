/**
 * set key value in session storage.
 * @param {string} key
 * @param {and} value
 */

import { SESSION_STORAGE_KEY } from '@fishing_cat/enums/sessionStorageKey';

const PRE_TEXT = 'classSwift_';

const setItem = <T>(key: SESSION_STORAGE_KEY, value: T) => {
  const preKey = PRE_TEXT + key;
  try {
    sessionStorage.setItem(preKey, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

/**
 * get value from session storage, if null return null.
 * @param {string} key
 * @returns
 */
const getItem = (key: SESSION_STORAGE_KEY) => {
  const preKey = PRE_TEXT + key;
  try {
    if (!sessionStorage.getItem(preKey) || sessionStorage.getItem(preKey) === null) {
      return null;
    }
    const data = sessionStorage.getItem(preKey);
    if (!data) throw Error;
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

/**
 * remove.
 * @param {string} key
 */
const removeItem = (key: SESSION_STORAGE_KEY) => {
  const preKey = PRE_TEXT + key;
  try {
    sessionStorage.removeItem(preKey);
  } catch (error) {
    console.log(error);
  }
};

const cleanAll = () => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const sessionStorageUtils = {
  setItem,
  getItem,
  removeItem,
  cleanAll,
};
