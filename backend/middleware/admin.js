const { User } = require("../models/user");

module.exports = async function (req, res, next) {
  const user = await User.findById(req.user._id).select('role');
  if ('admin' !== user.role) return res.status(403).send('Access denied');
  next();
}