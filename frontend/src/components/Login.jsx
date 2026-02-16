import { useState } from "react";
import styles from "../styles/Login.module.css";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin =  () => {
   
  };
  const LostDetails=()=>
  {

  }
  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.field}>
        <label >Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      <span onClick={LostDetails}> Forgot Password?</span>
      </div>
      <button className={styles.button} type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
