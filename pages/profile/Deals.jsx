import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
import UserBuyingPropertyCard from "../../components/Dashboard/UserDashboard/UserBuyingPropertyCard";
import { useAuth } from "../../context/AuthContext";
import { useSellRegistration } from "../../context/SellRegistrationContext";

const Deals = () => {
  const { currentLoggedInUser } = useAuth();
  const { allproperties } = useSellRegistration();
  const router = useRouter();
  const { account } = useWeb3React();

  const [propertyStatus, setPropertyStatus] = useState("ticketBought");

  return (
    <>
      <div className="container pt-5  ">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <h2>Properties</h2>
                {propertyStatus === "ticketBought" && (
                  <>
                    <GoPrimitiveDot className="text-success" /> Ticket Bought
                    Properties
                  </>
                )}
                {propertyStatus === "PropertyPricePaid" && (
                  <>
                    <GoPrimitiveDot className="text-success" /> Bought
                    Properties
                  </>
                )}
              </div>

              <div className="col-5 d-flex align-items-center justify-content-end">
                <Dropdown className="mx-1">
                  <Dropdown.Toggle
                    variant="light"
                    className="btn btn-light py-3 rounded-pill fw-bold"
                    id="dropdown-basic"
                  >
                    Filter Properties
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => setPropertyStatus("ticketBought")}
                    >
                      Ticket Bought
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setPropertyStatus("PropertyPricePaid")}
                    >
                      Bought Properties
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          {allproperties &&
            allproperties.map((item, index) => {
              return (
                <>
                  {item._ticketBuyerInfo.buyerAddress == account && (
                    <>
                      {propertyStatus == "ticketBought" &&
                        item._isApproved &&
                        item._isTicketCreated &&
                        !item._isOnSell &&
                        item._ticketBuyerInfo._buyerRequest &&
                        !item._ticketBuyerInfo._PropertyPricePaid && (
                          <UserBuyingPropertyCard key={index} item={item} />
                        )}
                      {propertyStatus == "PropertyPricePaid" &&
                        item._isApproved &&
                        item._isTicketCreated &&
                        !item._isOnSell &&
                        item._ticketBuyerInfo._buyerRequest &&
                        item._ticketBuyerInfo._PropertyPricePaid && (
                          <UserBuyingPropertyCard key={index} item={item} />
                        )}
                    </>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Deals;
