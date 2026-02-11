// import { supabase } from "../../utils/supabaseClient.utils";
import formidable from "formidable";
import fs from "fs";
import { supabase } from "../../utils/supabase.js";
export const config = {
    api: { bodyParser: false }
};
export class UploadService {
    static async uploadProductImage(req, res) {
        const form = formidable();
        const [fields, files] = await form.parse(req);
        const productId = fields.product_id[0];
        const file = files.file[0];
        const buffer = fs.readFileSync(file.filepath);
        const path = `products/${productId}/${Date.now()}.jpg`;
        await supabase.storage
            .from("product-images")
            .upload(path, buffer, {
            contentType: file.mimetype
        });
        await supabase.from("product_images").insert({
            product_id: productId,
            image_path: path,
            is_primary: false
        });
        res.json({ success: true });
    }
}
