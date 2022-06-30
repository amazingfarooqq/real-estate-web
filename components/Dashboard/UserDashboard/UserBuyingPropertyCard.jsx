import React, { useEffect } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import UserPropertyDetails from "./UserPropertyDetails";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useState } from "react";
import { storage } from "../../../firebase/config";
import { formatEther } from "ethers/lib/utils";
import { Button } from "react-bootstrap";
import { useSellRegistration } from "../../../context/SellRegistrationContext";
import MessageBox from "../../MessageBox/MessageBox";
import { useWeb3React } from "@web3-react/core";

const UserPropertyCard = ({ item, key }) => {
  const [imagesList, setImagesList] = useState([]);

  const { account } = useWeb3React();

  const { RealEstateContract, TetherTokenContract, RealEstateContractAddress } =
    useSellRegistration();
  console.log(parseInt(item._price._hex, 16));

  const [message, setMessage] = useState({
    isMessage: false,
    message: "",
    color: "",
  });

  useEffect(() => {
    const propertyImageRef = ref(storage, `properties/${item.pictures}/`);

    listAll(propertyImageRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImagesList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const buyPropertyToken = async () => {
    setMessage({
      isMessage: true,
      message: "Buying Property....",
      color: "warning",
    });

    try {
      const value = await TetherTokenContract.allowance(
        account,
        RealEstateContractAddress
      );

      const val = value.gt(0);

      if (val) {
        // await realEstateContract.buyProperty(_id, priceOfPropty , userInfo.phoneNumber.toString());
        const priceOfProperty =
          parseInt(formatEther(item._price._hex)) + "000000000000000000";
        const txx = await RealEstateContract.buyPropertyToken(
          item.id,
          priceOfProperty
        );
        setMessage({
          isMessage: true,
          message: "Bought Property Token",
          color: "success",
        });

        await txx.wait();
      } else {
        const priceOfProperty =
          parseInt(formatEther(item._price._hex)) + "000000000000000000";

        const tx = await TetherTokenContract.approve(
          RealEstateContractAddress,
          priceOfProperty
        );
        const receipt = await tx.wait();
        setMessage({
          isMessage: true,
          message: `${priceOfProperty} usdt approved`,
          color: "warning",
        });

        const txx = await RealEstateContract.buyPropertyToken(
          item.id,
          priceOfProperty
        );
        setMessage({
          isMessage: true,
          message: "Bought Property Token",
          color: "success",
        });

        await txx.wait();

        window.location.reload();
      }
    } catch (error) {
      setMessage({
        isMessage: true,
        message: error.message,
        color: "danger",
      });
    }
  };

  return (
    <>
      <div
        key={key}
        className="col-11 my-1 theme1-bg-color text-light rounded-pill py-4 px-5"
      >
        {message.isMessage && (
          <MessageBox message={message} setMessage={setMessage} />
        )}
        <div className="row d-flex align-items-center">
          {/* <div className="col-1 text-center">#{parseInt(item.id._hex, 16)}</div> */}
          <div className="col">{item._ticketBuyerInfo.fullName}</div>
          <div className="col">{item._ticketBuyerInfo.phoneNumber}</div>
          <div className="col">{item._houseAddress}</div>
          <div className="col">
            {item._isApproved &&
              item._isTicketCreated &&
              !item._isOnSell &&
              item._ticketBuyerInfo._buyerRequest && (
                <>
                  <GoPrimitiveDot className="text-success" /> Ticket photo
                </>
              )}
          </div>

          <div className="col text-end">
            {item._isApproved &&
              item._isTicketCreated &&
              !item._isOnSell &&
              item._ticketBuyerInfo._buyerRequest &&
              !item._ticketBuyerInfo._PropertyPricePaid && (
                <button className="btn btn-success" onClick={buyPropertyToken}>
                  Buy Property Token
                </button>
              )}
            {item._isApproved &&
              item._isTicketCreated &&
              !item._isOnSell &&
              item._ticketBuyerInfo._buyerRequest &&
              item._ticketBuyerInfo._PropertyPricePaid && (
                <button className="btn btn-warning">
                  Pending To be Accepted
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPropertyCard;
