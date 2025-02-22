import "./App.css";
import { VotingProvider } from "../context/Voter.jsx";
import NavBar from "../components/Navbar/NavBar.jsx";

const App = () => (
  <VotingProvider>
    <div>
      <NavBar />
    </div>
  </VotingProvider>
);

export default App;
