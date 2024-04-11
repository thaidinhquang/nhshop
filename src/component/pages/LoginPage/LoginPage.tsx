import { useContext, useEffect } from "react";
import SigninForm from "./SigninForm";
import { UserContext } from "../../contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.active) {
      navigate("/");
    }
  }),
    [user];


  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <SigninForm />
      </div>
  
    </>
  );
};

export default LoginPage;
