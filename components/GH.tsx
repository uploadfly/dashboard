import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import dayjs from "dayjs";
import { useEffect } from "react";

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

  useEffect(() => {
    console.log(getMaxCount(contributionData));
    console.log(getMaxCount(contributionData) * 0.2);
    console.log(getMaxCount(contributionData) * 0.4);
    console.log(getMaxCount(contributionData) * 0.6);
    console.log(getMaxCount(contributionData) * 0.8);
    console.log(getMaxCount(contributionData) * 1);
  }, []);

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
        classForValue={(value) => {
          if (!value) {
            return "color-scale-0";
          }
          const { count } = value;
          const maxCount = getMaxCount(contributionData);
          const percentage = count / maxCount;
          switch (true) {
            case percentage < 0.2:
              return "color-scale-1";
            case percentage < 0.4:
              return "color-scale-2";
            case percentage < 0.6:
              return "color-scale-3";
            case percentage < 0.8:
              return "color-scale-4";
            default:
              return "color-scale-5";
          }
        }}
      />
    </div>
  );
};

export { ContributionGraph };
