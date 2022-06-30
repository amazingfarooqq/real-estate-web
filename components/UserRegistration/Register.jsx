import React, { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { sendEmailVerification } from "firebase/auth";

const Register = ({loginFunc}) => {
  const { user, signup, signInWithGoogle } = useAuth();
  // all state values expcept some , they are written seperately
  const router = useRouter()
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState("");

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
      setError('Email input is empty')
    } else if (!inputValues.password) {
      setError('password input is empty')
    } else if (!inputValues.confirmpassword) {
      setError('confirm password input is empty')
    }else if(inputValues.confirmpassword != inputValues.password){
      setError('passwords are not same')
    } else {
        await signup(inputValues.email, inputValues.password).then((user) => {
          sendEmailVerification(user.user);
          setError("");
          router.push('/')
        }).catch((error) => {
          
          setError(error.message);
        });
      
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
            Sign up with Google
          </button>
        </div>
      </div>

      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Or</p>
      </div>

      <div className="form-outline mb-2">
      {error && <Alert variant="danger">{error}</Alert>}

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

      <div className="form-outline mb-2">
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

      <div className="form-outline mb-2">
        <input
          type="password"
          name="confirmpassword"
          value={inputValues.confirmpassword}
          onChange={handleInputChange}
          id="form3Example4"
          className="form-control form-control-lg"
          placeholder="Confirm password"
        />
        <label className="form-label" htmlFor="form3Example4">
          Confirm Password
        </label>
      </div>
      <div className="text-center text-lg-start ">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          onClick={HandleOnSubmit}
        >
          Register
        </button>
        <p className="small fw-bold mt-2 pt-1 mb-0">
          Already Have An Account?{" "}
          <span
            className="link-danger py-1"
            onClick={loginFunc}
            style={{ cursor: "pointer" }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
