import React from "react";
import { Drawer, DrawerHeader, DrawerCloseButton } from "vtex.store-drawer";
import MenuCustom from "../menuCustom";

const MenuCustomMobile = () => (
  <Drawer
    header={
      <DrawerHeader >
        <DrawerCloseButton />
      </DrawerHeader>
    }
  >
    <MenuCustom></MenuCustom>
  </Drawer>
);

export default MenuCustomMobile;