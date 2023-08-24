import React, { ReactNode } from "react";

const Card = ({
  title,
  children,
  description,
  subtext,
}: {
  title: string;
  description: string;
  children: ReactNode;
  subtext: string;
}) => {
  return (
    <div className="w-full border-2 border-white/10 rounded-md py-5 px-5 flex flex-col items-start gap-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm">{description}</p>
      {children}
      <div className="flex items-center justify-between w-full flex-wrap gap-3">
        <p className="text-sm">{subtext}</p>
        <button className="bg-uf-accent/80 text-white px-5 py-2 rounded-md font-semibold w-full lg:w-fit">
          Update
        </button>
      </div>
    </div>
  );
};

export default Card;
