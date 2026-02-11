import jwt, { SignOptions, Secret } from "jsonwebtoken";
import type { StringValue } from "ms"
import { supabase } from "../../utils/supabase.js";
import { JwtPayload, LoginPayload } from "./auth.model.js";

export const loginService = async (payload: LoginPayload) => {
  try {
    
 
  const { email, password } = payload;
  if (email || password) {
    throw new Error("Not credentials");
  }
  const { data: sessionData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !sessionData.user) {
    throw new Error("Invalid credentials", error);
  }

  // 3️⃣ Crear TU JWT
  const newToken: JwtPayload = {
    admin_id: sessionData.user.id,
    email: sessionData.user.email!
  };

  const jwtSecret: Secret = process.env.JWT_SECRET as string;
  const signOptions: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as StringValue
  };

  const token = jwt.sign(newToken, jwtSecret, signOptions);

  return { token };
   } catch (error) {
        throw new Error("AUTH-SERIVCE ERROR: ", error);
  }
};
