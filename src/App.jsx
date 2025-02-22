import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Vcard from "../components/VoterCard/VoterCard.jsx";
import Ccard from "../components/CandidateCard/CandidateCard.jsx";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Decentralized Voting System</h1>
      <button onClick={() => navigate("/candidate")}>Candidate View</button>
      <button onClick={() => navigate("/voter")}>Voter View</button>
    </div>
  );
}

function Cview() {
  return (
    <div>
      <h2>Candidateviw</h2>
      <Ccard/>
    </div>
  );
}

// Voter view component
function Vview() {
  return (
    <div>
      <h2>Voterviw</h2>
      <Vcard/>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      {/* <h1>Welcome</h1>
      <p>
        2 buttons, candidate login and voter login. login is handeled by an
        operator at the booth. users may only view info at home
      </p>
      <Vcard />
      <Ccard /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidate" element={<Cview />} />
          <Route path="/voter" element={<Vview />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
