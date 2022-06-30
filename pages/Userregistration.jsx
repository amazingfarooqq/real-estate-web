import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import Login from "../components/UserRegistration/Login";
import Register from "../components/UserRegistration/Register";
import { useAuth } from "../context/AuthContext";


const Userregistration = () => {

  const {user} = useAuth()
  const router = useRouter()
  const [loginPage, setLoginPage] = useState(true)
  const [registerPage, setRegisterPage] = useState(false)

  console.log('outside useeffect user' , user)

  useEffect(() => {
    // console.log('hello')
    // console.log('useeffect user' , user)
    if(user){
      router.push('/')
    }
  },[])

  const loginFunc = () => {
    setRegisterPage(false)
    setLoginPage(true)
  }
  const registerFunc = () => {
    setLoginPage(false)
    setRegisterPage(true)
  }

  return (
    <section className="my-5">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          {loginPage && <Login registerFunc={registerFunc}/>}
          {registerPage && <Register loginFunc={loginFunc}/>}
        </div>
      </div>
    </section>
  );
};

export default Userregistration;
