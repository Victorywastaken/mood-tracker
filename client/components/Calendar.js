import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMoodThunk } from '../store/mood';
import { ResponsiveCalendar } from '@nivo/calendar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Calendar = () => {
  const moodKey = {
    awful: 0,
    bad: 1,
    meh: 2,
    good: 3,
    great: 4
  }

  const [loaded , setLoaded] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear() + 1);
  const [month, setMonth] = useState(new Date().getMonth());

  const moods = useSelector(state => state.mood)

  useState(() => {
    setLoaded(true)
  })

  const moodData = moods.map(mood => {
    return {
      day: mood.date,
      mood: mood.mood,
      value: moodKey[mood.mood]
    }
  })

  return (
    !loaded
    ?
    <div>Loading...</div>
    :
    <div style={{height: '40vh'}}>
      <div className='calendar-container' style={{display: "flex", justifyContent: "center", gap: '2vh'}}>
        <button onClick={() => setYear(year - 1)}>Previous Year</button>
        <div className="calendar-legend-item" style={{backgroundColor: '#F2223B'}}>awful</div>
        <div className="calendar-legend-item" style={{backgroundColor: '#F8922F'}}>bad</div>
        <div className="calendar-legend-item" style={{backgroundColor: '#50ABCE'}}>meh</div>
        <div className="calendar-legend-item" style={{backgroundColor: '#85C428'}}>good</div>
        <div className="calendar-legend-item" style={{backgroundColor: '#15B892'}}>great</div>
        <button onClick={() => setYear(year + 1)}>Next Year</button>
      </div>
    <ResponsiveCalendar
        data={moodData}
        from={year.toString()}
        to={year.toString()}
        emptyColor="#eeeeee"
        colors={['#F2223B', '#F8922F', '#50ABCE', '#85C428', '#15B892']}
        minValue="auto"
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={70}
        monthBorderColor="#bfbfbf"
        dayBorderWidth={1}
        dayBorderColor="#ffffff"
        theme={{fontSize: '16px',}}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        tooltip={function(e){
          return <div style={{backgroundColor: 'white', padding: '20px'}}>mood: {e.data.mood}</div>
        }}
    />
  </div>
  )
}

export default Calendar;
