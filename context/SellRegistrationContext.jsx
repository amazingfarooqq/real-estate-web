import React, { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebase/config";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

import {
  PropertyTokenabi,
  RealEstateabi,
  TetherTokenabi,
  TicketTokenabi,
} from "./SmartContractabi";
import { useWeb3React } from "@web3-react/core";
import { Injected } from "../components/Wallets/Connectors";

const SellRegisterContext = createContext({});

export const useSellRegistration = () => useContext(SellRegisterContext);

export const SellRegisterContextProvider = ({ children }) => {
  const { activate } = useWeb3React();

  const TetherTokenContractAddress =
    "0x49FD292aC20BCf28945370B32f0580a06871B06B";
  const PropertyTokenContractAddress =
    "0x981A7D17908172e591085fE632F2749337874c3f";
  const TicketTokenContractAddress =
    "0x80d8962cbF5bC600596B53Aa7F214340a1a11A36";
  const RealEstateContractAddress =
    "0x63C437746DAea8c7E0A2398215479c6EA9b12C84";

  let provider;
  if (typeof window !== "undefined") {
    provider = new Web3Provider(window.ethereum).getSigner();
  } else {
    console.log("asdsad");
  }

  const TetherTokenContract = new ethers.Contract(
    TetherTokenContractAddress,
    TetherTokenabi,
    provider
  );
  const PropertyTokenContract = new ethers.Contract(
    PropertyTokenContractAddress,
    PropertyTokenabi,
    provider
  );
  const TicketTokenContract = new ethers.Contract(
    TicketTokenContractAddress,
    TicketTokenabi,
    provider
  );
  const RealEstateContract = new ethers.Contract(
    RealEstateContractAddress,
    RealEstateabi,
    provider
  );


  console.log({RealEstateContract});

  const [allproperties, setAllproperties] = useState([]);
  const [ticketBuyers, setTicketBuyers] = useState([])

  const fetchData = async () => {
    await activate(Injected);
    const propertyID = await RealEstateContract.PropertyID();

    const hextopropertyIdNum = parseInt(propertyID._hex, 16);

    let allpropertiesarr = [];

    for (let i = 1; i <= hextopropertyIdNum; i++) {

      const properties = await RealEstateContract.getProperties(i);
      const getPropertiesDetails = await RealEstateContract.getPropertyDetails(i);
      const _buyerRequest = await RealEstateContract.buyerRequest(i);
      const _isTicketTimeOver = await RealEstateContract.isTicketTimeOver(i);
      const _PropertyPricePaid = await RealEstateContract.PropertyPricePaid(i);
      const TicketBuyerInfo = await RealEstateContract.buyerInfo(i);
      const DealAccepted = await RealEstateContract.DealAccepted(i);

      allpropertiesarr.push({id: i , ...properties , ...getPropertiesDetails , _ticketBuyerInfo: {_buyerRequest , _isTicketTimeOver, _PropertyPricePaid ,...TicketBuyerInfo , DealAccepted } })

    }
    setAllproperties(allpropertiesarr);
  };

  console.log({ allproperties });

  useEffect(() => {
    fetchData();
  }, []);

  // console.log({ TetherTokenContract });
  // console.log({ RealEstateContract });

  const sellPropertyRegistration = (dataObject) => {
    const dababaseRef = collection(database, "sell Registration");
    return addDoc(dababaseRef, dataObject);
  };

  const updateSellerRequests = (id, updateDataObject) => {
    const fieldToEdit = doc(database, "sell Registration", id);
    return updateDoc(fieldToEdit, updateDataObject);
  };

  return (
    <SellRegisterContext.Provider
      value={{
        sellPropertyRegistration,
        updateSellerRequests,
        TetherTokenContract,
        RealEstateContract,
        RealEstateContractAddress,
        PropertyTokenContract,
        TicketTokenContract,
        allproperties,
        ticketBuyers
      }}
    >
      {children}
    </SellRegisterContext.Provider>
  );
};
