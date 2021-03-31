const checkValidToken = () => (req, res, next) => {
  // TODO(ca): implements blacklist token feature
  // get token
  // decode token
  // verify signature token
  // check token blacklist
  return next()
}

module.exports = checkValidToken