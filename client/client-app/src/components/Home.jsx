import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home () {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/signup");
  }, 7000);
  
  return (
    <div className="home">
      <h1>Registration Loading</h1>
      <div className="spinner">
        <PropagateLoader size={20} color={"#b8de01"} />
      </div>
    </div>
  );
}

export default Home;