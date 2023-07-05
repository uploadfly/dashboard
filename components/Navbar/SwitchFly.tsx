import * as Popover from "@radix-ui/react-popover";
import { HiChevronUpDown } from "react-icons/hi2";
import { GrFormClose } from "react-icons/gr";

const SwitchFly = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className="">
        <HiChevronUpDown />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className="rounded p-5 w-[360px] bg-uf-dark/70 border border-uf-accent/30 backdrop-blur-md text-uf-light shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade z-50"
        sideOffset={5}
      >
        <div className="flex flex-col gap-2.5">
          <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
            Flies
          </p>
        </div>
        <Popover.Close
          className="h-[25px] w-[25px] inline-flex items-center justify-center text-uf-light absolute top-[5px] right-[5px] outline-none cursor-default"
          aria-label="Close"
        >
          <GrFormClose className="text-2xl" />
        </Popover.Close>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default SwitchFly;
