import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MobileDiv from "../Mobile";
import { setMoodThunk } from "../store/mood";
import { getTodaysMoodThunk } from "../store/singleMood";
const MonkeyLearn = require("monkeylearn");
import history from "../history";
import {
  BiHappyBeaming,
  BiHappyAlt,
  BiQuestionMark,
  BiMeh,
  BiSad,
} from "react-icons/bi";

import "./Mood.css";

// const ml = new MonkeyLearn('2c1f6c7d7d964c59e26cfe8f856be2a3dbe1cfda')
// let model_id = 'cl_pi3C7JiL'
// let data = ["This is a great tool!"]
// ml.classifiers.classify(model_id, data).then(res => {
//     console.log(res.body)
// })

const Mood = () => {
  const dispatch = useDispatch();
  const [mood, setMood] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("-default");

  const todayMood = useSelector((state) => state.singleMood);
  const allMoods = useSelector((state) => state.mood);

  const moodDescriptionObj = {
    great: "Today is one of my best days!",
    good: "Today was a good day.",
    meh: `I don't know what to say about today.`,
    bad: `Things aren't going so well today.`,
    awful: `There is no way I can have a worse day.`,
  };

  const moodCount = {
    great: 0,
    good: 0,
    meh: 0,
    bad: 0,
    awful: 0,
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleMood = (mood) => {
    setColor(`-${mood}`);
    setMood(mood);
  };

  const moodTally = () => {
    for (let i = 0; i < allMoods.length; i++) {
      const currentMood = allMoods[i].mood;
      moodCount[currentMood] += 1;
    }
    return moodCount;
  };

  const handleSubmit = () => {
    dispatch(setMoodThunk({ mood, description }));
    history.push('/activities');
  };

  return (
    <MobileDiv>
      <div className="mood-question-container">
        <div className={`mood-screen${color}`}>
          {todayMood ? (
            <p>
              Your mood for today was submitted already. Your mood today was{" "}
              {todayMood.mood}
            </p>
          ) : (
            <p>How are you feeling today?</p>
          )}
          <br />
          <div
            className="mood-container"
            style={{ display: "flex", justifyContent: "center", gap: "5%" }}
          >
            <div className="mood-button">
              <div className="mood-question-icon">
                <BiHappyBeaming
                  style={{ fontSize: "50px", color: "#15B892" }}
                  onClick={() => handleMood("great")}
                />
              </div>
              <p>I'm feeling GREAT</p>
            </div>
            <div className="mood-button">
              <div className="mood-question-icon">
                <BiHappyAlt
                  style={{ fontSize: "50px", color: "#85C428" }}
                  onClick={() => handleMood("good")}
                />
              </div>
              <p>I'm feeling GOOD</p>
            </div>
            <div className="mood-button">
              <div className="mood-question-icon">
                <BiQuestionMark
                  style={{ fontSize: "50px", color: "#50ABCE" }}
                  onClick={() => handleMood("meh")}
                />
              </div>
              <p>I'm feeling MEH</p>
            </div>
            <div className="mood-button">
              <div className="mood-question-icon">
                <BiMeh
                  style={{ fontSize: "50px", color: "#F8922F" }}
                  onClick={() => handleMood("bad")}
                />
                <p>I'm feeling BAD</p>
              </div>
            </div>
            <div className="mood-button">
              <div className="mood-question-icon">
                <BiSad
                  style={{ fontSize: "50px", color: "#F2223B" }}
                  onClick={() => handleMood("awful")}
                />
                <p>I'm feeling AWFUL</p>
              </div>
            </div>
          </div>
          <br />
          {mood ? (
            <>
              <h2>{mood[0].toUpperCase() + mood.slice(1, mood.length)}</h2>
              <h4>{moodDescriptionObj[mood]}</h4>
              <section>Would you like to add some comments? (optional)</section>
              <textarea
                type="textarea"
                rows="4"
                cols="40"
                placeholder="Comments go here"
                value={description}
                onChange={handleChange}
              />
              <br />
              <div className="mood-submit-button">
                <input
                  id={`button-65${color}`}
                  type="submit"
                  value="Submit"
                  onClick={handleSubmit}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </MobileDiv>
  );
};

export default Mood;
