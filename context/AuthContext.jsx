import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
  
} from "firebase/auth";

import { auth, database } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  console.log({ user });

  const [sellRequestsData, setSellRequestsData] = useState();
  const [ownerData, setOwnerData] = useState();
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState();

  // console.log({ database });
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (USER) => {
      console.log({USER})
      if (USER) {
        if (router.pathname === "/userregistration") {
          router.push("/");
        }

        const {
          uid,
          email,
          displayName,
          phoneNumber,
          photoURL,
          emailVerified,
        } = USER;
        setUser({
          uid,
          email,
          displayName,
          phoneNumber,
          photoURL,
          emailVerified,
          USER
        });

        if(!emailVerified){
          console.log('not verified')
          setCurrentLoggedInUser(undefined);
        if(
          router.pathname == "/profile/properties" ||
          router.pathname == "/profile/registertosell" ||
          router.pathname == "/profile/deals" ||
          router.pathname == "/admin/sellerrequests" ||
          router.pathname == "/admin/properties"
        ){
            router.push('/')
        }
        } else {
          const dababaseRef = collection(database, "sell Registration");
          getDocs(dababaseRef)
            .then((res) => {
              setSellRequestsData(
                res.docs.map(doc => ({ ...doc.data(), id: doc.id }))
              );
  
              res.docs.map((doc) => {
                if (doc.data().email == email) {

                  if (doc.data().role == "owner") {
                    if(
                      router.pathname == "/profile/properties" ||
                      router.pathname == "/profile/registertosell" ||
                      router.pathname == "/profile/deals"
                    ){
                        router.push('/admin/properties')
                    }
                  }
                  
                  if (doc.data().role == "user") {

                    if(doc.data().approvement == 'pending'){
                      if(
                        router.pathname == "/profile/properties" ||
                        router.pathname == "/profile/deals"
                      ){
                          router.push('/profile/registertosell')
                      }
                    }
                    if(
                      router.pathname == "/admin/properties" ||
                      router.pathname == "/admin/sellerrequests"
                    ){
                        router.push('/profile/properties')
                    }
                  }
                  // console.log("doc.data().email", doc.data().email);
                  setCurrentLoggedInUser({ ...doc.data(), id: doc.id });
                }
              });
  
              res.docs.map((doc) => {
                if (doc.data().role == "owner") {
                  setOwnerData({ ...doc.data(), id: doc.id });
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }


      } else {

        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateProfileData = async () => {
    let { user } = await signInAnonymously(auth);
    return updateProfile(user, { displayName: "farooq" });
  };

  const resetPassword = async (emailAddress) => {
    return sendPasswordResetEmail(auth, emailAddress);
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((user) => {
        router.push("/");
        const { uid, email, displayName, photoURL, emailVerified } = user.user;
        setUser({ uid, email, displayName, photoURL, emailVerified });
      })
      .catch((error) => {
        console.log("signInWithGoogle", error);
      });
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.log("logout", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        signInWithGoogle,
        updateProfileData,
        resetPassword,
        sellRequestsData,
        ownerData,
        currentLoggedInUser,
        setCurrentLoggedInUser,
        setOwnerData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
