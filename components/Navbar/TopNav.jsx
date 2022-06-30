import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { IntegrationWallets } from "../Wallets/IntegrationWallets";
import { useEffect, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import { sendEmailVerification } from "firebase/auth";
import Image from 'next/image'

const TopNav = () => {
  const [verifyEmailState, setVerifyEmailState] = useState("");

  const {
    user,
    logout,
    currentLoggedInUser,
    setCurrentLoggedInUser,
    setOwnerData,
  } = useAuth();
  const { active, account, chainId, deactivate } = useWeb3React();

  console.log({ currentLoggedInUser });

  const router = useRouter();

  const [userDetailsNav, setUserDetailsNav] = useState(false);

  const verifyEmailbtn = async () => {
    await sendEmailVerification(user.USER)
      .then((res) =>
        setVerifyEmailState(`Email Send to your Email: ${user.email}`)
      )
      .catch((err) =>
        setVerifyEmailState(
          `Error Sending an Email to: ${user.email} , Please Try Again after some time`
        )
      );
  };

  const logoutFunc = () => {
    setUserDetailsNav(false);
    setCurrentLoggedInUser();
    setOwnerData();
    logout();
  };

  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="sticky-top">
      {user && !user.emailVerified && (
        <div className="btn btn-primary py-0 w-100">
          {verifyEmailState ? verifyEmailState : "verify your email please"}
        </div>
      )}

      <Navbar className="theme1-bg-color sticky-top" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" className="text-light p-0 m-0">
            <Link href="/">
              <Image
                width={50}
                className="h-100 p-0 m-0"
                src="./../images/logo2.png"
                alt="NFT MARKET PLACE"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse className="justify-content-end " id="navbarScroll">
            <Nav className="my-2 mr-4 my-lg-0 d-flex align-items-center">
              <span className="mx-2">
                <Link href="/">
                  <a className="btn text-light">Home</a>
                </Link>
              </span>
              <span className="mx-2">
                <Link href="/buy">
                  <a className="btn text-light">Buy</a>
                </Link>
              </span>
              <span className="mx-2">
                <Link href="/contactus">
                  <a className="btn text-light">Contact us</a>
                </Link>
              </span>
              <span className="mx-2">
                <Link href="/aboutus">
                  <a className="btn text-light">About us</a>
                </Link>
              </span>

              {active ? (
                <button
                  className="btn theme1-btn-color"
                  title="Disconnect From Wallet"
                  onClick={disconnect}
                >{`${account.slice(0, 5)}...${account.slice(-5)}`}</button>
              ) : (
                <IntegrationWallets />
              )}
              {user ? (
                <button
                  className="btn text-light"
                  onClick={() => setUserDetailsNav(!userDetailsNav)}
                >
                  <Image
                    className="rounded-circle"
                    width={40}
                    src={
                      user &&
                      (user.photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3g5r1iS7W3jM-aayc__ZRxzjVhHU04yYMlQ&usqp=CAU")
                    }
                    alt=""
                  />
                  <BsArrowDown className="p-0 m-0 fw-bold" />
                </button>
              ) : (
                <Link href="/userregistration">
                  <a className="btn text-light">Login→</a>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {userDetailsNav && (
        <div
          style={{
            position: "fixed",
            right: "30px",
            width: "180px",
            zIndex: "1111",
            backgroundColor: "white",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            borderRadius: "6px",
            marginTop: "-7px",
          }}
          className="border"
        >
          <div className="w-100 text-center py-2" title={user.email}>
            <Image
              className="rounded-circle"
              width={40}
              src={
                user &&
                (user.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3g5r1iS7W3jM-aayc__ZRxzjVhHU04yYMlQ&usqp=CAU")
              }
              alt=""
            />
          </div>

          {user && user.emailVerified ? (
            <>
              {!currentLoggedInUser && (
                <Link href="/profile/registertosell">
                  <a
                    className="btn btn-light w-100 text-start"
                    onClick={() => setUserDetailsNav(false)}
                  >
                    Registeration Form
                  </a>
                </Link>
              )}
              {currentLoggedInUser &&
                currentLoggedInUser.role == "user" &&
                currentLoggedInUser.approvement == "pending" && (
                  <Link href="/profile/registertosell">
                    <a
                      className="btn btn-light w-100 text-start"
                      onClick={() => setUserDetailsNav(false)}
                    >
                      Profile Data
                    </a>
                  </Link>
                )}

              {currentLoggedInUser && currentLoggedInUser.role == "owner" && (
                <>
                  <Link href="/admin/sellerrequests">
                    <a
                      className="btn btn-light w-100 text-start"
                      onClick={() => setUserDetailsNav(false)}
                    >
                      Sellers Requests
                    </a>
                  </Link>
                  <Link href="/admin/properties">
                    <a
                      className="btn btn-light w-100 text-start"
                      onClick={() => setUserDetailsNav(false)}
                    >
                      Property Requests
                    </a>
                  </Link>
                </>
              )}

              {currentLoggedInUser &&
                currentLoggedInUser.approvement == "approved" &&
                currentLoggedInUser.role == "user" && (
                  <>
                    <Link href="/profile/registertosell">
                      <a
                        className="btn btn-light w-100 text-start"
                        onClick={() => setUserDetailsNav(false)}
                      >
                        Profile Data
                      </a>
                    </Link>
                    <Link href="/profile/properties">
                      <a
                        className="btn btn-light w-100 text-start"
                        onClick={() => setUserDetailsNav(false)}
                      >
                        Your Properties
                      </a>
                    </Link>
                  </>
                )}
            </>
          ) : (
            <button
              className="btn btn-light w-100 text-start"
              onClick={() => verifyEmailbtn()}
            >
              Verify Your Email
            </button>
          )}

          <button
            className="btn btn-light border-top w-100 text-start"
            onClick={logoutFunc}
          >
            Logout
          </button>
        </div>
      )}

      {router.pathname == "/profile/updateprofile" ||
      router.pathname == "/profile/properties" ||
      router.pathname == "/profile/registertosell" ||
      router.pathname == "/profile/deals" ||
      router.pathname == "/admin/sellerrequests" ||
      router.pathname == "/admin/updateprofile" ||
      router.pathname == "/admin/properties" ? (
        <>
          {currentLoggedInUser && currentLoggedInUser.role == "owner" ? (
            <AdminNav />
          ) : (
            <UserNav />
          )}
        </>
      ) : null}
    </div>
  );
};

export default TopNav;
