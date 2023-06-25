import { ContributionGraph } from "@/components/GH";
import { axios } from "@/configs/axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useFlyStore } from "@/stores/flyStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import fileSize from "file-size";

const Project = () => {
  const { fly } = useFlyStore();

  const [overview, setOverview] = useState({
    files: 0,
    used_storage: 0,
    contributions: [],
  });

  const fetchOverview = async () => {
    try {
      const res = await axios(`/fly/overview?fly_id=${fly.uuid}`);
      setOverview(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

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
        <div className="border border-gray-700 p-5 rounded-md w-1/2">
          <h1 className="text-2xl font-semibold">Total files</h1>
          <p className="text-4xl mt-3">{overview.files}</p>
        </div>
        <div className="border border-gray-700 p-5 rounded-md w-1/2">
          <h1 className="text-2xl font-semibold">Used storage</h1>
          <p className="text-4xl mt-3">
            {fileSize(overview.used_storage).to("MB")} MB
          </p>
        </div>
      </div>
      <div className="border border-gray-700 p-5 rounded-md mt-5">
        <h1 className="text-2xl font-semibold">Upload streak</h1>
        <p className="my-3 font-semibold">{overview.files} uploads in 2023</p>
        <ContributionGraph contributionData={overview.contributions} />
      </div>
    </DashboardLayout>
  );
};

export default Project;
