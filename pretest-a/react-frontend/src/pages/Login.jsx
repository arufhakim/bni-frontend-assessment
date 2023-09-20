import { useState } from "react";
import style from "./css/Login.module.css";
import { useNavigate } from "react-router-dom";
import { RiAccountCircleFill, RiArrowDownCircleFill } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.card}>
          <h3 className={style.header}>Login</h3>
          <p>Masuk dengan username dan password</p>
          <form onSubmit={handleLogin}>
            <div className={style.input}>
              <RiAccountCircleFill size={25} color="#006699" />
              <input
                className={style.username}
                type="text"
                name="username"
                placeholder="Username"
                value={input.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={style.input}>
              <RiArrowDownCircleFill size={25} color="#006699" />
              <input
                className={style.password}
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={`${style.btn} ${style.btnSubmit}`}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
