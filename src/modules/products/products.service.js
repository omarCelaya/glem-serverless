import { supabase } from "../../utils/supabase.js";
export class ProductsService {
    static async getPublicProducts() {
        const { data, error } = await supabase
            .from("products")
            .select(`
      id, name, description, sale_price, classification,
      product_images(image_path, is_primary)
    `)
            .eq("is_active", true);
        if (error)
            throw error;
        return data;
    }
    static async createProduct(payload) {
        const { data, error } = await supabase
            .from("products")
            .insert({ ...payload, is_active: true })
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
}
