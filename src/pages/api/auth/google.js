import passport from "passport";
import { NextApiRequest, NextApiResponse } from "next";
import { initializePassport } from "../../../lib/passport-config";

initializePassport(passport);

export default (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
};
