import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useSellRegistration } from "../../../context/SellRegistrationContext";

const ProfileRejectedReason = ({ id }) => {
  const { RealEstateContract, updateSellerRequests } = useSellRegistration();

  const [fields, setFields] = useState([]);
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState({
    isMessage: false,
    message: "",
    color: "",
  });

  const userApprovement = async () => {
    await updateSellerRequests(id, {
      approvement: "rejected",
      rejectedReason: { message: rejectionMessage, fields },
    });
    window.location.reload()
  };

  const handleCheck = (event) => {
    var fields_array = [...fields];
    if (event.target.checked) {
      fields_array = [...fields, event.target.value];
    } else {
      fields_array.splice(fields.indexOf(event.target.value), 1);
    }
    setFields(fields_array);
  };

  return (
    <>
      <button className="btn btn-sm btn-danger" onClick={handleShow}>
        Reject
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message.isMessage && (
            <Alert variant={message.color}>{message.message}</Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Rejected Reason</Form.Label>
              <Form.Control
                type="text"
                value={rejectionMessage}
                onChange={(e) => setRejectionMessage(e.target.value)}
                placeholder="Enter Reason For Rejection"
                required
                autoFocus
              />
            </Form.Group>
            {/* <Form.Check
              type={"checkbox"}
              name={"firstName"}
              id={"firstName"}
              label={"firstName"}
              value={"firstName"}
              onChange={handleCheck}
            />

            <Form.Check
              type={"checkbox"}
              name={"age"}
              id={"age"}
              label={"age"}
              value={"age"}
              onChange={handleCheck}
            /> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={userApprovement}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileRejectedReason;
