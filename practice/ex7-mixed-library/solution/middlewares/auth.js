const { SESSIONS } = require("../configs/data");

// 401: not logged in (who are you?)
function requireLogin(req, res, next) {
  const user = SESSIONS.get(req.cookies.sessionId);
  if (user == null) return res.status(401).json({ error: "Please log in" });
  req.user = user;
  next();
}

// 403: logged in but not allowed (what can you do?). Use after requireLogin.
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

module.exports = { requireLogin, requireRole };
