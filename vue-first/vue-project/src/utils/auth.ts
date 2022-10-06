export const LOGIN_TOKEN = 'LOGIN_TOKEN';

export const saveToken = (token: string) => {
  localStorage.setItem(LOGIN_TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(LOGIN_TOKEN);
};

export const removeToken = () => {
  localStorage.clear();
};
