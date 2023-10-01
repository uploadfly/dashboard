import { TailwindE } from "./tailwind";
import { Button } from "@react-email/button";
import { Text } from "@react-email/text";

export const VerifyEmail = ({ link }: { link: string }) => {
  return (
    <TailwindE>
      <h1 className="text-4xl font-bold">Verify your email</h1>
      <Text className="text-lg font-semibold">Welcome to UploadFly</Text>
      <Text>Click the button below to verify your email address</Text>
      <Button href={link} className="bg-orange-500 px-6 py-3 rounded-md">
        Verify Email
      </Button>
    </TailwindE>
  );
};
