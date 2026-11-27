"use client";

import FooterComponent from "@/components/custom/layout/footer-component";
import { useMeQuery } from "@/hooks/use-me-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GuestLayout = ({ children }: LayoutProps<"/">) => {
  const router = useRouter();
  const { data: me, isPending } = useMeQuery();

  useEffect(() => {
    if (me) {
      router.replace("/memos");
    }
  }, [me, router]);

  if (isPending || me) {
    return null;
  }

  return (
    <>
      <div className="content-fill">{children}</div>
      <FooterComponent />
    </>
  );
};

export default GuestLayout;
