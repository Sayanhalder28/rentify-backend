const jwt = require("jsonwebtoken");

exports.varifyToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.error(401, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.error(401, "Unauthorized");
  }
  next();
};

exports.generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    userRole: user.user_role,
  };

  console.log(payload);

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
  return token;
};
