import React from "react";
import PropertyCard from "../components/Buy/PropertyCard";
import { useSellRegistration } from "../context/SellRegistrationContext";

const Buy = () => {
  const { allproperties } = useSellRegistration();

  return (
    <>
      <div className="container-fluid">
        <div className="row  mt-5 justify-content-center">
          {allproperties &&
            allproperties.map((item) => (
              <>
                {item._isApproved && (
                  <div className="col-11 col-md-6 col-lg-4">
                    <PropertyCard item={item}/>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
    </>
  );
};



export default Buy;
