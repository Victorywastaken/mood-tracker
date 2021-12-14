import React, { useState } from "react";
import { useSelector } from "react-redux";
import MyResponsivePie from "./PieGraph";
import Calendar from "./Calendar";
import "./Stats.css";
import history from "../history";
import { BiArrowBack, BiCalendarEvent, BiPieChart } from "react-icons/bi";

const Stats = (props) => {
  const allMoods = useSelector((state) => state.mood);
  const [load, setLoad] = React.useState(false);
  const [chart, setChart] = React.useState('pie');

  useState(() => {
    setLoad(true);
  }, []);

  return load ? (
    <div className="all-stats-container">
      <div className="all-stats-screens">
        <div className="stats-button-container">
          <div>
            <button
              className="go-back-button"
              onClick={() => {
                history.push("/home");
              }}
            >
              <BiArrowBack />
            </button>
          </div>
          <div>
            <button
              className="go-back-button"
              onClick={() => {
                setChart('calendar');
              }}
            >
              <BiCalendarEvent />
            </button>
          </div>
          <div>
            <button
              className="go-back-button"
              onClick={() => {
                setChart('pie');
              }}
            >
              <BiPieChart />
            </button>
          </div>
        </div>
        {chart === 'pie' ? (
          <MyResponsivePie allMoods={allMoods} />
         ) : (
           <Calendar />
          )}
      </div>
    </div>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Stats;
