import React from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const Heatmap = ({ values }) => {
  return (
    <div>
      <ReactCalendarHeatmap
        startDate={new Date('2024-01-01')} // Change to your desired start date
        endDate={new Date('2024-12-31')} // Change to your desired end date
        values={values}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          // Optional: Add tooltip data attributes
          return {
            'data-tip': `${value.date}: ${value.count} activities`,
          };
        }}
      />
    </div>
  );
};

export default Heatmap;
