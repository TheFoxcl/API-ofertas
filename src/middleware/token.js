function tokenAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid auth format" });
  }

  const token = authHeader.split(" ")[1];

  if (token !== "comemun") {
    return res.status(401).json({ error: "Invalid token" });
  }

  next();
}
module.exports = tokenAuth;
