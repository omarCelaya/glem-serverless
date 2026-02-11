import jwt from "jsonwebtoken";
import { supabase } from "../../utils/supabase.js";
export const loginService = async (payload) => {
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
        const newToken = {
            admin_id: sessionData.user.id,
            email: sessionData.user.email
        };
        const jwtSecret = process.env.JWT_SECRET;
        const signOptions = {
            expiresIn: process.env.JWT_EXPIRES_IN
        };
        const token = jwt.sign(newToken, jwtSecret, signOptions);
        return { token };
    }
    catch (error) {
        throw new Error("AUTH-SERIVCE ERROR: ", error);
    }
};
