module.exports = {
  future: {
    webpack5: true,
  },
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
};
