import { Tailwind } from "@react-email/tailwind";
import { Img } from "@react-email/img";

export const TailwindE = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
            },
          },
        },
      }}
    >
      <Img
        src="https://cdn.uploadfly.cloud/u5PKLH/uf-logo-accent-KZsdKvG3.png"
        alt="logo"
        width="80"
        className="mb-10"
      />
      {children}
    </Tailwind>
  );
};
