import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import ForgetPassword from "./ForgetPassword";

const Login = ({registerFunc}) => {
  const { user, login, signInWithGoogle } = useAuth();
  const router = useRouter()
  const [message, setMessage] = useState({isMessage: false , message: '' , color: ""})


  // all state values expcept some , they are written seperately
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  
  // handle change for all except some - they are written seperatetly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const HandleOnSubmit = async () => {
    if (!inputValues.email) {
      setMessage({isMessage: true , message: 'Email input is empty' , color: "danger"})
    } else if (!inputValues.password) {
      setMessage({isMessage: true , message: 'Password input is empty' , color: "danger"})
    } else {
      try {
        await login(inputValues.email, inputValues.password);
        router.push('/')
      } catch (error) {
        setMessage({isMessage: true , message: error.message , color: "danger"})
      }
    }
  };

  return (
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
        {/* <p className="lead fw-normal mb-0 me-3">Sign in with</p> <br /> */}
        <div className="col-12 text-center">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="login-with-google-btn"
          >
            Sign in with Google
          </button>
        </div>
      </div>

      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Or</p>
      </div>

      <div className="form-outline mb-2">
      {message.isMessage && <Alert variant={message.color}>{message.message}</Alert>}
        <input
          type="email"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
          id="form3Example3"
          className="form-control form-control-lg"
          placeholder="Enter a valid email address"
        />
        <label className="form-label" htmlFor="form3Example3">
          Email address
        </label>
      </div>

      <div className="form-outline">
        <input
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleInputChange}
          id="form3Example4"
          className="form-control form-control-lg"
          placeholder="Enter password"
        />
        <label className="form-label" htmlFor="form3Example4">
          Password
        </label>
      </div>

     <ForgetPassword message={message} setMessage={setMessage}/>

      <div className="text-center text-lg-start ">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          onClick={HandleOnSubmit}
        >
          Login
        </button>
        <p className="small fw-bold mt-2 pt-1 mb-0">
          Dont have an account?{" "}
          <span
            className="link-danger py-1"
            onClick={registerFunc}
            style={{ cursor: "pointer" }}
          >
            Register your new account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
