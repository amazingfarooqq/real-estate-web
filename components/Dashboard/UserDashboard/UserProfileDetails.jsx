import { isEmpty } from "@firebase/util";
import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { GoLocation } from "react-icons/go";
import { useSellRegistration } from "../../../context/SellRegistrationContext";

const UserProfileDetails = ({ item }) => {

  const [contacts, setContacts] = useState(true);
  const [passportCopy, setPassportCopy] = useState(false);

  const contactsfunction = () => {
    setPassportCopy(false);
    setContacts(true);
  };
  const passportCopyfunction = () => {
    setContacts(false);
    setPassportCopy(true);
  };


  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-11 col-lg-4">
            <div className="row">
              <div className="col-12">
                <img width={300} height={300} src={item.profileImage} alt="" />
              </div>
              {item.isAgency ? (
                <div className="col-12 mt-3">
                  <p className="fs-5 text-primary fw-bold py-0 my-0">
                    Agency Name
                  </p>
                  <p className="py-0 my-0">Name: {item.agencyName}</p>
                </div>
              ) : (
                <div className="col-12 mt-3">
                  <p className="fs-5 text-primary fw-bold py-0 my-0">
                    Not An Agency
                  </p>
                  {/* <p className="py-0 my-0">Name: Santa Stella Agency</p> */}
                </div>
              )}
            </div>
          </div>

          <div className="col-11 col-lg-8">
            <h3 style={{ display: "inline" }}>
              {item.firstName} {item.lastName}{" "}
            </h3>{" "}
            <GoLocation />
            {item.address} <br />
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
            {item.approvement === 'rejected' &&
            <Update item={item} />
            }
            {contacts && (
              <div className="row mt-1">
                <div>
                  Phone:{" "}
                  <span className="fs-5" style={{ fontWeight: "600" }}>
                    {item.phoneNumber}
                  </span>{" "}
                </div>
                <div>
                  Email:{" "}
                  <span className="fs-5" style={{ fontWeight: "600" }}>
                    {item.email}
                  </span>{" "}
                </div>
                <div>
                  Age:{" "}
                  <span className="fs-5" style={{ fontWeight: "600" }}>
                    {item.age}
                  </span>{" "}
                </div>
                <div>
                  Birthday:{" "}
                  <span className="fs-5" style={{ fontWeight: "600" }}>
                    {item.dob}
                  </span>{" "}
                </div>
                <div>
                  Approvement:{" "}
                  <span className="fs-5" style={{ fontWeight: "600" }}>
                    {item.approvement}  {item.approvement === 'rejected' && `( ${item.rejectedReason} )` }
                  </span>{" "}
                </div>
                <div>
                  Corporation:{" "}
                  <span className="fs-5" style={{ fontWeight: "600" }}>
                    {item.isCorporation ? "true" : "false"}
                  </span>{" "}
                </div>
                <div>
                  Role:{" "}
                  <span className="fs-5" style={{ fontWeight: "600" }}>
                    {item.role}
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
                  src={item.passportImage}
                  width="100%"
                  height={400}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function Update({ item }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState({ message: "", color: "" });

  const { updateSellerRequests } = useSellRegistration();

  // all state values expcept some , they are written seperately
  const [inputValues, setInputValues] = useState({
    phoneNumber: item.phoneNumber,
    firstName: item.firstName,
    lastName: item.lastName,
    age: item.age,
    address: item.address,
  });

  // handle change for all except some - they are written seperatetly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // handle on submitting form
  const HandleOnSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    setMessage({message: 'Loading' , color: 'warning'});

    const { firstName, lastName, age, email, dob, address, phoneNumber } =
      inputValues;

    if ((!firstName, !lastName, !age, !address, !phoneNumber)) {
    setMessage({message: 'uncomplete form' , color: 'danger'});

    } else {
      try {
        await updateSellerRequests(item.id , {
          firstName,
          lastName,
          age,
          address,
          phoneNumber,
          approvement: 'pending'
        });
        setMessage({message: 'Updated' , color: 'success'});
        handleClose();
        window.location.reload();
      } catch (error) {
      setMessage({message: error.message , color: 'danger'});
        
        console.log(error);
      }
    }
  };
  return (
    <>
      <button
        onClick={handleShow}
        className={`btn btn-primary  mt-5 mx-1`}
      >
        Update
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {message.message && 
            <Alert variant={message.color}> {message.message} </Alert>
            }
            <div className="row mt-1">
              <input
                placeholder="first name"
                className="col-6 rounded p-2 my-1"
                type="text"
                name="firstName"
                value={inputValues.firstName}
                onChange={handleInputChange}
              />
              <input
                placeholder="last name"
                className="col-6 rounded p-2 my-1"
                type="text"
                name="lastName"
                value={inputValues.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <input
                placeholder="Age"
                className="col-12 col-md-6 rounded p-2 my-1"
                type="number"
                name="age"
                value={inputValues.age}
                onChange={handleInputChange}
              />
              <input
                placeholder="Phone Number"
                className="col-12 col-md-6 rounded p-2 my-1"
                type="number"
                name="phoneNumber"
                value={inputValues.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <input
                placeholder="address"
                type="text"
                className="col-12 p-2 my-1"
                name="address"
                value={inputValues.address}
                onChange={handleInputChange}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={HandleOnSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserProfileDetails;
