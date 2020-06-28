import getConfig from 'next/config';

const loginService = async (email: string, password: string): Promise<any> => {
  const baseURL = await getConfig().publicRuntimeConfig.BASE_URL;

  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        email,
        password,
      }),
    };

    fetch(`${baseURL}/api/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          reject(result);
        } else {
          resolve(result.user);
        }
      })
      .catch((err) => reject(err));
  });
};

export default loginService;
