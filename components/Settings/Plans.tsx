import { ReactNode } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Plans = ({ button }: { button: ReactNode }) => {
  const features = [
    "100 GB of storage",
    "100,000 monthly uploads",
    "1 GB max upload size",
    "Email support",
    "Private files (soon)",
    "Custom domain (soon)",
  ];

  return (
    <div className="flex gap-x-10">
      <div className="">
        <p>This project is currently on the plan:</p>
        <h2 className="text-3xl font-medium text-uf-accent">FREE</h2>
        {button}
      </div>
      <div className="w-full">
        <div className="border-2 relative flex flex-col rounded-3xl p-5 border-uf-accent">
          <div
            className="absolute -top-3 bg-uf-accent text-white rounded-full px-10
                    py-1 text-sm font-semibold -translate-x-1/2 left-1/2 transform"
          >
            Pro
          </div>

          <h2 className="text-xl font-bold">Pro</h2>
          <h1 className="mt-3 font-semibold text-gray-400">
            <span className="font-normal text-4xl text-white">$20</span>
            /month
          </h1>
          {features.map((feature) => (
            <div key={feature} className="mt-5">
              <span className="text-sm text-gray-400 flex gap-2 items-center">
                <BsFillCheckCircleFill className="text-uf-accent/70" />
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plans;
