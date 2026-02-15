import styles from '../styles/ProductDisplay.module.css'
import { Product } from '../dataTypes/Product'
 type DisplayProps=
{
  product:Product;
}
const ProductDisplay = ({product}:DisplayProps) => {
    const addToCart=()=>
    {
        window.alert(`Added to cart`)
    }
  return (
    <>
    <div className={styles.productCard}>
        <img src={product.image} className={styles.image}/>
        <h3> {product.name}</h3>
        <p> {product.price}</p>
        <p> {product.category} :</p>
        {/* If stock >0 && stock <=10 then show stock and also display stock number */}
        {product.stock>0 && product.stock<=10 ?
        (
            <p className={styles.lowStock}> Only {product.stock} left</p>
        ):product.stock >=10? (
            <p></p>
        ):
        (
            <p className={styles.outStock}> Out of Stock </p>
        )}
       
       <button onClick={addToCart} className={styles.addtoCart} disabled={product.stock===0}> Add to Cart</button>
    </div>
    </>
  )
}

export default ProductDisplay