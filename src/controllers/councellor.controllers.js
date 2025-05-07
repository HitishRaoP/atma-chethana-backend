import Counsellor from "../models/counsellor.model.js";
import { setCounsellorTokenAndCookies } from "../middlewares/jwt-auth.js";

export const loginCounsellor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: `All Fields Are Mandatory` });
  }

  try {
    const counsellor = await Counsellor.findOne({ email });

    if (!counsellor) {
      return res.status(401).json({ message: "Counsellor Not found" });
    }
    if(counsellor.password !== password){
      return res.status(401).json({ message: "Incorrect Password"});
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
