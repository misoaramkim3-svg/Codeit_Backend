import MemoDetailComponent from "@/components/custom/memo/memo-detail-component";
import { Suspense } from "react";

const MemoDetailPage = () => {
  return (
    <main className="page-narrow">
      <Suspense>
        <MemoDetailComponent></MemoDetailComponent>
      </Suspense>
    </main>
  );
};

export default MemoDetailPage;
