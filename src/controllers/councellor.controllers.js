import Counsellor from "../models/counsellor.model.js";
import { setCounsellorTokenAndCookies } from "../middlewares/jwt-auth.js";


import bcrypt from "bcryptjs";


export const createCounsellor = async (req,res)=>{
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: `All Fields Are Mandatory` });
  }

  try {
    const counsellor = await Counsellor.findOne({ email });

    if (counsellor) {
      return res.status(401).json({ message: "Counsellor Already Exists" });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRound);


    // setCounsellorTokenAndCookies(counsellor, res); 

    const newCounsellor = await Counsellor.create({
      email,
      password:hashedPassword,
    })

    res.status(200).json({
      message: "Login successful",
      newCounsellor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  } 
}


export const loginCounsellor = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.json({ success: false, message: `All Fields Are Mandatory` });
  }

  try {
    const counsellor = await Counsellor.findOne({ email });

    if (!counsellor) {
      return res.status(401).json({ message: "Counsellor Not found" });
    }

    const isPassWordMatch = await bcrypt.compare(password, counsellor.password);
    if (!isPassWordMatch) {
      return res.json({ success: false, message: `Invalid Password` });
    }

    setCounsellorTokenAndCookies(counsellor, res);

    res.status(200).json({
      message: "Login successful",
      counsellor: {
        email: counsellor.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getAllCounsellors = async (req,res)=>{
    try{

      const counsellors = await Counsellor.find();
      res.json(counsellors);

    }catch(error){
      console.error(error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
}