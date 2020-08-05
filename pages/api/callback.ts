export default (req, res) => {
  const {
    query: { code },
  } = req;
  console.log("code:", code);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ success: true }));
};
