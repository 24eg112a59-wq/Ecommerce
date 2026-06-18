const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ShopEZ API health check passed',
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  getHealth,
};
