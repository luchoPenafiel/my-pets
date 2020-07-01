const getLocalStorage = (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const value = window.localStorage.getItem(key);
      resolve(JSON.parse(value));
    } catch (err) {
      reject(new Error(err));
    }
  });
};

export default getLocalStorage;
