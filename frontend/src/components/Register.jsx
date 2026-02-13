import React from 'react'
import { useState } from 'react'
import styles from "../styles/Register.module.css";
const Register = () => {
    const [user,setUser]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handelRegister=()=>
    {
     
    }
  return (
    <form onSubmit={handelRegister} className={styles.form}>
     <h2 className={styles.title}>Register</h2>
     <div className={styles.field}>
        <label>Name</label>
        <input
         type='text'
         value={user}
         placeholder='Enter name'
         onChange={(e)=>{setUser(e.target.value)}}
         required/>
        <label>Email</label>
        <input
         type='email'
         value={email}
         onChange={(e)=>{setEmail(e.target.value)}}
         required/>
        <label>Password</label>
        <input
         type='password'
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
         required/>
     </div>
      <button className={styles.button} type='submit'> Register</button>
    </form>
  )
}

export default Register