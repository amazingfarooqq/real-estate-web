import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useSellRegistration } from '../../../context/SellRegistrationContext';
import MessageBox from '../../MessageBox/MessageBox';

const PropertyRejectedReason = ({ id }) => {
    const { RealEstateContract } = useSellRegistration();
  
    const [rejectionMessage, setRejectionMessage] = useState("");
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [message, setMessage] = useState({
      isMessage: false,
      message: "",
      color: "",
    });  
    const rejectProperty = async () => {
      if(!rejectionMessage) {
        setMessage({ isMessage: true, message: "Error Message Is Empty", color: "danger" });
      }else {
        try {
          const tx = await RealEstateContract.rejectProperty(id, rejectionMessage);
          await tx.wait()
          setMessage({ isMessage: true, message: "Property Rejected", color: "warning" });
          window.location.reload()
        } catch (error) {
          if(error.reason == 'execution reverted: !Agency'){
            setMessage({ isMessage: true, message: "Only An Owner Can Reject This Property", color: "warning" });
          } else {
            setMessage({ isMessage: true, message: error.reason, color: "warning" });
          } 
        }
      }
    };
  
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
          Reject
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Rejected Reason</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message.isMessage && <MessageBox message={message} setMessage={setMessage}/>}
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={rejectProperty}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  

export default PropertyRejectedReason