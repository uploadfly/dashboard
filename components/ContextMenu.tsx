import { Content, Portal, Root, Trigger } from "@radix-ui/react-popover";

const ContextMenu = () => {
  return (
    <Root>
      <Trigger asChild></Trigger>
      <Portal>
        <Content></Content>
      </Portal>
    </Root>
  );
};

export default ContextMenu;
