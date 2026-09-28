import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found — OrditAI",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Navbar />

      <main className="site-gutter site-section flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-[36rem] text-center">
          <p className="type-label text-violet">404</p>

          <h1 className="type-display mt-6 text-ink">
            This page didn&rsquo;t make it into the file.
          </h1>

          <p className="type-lead mt-8 text-body">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/" className={buttonVariants()}>
              Back to home
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
              Contact us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
