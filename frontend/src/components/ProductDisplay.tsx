import styles from '../styles/ProductDisplay.module.css'
import { Product } from '../dataTypes/Product'
import { useState } from 'react'

type DisplayProps = {
  product: Product;
}

const ProductDisplay = ({ product }: DisplayProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const addToCart = () => {
    window.alert(`Added to cart`);
  };

  const handleNextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev + 1 < product.images.length ? prev + 1 : 0
      );
    }
  };

  return (
    <div className={styles.productCard}>
      {/* Show current  main image */}
      {product.images?.length > 0 ? (
        <img
          src={product.images[currentImageIndex].url}
          alt={product.name}
          className={styles.image}
        />
      ) : (
        <div className={styles.imagePlaceholder}>No image available</div>
      )}

      {/* Button to cycle through images */}
      {product.images?.length > 1 && (
        <button onClick={handleNextImage} className={styles.nextImageBtn}>
          Next Image
        </button>
      )}

      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      {product.discount && (
        <p className={styles.discount}>Discount: {product.discount}%</p>
      )}
      <p>Category: {product.category}</p>

      {/* Stock logic */}
      {product.instock > 0 && product.instock <= 10 ? (
        <p className={styles.lowStock}>Only {product.instock} left</p>
      ) : product.instock >= 10 ? (
        <p className={styles.inStock}>In Stock</p>
      ) : (
        <p className={styles.outStock}>Out of Stock</p>
      )}

      <button
        onClick={addToCart}
        className={styles.addtoCart}
        disabled={product.instock === 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDisplay;
