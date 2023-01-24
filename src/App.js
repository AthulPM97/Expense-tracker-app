import SignUpPage from "./Pages/SignUpPage";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthContext from "./store/auth-context";
import CompleteProfile from "./Pages/CompleteProfile";
import { useContext } from "react";
import ProfileDetails from "./Pages/ProfileDetails";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <div>
        <Switch>
          {!authCtx.isLoggedIn && (
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
          )}
          {!authCtx.isLoggedIn && (
            <Route path="/login">
              <SignUpPage />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/complete-profile">
              <CompleteProfile />
            </Route>
          )}
          {authCtx.isLoggedIn && (
            <Route path="/update-details">
              <ProfileDetails />
            </Route>
          )}
        </Switch>
    </div>
  );
}

export default App;
