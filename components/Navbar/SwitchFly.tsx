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
        className="rounded p-5 w-[360px] bg-uf-dark/70 border border-uf-accent/30 backdrop-blur-md text-uf-light z-50"
        sideOffset={5}
      >
        <div className="flex flex-col gap-2.5">
          <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
            Flies
          </p>
        </div>
        <Popover.Close
          className="absolute top-[5px] right-[5px]"
          aria-label="Close"
        >
          <GrFormClose className="text-2xl text-uf-light" />
        </Popover.Close>
        <Popover.Arrow className="fill-uf-accent" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default SwitchFly;
