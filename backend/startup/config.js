module.exports = function() {
  if (!process.env.TOKEN_SECRET) {
    throw new Error('FATAL ERROR: TOKEN_SECRET is not defined');
  }
}