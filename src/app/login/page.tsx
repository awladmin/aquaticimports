import Link from "next/link";
import { loginAction } from "@/lib/auth-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/brand-logo";
import type { Metadata } from "next";
import { SignInButton } from "./sign-in-button";

export const metadata: Metadata = {
  title: "Trade login",
};

const ERROR_MESSAGES: Record<string, string> = {
  missing: "Please enter both your email and password.",
  invalid: "Those credentials weren't recognised. Try again, or get in touch if you've forgotten your password.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string }>;
}) {
  const { redirectTo, error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : null;

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <BrandLogo size="lg" />
        </Link>
        <Card className="border-border/70 shadow-lg shadow-brand-500/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Trade login</CardTitle>
            <CardDescription>
              Enter your trade credentials to access this week&apos;s
              stocklists.
            </CardDescription>
          </CardHeader>
          <form action={loginAction}>
            <CardContent className="space-y-4">
              <input
                type="hidden"
                name="redirectTo"
                value={redirectTo ?? "/"}
              />
              {errorMessage && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {errorMessage}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="username"
                  name="username"
                  type="email"
                  placeholder="you@yourshop.co.uk"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 border-t-0 bg-transparent pt-6">
              <SignInButton />
              <p className="text-center text-xs text-muted-foreground">
                Forgotten your password?{" "}
                <Link
                  href="/contact"
                  className="underline hover:text-foreground"
                >
                  Get in touch
                </Link>{" "}
                and we&apos;ll reset it for you.
              </p>
            </CardFooter>
          </form>
        </Card>

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
