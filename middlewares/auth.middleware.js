const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const Store = db.Store;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    res.status(403).send({ message: "Require Admin Role!" });
  } catch (error) {
    res.status(500).send({ message: "Error checking roles", error });
  }
};

isStoreAdmin = async (req, res, next) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).send({ message: "Store not found" });
    }
    if (store.adminId !== req.userId) {
      return res.status(403).send({ message: "Require Admin of This Store!" });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: "Error checking store admin", error });
  }
};

const authMiddleware = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isStoreAdmin: isStoreAdmin
};

module.exports = authMiddleware;
