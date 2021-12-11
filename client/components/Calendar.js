import React, { useState } from 'react';

import { ResponsiveCalendar } from '@nivo/calendar'
let data = [
  {day: '2015-01-01', value: 100},
  {
    day: "2015-03-06",
    value: 385
  },
  {
    day: "2016-03-06",
    value: 385
  },
  {
    day: "2016-06-28",
    value: 196
  },
  {
    day: "2016-07-22",
    value: 392
  },
  {
    day: "2017-07-22",
    value: 392
  }
];

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Calendar = () => {

  const [loaded , setLoaded] = useState(false)

  useState(() => {
      setLoaded(true)
  })


  return (
    !loaded
    ?
    <div>Loading...</div>
    :
    <div style={{height: '1000px'}}>
    <ResponsiveCalendar
        data={data}
        from="2015-03-01"
        to="2016-07-12"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        minValue="auto"
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={70}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        tooltip={function(e){return 'konnichwa!'}}
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
