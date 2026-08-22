const Staff = require("../models/staffModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey123";

const registerStaff = async (data) => {
  const { name, email, password, department } = data;
  const existingStaff = await Staff.findOne({ email });
  if (existingStaff) {
    const error = new Error("Email already registered");
    error.statusCode = 409;
    throw error;
  }

  const staff = await Staff.create({ name, email, password, department });
  const staffObj = staff.toObject();
  delete staffObj.password;
  return staffObj;
};

const loginStaff = async ({ email, password }) => {
  const staff = await Staff.findOne({ email });
  if (!staff) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, staff.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: staff._id, department: staff.department },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, staff: { id: staff._id, name: staff.name, email: staff.email, department: staff.department } };
};

const getStaffProfile = async (staffId) => {
  const staff = await Staff.findById(staffId).select("-password");
  if (!staff) {
    const error = new Error("Staff member not found");
    error.statusCode = 401;
    throw error;
  }
  return staff;
};

module.exports = {
  registerStaff,
  loginStaff,
  getStaffProfile,
};
