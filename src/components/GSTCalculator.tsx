"use client";

import { useCallback, useMemo, useState } from "react";
import {
  calculateGst,
  formatCurrency,
  formatResultSummary,
  type GstMode,
  parseAmountInput,
  parseRateInput,
  validateAmount,
  validateRate,
} from "@/lib/gst";

const AUTHOR_NAME = "Varun Gupta";
const AUTHOR_EMAIL = "vg9584911@email.com";

export default function GSTCalculator() {
  const [amountInput, setAmountInput] = useState("");
  const [rateInput, setRateInput] = useState("18");
  const [mode, setMode] = useState<GstMode>("exclusive");
  const [amountTouched, setAmountTouched] = useState(false);
  const [rateTouched, setRateTouched] = useState(false);
  const [copied, setCopied] = useState(false);

  const amountError = useMemo(
    () => (amountTouched ? validateAmount(amountInput) : null),
    [amountInput, amountTouched]
  );

  const rateError = useMemo(
    () => (rateTouched ? validateRate(rateInput) : null),
    [rateInput, rateTouched]
  );

  const parsedAmount = useMemo(
    () => parseAmountInput(amountInput),
    [amountInput]
  );

  const parsedRate = useMemo(() => parseRateInput(rateInput), [rateInput]);

  const result = useMemo(() => {
    if (parsedAmount === null || parsedAmount <= 0) return null;
    if (parsedRate === null || parsedRate <= 0 || parsedRate > 100) return null;
    return calculateGst(parsedAmount, parsedRate, mode);
  }, [parsedAmount, parsedRate, mode]);

  const handleReset = useCallback(() => {
    setAmountInput("");
    setRateInput("18");
    setMode("exclusive");
    setAmountTouched(false);
    setRateTouched(false);
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!result || parsedRate === null) return;

    const text = formatResultSummary(result, parsedRate, mode);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [result, parsedRate, mode]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <header className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          India GST Calculator
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Smart GST Calculator
        </h1>
        <p className="mt-3 text-base text-slate-400 sm:text-lg">
          Instantly compute GST for inclusive or exclusive amounts at any
          custom tax rate.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="border-b border-white/10 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 px-6 py-5 sm:px-8">
          <h2 className="text-lg font-semibold text-white">Calculate GST</h2>
          <p className="mt-1 text-sm text-slate-400">
            Enter an amount, type a GST rate, and choose how GST applies.
          </p>
        </div>

        <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
          {/* Mode toggle */}
          <div>
            <span className="mb-2 block text-sm font-medium text-slate-300">
              GST Mode
            </span>
            <div
              className="grid grid-cols-2 gap-2 rounded-xl bg-slate-800/80 p-1"
              role="radiogroup"
              aria-label="GST calculation mode"
            >
              {(
                [
                  {
                    value: "exclusive" as const,
                    label: "Exclusive",
                    hint: "Amount before GST",
                  },
                  {
                    value: "inclusive" as const,
                    label: "Inclusive",
                    hint: "Amount includes GST",
                  },
                ] as const
              ).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={mode === option.value}
                  onClick={() => setMode(option.value)}
                  className={`rounded-lg px-4 py-3 text-left transition-all ${
                    mode === option.value
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "text-slate-300 hover:bg-slate-700/60"
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    {option.label}
                  </span>
                  <span
                    className={`mt-0.5 block text-xs ${
                      mode === option.value
                        ? "text-emerald-100"
                        : "text-slate-500"
                    }`}
                  >
                    {option.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount input */}
          <div>
            <label
              htmlFor="amount"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              {mode === "exclusive" ? "Taxable Amount (₹)" : "Final Amount (₹)"}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                ₹
              </span>
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={amountInput}
                onChange={(e) => {
                  setAmountInput(e.target.value);
                  setAmountTouched(true);
                }}
                onBlur={() => setAmountTouched(true)}
                aria-invalid={Boolean(amountError)}
                aria-describedby={amountError ? "amount-error" : undefined}
                className={`w-full rounded-xl border bg-slate-800/60 py-3.5 pr-4 pl-9 text-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                  amountError
                    ? "border-red-500/60 focus:ring-red-500/40"
                    : "border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30"
                }`}
              />
            </div>
            {amountError && (
              <p
                id="amount-error"
                role="alert"
                className="mt-2 text-sm text-red-400"
              >
                {amountError}
              </p>
            )}
          </div>

          {/* GST rate input */}
          <div>
            <label
              htmlFor="gst-rate"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              GST Rate (%)
            </label>
            <div className="relative">
              <input
                id="gst-rate"
                type="text"
                inputMode="decimal"
                placeholder="18"
                value={rateInput}
                onChange={(e) => {
                  setRateInput(e.target.value);
                  setRateTouched(true);
                }}
                onBlur={() => setRateTouched(true)}
                aria-invalid={Boolean(rateError)}
                aria-describedby={rateError ? "rate-error" : undefined}
                className={`w-full rounded-xl border bg-slate-800/60 py-3.5 pr-10 pl-4 text-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                  rateError
                    ? "border-red-500/60 focus:ring-red-500/40"
                    : "border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30"
                }`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
                %
              </span>
            </div>
            {rateError && (
              <p
                id="rate-error"
                role="alert"
                className="mt-2 text-sm text-red-400"
              >
                {rateError}
              </p>
            )}
          </div>

          {/* Results */}
          <section
            aria-live="polite"
            aria-label="Calculation results"
            className="rounded-xl border border-white/10 bg-slate-950/50 p-5"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Results
            </h3>
            <dl className="space-y-4">
              <ResultRow
                label="Taxable Amount"
                value={result ? formatCurrency(result.taxableAmount) : "—"}
                highlight={false}
              />
              <ResultRow
                label="GST Amount"
                value={result ? formatCurrency(result.gstAmount) : "—"}
                highlight={false}
              />
              <ResultRow
                label="Final Amount"
                value={result ? formatCurrency(result.finalAmount) : "—"}
                highlight
              />
            </dl>
            {!result &&
              !amountError &&
              !rateError &&
              amountInput.trim() === "" && (
              <p className="mt-4 text-sm text-slate-500">
                Enter an amount and GST rate to see instant results.
              </p>
            )}
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-xl border border-white/15 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/25 hover:bg-slate-700/60"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result}
              className="flex-1 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? "Copied!" : "Copy Result"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer / Author */}
      <footer className="mt-10 space-y-5 text-center">
        <div className="rounded-xl border border-white/10 bg-slate-900/50 px-6 py-5">
          <p className="text-sm text-slate-400">Built by</p>
          <p className="mt-1 text-lg font-semibold text-white">{AUTHOR_NAME}</p>
          <a
            href={`mailto:${AUTHOR_EMAIL}`}
            className="mt-1 inline-block text-emerald-400 transition hover:text-emerald-300"
          >
            {AUTHOR_EMAIL}
          </a>
        </div>

        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/50 hover:bg-cyan-500/20"
        >
          Built for Digital Heroes
        </a>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} {AUTHOR_NAME}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-sm text-slate-400">{label}</dt>
      <dd
        className={`text-right font-mono text-base tabular-nums ${
          highlight ? "text-lg font-bold text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
