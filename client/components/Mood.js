import React from "react";
import MobileDiv from "../Mobile";
const MonkeyLearn = require('monkeylearn')

// const ml = new MonkeyLearn('2c1f6c7d7d964c59e26cfe8f856be2a3dbe1cfda')
// let model_id = 'cl_pi3C7JiL'
// let data = ["This is a great tool!"]
// ml.classifiers.classify(model_id, data).then(res => {
//     console.log(res.body)
// })

const Mood = (props) => {
  return (
    <MobileDiv>
      How are you doing today?
      <div className="mood-container">
        <div className="mood-button" onClick={() => props.handleMood("happy")}>
          <img alt="happy" />
        </div>
        <div className="mood-button" onClick={() => props.handleMood("neutral")}>
          <img alt="neutral" />
        </div>
        <div className="mood-button" onClick={() => props.handleMood("sad")}>
          <img alt="sad" />
        </div>
      </div>
    </MobileDiv>
  )
}

export default Mood;
