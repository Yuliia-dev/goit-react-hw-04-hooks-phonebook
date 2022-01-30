import { useState, useEffect } from 'react';

const useLocalStorage = (key, initValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? initValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;