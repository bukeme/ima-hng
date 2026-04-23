"use client";

import Group9Img from "@/assets/Group 9.png";
import UserImage from "@/assets/user-image.png";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";

const Sidebar = () => {
  const { setTheme, theme } = useTheme();
  return (
    <aside className="h-screen sticky top-0 w-14 bg-[var(--color-sidebar)] flex flex-col justify-between rounded-r-lg">
      <Image src={Group9Img} alt="logo" className="w-full" />
      <div className="w-full space-y-3 flex flex-col items-center mb-3">
        {theme === "light" ? (
          <Icon
            onClick={() => setTheme("dark")}
            icon="material-symbols:dark-mode-rounded"
            fontSize={22}
            className="cursor-pointer"
          />
        ) : (
          <Icon
            onClick={() => setTheme("light")}
            icon="material-symbols:circle"
            fontSize={22}
            className="cursor-pointer"
          />
        )}
        <Separator />
        <Avatar>
          <AvatarImage src={UserImage.src} alt="user-image" />
          <AvatarFallback>UK</AvatarFallback>
        </Avatar>
      </div>
    </aside>
  );
};

export default Sidebar;
