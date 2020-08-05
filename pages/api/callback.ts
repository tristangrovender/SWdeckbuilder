export default (req, res) => {
  console.log(req);
  const { query } = req;
  console.log("query:", query);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ success: true }));
};
