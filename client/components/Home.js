import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { logout } from "../store";
import "./Home.css";
import "./Calendar.css";
import moodColors from "../helpers/moodColors";
import { getMoodThunk } from "../store/mood";
import { getTodaysMoodThunk } from "../store/singleMood";
import { getTodaysActivityThunk } from "../store/singleActivity";
import history from "../history";
import Loader from "./Loader";

const currentDate = new Date();

console.log(currentDate);
export const Home = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.id);
  const allMoods = useSelector((state) => state.mood);
  let currentMood = useSelector((state) => state.singleMood);
  const currentActivity = useSelector((state) => state.singleActivity);
  const username = useSelector((state) => state.auth.username);

  const [color, setColor] = React.useState(currentMood.mood) || "";
  const [date, setDate] = React.useState("");
  const [load, setLoad] = React.useState(false);

  //why is the date the date of tomorrow?
  console.log(date);


  useEffect(() => {
    dispatch(getMoodThunk(isLoggedIn));
    dispatch(getTodaysMoodThunk(isLoggedIn));
    dispatch(getTodaysActivityThunk(isLoggedIn));
    setColor(currentMood?.mood);
    setDate(currentDate.toISOString().slice(0, 10));
    setLoad(true);
  }, [isLoggedIn]);

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date();
  let day = date.slice(8, 10);
  let name = month[date.slice(5, 7) - 1];

  if (allMoods.length > 0) {
    currentMood = allMoods.find((mood) => mood.date === date) || [];
  }

  const DateContainer = () => {
    return currentMood?.mood ? (
      <div className={`date-container ${currentMood.mood}`}>
        <h1 className="day">{day}</h1>
        <p>{name}</p>
      </div>
    ) : (
      <div className="date-container">
        <h1 className="day">{day}</h1>
        <p>{name}</p>
      </div>
    );
  };

  const moodCheck = (date) => {
    let isoDate = date.toISOString().slice(0, 10);
    for (let i = 0; i < allMoods.length; i++) {
      if (allMoods[i].date === isoDate) {
        return `${allMoods[i].mood}-calendar`;
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return load ? (
    <div className="home-container">
      <header className={`status-screen ${currentMood?.mood}-background`}>
        <DateContainer />
        <div className="mood-container">
          <h1>{currentMood?.mood || 'None'}</h1>
          {!currentMood?.description ? (
            <p>You didn't write an entry for today.</p>
          ) : (
            <p>{currentMood?.description}</p>
          )}
        </div>
      </header>
      <div className="calendar-screen">
        <div className="calendar-container">
          <Calendar
            calendarType="US"
            onChange={(date) => setDate(date.toISOString().slice(0, 10))}
            tileClassName={({ date }) => {
              return moodCheck(date);
            }}
          />
          <div className={`stats-container`}>
            <button
              className={`stats-button ${currentMood?.mood}`}
              onClick={() => history.push("/stats")}
            >
              See Stats
            </button>
          </div>
        </div>
      </div>
      <div className="logout-container">
        <a href="#" onClick={handleLogout}>
          Log out
        </a>
      </div>
    </div>
  ) : (
    <Loader/>
  );
};

export default Home;
