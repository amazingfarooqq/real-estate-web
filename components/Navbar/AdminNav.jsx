import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminNav = () => {
  const { user, logout  ,currentLoggedInUser , setCurrentLoggedInUser , setOwnerData} = useAuth();

  const router = useRouter();

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-12 mt-4">
          <ul className="nav nav-tabs">
            {/* <li className="nav-item">
              <Link href="/admin/updateprofile">
                <a
                  className={`nav-link ${
                    router.pathname == "/admin/updateprofile" && "active"
                  }`}
                >
                  Update Profile
                </a>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link href="/admin/sellerrequests">
                <a
                  className={`nav-link ${
                    router.pathname == "/admin/sellerrequests" && "active"
                  }`}
                >
                  Seller Requests
                </a>
              </Link>
            </li>
            <li className="nav-item">
            <Link href="/admin/properties">
              <a
                className={`nav-link ${( (user && user.emailVerified) && (currentLoggedInUser && currentLoggedInUser.approvement == 'approved') ) ?
                  router.pathname == "/admin/properties" && "active" : "disabled"
                }`}
              >
                Properties
              </a>
            </Link>
          </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
