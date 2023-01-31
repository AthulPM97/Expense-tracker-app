import Signup from "../components/Authentication/Signup";
import SignIn from "../components/Authentication/SignIn";
import { useState } from "react";
import "./SignupPage.css";

const SignUpPage = () => {
  //states
  const [isloginMode, setIsLoginMode] = useState(false);

  //handlers
  const modeChangeHandler = () => {
    setIsLoginMode((mode) => !mode);
  };
  return (
    <div>
      <header className="header">
        <h1>Expense Tracker</h1>
      </header>
      {!isloginMode && <Signup changeMode={modeChangeHandler} />}
      {isloginMode && <SignIn changeMode={modeChangeHandler} />}
    </div>
  );
};

export default SignUpPage;
