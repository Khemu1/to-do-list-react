export function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.status(401).json({ redirect: "/" });
  }
}
export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to logout" });
    }
    return res.status(200).json("logged out");
  });
}
