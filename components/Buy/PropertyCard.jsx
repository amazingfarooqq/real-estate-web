import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSellRegistration } from "../../context/SellRegistrationContext";
import MessageBox from "../MessageBox/MessageBox";
import Image from "next/image";

import styles from "./../../styles/buy.module.css";

const PropertyCard = ({ item }) => {
  const { account } = useWeb3React();
  const { TetherTokenContract, RealEstateContract, RealEstateContractAddress } =
    useSellRegistration();

  console.log({ TetherTokenContract });

  const [message, setMessage] = useState({
    isMessage: false,
    message: "",
    color: "",
  });

  const buyPropertyTicket = async () => {
    setMessage({
      isMessage: true,
      message: "Buying Ticket Token",
      color: "warning",
    });

    try {
      const priceOfToken = "5000";

      const value = await TetherTokenContract.allowance(
        account,
        RealEstateContractAddress
      );

      const val = value.gt(0);

      if (val) {
        // await realEstateContract.buyProperty(_id, priceOfPropty , userInfo.phoneNumber.toString());
        await RealEstateContract.buyTicketToken(
          item.id,
          "full name",
          "03213213",
          priceOfToken
        );

        setMessage({
          isMessage: true,
          message: "Bought Ticket Token",
          color: "danger",
        });
      } else {
        const tx = await TetherTokenContract.approve(
          RealEstateContractAddress,
          priceOfToken
        );
        const receipt = await tx.wait();
        setMessage({
          isMessage: true,
          message: `${priceOfToken} usdt approved`,
          color: "danger",
        });

        const txx = await RealEstateContract.buyTicketToken(
          item.id,
          "full name",
          "03213213",
          priceOfToken
        );

        await txx.wait();

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      if (error.reason) {
        setMessage({ isMessage: true, message: error.reason, color: "danger" });
      } else {
        setMessage({
          isMessage: true,
          message: error.message,
          color: "danger",
        });
      }
    }
  };
  return (
    <>
      {message.isMessage && (
        <MessageBox message={message} setMessage={setMessage} />
      )}
      <div key={item.id} className={` p-2`}>
        <Image
          src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000"
          alt="image"
          className={styles["image"]}
        />
        <div className={styles["container1"]}>
          <span className={styles["text"]}>{item._fullName}</span>
          <span className={styles["text1"]}>{item._details}</span>
          <div>
            {item._isOnSell && (
              <button className={`btn btn-dark`} onClick={buyPropertyTicket}>
                {item.id} Buy Ticket
              </button>
            )}
            {item._buyerRequest && (
              <button
                className={`btn btn-dark disabled`}
                onClick={buyPropertyTicket}
              >
                Ticket Already Bought
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
