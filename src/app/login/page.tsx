import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Trade login",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <BrandLogo size="lg" />
        </Link>
        <LoginForm redirectTo={redirectTo ?? "/"} />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don&apos;t have a trade account?{" "}
          <Link
            href="/contact"
            className="font-medium text-brand-700 underline-offset-4 hover:underline"
          >
            Request access
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
