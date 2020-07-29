import jwt from "jsonwebtoken";
const JWT_KEY = "JWT";
export function getToken() {
  return localStorage.getItem(JWT_KEY);
}
export function setToken(token: string) {
  return localStorage.setItem(JWT_KEY, token);
}
export function getUserId() {
  const token = getToken();
  if (!token) {
    return;
  }
  const decoded = jwt.decode(token) as { userId: string } | null;
  return decoded && decoded.userId;
}
