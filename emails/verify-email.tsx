import { TailwindE } from "./tailwind";
import { Link } from "@react-email/link";

export const VerifyEmail = ({ link }: { link: string }) => {
  return (
    <TailwindE>
      <Link href="https://example.com">Example</Link>;
    </TailwindE>
  );
};
