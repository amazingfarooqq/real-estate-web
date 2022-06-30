import { ethers } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSellRegistration } from "../../../context/SellRegistrationContext";
import MessageBox from "../../MessageBox/MessageBox";

function toWei(n) {
  return ethers.utils.parseUnits(n);
}

const UpdateProperty = ({ item }) => {
  const { RealEstateContract } = useSellRegistration();
  const [show, setShow] = useState(false);

  console.log("result", { item });
  // console.log(formatEther(item.price._hex))
  // console.log('towei',toWei('100.0')._hex == toWei('100')._hex)

  const [inputValues, setInputValues] = useState({
    fullName: item._fullName,
    phoneNumber: item._phoneNumber,
    price: formatEther(item._price._hex),
    details: item._details,
    houseAddress: item._houseAddress,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState({
    isMessage: false,
    message: "",
    color: "",
  });

  const updateProperty = async () => {
    setMessage({
      isMessage: true,
      message: "Updating Property....",
      color: "warning",
    });
    try {
      const tx = await RealEstateContract.updateProperty(
        item.id,
        toWei(inputValues.price),
        true,
        inputValues.fullName,
        inputValues.phoneNumber,
        inputValues.details,
        inputValues.houseAddress,
        item._pictures
      );

      await tx.wait();
      window.location.reload();
    } catch (error) {
      setMessage({
        isMessage: true,
        message: "Error Updating Property....",
        color: "danger",
      });
    }
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Update Property
      </Button>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message.isMessage && (
            <MessageBox message={message} setMessage={setMessage}/>
          )}
          <p className="p-0 m-0 text-danger">
            Reason Of Rejection:
            <ul>
              {item._rejectedReason.map((item,index) => (
                <li key={index} >{item}</li>
              ))}
            </ul>
          </p>
          {/* <p className="text-danger">
            Please Just Update Mention Fields
          </p> */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={inputValues.fullName}
                onChange={handleOnChange}
                placeholder="Enter Full Name"
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={inputValues.phoneNumber}
                onChange={handleOnChange}
                placeholder="Enter Phone Number"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Property Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={inputValues.price}
                onChange={handleOnChange}
                placeholder="Enter Propery Price"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Property Details</Form.Label>
              <Form.Control
                type="text"
                name="details"
                value={inputValues.details}
                onChange={handleOnChange}
                placeholder="Enter Property Details"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Property Images</Form.Label>
              <Form.Control type="file" onChange={handleOnChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateProperty}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProperty;
