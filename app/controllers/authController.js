import { User } from "../databases/db.js";

export async function register(req, res) {
  try {
    let checkEmail = await User.findOne({
      email: req.validatedData.email,
    }).select("email");
    let checkUsername = await User.findOne({
      username: req.validatedData.username,
    }).select("username");

    if (checkEmail) {
      return res.status(400).json({
        errors: { email: "Email already exists" },
      });
    }

    if (checkUsername) {
      return res.status(400).json({
        errors: { username: "Username already exists" },
      });
    }

    const user = new User({
      username: req.validatedData.username,
      email: req.validatedData.email,
      password: req.validatedData.password,
    });

    await user.save();

    req.session.userId = user._id.toString();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

export async function login(req, res) {
  try {
    const user = await User.findOne({
      email: req.validatedData.email,
      password: req.validatedData.password,
    });
    if (user) {
      console.log(user._id.toString());
      req.session.userId = user._id.toString();
      console.log("userId from login method", req.session.userId);
      return res.status(200).json("found");
    }
    return res.status(400).json({
      errors: {
        error: "Invalid email or password",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
