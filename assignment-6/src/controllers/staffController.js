const staffService = require("../services/staffService");

const register = async (req, res) => {
  try {
    const staff = await staffService.registerStaff(req.body);
    return res.status(201).json({ success: true, message: "Staff registered successfully", data: staff });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { token, staff } = await staffService.loginStaff(req.body);
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
    return res.status(200).json({ success: true, message: "Logged in successfully", data: staff });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    return res.status(200).json({ success: true, data: req.user });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  return res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};
