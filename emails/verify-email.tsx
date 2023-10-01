import { Tailwind } from "./tailwind";
import { Link } from "@react-email/link";

export const VerifyEmail = ({ link }: { link: string }) => {
  return (
    <Tailwind>
      <Link href="https://example.com">Example</Link>;
    </Tailwind>
  );
};
