"use client";

import dynamic from "next/dynamic";

const ProfileComponent = dynamic(
  () => import("@/components/custom/auth/profile-component"),
  { ssr: false },
);

const MyPage = () => {
  return (
    <main className="page-narrow">
      <ProfileComponent />
    </main>
  );
};

export default MyPage;
