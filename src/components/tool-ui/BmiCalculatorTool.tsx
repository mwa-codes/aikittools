"use client";

import { useMemo, useState } from "react";

type UnitSystem = "metric" | "imperial";

function getBmiCategory(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export default function BmiCalculatorTool() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [heightCm, setHeightCm] = useState("170");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("7");
  const [weightKg, setWeightKg] = useState("70");
  const [weightLbs, setWeightLbs] = useState("154");

  const result = useMemo(() => {
    let heightM = 0;
    let weightInKg = 0;

    if (unitSystem === "metric") {
      const cm = Number(heightCm);
      const kg = Number(weightKg);
      if (cm <= 0 || kg <= 0) return null;
      heightM = cm / 100;
      weightInKg = kg;
    } else {
      const ft = Number(heightFt);
      const inches = Number(heightIn);
      const lbs = Number(weightLbs);
      if (ft < 0 || inches < 0 || lbs <= 0) return null;
      const totalInches = ft * 12 + inches;
      if (totalInches <= 0) return null;
      heightM = totalInches * 0.0254;
      weightInKg = lbs * 0.45359237;
    }

    const bmi = weightInKg / (heightM * heightM);
    if (!Number.isFinite(bmi)) return null;

    return {
      bmi,
      bmiRounded: bmi.toFixed(1),
      category: getBmiCategory(bmi),
    };
  }, [heightCm, heightFt, heightIn, weightKg, weightLbs, unitSystem]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setUnitSystem("metric")}
          className={`px-3 py-2 text-sm rounded-md transition-colors ${
            unitSystem === "metric" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Metric (cm/kg)
        </button>
        <button
          type="button"
          onClick={() => setUnitSystem("imperial")}
          className={`px-3 py-2 text-sm rounded-md transition-colors ${
            unitSystem === "imperial" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Imperial (ft/in, lbs)
        </button>
      </div>

      {unitSystem === "metric" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="height-cm" className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              id="height-cm"
              type="number"
              min="0"
              step="0.1"
              value={heightCm}
              onChange={(event) => setHeightCm(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="weight-kg" className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              id="weight-kg"
              type="number"
              min="0"
              step="0.1"
              value={weightKg}
              onChange={(event) => setWeightKg(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="height-ft" className="block text-sm font-medium text-gray-700 mb-2">
              Height (ft)
            </label>
            <input
              id="height-ft"
              type="number"
              min="0"
              step="1"
              value={heightFt}
              onChange={(event) => setHeightFt(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="height-in" className="block text-sm font-medium text-gray-700 mb-2">
              Height (in)
            </label>
            <input
              id="height-in"
              type="number"
              min="0"
              step="1"
              value={heightIn}
              onChange={(event) => setHeightIn(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="weight-lbs" className="block text-sm font-medium text-gray-700 mb-2">
              Weight (lbs)
            </label>
            <input
              id="weight-lbs"
              type="number"
              min="0"
              step="0.1"
              value={weightLbs}
              onChange={(event) => setWeightLbs(event.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-sm text-gray-600">Your BMI</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{result?.bmiRounded ?? "-"}</p>
        <p className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
          {result?.category ?? "Enter valid values to see your category"}
        </p>
      </div>
    </div>
  );
}
