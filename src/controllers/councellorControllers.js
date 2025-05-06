import Counsellor from '../models/counsellorModel.js';

import { setCounsellorTokenAndCookies } from '../middlewares/jwtAuth.js'


const loginCounsellor = async (req, res) => {
  const { email, password } = req.body;

    if(!email || !password){
        return res.json({success:false,message:`All Fields Are Mandatory`});
    }

  try {
    // Checking if counsellor email exists
    const counsellor = await Counsellor.findOne({ email });

    if (!counsellor || counsellor.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    setCounsellorTokenAndCookies(counsellor,res);
    
    res.status(200).json({
      message: 'Login successful',
      counsellor: {
        email: counsellor.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export { loginCounsellor };