const React = require("react");
import history from "../history";
import "./LandingPage.css";
// import sunrise from "../../public/assets/sunrise.png";

const LandingPage = () => {
  function handleLanding(){
    history.push('/login');
  }
  return (
    <div className="landing-page-container">
      <div className="landing-page-text-content">
        <header className="landing-page-header">
          <h1 className="welcome-tag">Welcome!</h1>
          <p>Record your mood, see your trends. Reflect on yourself.</p>
        </header>
        <div className="landing-page-promo">
          <div className="landing-page-button-container">
            <button className='welcome-button' onClick={handleLanding}>Click Here to get Started</button>
          </div>
        </div>

      </div>
      <div className="landing-page-promo">
        <img src="sunrise.png" alt="sunrise" />
      </div>
    </div>
  );
};

export default LandingPage;
