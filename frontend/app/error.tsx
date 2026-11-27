"use client";

import { useEffect } from "react";

const ErrorPage = (props: { error: unknown; retry: () => void }) => {
  useEffect(() => {
    console.error(props.error);
  }, [props.error]);

  return (
    <main className="page flex-1">
      <div className="status" role="alert">
        <h1 className="status-title">문제가 생겼어요</h1>
        <p className="status-desc">
          화면을 불러오는 중에 오류가 발생했어요. 다시 시도해 주세요.
        </p>
        <button onClick={props.retry} className="btn-secondary mt-10">
          다시 시도
        </button>
      </div>
    </main>
  );
};

export default ErrorPage;
