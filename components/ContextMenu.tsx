import { Content, Portal, Root, Trigger } from "@radix-ui/react-popover";
import { HiEllipsisVertical } from "react-icons/hi2";

const ContextMenu = () => {
  return (
    <Root>
      <Trigger asChild>
        <HiEllipsisVertical />
      </Trigger>
      <Portal>
        <Content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          aspernatur quo omnis dicta minima illum fuga nam repudiandae. Velit
          earum laborum error blanditiis excepturi porro provident. Reiciendis
          cumque molestiae vel.
        </Content>
      </Portal>
    </Root>
  );
};

export default ContextMenu;
