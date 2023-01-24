import SignUpPage from "./Pages/SignUpPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        
      <Route path="/login" element={<SignUpPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
