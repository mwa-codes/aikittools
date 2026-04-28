"use client";

import { useMemo, useState } from "react";

interface AgeResult {
  years: number;
  months: number;
  days: number;
}

function calculateAgeParts(dob: Date, today: Date): AgeResult {
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    const previousMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += previousMonthLastDay;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days };
}

function getNextBirthdayDate(dob: Date, today: Date) {
  const month = dob.getMonth();
  const day = dob.getDate();
  const thisYearBirthday = new Date(today.getFullYear(), month, day);

  if (thisYearBirthday >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
    return thisYearBirthday;
  }

  return new Date(today.getFullYear() + 1, month, day);
}

export default function AgeCalculatorTool() {
  const [dob, setDob] = useState("");

  const result = useMemo(() => {
    if (!dob) return null;

    const birthDate = new Date(`${dob}T00:00:00`);
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (Number.isNaN(birthDate.getTime()) || birthDate > startOfToday) {
      return null;
    }

    const age = calculateAgeParts(birthDate, startOfToday);
    const nextBirthday = getNextBirthdayDate(birthDate, startOfToday);
    const msDiff = nextBirthday.getTime() - startOfToday.getTime();
    const daysUntilNextBirthday = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

    return {
      ...age,
      nextBirthday: nextBirthday.toLocaleDateString(),
      daysUntilNextBirthday,
    };
  }, [dob]);

  return (
    <div>
      <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
        Date of birth
      </label>
      <input
        id="dob"
        type="date"
        value={dob}
        onChange={(event) => setDob(event.target.value)}
        max={new Date().toISOString().slice(0, 10)}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        aria-label="Date of birth"
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Years</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{result?.years ?? "-"}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Months</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{result?.months ?? "-"}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Days</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{result?.days ?? "-"}</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-900">Next birthday countdown</p>
        <p className="mt-1 text-sm text-blue-800">
          {result
            ? `${result.daysUntilNextBirthday} day${result.daysUntilNextBirthday === 1 ? "" : "s"} left (on ${result.nextBirthday})`
            : "Select a valid birth date to see your next birthday countdown."}
        </p>
      </div>
    </div>
  );
}
