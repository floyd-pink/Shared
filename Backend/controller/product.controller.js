import product from "../model/product.model.js";

export const createproduct =async(req,res)=>{
    try{
        const {name,
            description,
            brand,
            price,
            discount,
            instock,
            sold,
            images,
            category,
            ratings,
            reviews} = req.body;
        if(!name || !description || !brand || !price || !instock || !category){
            return res.status(400).json({message: "All fields are required"});
        }
        const existingProduct = await product.findOne({name});
        if(existingProduct){
            return res.status(400).json({message: "Product with this name already exists"});
        }
        const newProduct = new product({
            name,
            description,
            brand,
            price,
            discount,
            instock,
            sold,
            images,
            category,
            ratings,
            reviews
        });
        await newProduct.save();
        res.status(201).json({message: "Product created successfully", product: newProduct,success:true});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getAllProducts = async(req,res)=>{
    try{
        const products = await product.find();
        res.status(200).json({message: "Products fetched successfully", products, success:true});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getProductById = async(req,res)=>{
    try {
        const {id} = req.params;
        const productById = await product.findById(id);
        if(!productById){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product fetched successfully", product: productById, success:true});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const updateProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const updatedProduct = await product.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedProduct){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product updated successfully", product: updatedProduct, success:true});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
export const deleteProduct = async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedProduct = await product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully", success:true});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}