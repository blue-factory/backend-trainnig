class User {
  constructor() {
    this.users = {
      "a9vymP3Nh": {
        id: "a9vymP3Nh",
        name: "camilo",
        email: "camilo@lala.com",
        password: "seguro123",
        roles: ["admin"],
        blacklist: false,
      }
    };
  }

  list() {
    return Object.values(this.users)
  }

  get(userId) {
    try {
      const user = this.users[userId]
      if (user == null) {
        throw new Error(`user id=${userId} is not found`)
      }

      return user
    } catch (err) {
      throw err
    }
  }

  // supuesto: el paramero user ya fue validado
  create(user) {
    try {
      this.users[user.id] = user

      return user
    } catch (err) {
      throw err
    }
  }

  update(user) {
    throw new Error(null)
  }

  delete(userId) {
    this.users[userId] = null
  }

  getByEmail(email) {
    try {
      const users = Object.values(this.users)
      const found = users.find((user) => user.email === email)
      if (found == null) {
        throw new Error(`user email=${email} is not found`)
      }

      return found
    } catch (err) {
      throw err
    }
  }

  verifyPassword(userId, password) {
    try {
      const user = this.get(userId)

      if (user.password !== password) {
        throw new Error(`password user id=${userId} is not valid`)
      }

      return
    } catch (err) {
      throw err
    }
  }
}

module.exports = new User()
