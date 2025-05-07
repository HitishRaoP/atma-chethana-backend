import { User } from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.json({ success: false, message: `User Doesn't Exist` });
    }

    res.json({
      success: true,
      userData: user,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.query;
  try {
    const updated = await User.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.query;
  try {
    const deleted = await User.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const getFilteredUsers = async (req, res) => {
  const { dept, sem, name } = req.query;

  const details = {};

  if(dept) details.department=dept;
  if(sem) details.semester=sem;
  if(name) details.fullName=name;

  try {

    if(Object.keys(details).length == 0){
      return res.json({message:"No filter"});
    }

    const users = await User.find(details);
    // console.log(users);
    return res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

