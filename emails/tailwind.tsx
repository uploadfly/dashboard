import { Tailwind } from "@react-email/tailwind";

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
      {children}
    </Tailwind>
  );
};
