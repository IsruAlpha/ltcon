"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 mx-auto w-fit px-4 sm:px-6">
        <div className="bg-foreground/5 flex items-center gap-4 sm:gap-6 rounded-full py-2 pl-4 pr-2 sm:pl-5 backdrop-blur">
          <span className="font-semibold text-lg tracking-tight">ሰዓት</span>
          <Button asChild variant="outline" size="sm" className="pr-1.5">
            <Link href="/converter">
              <span className="text-nowrap">Convert Time</span>
              <ChevronRight className="opacity-50" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="overflow-hidden min-h-screen flex items-center justify-center">
        <section className="bg-background w-full">
          <div className="relative py-16 sm:py-24">
            <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6">
              <div className="mask-radial aspect-3/2 pointer-events-none relative mx-auto max-w-xs sm:max-w-xl opacity-75 mix-blend-darken">
                <div className="bg-background absolute inset-0 mix-blend-overlay" />
                <Image
                  src="https://images.unsplash.com/photo-1634595947394-87012e7b12ba?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Watch in dark"
                  className="dark:mix-blend-lighten w-full h-auto"
                  width={1340}
                  height={560}
                  priority
                />
              </div>
              <div className="mx-auto mt-6 max-w-md text-center">
                <h1 className="text-balance font-serif text-3xl sm:text-4xl md:text-5xl font-medium">
                  What time is it in Ethiopia?
                </h1>
                <p className="text-muted-foreground mt-3 sm:mt-4 text-balance text-sm sm:text-base">
                  Convert any AM/PM time to Ethiopian time
                </p>
                <Button asChild className="mt-5 sm:mt-6 pr-1.5 rounded-full">
                  <Link href="/converter">
                    <span className="text-nowrap">Start Converting</span>
                    <ChevronRight className="opacity-50" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
