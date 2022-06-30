import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
import { GrFormAdd } from "react-icons/gr";
import AdminPropertyCard from "../../components/Dashboard/AdminDashBoard/AdminPropertyCard";
// import AddPropertyForm from "../../components/Dashboard/UserDashboard/AddPropertyForm";
import { useSellRegistration } from "../../context/SellRegistrationContext";

function Properties () {

  const { RealEstateContract, allproperties } = useSellRegistration();

  const [propertyStatus, setPropertyStatus] = useState("all");

  return (
    <>
      {/* <AddPropertyForm
        setPropertyform={setPropertyform}
        propertyform={propertyform}
      /> */}

      <div className="container pt-5  ">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <h2>Properties {RealEstateContract ? "loading" : "done"} </h2>
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
              </div>

              <div className="col-6 d-flex align-items-center justify-content-end">
                <Dropdown className="mx-1">
                  <Dropdown.Toggle
                    variant="light"
                    className="btn theme1-btn-color py-3 rounded-pill fs-5 fw-bold"
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
                  {propertyStatus == "all" && (
                    <AdminPropertyCard key={index + Math.random()} item={item} />
                  )}
                  {propertyStatus == "pending" && item._isPending && (
                    <AdminPropertyCard key={index + Math.random()} item={item} />
                  )}
                  {propertyStatus == "approved" && item._isApproved && (
                    <AdminPropertyCard key={index + Math.random()} item={item} />
                  )}
                  {propertyStatus == "rejected" && item._isRejected && (
                    <AdminPropertyCard key={index + Math.random()} item={item} />
                  )}
                  {propertyStatus == "approvedandticketCreated" && item._isTicketCreated && (
                    <AdminPropertyCard key={index + Math.random()} item={item} />
                  )}
                  {propertyStatus == "onsell" && item._onSell && (
                    <AdminPropertyCard key={index + Math.random()} item={item} />
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
