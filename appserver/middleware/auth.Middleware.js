import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Extract the token from cookies

  // console.log(token)

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    // first way like passing an callback function for setting token expiry as well as getting decoded user data
    const verified = jwt.verify(token, process.env.JWT_SECRET)
      // (error, decodedData) => {
    //   if (!error) {

    //     console.log("decodedData: ", decodedData);

    //     const nowDate = new Date().getTime() / 1000;

    //     if (decodedData.exp < nowDate) {

    //       res.status(401);
    //       res.clearCookie('Token', {
    //         maxAge: 1,
    //         httpOnly: true,
    //         sameSite: 'none',
    //         secure: true
    //       });
    //       res.send({ message: "token expired" })

    //     } else {

    //       console.log("token approved");

    //       req.user = decodedData
    //       console.log(req.user)
    //       next();
    //     }
    //   } else {
    //     res.status(401).send("invalid token")
    //   }
    // });
    //other way of doing or getting decoded user information
    console.log(verified)
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
