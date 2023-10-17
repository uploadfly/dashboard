import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

const NoLogs = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <h1 className="text-2xl font-semibold mb-2">No logs yet.</h1>
      <p className="text mb-4 lg:w-[450px] text-center">
        Your logs will appear here when you make API requests. Check out the
        docs to learn about UploadFly API endpoints.
      </p>
      <Link href={"https://docs.uploadfly.co"} target="_blank">
        <button className="flex gap-2 bg-uf-light text-uf-dark items-center px-3 font-semibold py-2 rounded-md hover:bg-uf-accent hover:text-uf-dark transition-colors">
          Go to docs <HiOutlineExternalLink />
        </button>
      </Link>
    </div>
  );
};

export default NoLogs;
