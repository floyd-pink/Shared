import express from 'express';
const router =express.Router();
import { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } from '../controller/category.controller.js';
import isAuthenticated  from '../middleware/isauthenticated.js';


router.post('/admin/category/create', isAuthenticated, createCategory);
router.get('/admin/categories',isAuthenticated, getAllCategory);
router.get('/admin/category/:categoryid',isAuthenticated, getCategoryById);
router.put('/admin/category/:categoryid', isAuthenticated, updateCategory);
router.delete('/admin/category/:categoryid', isAuthenticated, deleteCategory);
export default router;
