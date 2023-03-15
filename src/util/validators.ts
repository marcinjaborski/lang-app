export const usernameValidator = (username: string, errorMessage: string): true | string => {
  return !username.includes(" ") || errorMessage;
};

export const emailValidator = (email: string, errorMessage: string): true | string => {
  return !!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) || errorMessage;
};

export const confirmPasswordValidator = (
  password: string,
  confirmPassword: string,
  errorMessage: string,
): true | string => {
  return password === confirmPassword || errorMessage;
};
