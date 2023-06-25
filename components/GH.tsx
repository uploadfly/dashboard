import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import dayjs from "dayjs";

const ContributionGraph = ({ contributionData }: { contributionData: any }) => {
  const startDate = dayjs().startOf("year");
  const endDate = dayjs().endOf("year");

  const getMaxCount = (data: any[]) => {
    let maxCount = 0;

    for (const value of data) {
      if (value.count > maxCount) {
        maxCount = value.count;
      }
    }

    return maxCount;
  };

  return (
    <div className="graph">
      <CalendarHeatmap
        startDate={startDate as any}
        endDate={endDate as any}
        values={contributionData}
        onClick={(value: any) => {
          if (value) {
            console.log(value.count);
          }
        }}
        classForValue={(value: any) => {
          if (!value) {
            return "color-scale-0";
          }

          const { count } = value;

          const maxCount = getMaxCount(contributionData);

          const range = Math.ceil(maxCount / 5);

          const scaleIndex = Math.floor(count / range);

          return `color-scale-${scaleIndex}`;
        }}
      />
    </div>
  );
};

export { ContributionGraph };
