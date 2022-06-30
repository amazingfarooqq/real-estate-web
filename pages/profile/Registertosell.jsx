import ProfileDetails from "../../components/Dashboard/UserDashboard/UserProfileDetails";
import RegisterToSellForm from "../../components/Dashboard/UserDashboard/RegisterToSellForm";
import { useAuth } from "../../context/AuthContext";


const Registertosell = () => {
  const { currentLoggedInUser  } = useAuth();

  return (
    <>
      {currentLoggedInUser ? (
        <>
          <ProfileDetails item={currentLoggedInUser} />
        </>
      ) : (
        <RegisterToSellForm />
      )}
    </>
  );
};

export default Registertosell;
