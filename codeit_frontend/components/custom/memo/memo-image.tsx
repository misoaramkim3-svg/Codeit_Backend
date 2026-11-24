"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const placeholder = "/memo-placeholder.svg";

export default function MemoImage({
  src,
  ...props
}: Omit<ImageProps, "src" | "onError" | "unoptimized"> & { src: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = !src.trim() || failedSrc === src ? placeholder : src;

  return (
    <Image
      {...props}
      src={imageSrc}
      unoptimized
      onError={() => {
        if (imageSrc !== placeholder) setFailedSrc(src);
      }}
    />
  );
}
