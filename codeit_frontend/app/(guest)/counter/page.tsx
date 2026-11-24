"use client";

import { useState } from "react";

const CounterPage = () => {
  const [num, setNum] = useState<number>(0);
  const [shakeKey, setShakeKey] = useState<number>(0);

  const handlePlusOneClick = () => {
    setNum((prev: number) => {
      return prev + 1;
    });
    setShakeKey((prev: number) => prev + 1);
  };
  const handleMinusOneClick = () => {
    setNum((prev: number) => {
      return prev - 1;
    });
    setShakeKey((prev: number) => prev + 1);
  };
  const handleResetClick = () => {
    setNum((prev: number) => {
      return 0;
    });
  };

  const isNegative = num < 0;

  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-[#05010d] font-mono text-cyan-300">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.08)_1px,transparent_1px)] bg-size-[40px_40px]" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-fuchsia-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-[480px] w-[480px] rounded-full bg-cyan-500/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.35)_0px,rgba(0,0,0,0.35)_1px,transparent_1px,transparent_3px)]" />

      <section className="relative flex flex-1 flex-col p-6 sm:p-12">
        <header className="flex items-center justify-between border-b border-cyan-400/20 pb-4 text-xs tracking-[0.3em] text-cyan-400/70 uppercase">
          <span>{"// sys.counter_v0.1"}</span>
          <span className="flex items-center gap-2 text-yellow-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-300 shadow-[0_0_8px_#fde047]" />
            online
          </span>
        </header>

        <div className="flex flex-1 flex-col items-center justify-center">
          <p
            key={shakeKey}
            className={`my-8 text-center text-[120px] leading-none font-bold tabular-nums sm:text-[200px] ${
              shakeKey > 0 ? "animate-thump motion-reduce:animate-none" : ""
            } ${
              isNegative
                ? "text-fuchsia-400 [text-shadow:4px_0_#00f0ff,-4px_0_#ff00e6,0_0_40px_rgba(255,0,230,0.7)]"
                : "text-cyan-300 [text-shadow:4px_0_#ff00e6,-4px_0_#00f0ff,0_0_40px_rgba(0,240,255,0.7)]"
            }`}
          >
            {num}
          </p>

          <p className="mb-8 text-center text-xs tracking-[0.4em] text-cyan-400/50 uppercase">
            {isNegative ? "▼ negative signal detected" : "▲ signal stable"}
          </p>

          <div className="grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-4">
            <button
              onClick={handlePlusOneClick}
              className="cursor-pointer border border-cyan-400 bg-cyan-400/10 py-4 text-xl font-bold tracking-widest text-cyan-300 uppercase transition hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_24px_#22d3ee] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 active:scale-95 sm:text-2xl"
            >
              +1
            </button>
            <button
              onClick={handleResetClick}
              className="cursor-pointer border border-yellow-300 bg-yellow-300/10 py-4 text-base font-bold tracking-widest text-yellow-300 uppercase transition hover:bg-yellow-300 hover:text-black hover:shadow-[0_0_24px_#fde047] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300 active:scale-95 sm:text-lg"
            >
              Reset
            </button>
            <button
              onClick={handleMinusOneClick}
              className="cursor-pointer border border-fuchsia-500 bg-fuchsia-500/10 py-4 text-xl font-bold tracking-widest text-fuchsia-400 uppercase transition hover:bg-fuchsia-500 hover:text-black hover:shadow-[0_0_24px_#d946ef] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-400 active:scale-95 sm:text-2xl"
            >
              -1
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CounterPage;
