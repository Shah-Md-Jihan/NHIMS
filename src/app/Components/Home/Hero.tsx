"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type HeroStat = {
  label: string;
  value: number;
  /** "grouped" → 18,500 · "compact" → 1.25M */
  format?: "grouped" | "compact";
  suffix?: string;
};

type HeroProps = {
  /** Live figures rendered as animated counters. Nothing renders without data. */
  stats?: readonly HeroStat[];
  imageSrc?: string;
  imageAlt?: string;
};

const groupedFormatter = new Intl.NumberFormat("en-US");
const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});

const formatStatValue = (value: number, format: HeroStat["format"]) =>
  format === "compact"
    ? compactFormatter.format(value)
    : groupedFormatter.format(Math.round(value));

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const StatCounter = ({ stat, active }: { stat: HeroStat; active: boolean }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedFrame = requestAnimationFrame(() =>
        setAnimatedValue(stat.value),
      );

      return () => cancelAnimationFrame(reducedFrame);
    }

    const duration = 1600;
    const startTime = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setAnimatedValue(stat.value * eased);

      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [active, stat.value]);

  const displayValue = formatStatValue(animatedValue, stat.format);
  const finalValue = formatStatValue(stat.value, stat.format);

  return (
    <div className="bg-white px-5 py-5 sm:px-6 sm:py-6">
      <p className="text-2xl font-semibold tracking-tight text-teal-700 sm:text-[26px]">
        <span aria-hidden="true">
          {displayValue}
          {stat.suffix}
        </span>
        <span className="sr-only">
          {finalValue}
          {stat.suffix}
        </span>
      </p>
      <p className="mt-1 text-xs text-zinc-500 sm:text-[13px]">{stat.label}</p>
    </div>
  );
};

const Hero = ({
  stats = [],
  imageSrc = "/hero.png",
  imageAlt = "A doctor consulting a patient at an NHIMS hospital",
}: HeroProps) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const node = statsRef.current;

    if (!node || statsInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [statsInView]);

  return (
    <section className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-zinc-950">
      {/* Full-bleed photograph with overlays for readable copy. */}
      <div className="absolute inset-0 -z-10">
        <Image
          alt={imageAlt}
          className="object-cover object-top"
          fill
          priority
          sizes="100vw"
          src={imageSrc}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/55 to-zinc-950/5"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/10 to-zinc-950/30"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-[34px] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[58px] xl:text-[64px]">
            Better Healthcare,{" "}
            <span className="text-teal-300">Connected Across Bangladesh.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-zinc-200/90 sm:mt-6 sm:text-base lg:text-lg">
            Find trusted doctors, explore hospitals, and manage your healthcare
            journey through one centralized digital health platform.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 text-sm font-semibold text-white shadow-lg shadow-zinc-950/30 transition-colors hover:bg-teal-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/40"
              href="/doctors"
            >
              Find a Doctor
              <ArrowRightIcon className="size-4" />
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25"
              href="/hospitals"
            >
              Explore Hospitals
            </Link>
          </div>
        </div>
      </div>

      {stats.length > 0 ? (
        <div
          className="relative mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8"
          ref={statsRef}
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-zinc-200/70 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] ring-1 ring-black/10 sm:grid-cols-4">
            {stats.map((stat) => (
              <StatCounter active={statsInView} key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Hero;
