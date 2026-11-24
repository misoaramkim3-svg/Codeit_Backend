"use client";

import Link from "next/link";

const Home = () => {
  return (
    <main className="page flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="font-serif text-5xl font-bold tracking-tight text-ink-strong">
        Memoit
      </h1>
      <span className="mt-8 h-px w-10 bg-point" />
      <p className="mt-8 text-ink-sub">여럿이 한 권에 돌려 쓰는 교환일기</p>
      <div className="mt-12 flex w-full max-w-xs flex-col gap-3">
        <Link
          href="/signup"
          className="btn-primary justify-center py-3.5 text-base"
        >
          회원가입
        </Link>
        <Link
          href="/login"
          className="btn-secondary justify-center py-3.5 text-base"
        >
          로그인
        </Link>
      </div>
    </main>
  );
};

export default Home;
