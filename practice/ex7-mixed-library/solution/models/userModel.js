const { users } = require("../configs/data");

const User = {
  findByUsername: (username) => users.find((u) => u.username === username),

  create: (username, passwordHash, role) => {
    const user = { id: users.length + 1, username, password: passwordHash, role };
    users.push(user);
    return user;
  },
};

module.exports = User;
