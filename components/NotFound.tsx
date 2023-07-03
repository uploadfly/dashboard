import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div
      className="h-screen w-screen bg-uf-dark text-uf-light flex items-center justify-center flex-col"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(/grid-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
    >
      <Head>
        <title>Not Found | Uploadfly</title>
      </Head>
      <Image src="/logo.svg" width={100} height={100} alt="Uploadfly logo" />
      <h1 className="text-8xl font-bold">{`Seems you're lost`}</h1>
      <p className="text-center text-3xl mt-10">
        It could be you, it could be very well us. <br />{" "}
        {`Alas, let's take you home`}
      </p>

      <Link
        href={"/"}
        className="mt-10 bg-uf-light/60 text-2xl px-14 text-uf-dark py-3 rounded-md font-semibold hover:bg-uf-light transition-colors duration-300"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
