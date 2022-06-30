import React, { useState } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState({isMessage: false , message: '' , color: ""})
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const resetPasswordFunc = async () => {
    if (!email) {
        setMessage({isMessage: true , message: 'Email input is empty' , color: "danger"})
    } else {
      await resetPassword(email).then(res => {
        console.log(res);
            setMessage({
                isMessage: true,
                message: "Email sent to your Email ",
                color: "success",
              });
        })
        .catch(error => {
            console.log(error.message)

            if(error.message == 'Firebase: Error (auth/user-not-found).') {
                setMessage({
                    isMessage: true,
                    message: "User Not Found",
                    color: "danger",
                  });
            }
            if(error.message == 'Firebase: Error (auth/invalid-email).') {
                setMessage({
                    isMessage: true,
                    message: "Invalid Email Address",
                    color: "danger",
                  });

            }
        });
    
    }
  };

  return (
    <>
      <div
        className="form-outline text-end link-primary"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        forgot password
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message.isMessage && <Alert variant={message.color}>{message.message}</Alert>} 
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                required
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={resetPasswordFunc}>
            Send Verification Email
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgetPassword;
