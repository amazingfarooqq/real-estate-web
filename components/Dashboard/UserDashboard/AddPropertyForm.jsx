import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import styles from "../../../styles/AddPropertyForm.module.css";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../../context/AuthContext";
import { useSellRegistration } from "../../../context/SellRegistrationContext";
import { storage } from "../../../firebase/config";
import { IntegrationWallets } from "./../../Wallets/IntegrationWallets";

const AddPropertyForm = ({ setPropertyform, propertyform }) => {
  const { currentLoggedInUser } = useAuth();
  const { RealEstateContract } = useSellRegistration();
  const { active, account, activate, deactivate } = useWeb3React();

  const [images, setImages] = useState(null);
  const [imagesList, setImagesList] = useState([]);

  // console.log({ images });

  const [message, setMessage] = useState({
    isMessage: false,
    message: "",
    color: "",
  });

  const [inputValues, setInputValues] = useState({
    fullName: "",
    phoneNumber: "",
    price: "",
    houseAddress: "",
    details: "",
  });

  const handleOnChange = (e) => {
    if (e.target.files) {
      setImages([...e.target.files]);
      e.target.files = null;
    } else {
      const { name, value } = e.target;
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    }
  };

  const addPropertyFunc = async () => {
    try {
      setMessage({
        isMessage: true,
        message: "loading",
        color: "warning",
      });
      setImagesList([]);

      console.log({ RealEstateContract });


      await images.map((item) => {
        const imageRef = ref(
          storage,
          `properties/${item.id}-${currentLoggedInUser.email}/${item.name + uuidv4()}`
        );
        uploadBytes(imageRef, item).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImagesList((prev) => [...prev, url]);
          });
        });
      });


      const { fullName, phoneNumber, price, houseAddress, details } = inputValues;
      const priceInWei = `${price}000000000000000000`

      // uint _price, bool _isAgency, string memory _fullName, string memory _phoneNumber,
      // string memory _details, string memory _houseAddress, string memory _pictures
      const tx = await RealEstateContract.addProperty(
        priceInWei,
        currentLoggedInUser.isAgency,
        fullName,
        phoneNumber,
        details,
        houseAddress,
        `${1}-${currentLoggedInUser.email}`,
      );
      await tx.wait();
      window.location.reload();
      setMessage({
        isMessage: true,
        message: "property Added",
        color: "success",
      });
    } catch (error) {
      console.log(error);
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
        className={`${styles.layer} ${propertyform && styles.animationOnLayer}`}
      ></div>
      <div
        className={`container-fluid text-light  ${
          styles.addingpropertyform
        } theme1-bg-color ${propertyform && styles.animationOnForm}`}
      >
        <div className="row mt-5 justify-content-center">
          <div className="col-11">
            <h5 className="mx-1 fs-3">Add New Property</h5>
          </div>

          <div className="col-11 mt-2">
            {message.isMessage && (
              <Alert variant={message.color}> {message.message} </Alert>
            )}
            <input
              className={`w-100 mx-1  ${styles.inputForForm} bg-light px-2 py-2 rounded`}
              placeholder="First Name"
              type="text"
              name="fullName"
              value={inputValues.fullName}
              onChange={handleOnChange}
            />
          </div>

          <div className="col-11 mt-2">
            <input
              className={`w-100 mx-1  ${styles.inputForForm} bg-light px-2 py-2 rounded`}
              placeholder="Enter Phone Number"
              type="number"
              name="phoneNumber"
              value={inputValues.phoneNumber}
              onChange={handleOnChange}
            />
          </div>

          <div className="col-11 mt-2">
            <input
              className={`w-100 mx-1  ${styles.inputForForm} bg-light px-2 py-2 rounded`}
              placeholder="Enter Property Price"
              type="number"
              name="price"
              value={inputValues.price}
              onChange={handleOnChange}
            />
          </div>

          <div className="col-11 my-2">
            <input
              className={`w-100 mx-1  ${styles.inputForForm} bg-light px-2 py-2 rounded`}
              placeholder="Enter House Address"
              type="text"
              name="houseAddress"
              value={inputValues.houseAddress}
              onChange={handleOnChange}
            />
          </div>

          <div className="col-11 my-2">
            <input
              multiple
              className={`w-100 mx-1  ${styles.inputForForm} bg-light px-2 py-2 rounded`}
              type="file"
              onChange={handleOnChange}
            />
          </div>

          <div className="col-11 mt-2">
            <textarea
              rows="5"
              cols="50"
              className={`w-100 mx-1  ${styles.inputForForm} bg-light px-2 py-2 rounded`}
              placeholder="Enter Property Details"
              type="text"
              name="details"
              value={inputValues.details}
              onChange={handleOnChange}
            ></textarea>
          </div>

          <div className="col-11 text-end">
            <button
              className="mx-1 btn btn-light rounded-pill px-3 py-2"
              onClick={() => setPropertyform(true)}
            >
              Cancel
            </button>
            {active ? (
              <button
                className="btn theme1-btn-color rounded-pill px-3 py-2"
                onClick={addPropertyFunc}
              >
                Submit Form
              </button>
            ) : (
              <IntegrationWallets />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPropertyForm;
