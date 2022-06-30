import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UpdateProperty from "./UpdateProperty";
import axios from "axios";
import QRCode from "react-qr-code";
import { formatEther } from "ethers/lib/utils";
import { useSellRegistration } from "../../../context/SellRegistrationContext";
import MessageBox from "../../MessageBox/MessageBox";
import Image from 'next/image'
import html2canvas from 'html2canvas';

const PropertyDetails = ({ item, imagesList }) => {
  const [show, setShow] = useState(false);
  const [mainImage, setMainImage] = useState();

  
  const {
    RealEstateContractAddress,
    RealEstateContract,
    PropertyTokenContract,
    TicketTokenContract
  } = useSellRegistration();


  
  const [message, setMessage] = useState({
    isMessage: false,
    message: "",
    color: "",
  });

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


  const createTokenFunc = async () => {
    html2canvas(document.getElementById("html-content-holder")).then(
      async (canvas) => {

        const URLforpinJSONtoIPFS = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

        axios
          .post(
            URLforpinJSONtoIPFS,
            {
              name: item._fullName,
              description: item._details,
              image: canvas.toDataURL(),
              attributes: [
                {
                  trait_type: "trait",
                  value: 100,
                },
              ],
            },
            {
              headers: {
                pinata_api_key: API_KEY,
                pinata_secret_api_key: API_SECRET,
              },
            }
          )
          .then(async function (response) {
            // console.log("responseFromFiletoIPFS: ", response);

            const urlForTicketToken = `ipfs://${response.data.IpfsHash}`;

            // console.log(urlForTicketToken);

            const tx1 = await RealEstateContract.createTicket(
              item.id,
              urlForTicketToken
            );
            await tx1.wait()

            const checPropertyTokenContract = await PropertyTokenContract.isApprovedOrOwner(RealEstateContractAddress, item.id)
            const checkTicketTokenContract = await TicketTokenContract.isApprovedOrOwner(RealEstateContractAddress, item.id)

            if(!checPropertyTokenContract){
              const tx2 = await PropertyTokenContract.approve(
                RealEstateContractAddress,
                item.id
              );
              await tx2.wait()
            }

            if(!checkTicketTokenContract){
              const tx3 = await TicketTokenContract.approve(
                RealEstateContractAddress,
                item.id
              );
              await tx3.wait()
            }


            window.location.reload()


          })
          .catch(function (error) {
            //handle error here
            setMessage({isMessage: true , message: error.reason , color: "danger"});
          });
      }
    );
  };

  const putOnSellFunc = async () => {
    setMessage({isMessage: true , message: 'Transaction On Process , Please Wait' , color: "warning"});
    try {
      const txx = await RealEstateContract.putOnSell(item.id)
      await txx.wait()
      
      setMessage({isMessage: true , message: 'Put On Sell Done' , color: "success"});

      window.location.reload()

    } catch (error) {
      setMessage({isMessage: true , message: error.reason , color: "danger"});

    }
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return (
    <>
      {(item._isApproved && !item._isTicketCreated && !item._isOnSell) && (
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
      {(item._isApproved && item._isTicketCreated && !item._isOnSell) && (
        <>
          <Button variant="success" onClick={handleShow}>
            Details
          </Button>
        </>
      )}
      {(item._isApproved && item._isTicketCreated && item._isOnSell) && (
        <>
          <Button variant="success" onClick={handleShow}>
            Details
          </Button>
        </>
      )}

      <Modal show={show} size="lg" onHide={handleClose} keyboard={false}>
        <Modal.Body>
          {message.isMessage && <MessageBox message={message} setMessage={setMessage}/>}
          <Slider {...settings}>
            {imagesList.map((item, index) => {
              return (
                <Image
                style={{ height: "100px", marginBottom: "0px" }}
                className="w-100 mb-0 slick_image"
                alt=""
                key={index}
                src={item}
              />
              );
            })}
          </Slider>

          {/* 
          <input type="button" value="Preview & Convert" id="btnConvert" />
          <br />
          <h3>Preview :</h3> */}
          <div id="previewImg"></div>

          <div
            className="w-100 d-flex justify-content-center rounded"
            style={{ backgroundColor: "#ededed" }}
          >
            <div className="check rounded" id="html-content-holder">
              <div className="number">
                <QRCode value={item._currentOwner} size="100" />
              </div>
              <div className="big">
                NFT <br /> Housing
              </div>

              <div className="info mt-3">
                <section>
                  <div className="title">Date</div>
                  <div>{today}</div>
                </section>
                <section>
                  <div className="title">Issued By</div>
                  <div>Santa Stella</div>
                </section>
                <section>
                  <div className="title">Property Id</div>
                  <div>#{item.id}</div>
                </section>

                {/* <div>
              </div> */}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-around mt-3 ">
            <div>
              {/* <div>Id</div> */}
              <div>Title</div>
              <div>Phone Number</div>
              <div>Property Price</div>
              <div>House Address</div>
              <div>Wallet Address</div>
              {/* <div>Approvement</div> */}
              <div>Agency</div>
              {item._isRejected && <div>Reason For Rejected</div>}
            </div>
            <div>
              {/* <div>{idOfProperty}</div> */}
              <div>{item._fullName || "--"}</div>
              <div>{item._phoneNumber || "--"}</div>
              <div>{formatEther(item._price._hex) || "--"}</div>
              <div>{item._houseAddress || "--"}</div>
              <div>
                {item._currentOwner.slice(0, 5)}...{item._currentOwner.slice(-5)}
              </div>
              {/* <div>{item.approvement || "--"}</div> */}
              <div>{item._isAgency ? "agency" : "not an agency"}</div>
              {item._isRejected && (
                <div>
                  rejected reason
                  {/* <p>{item.rejectedReason || "--"}</p> */}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {(item._isApproved && !item._isTicketCreated && !item._isOnSell) && (
            <>
              <Button variant="primary" onClick={() => createTokenFunc()}>
                Create Token and approve NFT and Token to smart Contract
              </Button>
            </>
          )}
          {item._isPending && (
            <>
              <Button variant="warning" onClick={handleShow}>
                Your Property is Pending
              </Button>
            </>
          )}
          {item._isRejected && (
            <>
              <UpdateProperty item={item} />
            </>
          )}
          {(item._isApproved && item._isTicketCreated && !item._isOnSell) && (
            <>
              <Button variant="primary" onClick={() => putOnSellFunc()}>
                Put On Sell
              </Button>
            </>
          )}
          {(item._isApproved && item._isTicketCreated && item._isOnSell) && (
            <>
              <Button variant="success" onClick={handleShow}>
                Your Property is on sell
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyDetails;
