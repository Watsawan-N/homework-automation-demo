import { Homework } from './types';

const STORAGE_KEY = 'homework-automation-demo-items';

export const loadHomeworkFromStorage = (): Homework[] => {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    return JSON.parse(storedValue) as Homework[];
  } catch (error) {
    console.error('Unable to load homework from localStorage.', error);
    return [];
  }
};

export const saveHomeworkToStorage = (homeworkList: Homework[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(homeworkList));
};
