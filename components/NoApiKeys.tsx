import { HiPlus } from "react-icons/hi2";

const NoApiKeys = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-20">
      <h1 className="text-2xl font-semibold mb-2">
        {`You don't have any API Keys yet.`}
      </h1>
      <p className="text mb-4 w-[450px] text-center">
        API Keys are randomly generated alpha-numeric strings that are used to
        interact with Uploadfly services.
      </p>
      <button className="flex gap-2 bg-uf-light text-uf-dark items-center px-3 font-semibold py-2 rounded-md hover:bg-uf-accent hover:text-uf-dark transition-colors">
        <HiPlus /> Create an API key
      </button>
    </div>
  );
};

export default NoApiKeys;
