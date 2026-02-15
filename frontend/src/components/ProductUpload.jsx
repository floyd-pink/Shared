import React ,{useState}from 'react'
import styles from '../styles/ProductUpload.module.css'
const ProductUpload = () => {
    const [formData,setFromData]=useState({
        name:"",
        description:"",
        price:"",
        category:"",
        stock:"",
    });
    // for image
    const [image, setImage] = useState(null);
     const [preview, setPreview] = useState(null);
    const handelUpload=()=>
    {
    
    }
    const handelChange=(e)=>
    {
    setFromData({...formData,[e.target.name]:[e.target.value]});
    }
    const handelImageChange=(e)=>
    {
        const file=e.target.files[0];
        if (file) { 
            setImage(file); 
            setPreview(URL.createObjectURL(file)); }
    }
  return (
   <>
   <form onSubmit={handelUpload} className={styles.form}>
    <h1> Add Product </h1>
  <input 
    name="name"
    placeholder="Product Name"
    value={formData.name}
    onChange={handelChange}
    required
    />
    <textarea 
    name="description"
    placeholder='Enter product Description'
    value={formData.description}
    onChange={handelChange}
    />
     <input 
    name="price"
    placeholder="price"
    value={formData.price}
    onChange={handelChange}
    required
    />
     <input 
    name="category"
    placeholder="Category"
    value={formData.category}
    onChange={handelChange}
    required
    />
     <input 
    name="stock"
    type="number"
    placeholder="Enter the stock"
    value={formData.stock}
    onChange={handelChange}
    required
    />

    <input type="file" accept="image/*" onChange={handelImageChange}/>
    {preview && <img src={preview} alt="Preview" className={styles.preview}/>}
    <button type='submit' className={styles.button}> Upload Product</button>
   </form>
   </>
  )
}

export default ProductUpload