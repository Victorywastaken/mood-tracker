import React from 'react'
import { ResponsivePie } from '@nivo/pie'
const data = [
  {
    "id": "awful",
    "label": "awful",
    "value": 117,
  },
  {
    "id": "bad",
    "label": "bad",
    "value": 510,

  },
  {
    "id": "meh",
    "label": "meh",
    "value": 547,

  },
  {
    "id": "good",
    "label": "good",
    "value": 248,

  },
  {
    "id": "great",
    "label": "great",
    "value": 536,

  }
]
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = () => (
  <div style={{ height: '50vh' }}>
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={-90}
        endAngle={90}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        colors={['#F2223B', '#F8922F', '#50ABCE', '#85C428', '#15B892']}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        theme={{fontSize: '20px', fontWeight: 'bold'}}
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
    />
  </div>
)

export default MyResponsivePie
