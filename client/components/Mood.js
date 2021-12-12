import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileDiv from "../Mobile";
import { setMoodThunk } from "../store/mood";
import { getTodaysMoodThunk } from "../store/singleMood";
const MonkeyLearn = require('monkeylearn')
import history from '../history';
import { BiHappyBeaming, BiHappyAlt, BiQuestionMark, BiMeh, BiSad } from "react-icons/bi";
import { FaRegSadCry } from "react-icons/fa";

import './Mood.css';

// const ml = new MonkeyLearn('2c1f6c7d7d964c59e26cfe8f856be2a3dbe1cfda')
// let model_id = 'cl_pi3C7JiL'
// let data = ["This is a great tool!"]
// ml.classifiers.classify(model_id, data).then(res => {
//     console.log(res.body)
// })

const Mood = () => {
  const dispatch = useDispatch();
  const [mood, setMood] = useState('')
  const [description, setDescription] = useState('')

  const todayMood = useSelector(state => state.singleMood);
  const allMoods = useSelector(state => state.mood);

  const moodDescriptionObj = {
    'great': 'I am great',
    'good': 'I am good',
    'meh': 'I am meh',
    'bad': 'I am bad',
    'awful': 'I am awful',
  }

  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  const handleMood = (mood) => {
    setMood(mood)
  }

  const moodCount = {
    'great': 0,
    'good': 0,
    'meh': 0,
    'bad': 0,
    'awful': 0,
  }

  const moodTally = () => {
    for (let i = 0; i < allMoods.length; i++) {
      const currentMood = allMoods[i].mood;
      moodCount[currentMood] += 1
    }
    return moodCount
  }

  console.log(moodTally());

  const handleSubmit = () => {
    dispatch(setMoodThunk({mood, description}));
    console.log('thanks for submitting');
  }


  return (
    <MobileDiv>
      <div className="mood-question-container">
        <div className="mood-screen-default">
      {todayMood
      ? <p>Your mood for today was submitted already. Your mood today was {todayMood.mood}</p>
      : <p>How are you feeling today?</p>
      }
        <div className="mood-container" style={{display: 'flex', justifyContent: 'center', gap: '5%'}}>
          <div className="mood-button" onClick={() => handleMood("great")}>
            <BiHappyBeaming style={{fontSize: '50px', color: '#15B892'}}/>
            <button>GREAT</button>
          </div>
          <div className="mood-button" onClick={() => handleMood("good")}>
            <BiHappyAlt style={{fontSize: '50px', color: '#85C428'}}/>
            <button>GOOD</button>
          </div>
          <div className="mood-button" onClick={() => handleMood("meh")}>
            <BiQuestionMark style={{fontSize: '50px', color: '#50ABCE'}}/>
            <button>MEH</button>
          </div>
          <div className="mood-button" onClick={() => handleMood("bad")}>
            <BiMeh style={{fontSize: '50px', color: '#F8922F'}}/>
            <button>BAD</button>
          </div>
          <div className="mood-button" onClick={() => handleMood("awful")}>
            <BiSad style={{fontSize: '50px', color: '#F2223B'}}/>
            <button>AWFUL</button>
          </div>
        </div>
      </div>
      { mood
        ?
        <>
          <h2>{mood}</h2>
          <h4>{moodDescriptionObj[mood]}</h4>
          <section>Would you like to add some comments? (optional)</section>
          <textarea
            type='textarea' rows="4" cols="50" placeholder="Comments go here"
            value={description}
            onChange={handleChange}
          />
          <br/>
          <input type="submit" value="Submit" onClick={handleSubmit}/>
        </>
        :
        null }
      </div>
    </MobileDiv>
  )
}

export default Mood;
