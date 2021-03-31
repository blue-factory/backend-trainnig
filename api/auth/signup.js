const db = require("../users/db");
const jwt = require('jsonwebtoken');
const shortid = require("shortid")
const { hour } = require("../../util/time");

const { JWT_SECRET } = process.env

// middleware for signup endpoint
const signup = async (req, res) => {
  const { body } = req
  const { email, password, name } = body

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

  // check if name body param is defined
  if (name == null || name === "") {
    return res.status(400).json({
      error: {
        message: "invalid name body param",
      }
    })
  }

  // get user from database using email param
  let user;
  try {
    user = await db.getByEmail(email)
  } catch (err) {
  }

  // user already exists in database
  if (user != null) {
    return res.status(401).json({
      error: {
        message: `exist user email=${email} in database`,
      }
    })
  }

  // create user in database
  try {
    user = await db.create({
      id: shortid.generate(),
      name,
      email,
      password,
      roles: ["user"],
    })
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
    roles: ["user"]
  }, JWT_SECRET);

  // return user
  res.json({
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      }
    },
    meta: { token },
  })
}

module.exports = signup