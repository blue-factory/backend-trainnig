// application dependencies
const express = require("express")
const db = require("./db")
const checkRole = require("../../util/check-role")
const checkValidToken = require("../../util/check-valid-token")

// router definition
const router = express.Router();

// define endpoints
router.get('/', checkValidToken(), checkRole("admin"), (req, res) => {
  // TODO(ca): implements try/catch
  const users = db.list()

  res.json({
    data: users,
  })
})

router.get('/:userId/pets/:petId', (req, res) => {
  const { params } = req
  const { userId, petId } = params

  // query db to get by userId
  // query db to get by petId

  res.json({
    data: {
      userId,
      petId,
    },
  })
})

// export module
module.exports = router