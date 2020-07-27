const JWT_KEY = "JWT";
export function getToken() {
  return localStorage.getItem(JWT_KEY);
}
export function setToken(token: string) {
  return localStorage.setItem(JWT_KEY, token);
}
