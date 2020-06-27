const loginService = async (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/api/login?email=${email}&password=${password}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          reject(result);
        }
        resolve(result);
      })
      .catch((err) => reject(err));
  });
};

export default loginService;
