// application dependencies
const express = require("express")

// router definition
const router = express.Router();

// TODO: migrate below to database
const users = []

// define endpoints
router.get('/', (req, res) => {
  res.json({
    data: users,
  })
})
router.post('/', (req, res) => {
  // get values from body
  const body = req.body
  const {name, age} = body

  // check if name body param is defined
  if (name == null) {
    return res.status(500).json({
      error: {
        message: "invalid name body param",
      }
    })
  }

  // check if age body param is defined
  if (age == null) {
    return res.status(500).json({
      error: {
        message: "invalid age body param",
      }
    })
  }

  // save user in array
  users.push({
    name,
    age,
  })

  // endpoint response
  res.json({
    data: users,
  })
})
router.get('/:userId/pets/:petId', (req, res) => {
  const {params} = req
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