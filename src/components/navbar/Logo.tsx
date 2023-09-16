"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImgLogo } from "../../../public/images";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden md:block cursor-pointer h-auto w-[100px]"
      src={ImgLogo}
      alt="Logo"
    />
  );
};
export default Logo;
