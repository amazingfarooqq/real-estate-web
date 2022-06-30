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

const UserPropertyCard = ({ item, key }) => {
  const [imagesList, setImagesList] = useState([]);

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

  return (
    <div
      key={key}
      className="col-11 my-1 theme1-bg-color text-light rounded-pill py-4 px-5"
    >
      <div className="row d-flex align-items-center">
        {/* <div className="col-1 text-center">#{parseInt(item.id._hex, 16)}</div> */}
        <div className="col">{item._fullName}</div>
        <div className="col">${formatEther(item._price._hex)}</div>
        <div className="col">{item._houseAddress}</div>
        <div className="col">
          
          {(item._isApproved && !item._isTicketCreated && !item._isOnSell && !item._ticketBuyerInfo._buyerRequest) && (
            <>
              {item._ticketBuyerInfo._buyerRequest}
              <GoPrimitiveDot className="text-info" /> Approved
            </>
          )}
          {item._isPending && (
            <>
              <GoPrimitiveDot className="text-warning" /> Pending
            </>
          )}
          {item._isRejected && (
            <>
              <GoPrimitiveDot className="text-danger" /> Rejected
            </>
          )}
          {(item._isApproved && item._isTicketCreated && !item._isOnSell && !item._ticketBuyerInfo._buyerRequest) && (
            <>
              <GoPrimitiveDot className="text-success" /> Ticket Created
            </>
          )}
          {(item._isApproved && item._isTicketCreated && item._isOnSell && !item._ticketBuyerInfo._buyerRequest) && (
            <>
              <GoPrimitiveDot className="text-success" /> On Sell
            </>
          )}
          {(item._isApproved && item._isTicketCreated && !item._isOnSell && item._ticketBuyerInfo._buyerRequest) && (
            <>
              <GoPrimitiveDot className="text-success" /> Ticket Bought
            </>
          )}
        </div>

        <div className="col text-end">
          <UserPropertyDetails imagesList={imagesList} item={item} />
        </div>
      </div>
    </div>
  );
};

export default UserPropertyCard;
