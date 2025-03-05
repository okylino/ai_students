/**
 * set key value in local storage.
 * @param {string} key
 * @param {and} value
 */

import { LOCAL_STORAGE_KEY } from '@/enums/localStorageKey';

const PRE_TEXT = 'classSwift_';

const setItem = <T>(key: LOCAL_STORAGE_KEY, value: T) => {
  const preKey = PRE_TEXT + key;
  try {
    localStorage.setItem(preKey, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

/**
 * get value from local storage, if null return null.
 * @param {string} key
 * @returns
 */
const getItem = <T>(key: LOCAL_STORAGE_KEY): T | null => {
  const preKey = PRE_TEXT + key;
  try {
    if (!localStorage.getItem(preKey) || localStorage.getItem(preKey) === null) {
      return null;
    }
    const data = localStorage.getItem(preKey);
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
const removeItem = (key: LOCAL_STORAGE_KEY) => {
  const preKey = PRE_TEXT + key;
  try {
    localStorage.removeItem(preKey);
  } catch (error) {
    console.log(error);
  }
};

const cleanAll = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export const localStorageUtils = {
  setItem,
  getItem,
  removeItem,
  cleanAll,
};
