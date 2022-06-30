import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSellRegistration } from "../../../context/SellRegistrationContext";
import QRCode from "react-qr-code";
import { formatEther } from "ethers/lib/utils";
import PropertyRejectedReason from "./PropertyRejectedReason";
import MessageBox from "../../MessageBox/MessageBox";

const AdminPropertyDetails = ({ item, imagesList }) => {
  const [show, setShow] = useState(false);
  const [mainImage, setMainImage] = useState();

  const [message, setMessage] = useState({
    isMessage: false,
    message: "",
    color: "",
  });

  const {
    RealEstateContractAddress,
    RealEstateContract,
    PropertyTokenContract,
    TicketTokenContract,
  } = useSellRegistration();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: true,
    className: "col-12 d-none d-lg-block",
    arrows: true,
  };

  // const idOfProperty = parseInt(item.id._hex, 16);

  const API_KEY =
    process.env.NEXT_PUBLIC_IPFS_API_KEY || "52204a85c1a51d7f3ed2";
  const API_SECRET =
    process.env.NEXT_PUBLIC_IPFS_API_SECRET ||
    "4b678ed52b09e15f4cb39c5db0f49365d9bae9d1914605648d2137e4cd937e36";

  const approveProperty = async () => {
    try {
      const tx = await RealEstateContract.approveProperty(item.id);
      await tx.wait();
      setMessage({
        isMessage: true,
        message: "Property Approved",
        color: "warning",
      });
      window.location.reload();
    } catch (error) {
      if (error.reason == "execution reverted: !Agency") {
        setMessage({
          isMessage: true,
          message: "Only An Owner Can Approve This Property",
          color: "warning",
        });
      } else {
        setMessage({
          isMessage: true,
          message: error.reason,
          color: "warning",
        });
      }
    }
  };

  const acceptDeal = async () => {
    await RealEstateContract.acceptingDeal(item.id);
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return (
    <>
      {item._isApproved && !item._isTicketCreated && !item._isOnSell && !item._ticketBuyerInfo._buyerRequest && !item._ticketBuyerInfo._PropertyPricePaid &&  (
        <>
          <Button variant="info" onClick={handleShow}>
            Details
          </Button>
        </>
      )}
      {item._isPending && (
        <>
          <Button variant="warning" onClick={handleShow}>
            Details
          </Button>
        </>
      )}
      {item._isRejected && (
        <>
          <Button variant="danger" onClick={handleShow}>
            Details
          </Button>
        </>
      )}
      {item._isApproved && item._isTicketCreated && !item._isOnSell && !item._ticketBuyerInfo._buyerRequest && !item._ticketBuyerInfo._PropertyPricePaid && (
        <>
          <Button variant="success" onClick={handleShow}>
            Details
          </Button>
        </>
      )}
      {item._isApproved && item._isTicketCreated && item._isOnSell && !item._ticketBuyerInfo._buyerRequest && !item._ticketBuyerInfo._PropertyPricePaid && (
        <>
          <Button variant="success" onClick={handleShow}>
            Details
          </Button>
        </>
      )}
      {(item._isApproved &&
              item._isTicketCreated &&
              !item._isOnSell &&
              item._ticketBuyerInfo._buyerRequest &&
              item._ticketBuyerInfo._PropertyPricePaid && !item._ticketBuyerInfo.DealAccepted) && (
          <>
          <Button variant="success" onClick={acceptDeal}>
              Accept Deal
          </Button>
          </>
        )}
        {(item._isApproved &&
              item._isTicketCreated &&
              !item._isOnSell &&
              item._ticketBuyerInfo._buyerRequest &&
              item._ticketBuyerInfo._PropertyPricePaid && item._ticketBuyerInfo.DealAccepted) && (
          <>
          <Button variant="success" onClick={handleShow}>
            Deal Accepted
          </Button>
          </>
        )}

      <Modal show={show} size="lg" onHide={handleClose} keyboard={false}>
        <Modal.Body>
          {message.isMessage && (
            <MessageBox message={message} setMessage={setMessage} />
          )}

          <Slider {...settings}>
            {imagesList.map((item, index) => {
              return (
                <img
                  style={{ height: "100px", marginBottom: "0px" }}
                  className="w-100 mb-0 slick_image"
                  key={index}
                  src={item}
                />
              );
            })}
          </Slider>

          <div className="d-flex justify-content-around mt-3 ">
            <div>
              {/* <div>Id</div> */}
              <div>Name</div>
              <div>Phone Number</div>
              <div>Property Price</div>
              <div>House Address</div>
              <div>Wallet Address</div>
              <div>Approvement</div>
              <div>Agency</div>
              {item._rejectedReason && item._rejectedReason.length >= 1 && (
                <div>Reason For Rejected</div>
              )}
            </div>
            <div>
              {/* <div>{idOfProperty}</div> */}
              <div>{item._fullName || "--"}</div>
              <div>{item._phoneNumber || "--"}</div>
              <div>{formatEther(item._price._hex) || "--"}</div>
              <div>{item._houseAddress || "--"}</div>
              <div>
                {item._currentOwner.slice(0, 5)}...
                {item._currentOwner.slice(-5)}
              </div>
              <div>
                {item._isPending
                  ? "Pending"
                  : item._isApproved
                  ? "Approved"
                  : "--"}
              </div>
              <div>{item._isAgency ? "agency" : "not an agency"}</div>
              {
                <div>
                  <ul>
                    {item._rejectedReason.map((item, index) => <li key={index}>{item}</li>) ||
                      "--"}
                  </ul>
                </div>
              }
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {item._isApproved && !item._isTicketCreated && !item._isOnSell && (
            <Button variant="info">This Property is Approved</Button>
          )}
          {item._isPending && (
            <>
              <Button variant="success" onClick={approveProperty}>
                Approve
              </Button>
              <PropertyRejectedReason item={item} id={item.id} />
            </>
          )}
          {item._isRejected && (
            <>
              <Button variant="danger" onClick={handleShow}>
                Details
              </Button>
            </>
          )}

          {item._isApproved && item._isTicketCreated && !item._isOnSell && (
            <>
              <Button variant="primary" onClick={handleShow}>
                Ticket For this Property has been created
              </Button>
            </>
          )}
          {item._isApproved && item._isTicketCreated && item._isOnSell && (
            <>
              <Button variant="success" onClick={handleShow}>
                This Property is on sell
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminPropertyDetails;
