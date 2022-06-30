// import { useRouter } from "next/router";
// import ProfileDetails from "../../components/UserDashboard/ProfileDetails";
// import { useAuth } from "../../context/AuthContext";
// import { useSellRegistration } from "../../context/SellRegistrationContext";
// import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
// import { storage } from "../../firebase/config";

import React, { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { TermsAndConditions } from "./TermsAndConditions";
import { useAuth } from "../../../context/AuthContext";
import { useSellRegistration } from "../../../context/SellRegistrationContext";
import { storage } from "../../../firebase/config";

const RegisterToSellForm = () => {
  const { user, currentLoggedInUser, sellRequestsData } = useAuth();
  const { sellPropertyRegistration } = useSellRegistration();
  const router = useRouter();

  const [message, setMessage] = useState({isMessage: false , message: '' , color: ''});
  const [disabled, setDisabled] = useState(false);

  console.log({ currentLoggedInUser });

  // useEffect(() => {
  //   setDisabled(true)
  // } , [currentLoggedInUser])

  // states
  const [isAgency, setIsAgency] = useState();
  const [agencyName, setAgencyName] = useState();
  const [termsAndConditionsInput, setTermsAndConditionsInput] = useState(false)

  const [isCorporation, setIsCorporation] = useState();
  const [corporationName, setCorporationName] = useState("");
  const [notCorporationName, setNotCorporationName] = useState("");

  // const [profileImage, setProfileImage] = useState('')
  // const [passportImage, setPassportImage] = useState('')
  const [profileimagefrominput, setProfileimagefrominput] = useState("");
  const [passportimagefrominput, setPassportimagefrominput] = useState("");

  const handleOnProfileImg = (e) => {
    setProfileimagefrominput(e.target.files[0]);
  };

  const handleOnPassportImg = (e) => {
    setPassportimagefrominput(e.target.files[0]);
  };

  // all state values expcept some , they are written seperately
  const [inputValues, setInputValues] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    address: "",
  });

  // handle change for all except some - they are written seperatetly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // handle change for corporation
  const handleChangeOnIsCorporation = (e) => {
    if (e.target.value == "yes") {
      setIsCorporation(true);
      setNotCorporationName("");
    }
    if (e.target.value == "no") {
      setIsCorporation(false);
      setCorporationName("");
    }
  };

  const handleChangeOnIsAgency = (e) => {
    if (e.target.value == "yes") {
      setIsAgency(true);
    }
    if (e.target.value == "no") {
      setIsAgency(false);
      setAgencyName("");
    }
  };

  // handle change for corporation name
  const handleOnCorporationName = (e) => {
    if (isCorporation) {
      setCorporationName(e.target.value);
    }
  };

  // handle change for not corporation name
  const handleOnNotCorporationName = (e) => {
    if (!isCorporation) {
      setNotCorporationName(e.target.value);
    }
  };

  const handleOnisAgency = (e) => {
    if (isAgency) {
      setAgencyName(e.target.value);
    }
  };

  // handle on submitting form
  const HandleOnSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    setDisabled(true);
    const { firstName, lastName, age, email, dob, address, phoneNumber } =
      inputValues;
    console.log("inside function", sellRequestsData);

    console.log({ profileimagefrominput });
    console.log({ passportimagefrominput });
    // if(!termsAndConditionsInput){
    //   setDisabled(true);
    //   setError("Check Terms and conditions")
    //   return;
    // }

    if (
      (!profileimagefrominput,
      !passportimagefrominput,
      !firstName,
      !lastName,
      !age,
      !dob,
      !address,
      !phoneNumber,
      !corporationName && !notCorporationName),
      !termsAndConditionsInput
    ) {
      setMessage({isMessage: true , message: 'uncomplete form' , color: 'danger'});
      setDisabled(false);
    } else {
      setMessage({isMessage: true , message: 'Loading....' , color: 'warning'});
      try {
        const imageProfileRef = ref(
          storage,
          `sellerimgs/${user && user.email}/profilePicture`
        );

        sellRequestsData &&
          sellRequestsData.map((item) => {
            if (item.email === user.email) {
              setMessage({isMessage: true , message: 'Email ALready Exist , PLease Refresh your page' , color: 'warning'});
            } else {
              uploadBytes(imageProfileRef, profileimagefrominput).then(
                (snapshot) => {
                  getDownloadURL(snapshot.ref).then((url) => {
                    // console.log("url", url);
                    // setProfileImage(url);

                    var profileImage = url;

                    const imagePassportRef = ref(
                      storage,
                      `sellerimgs/${user && user.email}/passport`
                    );
                    uploadBytes(imagePassportRef, passportimagefrominput).then(
                      (snapshot) => {
                        getDownloadURL(snapshot.ref).then(async (url) => {
                          // console.log("url", url);
                          // setPassportImage(url);

                          var passportImage = url;

                          const corporationNameUrl = `https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResults/EntityName/${corporationName}/Page1?searchNameOrder=${corporationName.toUpperCase()}`;
                          const notCorporationNameUrl = `https://www.miamidade.gov/global/navigation/global-search.page?q=${notCorporationName}`;

                          await sellPropertyRegistration({
                            profileImage,
                            passportImage,
                            firstName,
                            lastName,
                            age,
                            email: user && user.email,
                            dob,
                            address,
                            phoneNumber,
                            isCorporation,
                            corporationName: corporationNameUrl,
                            notCorporationName: notCorporationNameUrl,
                            isAgency,
                            agencyName,
                            approvement: "pending",
                            role: "user",
                            rejectedReason: "",
                          });

                          setDisabled(false);
                          setMessage({isMessage: true , message: 'Registered Succesfully' , color: 'success'});


                          window.location.reload();
                        //   forceUpdate
                        });
                      }
                    );
                  });
                }
              );
            }
          });
      } catch (error) {
        console.log(error.message);
        setMessage({isMessage: true , message: error.message , color: 'danger'});
        setDisabled(false);
      }
    }
  };

  
  return (
    <div className="container">
      <form
        className="row justify-content-center py-1"
        onSubmit={HandleOnSubmit}
      >
        <h1
          className="text-start mb-3 text-center"
          style={{ fontSize: "60px", fontWeight: "1000" }}
        >
          Register To Sell Property
        </h1>

   
        <div className="col-8">
          {message.isMessage && <Alert variant={message.color}>{message.message}</Alert>}
          <div className="row mt-1">
            <div className="col-12 p-0 m-0 col-md-6">
              <label htmlFor="profileimagefrominput" className="form-label">
                Your Recent Photo
              </label>
              <input
                className="form-control form-control-md"
                id="profileimagefrominput"
                name="profileimagefrominput"
                type="file"
                onChange={handleOnProfileImg}
              />
            </div>

            <div className="col-12 p-0 m-0 col-md-6">
              <label htmlFor="passportImage" className="form-label">
                Passport Copy
              </label>
              <input
                className="form-control form-control-md"
                id="passportImage"
                name="passportImage"
                type="file"
                onChange={handleOnPassportImg}
              />
            </div>
          </div>
          <div className="row mt-1">
            <input
              placeholder="first name"
              className="col-6 rounded p-2 my-1"
              type="text"
              name="firstName"
              value={inputValues.firstName}
              onChange={handleInputChange}
            />
            <input
              placeholder="last name"
              className="col-6 rounded p-2 my-1"
              type="text"
              name="lastName"
              value={inputValues.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <input
              placeholder="Email"
              className="col-12 col-md-6 rounded p-2 my-1 disabled"
              type="email"
              name="email"
              value={user && user.email}
              onChange={handleInputChange}
            />
            <input
              placeholder="Phone Number"
              className="col-12 col-md-6 rounded p-2 my-1"
              type="number"
              name="phoneNumber"
              value={inputValues.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <input
              placeholder="Age"
              className="col-12 col-md-6 rounded p-2 my-1"
              type="number"
              name="age"
              value={inputValues.age}
              onChange={handleInputChange}
            />
            <input
              placeholder="dob"
              className="col-12 col-md-6 rounded p-2 my-1"
              type="date"
              data-date-format="DD MMMM YYYY"
              name="dob"
              value={inputValues.dob}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <input
              placeholder="address"
              type="text"
              className="col-12 p-2 my-1"
              name="address"
              value={inputValues.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <div className="col-12 px-3 mt-1">
              <div>Is the property registered under a corporation?</div>
              <span className="px-2">
                <input
                  onChange={handleChangeOnIsCorporation}
                  type="radio"
                  value="yes"
                  id="yescorporation"
                  name="corporation"
                />
                <label htmlFor="yescorporation" className="px-1">
                  Yes
                </label>
              </span>
              <span className="px-2">
                <input
                  onChange={handleChangeOnIsCorporation}
                  type="radio"
                  value="no"
                  id="nocorporation"
                  name="corporation"
                />
                <label htmlFor="nocorporation" className="px-1">
                  No
                </label>
              </span>
            </div>

            {isCorporation === true && (
              <input
                placeholder="Corporation Name"
                type="text"
                className="col-12 p-2 mb-2"
                name="corporationName"
                value={corporationName}
                onChange={handleOnCorporationName}
              />
            )}
            {isCorporation === false && (
              <input
                placeholder="not corporation"
                type="text"
                className="col-12 p-2 mb-2"
                name="corporationName"
                value={notCorporationName}
                onChange={handleOnNotCorporationName}
              />
            )}
          </div>

          <div className="row">
            <div className="col-12 px-3 mt-1">
              <div>Are you An Agency?</div>
              <span className="px-2">
                <input
                  onChange={handleChangeOnIsAgency}
                  type="radio"
                  value="yes"
                  id="yesagency"
                  name="agency"
                />
                <label htmlFor="yesagency" className="px-1">
                  Yes
                </label>
              </span>
              <span className="px-2">
                <input
                  onChange={handleChangeOnIsAgency}
                  type="radio"
                  value="no"
                  id="noagency"
                  name="agency"
                />
                <label htmlFor="noagency" className="px-1">
                  No
                </label>
              </span>
            </div>
          </div>

          <div className="row">
            {isAgency == true && (
              <input
                placeholder="Agency Name"
                type="text"
                className="col-12 p-2 mb-2"
                name="agencyName"
                value={agencyName}
                onChange={handleOnisAgency}
              />
            )}
          </div>

          <div className="row">
            <div>
            <input type="checkbox" checked={termsAndConditionsInput}  onChange={(e) => setTermsAndConditionsInput(e.target.checked)}/>
            <TermsAndConditions />
            </div>
          </div>
        </div>

        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn theme1-btn-color px-5 fs-3"
            disabled={disabled}
          >
            {disabled ? <Spinner animation="border" /> : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterToSellForm;
