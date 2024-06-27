import { User } from "../databases/db.js";

export async function getUserData(req, res) {
  const id = req.session.userId;
  try {
    const user = await User.findById(id).select("username password email -_id");

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ redirect: "/login" });
  }
}
