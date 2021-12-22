import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mood, { getMoodThunk } from "../store/mood";
import { ResponsiveCalendar } from "@nivo/calendar";
import Loader from "./Loader";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Calendar = () => {
  const moodKey = {
    awful: 1,
    bad: 2,
    meh: 3,
    good: 4,
    great: 5,
  };

  const [loaded, setLoaded] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear() + 1);
  const [month, setMonth] = useState(new Date().getMonth());

  const moods = useSelector((state) => state.mood);

  useState(() => {
    setLoaded(true);
  });

  const moodData = moods.map((mood) => {
    return {
      day: mood.date,
      mood: mood.mood,
      value: moodKey[mood.mood],
    };
  });

/**
 * This is a hack created to ensure the mood color is correct if there is only
 * one mood rendered so far.
 * Calendar heatmap component in D3.js renders based on proportion. For the
 * right color to appear, the calendar needs a base lowest value and a highest
 * value.
 * This change is ONLY on front end, the database is not affected.
 */

  moodData.push = {
    day: `${year+1000}-01-01`,
    mood: "awful",
    value: 1,
  }
  moodData.push = {
    day: `${year+1000}-01-02`,
    mood: "great",
    value: 5,
  }
  return !loaded ? (
    <Loader/>
  ) : (
    <div>
      <div
        className="calendar-legend-container"
        style={{ display: "flex", justifyContent: "center", gap: "2vh" }}
      >
        <button onClick={() => setYear(year - 1)}>Previous Year</button>
        <div
          className="calendar-legend-item"
          style={{ backgroundColor: "#F2223B" }}
        >
          awful
        </div>
        <div
          className="calendar-legend-item"
          style={{ backgroundColor: "#F8922F" }}
        >
          bad
        </div>
        <div
          className="calendar-legend-item"
          style={{ backgroundColor: "#50ABCE" }}
        >
          meh
        </div>
        <div
          className="calendar-legend-item"
          style={{ backgroundColor: "#85C428" }}
        >
          good
        </div>
        <div
          className="calendar-legend-item"
          style={{ backgroundColor: "#15B892" }}
        >
          great
        </div>
        <button onClick={() => setYear(year + 1)}>Next Year</button>
      </div>
      <div className='responsive-calendar-container' style={{ height: "50vh" }}>
        <ResponsiveCalendar
          className="responsive-calendar"
          data={moodData}
          from={year.toString()}
          to={year.toString()}
          height={300}
          // from={'2021-12-01'}
          // to={'2021-12-31'}
          emptyColor="#eeeeee"
          colors={["#F2223B", "#F8922F", "#50ABCE", "#85C428", "#15B892"]}
          minValue="auto"
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={70}
          monthBorderColor="#bfbfbf"
          dayBorderWidth={1}
          dayBorderColor="#ffffff"
          theme={{ fontSize: "16px" }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
          tooltip={function (e) {
            return (
              <div style={{ backgroundColor: "white", padding: "20px" }}>
                mood: {e.data.mood}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
