module.exports = {
  module: {
    rules: [
      {
        test: /\.gql$/i,
        use: "raw-loader",
      },
    ],
  },
};
