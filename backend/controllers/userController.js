const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Token = require("../models/tokenModel");
// const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");
// const { stripe } = require("../utils");


// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Request Body:" , req.body);

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }
  // Create stripe customer
//   const customer = await stripe.customers.create({ email });

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    // stripeCustomerId: customer.id,
  });

  //   Generate Token
  const token = generateToken(user._id);

  if (user) {
    const { _id, name, email, phone, role } = user;
    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
    //   sameSite: "none",
      // secure: true,
    });

    //Sens user data
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  //   Generate Token
  const token = generateToken(user._id);
  if (user && passwordIsCorrect) {
        const newUser = await User.findOne({ email }).select("-password");
        res.cookie("token", token, {
              path: "/",
              httpOnly: true,
              expires: new Date(Date.now() + 1000 * 86400), // 1 day
              maxAge: 24 * 60 * 60 * 1000,
            //   sameSite: "none",
            //   secure: true,
        });
        // Send user data
        res.status(201).json(newUser);
    } else {
        res.status(400);
        throw new Error("Invalid email or password");

//     const { _id, name, email, phone, address } = user;
//     const newUser = await User.findOne({ email }).select("-password");

//     res.status(200).json(newUser);
//   } else {
//     res.status(400);
//     throw new Error("Invalid email or password");
  }
});

// tout ce qu'il y'a en commentaire c psq j'ai fait des modification et j'ai pas supprimer le contenu, si y'a un bug ou quoi remet ce qu'il y avait avant !!!!!!!!!!!
// cf: mettre la partie qu'il y'a dans le fichier que le mec ns a fournit

// Logout User
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    // sameSite: "none",
    // secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    // const { _id, name, email, phone, address } = user;
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Get Login Status
const getLoginStatus = asyncHandler(async (req, res) => {
  // console.log("getLoginStatus Fired");
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, phone, address } = user;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      photo: updatedUser.photo,
      address: updatedUser.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update Photo
const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.photo = photo;
  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    photo: updatedUser.photo,
    address: updatedUser.address,
  });
});

// const changePassword = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   const { oldPassword, password } = req.body;

//   if (!user) {
//     res.status(400);
//     throw new Error("User not found, please signup");
//   }
//   //Validate
//   if (!oldPassword || !password) {
//     res.status(400);
//     throw new Error("Please add old and new password");
//   }

//   // check if old password matches password in DB
//   const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

//   // Save new password
//   if (user && passwordIsCorrect) {
//     user.password = password;
//     await user.save();
//     res.status(200).send("Password change successful");
//   } else {
//     res.status(400);
//     throw new Error("Old password is incorrect");
//   }
// });

// const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     res.status(404);
//     throw new Error("User does not exist");
//   }

//   // Delete token if it exists in DB
//   let token = await Token.findOne({ userId: user._id });
//   if (token) {
//     await token.deleteOne();
//   }

//   // Create Reste Token
//   let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
//   console.log(resetToken);

//   // Hash token before saving to DB
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Save Token to DB
//   await new Token({
//     userId: user._id,
//     token: hashedToken,
//     createdAt: Date.now(),
//     expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
//   }).save();

//   // Construct Reset Url
//   const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

//   // Reset Email
//   const message = `
//       <h2>Hello ${user.name}</h2>
//       <p>Please use the url below to reset your password</p>  
//       <p>This reset link is valid for only 30minutes.</p>

//       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

//       <p>Regards...</p>
//       <p>Pinvent Team</p>
//     `;
//   const subject = "Password Reset Request";
//   const send_to = user.email;
//   const sent_from = process.env.EMAIL_USER;

//   try {
//     await sendEmail(subject, message, send_to, sent_from);
//     res.status(200).json({ success: true, message: "Reset Email Sent" });
//   } catch (error) {
//     res.status(500);
//     throw new Error("Email not sent, please try again");
//   }
// });

// // Reset Password
// const resetPassword = asyncHandler(async (req, res) => {
//   const { password } = req.body;
//   const { resetToken } = req.params;

//   // Hash token, then compare to Token in DB
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // fIND tOKEN in DB
//   const userToken = await Token.findOne({
//     token: hashedToken,
//     expiresAt: { $gt: Date.now() },
//   });

//   if (!userToken) {
//     res.status(404);
//     throw new Error("Invalid or Expired Token");
//   }

//   // Find user
//   const user = await User.findOne({ _id: userToken.userId });
//   user.password = password;
//   await user.save();
//   res.status(200).json({
//     message: "Password Reset Successful, Please Login",
//   });
// });

// // Add product to wishlist
// const addToWishlist = asyncHandler(async (req, res) => {
//   const { productId } = req.body;

//   await User.findOneAndUpdate(
//     { email: req.user.email },
//     { $addToSet: { wishlist: productId } }
//   );

//   res.json({ message: "Product added to wishlist" });
// });

// //
// const removeFromWishlist = asyncHandler(async (req, res) => {
//   const { productId } = req.params;
//   await User.findOneAndUpdate(
//     { email: req.user.email },
//     { $pull: { wishlist: productId } }
//   );

//   res.json({ message: "Product removed to wishlist" });
// });

// // Get Wishlist
// const getWishlist = asyncHandler(async (req, res) => {
//   const list = await User.findOne({ email: req.user.email })
//     .select("wishlist")
//     .populate("wishlist");

//   res.json(list);
// });

// // Save Cart
// const saveCart = asyncHandler(async (req, res) => {
//   const { cartItems } = req.body;

//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.cartItems = cartItems;
//     user.save();
//     res.status(200).json({ message: "Cart saved" });
//   } else {
//     res.status(400);
//     throw new Error("User Not Found");
//   }
// });

// // Get Cart
// const getCart = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     // const { _id, name, email, phone, address } = user;
//     res.status(200).json(user.cartItems);
//   } else {
//     res.status(400);
//     throw new Error("User Not Found");
//   }
// });

// // Clear Cart
// const clearCart = asyncHandler(async (req, res) => {
//   const { cartItems } = req.body;

//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.cartItems = [];
//     user.save();
//     res.status(200).json({ message: "Cart cleared" });
//   } else {
//     res.status(400);
//     throw new Error("User Not Found");
//   }
// });

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
//   changePassword,
//   forgotPassword,
//   resetPassword,
//   addToWishlist,
//   removeFromWishlist,
//   getWishlist,
//   saveCart,
//   getCart,
//   clearCart,
};
