import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addActivitiesThunk } from '../store/activities';

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities);
  const [checkedState, setCheckedState] = useState(
    new Array(activities.length).fill(false)) || [];


  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }

  const handleSubmit = () => {
    console.log('hello');
    let activityData = [];
    for(let i = 0; i < checkedState.length; i++) {
      if(checkedState[i]) {
        activityData.push({name: activities[i].name});
      }
    }
    let activityObject = {
      activities: activityData
    }
    // console.log(activityData);
    dispatch(addActivitiesThunk(activityObject));
  }

  return (
    <div className="activities-container">
      <h3 style={{textAlign: 'center'}}>Select Activities</h3>
      <ul className="activities-list" style={{ listStyle: 'none',
  padding: 0, textAlign: 'center'}}>
        {activities.map((activity, index) => {
          return (
            <li key={index} style={{marginBottom: '0.5rem'}}>
              <div className="activities-list-item" >
                <div>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={activity.name}
                    value={activity.name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`} style={{verticalAlign: 'text-bottom', marginLeft: '0.2rem'}}>{activity.name}</label>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <input type='submit' value ='submit' onClick={handleSubmit}/>
    </div>
  );
};

export default Activities;