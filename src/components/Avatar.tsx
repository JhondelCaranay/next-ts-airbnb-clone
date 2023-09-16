"use client";

import Image from "next/image";
import { ImgPlaceholder } from "../../public/images";

type AvatarProps = {
  src: string | null | undefined;
};

const Avatar = ({ src }: AvatarProps) => {
  // const image = src || ImgPlaceholder;

  return (
    <Image
      className="rounded-full object-cover"
      height={"30"}
      width={"30"}
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
};
export default Avatar;
