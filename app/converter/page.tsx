"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConfettiButton } from "@/components/evil-buttons/confetti-button";
import {
  convertToEthiopian,
  parse12HourTo24Hour,
  type EthiopianTimeResult,
} from "@/lib/ethiopian-time";

export default function ConverterPage() {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [result, setResult] = useState<EthiopianTimeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);

    if (isNaN(h) || isNaN(m) || h < 1 || h > 12 || m < 0 || m > 59) {
      setError("Please enter a valid time (hour 1-12, minute 0-59)");
      setResult(null);
      return;
    }

    try {
      const westernHour = parse12HourTo24Hour(h, m, period);
      const ethiopian = convertToEthiopian(westernHour, m);
      setResult(ethiopian);
      setError(null);
    } catch {
      setError("Invalid time");
      setResult(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleConvert();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed inset-x-0 top-4 z-50 mx-auto w-fit">
        <div className="bg-foreground/5 flex items-center gap-6 rounded-full py-2 pl-5 pr-2 backdrop-blur">
          <Link href="/" className="font-ivar text-lg font-semibold tracking-tight">
            ሰዓት
          </Link>
          <Button asChild variant="outline" size="sm" className="pr-1.5">
            <Link href="/">
              <span className="text-nowrap">Home</span>
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="max-w-xl w-full flex flex-col items-center gap-16">
          <div className="text-center">
            <h1 className="font-ivar text-5xl sm:text-7xl font-bold tracking-tight mb-4">
              ሰዓት
            </h1>
            <p className="text-muted-foreground">
              Convert any AM/PM time to Ethiopian time
            </p>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Hour
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={hour}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    if (v === "" || (parseInt(v, 10) >= 1 && parseInt(v, 10) <= 12))
                      setHour(v);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full h-11 rounded-full border border-border bg-background px-3 text-center text-lg font-medium outline-none focus:border-foreground/40 transition-colors"
                />
              </div>
              <span className="flex items-end pb-2.5 text-2xl font-light text-muted-foreground">
                :
              </span>
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Minute
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={minute}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    if (v === "" || (parseInt(v, 10) >= 0 && parseInt(v, 10) <= 59))
                      setMinute(v);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full h-11 rounded-full border border-border bg-background px-3 text-center text-lg font-medium outline-none focus:border-foreground/40 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground block">
                  &nbsp;
                </label>
                <div className="flex rounded-full border border-border overflow-hidden h-11">
                  <button
                    onClick={() => setPeriod("AM")}
                    className={`flex-1 px-3 text-sm font-medium transition-colors ${
                      period === "AM"
                        ? "bg-foreground text-background"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    AM
                  </button>
                  <button
                    onClick={() => setPeriod("PM")}
                    className={`flex-1 px-3 text-sm font-medium transition-colors ${
                      period === "PM"
                        ? "bg-foreground text-background"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            <ConfettiButton
              onCelebrate={handleConvert}
              className="w-full h-11 text-base rounded-full"
              label="Convert to Ethiopian Time"
            />

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            {result !== null && (
              <div className="rounded-2xl border border-border/60 bg-card p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">
                  {result.periodEnglish}
                </p>
                <p className="text-3xl font-bold tracking-tight">
                  {result.hour}:{String(result.minute).padStart(2, "0")}{" "}
                  <span className="text-lg font-normal text-muted-foreground">
                    {result.period}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            ሰዓት — Convert AM/PM to Ethiopian time
          </p>
          <p className="text-muted-foreground text-xs">
            All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
