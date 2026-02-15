import express from 'express';

const router = express.Router();
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import isAuthenticated  from '../middleware/isauthenticated.js';

router.post('/admin/product/create', isAuthenticated, createProduct);
router.get('/admin/products',isAuthenticated, getAllProducts);
router.get('/admin/product/:id',isAuthenticated, getProductById);
router.put('/admin/product/:id', isAuthenticated, updateProduct);
router.delete('/admin/product/:id', isAuthenticated, deleteProduct);

export default router;