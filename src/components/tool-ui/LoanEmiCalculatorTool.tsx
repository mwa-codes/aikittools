"use client";

import { useMemo, useState } from "react";

type TenureUnit = "months" | "years";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function LoanEmiCalculatorTool() {
  const [principal, setPrincipal] = useState("100000");
  const [annualRate, setAnnualRate] = useState("8.5");
  const [tenureValue, setTenureValue] = useState("5");
  const [tenureUnit, setTenureUnit] = useState<TenureUnit>("years");

  const result = useMemo(() => {
    const p = Number(principal);
    const annual = Number(annualRate);
    const tenure = Number(tenureValue);
    if (p <= 0 || annual < 0 || tenure <= 0) return null;

    const n = tenureUnit === "years" ? tenure * 12 : tenure;
    if (n <= 0) return null;

    const r = annual / 12 / 100;
    let emi = 0;

    if (r === 0) {
      emi = p / n;
    } else {
      const growth = (1 + r) ** n;
      emi = (p * r * growth) / (growth - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi,
      totalPayment,
      totalInterest,
      months: n,
    };
  }, [annualRate, principal, tenureUnit, tenureValue]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="loan-amount" className="block text-sm font-medium text-gray-700 mb-2">
            Loan amount
          </label>
          <input
            id="loan-amount"
            type="number"
            min="0"
            step="100"
            value={principal}
            onChange={(event) => setPrincipal(event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700 mb-2">
            Interest rate (annual %)
          </label>
          <input
            id="interest-rate"
            type="number"
            min="0"
            step="0.01"
            value={annualRate}
            onChange={(event) => setAnnualRate(event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
        <div>
          <label htmlFor="tenure-value" className="block text-sm font-medium text-gray-700 mb-2">
            Loan tenure
          </label>
          <input
            id="tenure-value"
            type="number"
            min="1"
            step="1"
            value={tenureValue}
            onChange={(event) => setTenureValue(event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="tenure-unit" className="block text-sm font-medium text-gray-700 mb-2">
            Unit
          </label>
          <select
            id="tenure-unit"
            value={tenureUnit}
            onChange={(event) => setTenureUnit(event.target.value as TenureUnit)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="years">Years</option>
            <option value="months">Months</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Monthly EMI</p>
          <p className="mt-1 text-xl font-bold text-gray-900">
            {result ? currencyFormatter.format(result.emi) : "-"}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Payment</p>
          <p className="mt-1 text-xl font-bold text-gray-900">
            {result ? currencyFormatter.format(result.totalPayment) : "-"}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Interest</p>
          <p className="mt-1 text-xl font-bold text-gray-900">
            {result ? currencyFormatter.format(result.totalInterest) : "-"}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        EMI formula: [P x R x (1+R)^N] / [(1+R)^N - 1], where P is principal, R is monthly interest
        rate, and N is number of months ({result?.months ?? "-"}).
      </p>
    </div>
  );
}
