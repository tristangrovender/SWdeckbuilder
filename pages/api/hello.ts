import { secrets } from "../../server/load-secrets";
export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end("TEST" + process.env.TEST);
};
