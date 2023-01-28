import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import SignUpPage from "./Pages/SignUpPage";
import CompleteProfile from "./Pages/CompleteProfile";
import ProfileDetails from "./Pages/ProfileDetails";
import Header from "./components/Header/Header";
import ForgotPw from "./Pages/ForgotPw";
import DailyExpenses from "./components/Expenses/DailyExpenses";

function App() {
  const auth = useSelector(state => state.auth);
  console.log(auth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <div>
      {isLoggedIn && <Header />}
      <Switch>
        <Route path="/" exact>
          {!isLoggedIn && <Redirect to="/login" />}
          {isLoggedIn && <Redirect to="/complete-profile" />}
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPw />
        </Route>
        {!isLoggedIn && (
          <Route path="/login">
            <SignUpPage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/complete-profile">
            <CompleteProfile />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/update-details">
            <ProfileDetails />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/daily-expenses">
            <DailyExpenses />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
