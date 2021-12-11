import React, { useState } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar'

let moodKey = {
  awful: 0,
  bad: 1,
  meh: 2,
  good: 3,
  great: 4
}

let moodData = [{
  "userId": 2,
  "mood": "meh",
  "date": "2021-12-01"
}, {
  "userId": 2,
  "mood": "good",
  "date": "2021-12-02"
}, {
  "userId": 2,
  "mood": "bad",
  "date": "2021-12-03"
}, {
  "userId": 2,
  "mood": "good",
  "date": "2021-12-04"
}, {
  "userId": 2,
  "mood": "good",
  "date": "2021-12-05"
}, {
  "userId": 2,
  "mood": "meh",
  "date": "2021-12-06"
}, {
  "userId": 2,
  "mood": "bad",
  "date": "2021-12-07"
}, {
  "userId": 2,
  "mood": "good",
  "date": "2021-12-08"
}, {
  "userId": 2,
  "mood": "good",
  "date": "2021-12-09"
}, {
  "userId": 2,
  "mood": "great",
  "date": "2021-12-10"
}, {
  "userId": 2,
  "mood": "awful",
  "date": "2021-12-11"
}, {
  "userId": 2,
  "mood": "great",
  "date": "2021-12-12"
}, {
  "userId": 2,
  "mood": "bad",
  "date": "2021-12-13"
}, {
  "userId": 2,
  "mood": "awful",
  "date": "2021-12-14"
}, {
  "userId": 2,
  "mood": "awful",
  "date": "2021-12-15"
}, {
  "userId": 2,
  "mood": "meh",
  "date": "2021-12-16"
}, {
  "userId": 2,
  "mood": "good",
  "date": "2021-12-17"
}, {
  "userId": 2,
  "mood": "great",
  "date": "2021-12-18"
}, {
  "userId": 2,
  "mood": "meh",
  "date": "2021-12-19"
}, {
  "userId": 2,
  "mood": "great",
  "date": "2021-12-20"
}, {
  "userId": 2,
  "mood": "bad",
  "date": "2021-12-21"
}, {
  "userId": 2,
  "mood": "bad",
  "date": "2021-12-22"
}, {
  "userId": 2,
  "mood": "bad",
  "date": "2021-12-23"
}, {
  "userId": 2,
  "mood": "awful",
  "date": "2021-12-24"
}, {
  "userId": 2,
  "mood": "meh",
  "date": "2021-12-25"
}, {
  "userId": 2,
  "mood": "great",
  "date": "2021-12-26"
}, {
  "userId": 2,
  "mood": "good",
  "date": "2021-12-27"
}, {
  "userId": 2,
  "mood": "bad",
  "date": "2021-12-28"
}, {
  "userId": 2,
  "mood": "great",
  "date": "2021-12-29"
}, {
  "userId": 2,
  "mood": "awful",
  "date": "2021-12-30"
}, {
  "userId": 2,
  "mood": "awful",
  "date": "2021-12-31"
}]

let data = [
  {
    day: '2015-01-01',
    value: 100
  },
  {
    day: "2015-03-06",
    value: 200
  },
  {
    day: "2016-03-06",
    value: 300
  },
  {
    day: "2016-06-28",
    value: 400
  },
  {
    day: "2016-07-21",
    value: 420
  },
  {
    day: "2016-07-22",
    value: 500
  },
  {
    day: "2017-07-22",
    value: 392
  }
];

moodData = moodData.map(mood => {
  return {
    day: mood.date,
    mood: mood.mood,
    value: moodKey[mood.mood]
  }
})

console.log(moodData)

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Calendar = () => {

  const [loaded , setLoaded] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear() + 1);

  useState(() => {
      setLoaded(true)
  })


  return (
    !loaded
    ?
    <div>Loading...</div>
    :
    <div style={{height: '78vh'}}>
      <div className='calendar-container' style={{display: "flex", justifyContent: "center", gap: '2vh'}}>
        <div className="calendar-legend-item" style={{backgroundColor: '#F2223B'}}>awful</div>
        <div className="calendar-legend-item" style={{backgroundColor: '#F8922F'}}>bad</div>
        <div className="calendar-legend-item" style={{backgroundColor: '#50ABCE'}}>meh</div>
        <div className="calendar-legend-item" style={{backgroundColor: '#85C428'}}>good</div>
        <div className="calendar-legend-item" style={{backgroundColor: '#15B892'}}>great</div>
      </div>
    <ResponsiveCalendar
        data={moodData}
        from="2022"
        to="2022"
        emptyColor="#eeeeee"
        colors={['#F2223B', '#F8922F', '#50ABCE', '#85C428', '#15B892']}
        minValue="auto"
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={70}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        tooltip={function(e){
          console.log(e);
          return e.data.mood
        }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
  </div>
  )
}

export default Calendar;
