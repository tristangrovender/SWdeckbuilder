import jwt from "jsonwebtoken";
const JWT_KEY = "JWT";
export function getToken() {
  try {
    return localStorage.getItem(JWT_KEY);
  } catch {
    return;
  }
}
export function setToken(token: string) {
  return localStorage.setItem(JWT_KEY, token);
}
export function removeToken() {
  return localStorage.removeItem(JWT_KEY);
}
enum Environment {
  prod = "Prod",
  local = "Local",
}
function getEnvironment(): Environment {
  try {
    if (window.location.origin.includes("localhost")) {
      return Environment.local;
    } else {
      return Environment.prod;
    }
  } catch {
    return Environment.local;
  }
}
export function getSignInUrl() {
  const developmentUrl =
    "https://swccgdb.auth.us-east-2.amazoncognito.com/login?client_id=4ab8m6p1nglpa4110o2jhpk17&response_type=token&scope=email+openid+profile&redirect_uri=http://localhost:3000/callback";
  const productionUrl =
    "https://swccgdb-production.auth.us-east-2.amazoncognito.com/login?client_id=3hganbcfgre49cutjo2acf2kv0&response_type=token&scope=email+openid+profile&redirect_uri=https://test.swccgdb-staging.com/callback";
  if (getEnvironment() === Environment.prod) {
    return productionUrl;
  } else {
    return developmentUrl;
  }
}
export function getUserId() {
  const token = getToken();
  if (!token) {
    return;
  }
  const decoded = jwt.decode(token) as { userId: string } | null;
  return decoded && decoded.userId;
}
