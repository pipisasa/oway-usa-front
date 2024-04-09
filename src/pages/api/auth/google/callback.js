// Файл: /pages/api/auth/google/callback.js
import passport from "passport";

const nextConnect = require("next-connect");

const handler = nextConnect();

handler.use(passport.initialize());
handler.get(
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Успешная аутентификация, перенаправить домой.
    res.redirect("/");
  }
);

export default handler;
