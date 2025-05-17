import ProductModel from "../model/productModel.js";
import { uploadImage } from "../services/CloudinaryServices.js";







export const getProducts = async (req, res) => {
  try {
    let product = await ProductModel.find();
    return res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Error on fetching Data" });
  }
}

export const getIndividualProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById(id);
    return res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
};


export const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    return res.status(404).json({ message: "Error on updating time " });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await ProductModel.findByIdAndDelete(id);
    return res.json({ message: "Product deleted successfully" });

  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
}

export const upload_Product_with_Image = async (req, res) => {
  try {
    console.log(req.body);
    const { name, price, category, description, isBestSelling } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image file missing" });
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: "File too large. Max size is 5MB" });
    }

    let imageUploadResponse;
    try {
      imageUploadResponse = await uploadImage(req.file);


    } catch (cloudError) {
      console.error("Cloudinary Upload Error:", cloudError);
      return res.status(500).json({ message: "Image upload failed" });
    }
    const product = new ProductModel({
      name,
      price,
      category,
      description,
      image: imageUploadResponse.secure_url,
      isBestSelling,
    });

    await product.save();

    res.status(201).json({ message: "Uploaded successfully", product });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}