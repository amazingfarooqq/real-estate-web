import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GoLocation } from "react-icons/go";
import { useAuth } from "../../context/AuthContext";
import { useSellRegistration } from "../../context/SellRegistrationContext";

const UpdateData = () => {
  const { updateSellerRequests } = useSellRegistration();

  const {user , updateProfileData} = useAuth()

  const [contacts, setContacts] = useState(true);
  const [passportCopy, setPassportCopy] = useState(false);
  const [actions, setActions] = useState(false);

  const contactsfunction = () => {
    setPassportCopy(false);
    setActions(false);
    setContacts(true);
  };
  const passportCopyfunction = () => {
    setActions(false);
    setContacts(false);
    setPassportCopy(true);
  };
  const actionsfunction = () => {
    setPassportCopy(false);
    setContacts(false);
    setActions(true);
  };


  return (
    <>

          <div className="container mt-5">
            <div className="row">
              <div className="col-11 col-lg-4">
                <div className="row">
                  <div className="col-12">
                    <img
                      width={300}
                      height={300}
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

              <div className="col-11 col-lg-8">
                <h3 style={{ display: "inline" }}>
                  farooq dad
                </h3>{" "}
                <GoLocation />address <br />
                <button
                  className={`btn ${
                    contacts ? "btn-dark" : "btn-outline-dark"
                  }  mt-5 mx-1`}
                  onClick={contactsfunction}
                >
                  Contacts
                </button>
                <button
                  className={`btn ${
                    passportCopy ? "btn-dark" : "btn-outline-dark"
                  }  mt-5 mx-1`}
                  onClick={passportCopyfunction}
                >
                  Passport
                </button>
                {/* <button
                  className={`btn ${
                    actions ? "btn-dark" : "btn-outline-dark"
                  }  mt-5 mx-1`}
                  onClick={actionsfunction}

                >
                  Actions
                </button> */}
                {contacts && (
                  <div className="row mt-1">
                    <div>
                      Phone:{" "}
                      <span className="fs-5" style={{ fontWeight: "600" }}>
                        phone number
                      </span>{" "}
                    </div>
                    <div>
                      Email:{" "}
                      <span className="fs-5" style={{ fontWeight: "600" }}>
                        email
                      </span>{" "}
                    </div>
                    <div>
                      Age:{" "}
                      <span className="fs-5" style={{ fontWeight: "600" }}>
                        age
                      </span>{" "}
                    </div>
                    <div>
                      Birthday:{" "}
                      <span className="fs-5" style={{ fontWeight: "600" }}>
                       dob
                      </span>{" "}
                    </div>
                    <div>
                      Approvement:{" "}
                      <span className="fs-5" style={{ fontWeight: "600" }}>
                        approvement
                      </span>{" "}
                    </div>
                    <div>
                      Corporation:{" "}
                      <span className="fs-5" style={{ fontWeight: "600" }}>
                       isCorporation
                      </span>{" "}
                    </div>
                    <div>
                      Role:{" "}
                      <span className="fs-5" style={{ fontWeight: "600" }}>
                       role
                      </span>{" "}
                    </div>
                    <div>
                      Gender:{" "}
                      <span className="fs-5" style={{ fontWeight: "600" }}>
                        Male
                      </span>{" "}
                    </div>
                  </div>
                )}
                {passportCopy && (
                  <div className="row mt-1">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHvYZBUyOvPGWHKc19eyE9xPV7yb3oIZ00Fw&usqp=CAU"
                      width="100%"
                      height={400}
                      alt=""
                    />
                  </div>
                )}
                {actions && (
                  <div className="row mt-1">
                    <div className="col-12">
                     
                      <button onClick={() => updateSellerRequests(item.id ,  {firstName: "zain",approvement: "approved"})}>action</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

    </>
  );
};

export default UpdateData;
