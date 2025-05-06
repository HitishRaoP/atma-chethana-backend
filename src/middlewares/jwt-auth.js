import "dotenv/config";
import JWT from "jsonwebtoken";

const setUserTokenAndCookie = (user, res) => {
  const payLoad = {
    id: user._id,
  };
  const token = JWT.sign(payLoad, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const userAuth = async (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.json({
      success: false,
      message: `User is Not Authorized, Login Again Please`,
    });
  }
  try {
    const user = JWT.verify(token, process.env.JWT_SECRET_KEY);
    if (user.id) {
      req.user = user.id;
    } else {
      return res.json({
        success: false,
        message: `User is Not Authorized, Login Again Please`,
      });
    }
    next();
  } catch (error) {
    console.log(`Error in Getting Token from middleware ${error}`);
    res.json({ success: false, message: error.messasge });
  }
};

const setCounsellorTokenAndCookies = async (user, res) => {
  const payLoad = {
    id: user._id,
  };
  const token = JWT.sign(payLoad, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("jwtCouncellor", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

const counsellorAuth = (req, res) => {
  const token = req.cookies.jwtCouncellor;
  if (!token) {
    return res.json({
      success: false,
      message: `Councellor is Not Authorized, Login Again Please`,
    });
  }

  try {
    const user = JWT.verify(token, process.env.JWT_SECRET_KEY);
    if (user.id) {
      req.user = user.id;
    } else {
      return res.json({
        success: false,
        message: `Councellor is Not Authorized, Login Again Please`,
      });
    }

    next();
  } catch (error) {
    console.log(`Error in Getting Token from middleware ${error}`);
    res.json({ success: false, message: error.messasge });
  }
};

export {
  setUserTokenAndCookie,
  userAuth,
  setCounsellorTokenAndCookies,
  counsellorAuth,
};