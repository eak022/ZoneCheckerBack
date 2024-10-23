const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;
const Role = db.Role;

exports.signup = async (req, res) => {
  const { username, email, password, roleId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (roleId) {
      const role = await Role.findByPk(roleId);
      if (role) {
        await user.setRoles([role]);
      }
    } else {
      const role = await Role.findOne({ where: { name: "user" } });
      await user.setRoles([role]);
    }

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ accessToken: null, message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400 // 24 hours
    });

    const authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (error) {
    console.error("Error signing in: ", error); // เพิ่มบรรทัดนี้เพื่อตรวจสอบข้อผิดพลาด
    res.status(500).json({ message: "Error signing in", error });
  }
};