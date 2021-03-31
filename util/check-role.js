const jwt = require("jsonwebtoken")

const { JWT_SECRET } = process.env

const checkRole = (role) => (req, res, next) => {
  const { headers } = req
  const { authorization } = headers

  // check authorization token
  if (authorization == null || authorization === "") {
    return res.status(401).json({
      error: "invalid token"
    })
  }

  // decode jwt token
  let decode;
  try {
    decode = jwt.decode(authorization, JWT_SECRET)
    if (decode == null) {
      throw new Error("invalid token")
    }
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    })
  }

  // check role
  console.log(1111)
  console.log(1111)
  console.log(1111)
  console.log(1111)
  console.log(1111, decode)
  console.log(1111, decode.roles)
  if (!decode.roles.includes(role)) {
    return res.status(401).json({
      error: "invalid role",
    })
  }

  return next()
}

module.exports = checkRole