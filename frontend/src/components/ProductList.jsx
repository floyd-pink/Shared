// To list the Product
import { dummyProducts } from '../dataTypes/DummyProducts'
import ProductDisplay from './ProductDisplay'
import styles from '../styles/ProductList.module.css'

const ProductList = () => {
  return (
    <div className={styles.productGrid}>
      {dummyProducts.map((p) => (
        <ProductDisplay key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;

