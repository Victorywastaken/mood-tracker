import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addActivitiesThunk } from "../store/activities";
import "./Activities.css";
import history from "../history";

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activitiesCategory);
  const todaysActivities = useSelector((state) => state.singleActivity);
  const [checkedState, setCheckedState] =
    useState(new Array(activities.length).fill(false)) || [];

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const handleSubmit = () => {
    let activityData = [];
    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i]) {
        activityData.push({ name: activities[i].name });
      }
    }

    let activityObject = {
      activities: activityData,
    };

    dispatch(addActivitiesThunk(activityObject));
    history.push("/home");
  };

  const handleSkip = () => {
    history.push("/home");
  }

  return (
    <div className="activities-container">
      <div className="activities-screen">
        <p>What activities did you do today?:</p>
        <div className="activities-list">
          <ul
            className="activities-list-ul"
          >
            {activities.map((activity, index) => {
              return (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  <div className="activities-list-item">
                    <div className='checkbox-container'>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={activity.name}
                        value={activity.name}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                      />
                      <label
                        htmlFor={`custom-checkbox-${index}`}
                        style={{
                          verticalAlign: "text-bottom",
                          marginLeft: "0.2rem",
                        }}
                      >
                        {activity.name}
                      </label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div style={{display: "flex", flexDirection: "column", gap: '10px'}}>
          <input
            className="activity-submit-button"
            type="submit"
            value="submit"
            onClick={handleSubmit}
          />
          <input
            className="activity-skip-button"
            type="submit"
            value="skip"
            onClick={handleSkip}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
