const setLocalStorage = (key: string, value: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      resolve(true);
    } catch (err) {
      reject(new Error(err));
    }
  });
};

export default setLocalStorage;
