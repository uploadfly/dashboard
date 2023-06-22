import { ContributionGraph } from "@/components/GH";
import DashboardLayout from "@/layouts/DashboardLayout";
import Link from "next/link";

const Project = () => {
  const generateContributionData = () => {
    const data = [];
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const count = Math.floor(Math.random() * 4);

      data.push({ date, count });
    }
    return data;
  };

  const contributionData = generateContributionData();

  const stats = [
    {
      title: "Total Files",
      value: contributionData.reduce((a, b) => a + b.count, 0),
    },
    {
      title: "Used storage",
      value: "948 MB",
    },
  ];

  return (
    <DashboardLayout>
      <div className="border border-gray-700 p-5 rounded-md mb-5">
        <h1 className="text-2xl font-semibold">Documentation</h1>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <Link
          href={"https://docs.uploadfly.io"}
          target="_blank"
          className="text-blue-500 font-semibold"
        >
          Go to docs
        </Link>
      </div>
      <div className="flex gap-5">
        {stats?.map((stat, index) => (
          <div
            className="border border-gray-700 p-5 rounded-md w-1/2"
            key={index}
          >
            <h1 className="text-2xl font-semibold">{stat.title}</h1>
            <p className="text-4xl mt-3">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="border border-gray-700 p-5 rounded-md mt-5">
        <h1 className="text-2xl font-semibold">Upload streak</h1>
        <p className="my-3 font-semibold">
          {contributionData.reduce((a, b) => a + b.count, 0)} uploads in 2023
        </p>
        <ContributionGraph contributionData={contributionData} />
      </div>
    </DashboardLayout>
  );
};

export default Project;
