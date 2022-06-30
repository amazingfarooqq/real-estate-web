import React, { useState } from "react";
import { useSellRegistration } from "../../../context/SellRegistrationContext";
import ProfileRejectedReason from "./ProfileRejectedReason";
import { Modal , Form , Button, Alert } from "react-bootstrap"

const ProfileCard = ({ data, key }) => {
  const { updateSellerRequests } = useSellRegistration();
  const [passportPhoto, setPassportPhoto] = useState(false);

  const userApprovement = async (approvement) => {
    await updateSellerRequests(data.id, { approvement });
    window.location.reload()
  };

  return (
    <div key={key} className="col-11 col-lg-6 card p-3">
      <div className="d-flex align-items-center">
        <div className="image h-100" style={{ width: "155px" }}>
          <img
            src={data.profileImage || "img"}
            className="rounded h-100"
            width={155}
          />
        </div>

        <div className="ml-3 w-100 px-2">
          <h4 className="mb-0 mt-0 text-capitalize">
            {data.firstName} {data.lastName}{" "}
          </h4>
          <span>{data.email}</span>

          <div
            className={`p-2 mt-2 d-flex justify-content-between rounded text-dark stats`}
          >
            {data.approvement !== "rejected" ? (
              <>
                <div className="d-flex flex-column">
                  <span className="articles">Role</span>
                  <span className="number1">{data.role}</span>
                </div>

                <div className="d-flex flex-column">
                  {data.isAgency ? (
                    <>
                      <span className="followers">Agency</span>
                      <span className="number2 text-capitalize">
                        {data.agencyName}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="followers">Not An Agency</span>
                      <span className="number2">--</span>
                    </>
                  )}
                </div>

                <div className="d-flex flex-column">
                  <span className="rating">Age</span>
                  <span className="number3">{data.age}</span>
                </div>
              </>
            ) : (
              <>
                <p className="text-danger">
                  Reason of Rejected: {data.rejectedReason.message}
                </p>
              </>
            )}
          </div>

          {data.approvement === "approved" ? (
            <div className="button mt-2 d-flex flex-row align-items-center">
              <button className="btn btn-sm btn-success">
                User Is Approved
              </button>
              <Update item={data} />

            </div>
          ) : data.approvement === "rejected" ? (
            <div className="button mt-2 d-flex flex-row align-items-center">
              <button className="btn btn-sm btn-danger">
                User Is Rejected
              </button>
              <Update item={data} />

            </div>
          ) : (
            <div className="button mt-2 d-flex flex-row align-items-center">
              <button
                className="btn btn-sm btn-success"
                onClick={() => userApprovement("approved")}
              >
                Approve
              </button>
              <ProfileRejectedReason id={data.id} />
              <Update item={data} />
              {/* <button
                className="btn btn-sm btn-danger mx-1 ml-2"
                onClick={() => userApprovement("rejected")}
              >
                Reject
              </button> */}
            </div>
          )}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          {passportPhoto && (
            <div
              style={{
                position: "fixed",
                top: "0px",
                left: "0px",
                zIndex: "1111",
                width: "100vw",
                height: "100vh",
              }}
            >
              <button
                className="w-100 btn btn-primary py-2"
                onClick={() => setPassportPhoto(false)}
              >
                Close
              </button>
              <img
                src={data.passportImage || "img"}
                className="rounded w-100 h-100"
                width={155}
              />
            </div>
          )}

          <button
            className="btn btn-light"
            onClick={() => setPassportPhoto(true)}
          >
            Passport copy
          </button>
          <a href="#" className="btn btn-light mx-1">
            Coporation
          </a>
        </div>
      </div>
    </div>
  );
};

function Update({ item }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState({ message: "", color: "" });

  const { updateSellerRequests } = useSellRegistration();

  const userApprovement = async (approvement) => {
    await updateSellerRequests(item.id, { approvement });
    window.location.reload()
  };

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
    setMessage({ message: "Loading", color: "warning" });

    const { firstName, lastName, age, email, dob, address, phoneNumber } =
      inputValues;

    if ((!firstName, !lastName, !age, !address, !phoneNumber)) {
      setMessage({ message: "uncomplete form", color: "danger" });
    } else {
      try {
        await updateSellerRequests(item.id, {
          firstName,
          lastName,
          age,
          address,
          phoneNumber,
          approvement: "pending",
        });
        setMessage({ message: "Updated", color: "success" });
        handleClose();
        window.location.reload();
      } catch (error) {
        setMessage({ message: error.message, color: "danger" });

        console.log(error);
      }
    }
  };
  return (
    <>
      <button onClick={handleShow} className={`btn btn-sm btn-primary`}
      >
        Update
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form> */}
            {message.message && (
              <Alert variant={message.color}> {message.message} </Alert>
            )}
             {/* <div className="button mt-2 d-flex flex-row align-items-center"> */}
              <button
                className="btn btn-sm btn-success"
                onClick={() => userApprovement("approved")}
              >
                Approve
              </button>
              <ProfileRejectedReason id={item.id} />
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
          {/* </Form> */}
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

export default ProfileCard;
