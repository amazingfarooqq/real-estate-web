import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GoLocation } from "react-icons/go";
import { useAuth } from "../../context/AuthContext";
import { useSellRegistration } from "../../context/SellRegistrationContext";

const Updateprofile = () => {
  const { updateSellerRequests } = useSellRegistration();

  const { user, updateProfileData, currentLoggedInUser } = useAuth();
  const updateData = async () => {
    await updateProfileData()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // currentLoggedInUser && currentLoggedInUser.role == "owner" && router.push("/admin/sellerrequests")

  console.log(user);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-11 col-lg-4">
            <div className="row">
              <div className="col-12">
                <img
                  width={500}
                  height={500}
                  src={
                    user &&
                    (user.photoURL ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3g5r1iS7W3jM-aayc__ZRxzjVhHU04yYMlQ&usqp=CAU")
                  }
                  alt=""
                />
              </div>
              {/* {item.isAgency ? (
                    <div className="col-12 mt-3">
                      <p className="fs-5 text-primary fw-bold py-0 my-0">
                        Agency
                      </p>
                      <p className="py-0 my-0">Name: Santa Stella Agency</p>
                    </div>
                  ) : (
                    <div className="col-12 mt-3">
                      <p className="fs-5 text-primary fw-bold py-0 my-0">
                        Not An Agency
                      </p>
                      <p className="py-0 my-0">Name: Santa Stella Agency</p>
                    </div>
                  )} */}
            </div>
          </div>

          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            {/* <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
        <div className="col-12 text-center">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="login-with-google-btn"
          >
            Sign up with Google
          </button>
        </div>
      </div> */}

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <div className="form-outline mb-2">
              {/* {error && <Alert variant="danger">{error}</Alert>} */}

              <input
                type="text"
                name="fullname"
                id="form3Example3"
                value={(user && user.displayName) || ""}
                // onChange={handleInputChange}
                className="form-control form-control-lg"
                placeholder="Enter your full name"
              />
              <label className="form-label" htmlFor="form3Example3">
                Full Name
              </label>
            </div>
            {/* 
      <div className="form-outline mb-2">
        <input
          type="password"
          name="password"
          // value={inputValues.password}
          // onChange={handleInputChange}
          id="form3Example4"
          className="form-control form-control-lg"
          placeholder="Enter password"
        />
        <label className="form-label" htmlFor="form3Example4">
          Password
        </label>
      </div> */}
            {/* 
      <div className="form-outline mb-2">
        <input
          type="password"
          name="confirmpassword"
          // value={inputValues.confirmpassword}
          // onChange={handleInputChange}
          id="form3Example4"
          className="form-control form-control-lg"
          placeholder="Confirm password"
        />
        <label className="form-label" htmlFor="form3Example4">
          Confirm Password
        </label>
      </div> */}
            <div className="text-center text-lg-start ">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                onClick={updateData}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updateprofile;
