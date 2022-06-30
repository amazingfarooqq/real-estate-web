import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
import { GrFormAdd } from "react-icons/gr";
import AddPropertyForm from "../../components/Dashboard/UserDashboard/AddPropertyForm";
import UserPropertyCard from "../../components/Dashboard/UserDashboard/UserPropertyCard";
import { useAuth } from "../../context/AuthContext";
import { useSellRegistration } from "../../context/SellRegistrationContext";

const Properties = () => {
  const { currentLoggedInUser } = useAuth();
  const { allproperties } = useSellRegistration();
  const router = useRouter();
  const { account } = useWeb3React();

  const [propertyform, setPropertyform] = useState(true);

  const [propertyStatus, setPropertyStatus] = useState("all");

  return (
    <>
      <AddPropertyForm
        setPropertyform={setPropertyform}
        propertyform={propertyform}
      />

      <div className="container pt-5  ">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <h2>Properties</h2>
                {propertyStatus === "all" && (
                  <>
                    <GoPrimitiveDot className="text-success" /> All Properties
                  </>
                )}
                {propertyStatus === "pending" && (
                  <>
                    <GoPrimitiveDot className="text-warning" /> Pending
                    Properties
                  </>
                )}
                {propertyStatus === "approved" && (
                  <>
                    <GoPrimitiveDot className="text-info" /> Approved Properties
                  </>
                )}
                {propertyStatus === "rejected" && (
                  <>
                    <GoPrimitiveDot className="text-danger" /> Rejected
                    Properties
                  </>
                )}
                {propertyStatus === "approvedandticketCreated" && (
                  <>
                    <GoPrimitiveDot className="text-success" /> Ticket Created
                  </>
                )}
                {propertyStatus === "onsell" && (
                  <>
                    <GoPrimitiveDot className="text-success" /> On Sell
                    Properties
                  </>
                )}
                {propertyStatus === "ticketBought" && (
                  <>
                    <GoPrimitiveDot className="text-success" /> Ticket Bought Properties
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
                    <Dropdown.Item onClick={() => setPropertyStatus("all")}>
                      All Properties
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPropertyStatus("pending")}>
                      Pending Properties
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setPropertyStatus("approved")}
                    >
                      Approved Properties
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setPropertyStatus("rejected")}
                    >
                      Rejected Properties
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setPropertyStatus("approvedandticketCreated")
                      }
                    >
                      Tickets Created
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPropertyStatus("onsell")}>
                      On Sell
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setPropertyStatus("approvedandticketCreated")
                      }
                    >
                      Tickets Created
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPropertyStatus("ticketBought")}>
                      Ticket Bought
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <button
                  className="btn theme1-btn-color py-3 rounded-pill fs-5 fw-bold"
                  onClick={() => setPropertyform(false)}
                >
                  <GrFormAdd className="bg-light rounded-circle fs-5 " /> New
                  Property
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          {allproperties &&
            allproperties.map((item, index) => {
              return (
                <>


                  {item._currentOwner == account && (
                    <>
                      {propertyStatus == "all" && (
                        <UserPropertyCard key={index + Math.random()} item={item} />
                      )}
                      {propertyStatus == "pending" && 
                        item._isPending && (
                        <UserPropertyCard key={index + Math.random()} item={item} />
                      )}
                      {propertyStatus == "approved" && 
                        (item._isApproved && !item._isTicketCreated && !item._isOnSell && !item._ticketBuyerInfo._buyerRequest) && (
                        <UserPropertyCard key={index + Math.random()} item={item} />
                      )}
                      {propertyStatus == "rejected" && 
                        item._isRejected && (
                        <UserPropertyCard key={index + Math.random()} item={item} />
                      )}
                      {propertyStatus == "approvedandticketCreated" &&
                        ((item._isApproved && item._isTicketCreated && !item._isOnSell && !item._ticketBuyerInfo._buyerRequest)) && (
                          <UserPropertyCard key={index + Math.random()} item={item} />
                        )}
                      {propertyStatus == "onsell" && 
                        ((item._isApproved && item._isTicketCreated && item._isOnSell && !item._ticketBuyerInfo._buyerRequest)) && (
                        <UserPropertyCard key={index + Math.random()} item={item} />
                      )}
                      {propertyStatus == "ticketBought" && 
                        ((item._isApproved && item._isTicketCreated && !item._isOnSell && item._ticketBuyerInfo._buyerRequest)) && (
                        <UserPropertyCard key={index + Math.random()} item={item} />
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

export default Properties;
