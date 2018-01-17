module.exports = function requireAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.sendStatus(401);
};
