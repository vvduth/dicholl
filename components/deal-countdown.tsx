"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

// Static target date (replace with desired date)
const TARGET_DATE = new Date("2025-04-20T00:00:00");

function getTimeRemaining(targetDate: Date) {
  const currentTime = new Date();
  const timeDiff = Math.max(Number(targetDate) - Number(currentTime), 0);
  return {
    days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
  };
}

const DealCountDown = () => {
  const [time, setTime] = useState<ReturnType<typeof getTimeRemaining>>();

  useEffect(() => {
    setTime(getTimeRemaining(TARGET_DATE));
    const timerInterval = setInterval(() => {
      const newTime = getTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }

      return () => clearInterval(timerInterval);
    }, 1000);
  }, []);

  if (!time)
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 my-20">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-3xl font-bold">Loading...</h3>
        </div>
      </section>
    );

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return <p>No deals for now.</p>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 my-20">
      <div className="flex flex-col gap-2 justify-center">
        <h3 className="text-3xl font-bold">Deal Of The Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals
          of the Month! Every purchase comes with exclusive perks and offers,
          making this month a celebration of savvy choices and amazing deals.
          Don&apos;t miss out! 🎁🛒
        </p>
        <ul className="grid grid-cols-4">
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hrs" value={time.hours} />
          <StatBox label="Mins" value={time.minutes} />
          <StatBox label="Secs" value={time.seconds} />
        </ul>
        <div className="text-center">
          <Button asChild>
            <Link href="/search">View Products</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Image
          width={300}
          height={200}
          src="https://as1.ftcdn.net/v2/jpg/03/98/30/74/1000_F_398307497_zyMdbZ3nooQUKJ4Qs4MrVFG8qmrGzObp.jpg"
          alt="deal-1"
        />
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className="p-4 w-full text-center">
    <p className="text-3xl font-bold">{value}</p>
    <p>{label}</p>
  </li>
);

export default DealCountDown;
