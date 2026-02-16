import express from 'express';

const router = express.Router();
import { createproduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controller/product.controller.js';
import isAuthenticated  from '../middleware/isauthenticated.js';

router.post('/admin/product/create', isAuthenticated, createproduct);
router.get('/admin/products',isAuthenticated, getAllProducts);
router.get('/admin/product/:id',isAuthenticated, getProductById);
router.put('/admin/product/:id', isAuthenticated, updateProduct);
router.delete('/admin/product/:id', isAuthenticated, deleteProduct);

export default router;
