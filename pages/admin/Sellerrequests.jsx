import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { GoPrimitiveDot } from "react-icons/go";
import { GrFormAdd } from "react-icons/gr";
import ProfileCard from "../../components/Dashboard/AdminDashBoard/ProfileCard";
import { useSellRegistration } from "../../context/SellRegistrationContext";
import { database } from "../../firebase/config";

export async function getServerSideProps(context) {
  const dababaseRef = collection(database, "sell Registration");
  const data = await getDocs(dababaseRef)

  return {
    props: {data: data.docs.map(doc => ({ ...doc.data(), id: doc.id }))}, // will be passed to the page component as props
  }
}

function Sellerrequests (props) {

  const [usersstage, setUsersstage] = useState("all");

  const pendingUsersFunc = () => {
    setUsersstage("pending");
  };
  const approvedUsersFunc = () => {
    setUsersstage("approved");
  };
  const RejectedUsersFunc = () => {
    setUsersstage("rejected");
  };
  return (
    <div className="container pt-5 ">
      <div className="row justify-content-center">
        <div className="col-6">
          <h2>Seller Requests</h2>
          <p>Lorem, ipsum dolor.s</p>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end">
          <Dropdown className="mx-1">
            <Dropdown.Toggle
              variant="light"
              className="btn theme1-btn-color py-3 rounded-pill fs-5 fw-bold"
              id="dropdown-basic"
            >
              Filter Users
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setUsersstage("all")}>
                All Users
              </Dropdown.Item>
              <Dropdown.Item onClick={() => pendingUsersFunc()}>
                Pending Users
              </Dropdown.Item>
              <Dropdown.Item onClick={() => approvedUsersFunc()}>
                Approved Users
              </Dropdown.Item>
              <Dropdown.Item onClick={() => RejectedUsersFunc()}>
                Rejected Users
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        {props.data.map((item, index) => {
            return (
              <>
                {usersstage == "all" && <ProfileCard key={index + Math.random()} data={item} />}
                {item.approvement == usersstage && <ProfileCard key={index + Math.random()} data={item} />}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Sellerrequests;
