import Signup from "../components/Authentication/Signup";
import SignIn from "../components/Authentication/SignIn";
import { useState } from "react";

const SignUpPage = () => {
  const [isloginMode, setIsLoginMode] = useState(false);

  const modeChangeHandler = () => {
    setIsLoginMode(mode => !mode);
  };
  return <div>
    {!isloginMode && <Signup changeMode={modeChangeHandler}/>}
    {isloginMode && <SignIn changeMode={modeChangeHandler}/>}
    </div>;
};

export default SignUpPage;
