import React, { useState } from 'react'
import styles from '../styles/ProductUpload.module.css'

const ProductUpload = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    discount: "",
    price: "",
    category: "",
    instock: "",
  });

  const [images, setImages] = useState([]); // array 
  const [previews, setPreviews] = useState([]); // array 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages=[...images,...files]
      const newPreview=[
        ...previews,...files.map(file=>URL.createObjectURL(file))
      ]
      setImages(newImages);
      setPreviews(newPreview);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      images.forEach(file => data.append("images", file));

      const res = await fetch("http://localhost:5173/api/products", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        alert("Product uploaded successfully!");
        setFormData({
          name: "",
          description: "",
          brand: "",
          discount: "",
          price: "",
          category: "",
          instock: "",
        });
        setImages([]);
        setPreviews([]);
      } else {
        alert("Error uploading product");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading product");
    }
  };

  return (
    <form onSubmit={handleUpload} className={styles.form}>
      <h1>Add Product</h1>

      <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Enter product description" value={formData.description} onChange={handleChange} required />
      <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input name="discount" type="number" placeholder="Discount (%)" value={formData.discount} onChange={handleChange} />
      <input name="instock" type="number" placeholder="Enter stock" value={formData.instock} onChange={handleChange} required />
      <input name="category" placeholder="Category ID" value={formData.category} onChange={handleChange} required />

      <input type="file" accept="image/*" multiple onChange={handleImageChange} id="fileUpload" className={styles.hiddenInput}/>
      <label htmlFor="fileUpload" className={styles.filelabel}>
        {images.length >0? `${images.length} files(s) selected` : "Choose Files"}
      </label>

      {/* View all images  */}
      <div className={styles.previewWrapper}>
        {previews.map((src, index) => (
          <div key={index} className={styles.previewItem}>
            <img src={src} alt={`Preview ${index}`} className={styles.preview} />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className={styles.button}>Upload Product</button>
    </form>
  );
};

export default ProductUpload;
