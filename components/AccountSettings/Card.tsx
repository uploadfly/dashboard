import React, { ReactNode } from "react";
import { RiLoader5Fill } from "react-icons/ri";

const Card = ({
  title,
  children,
  description,
  subtext,
  disabled,
  onClick,
  loading,
}: {
  title: string;
  description: string;
  children: ReactNode;
  subtext: string;
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}) => {
  return (
    <div className="w-full border-2 border-white/10 rounded-md py-5 px-5 flex flex-col items-start gap-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm">{description}</p>
      {children}
      <div className="flex items-center justify-between w-full flex-wrap gap-3">
        <p className="text-sm">{subtext}</p>
        <button
          className="bg-uf-accent/80 text-white px-5 py-2 rounded-md font-semibold w-full lg:w-fit disabled:opacity-60 disabled:cursor-not-allowed hover:bg-uf-accent transition-colors"
          onClick={onClick}
          disabled={disabled || loading}
        >
          {loading ? (
            <RiLoader5Fill className="animate-spin text-2xl" />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
