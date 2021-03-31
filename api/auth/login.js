const db = require("../users/db");
const jwt = require('jsonwebtoken');
const { hour } = require("../../util/time");

const { JWT_SECRET } = process.env

// middleware for login endpoint
const login = async (req, res) => {
  const { body } = req
  const { email, password } = body

  // check if email body param is defined
  if (email == null || email === "") {
    return res.status(400).json({
      error: {
        message: "invalid email body param",
      }
    })
  }

  // check if password body param is defined
  if (password == null || password === "") {
    return res.status(400).json({
      error: {
        message: "invalid password body param",
      }
    })
  }

  // get user from database using email param
  let user;
  try {
    user = await db.getByEmail(email)
  } catch (err) {
    return res.status(401).json({
      error: {
        message: err.message,
      }
    })
  }

  // check if password is valid
  try {
    await db.verifyPassword(user.id, password)
  } catch (err) {
    return res.status(401).json({
      error: {
        message: err.message,
      }
    })
  }

  // generate token
  const now = new Date().getTime()
  const token = jwt.sign({
    userId: user.id,
    iat: now,
    exp: now + 24 * hour,
    roles: user.roles,
  }, JWT_SECRET);

  // return token and user
  res.json({
    data: { token },
    meta: { user }
  })
}

module.exports = login