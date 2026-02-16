import { category } from '../model/Category.model.js';
import Category from '../models/category.model.js';

export const createCategory = async (req, res) => {
    try {
       const {name,description,image} = req.body;
       if(!name || !description || !image){
        res.status(400).json({
            message:"all fields are required",
            success:false
        })
        let  category =await Category.findOne({name});
        if(category){
            res.status(400).json({
                message:"category already exists",
                success:false
            })
        };
       
       }
       const newCategory = await Category.create({name,description,image});
       res.status(201).json({
        message:"category created successfully",
        success:true,
        data:newCategory
       })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

export const getAllCategory = async (req, res) =>{
    try {
        const categories = await Category.find({});
        res.status(200).json({
            message:"categories fetched successfully",
            success:true,
            data:categories
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}
export const getCategoryById = async (req, res) =>{
    try{
        const {id} = req.params;
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({
                message:"category not found",
                success:false
            })
        }
        res.status(200).json({
            message:"category fetched successfully",
            success:true,
            data:category
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}
export const updateCategory = async (req, res) =>{
    try{
    const{categoryid:id}=req.params;
    const {name,description,image} = req.body;
    const category = await Category.findById(id);
    if(!category){
        return res.status(404).json({
            message:"category not found",
            success:false
        })
    }
    const updatedCategory = await Category.findByIdAndUpdate(id,{name,description,image},{new:true});
    res.status(200).json({
        message:"category updated successfully",
        success:true,
        data:updatedCategory
    })
    }
    catch (error) {
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

export const deleteCategory = async (req, res) =>{
    try {
        const {categoryid:id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(!category){
            return res.status(404).json({
                message:"category not found",
                success:false
            })
        }
        res.status(200).json({
            message:"category deleted successfully",
            success:true,
            data:category
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}
