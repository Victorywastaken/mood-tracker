import React, {useState} from "react";
import MobileDiv from "../Mobile";
const MonkeyLearn = require('monkeylearn')

// const ml = new MonkeyLearn('2c1f6c7d7d964c59e26cfe8f856be2a3dbe1cfda')
// let model_id = 'cl_pi3C7JiL'
// let data = ["This is a great tool!"]
// ml.classifiers.classify(model_id, data).then(res => {
//     console.log(res.body)
// })

const Mood = () => {

  const [mood, setMood] = useState('')

  const handleMood = (mood) => {
    console.log(`what a ${mood} mood`);
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
    </MobileDiv>
  )
}

export default Mood;
