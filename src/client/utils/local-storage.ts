const AUTH_KEY = "47a1b791-e8e0-4245-8a2f-3294a5943595";

const getAuthToken = () => localStorage.getItem(AUTH_KEY);
const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_KEY, token);
};
const removeAuthToken = () => {
  localStorage.removeItem(AUTH_KEY);
};

export {
  getAuthToken,
  setAuthToken,
  removeAuthToken
};