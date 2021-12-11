import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileDiv from "../Mobile";
import { setMoodThunk } from "../store/mood";
import { getTodaysMoodThunk } from "../store/singleMood";
const MonkeyLearn = require('monkeylearn')

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

  useEffect(() => {
    dispatch(getTodaysMoodThunk());
  }, []);

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

  const handleSubmit = () => {
    dispatch(setMoodThunk({mood, description}));
    console.log('thanks for submitting');
  }

  return (
    <MobileDiv>
      <div className="mood-question" style={{textAlign: 'center'}}>
      How are you doing today?
        <div className="mood-container" style={{display: 'flex', justifyContent: 'center', gap: '5%'}}>
          <div className="mood-button">
            <button onClick={() => handleMood("great")}>GREAT</button>
          </div>
          <div className="mood-button" onClick={() => handleMood("good")}>
            <button>GOOD</button>
          </div>
          <div className="mood-button" onClick={() => handleMood("meh")}>
            <button>MEH</button>
          </div>
          <div className="mood-button" onClick={() => handleMood("bad")}>
            <button>BAD</button>
          </div>
          <div className="mood-button" onClick={() => handleMood("awful")}>
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
    </MobileDiv>
  )
}

export default Mood;
