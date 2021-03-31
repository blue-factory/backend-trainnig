// application dependencies
const express = require("express")
const login = require("./login")
const signup = require("./signup")
const logout = require("./logout")

// router definition
const router = express.Router();
router.post("/login", login)
router.post("/signup", signup)
router.post("/logout", logout)

// export module
module.exports = router