const checkAuthState = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const user = window.localStorage.getItem('user');
      resolve(user);
    } catch (err) {
      reject(new Error('User not login'));
    }
  });
};

export default checkAuthState;
