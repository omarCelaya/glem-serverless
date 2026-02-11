import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { supabase } from "../../utils/supabase.js";
import { JwtPayload, LoginPayload } from "./auth.model.js";

export const loginService = async (payload: LoginPayload) => {
  try {
    const { email, password } = payload;

    if (!email || !password) {
      throw new Error("Missing credentials");
    }

    const { data: sessionData, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error || !sessionData.user) {
      throw new Error(error?.message || "Invalid credentials");
    }

    const newToken: JwtPayload = {
      admin_id: sessionData.user.id,
      email: sessionData.user.email!,
    };

    const jwtSecret: Secret = process.env.JWT_SECRET as string;

    const signOptions: SignOptions = {
      expiresIn: "7d",
    };

    const token = jwt.sign(newToken, jwtSecret, signOptions);

    return { token };
  } catch (error) {
    throw error;
  }
};
