import { secrets } from "../../server/load-secrets";
export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "ENV: " + secrets.TEST }));
};
