import SignUpPage from "./Pages/SignUpPage";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthContext from "./store/auth-context";
import CompleteProfile from "./Pages/CompleteProfile";
import { useContext } from "react";
import ProfileDetails from "./Pages/ProfileDetails";
import Header from "./components/Header/Header";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  return (
    <div>
      {authCtx.isLoggedIn && <Header/>}
        <Switch>
            <Route path="/" exact>
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
              {authCtx.isLoggedIn && <Redirect to="/complete-profile"/>}
            </Route>
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
