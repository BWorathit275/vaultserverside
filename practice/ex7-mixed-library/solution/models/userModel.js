const { users } = require("../configs/data");

const User = {
  // Return the user with this username (undefined if none).
  findByUsername: (username) => users.find((u) => u.username === username),

  // Add a new book (title trimmed) and return it.
  create: (username, passwordHash, role) => {
    const user = { id: users.length + 1, username, password: passwordHash, role };
    users.push(user);
    return user;
  },
};

module.exports = User;
