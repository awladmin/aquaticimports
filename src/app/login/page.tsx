import Link from "next/link";
import { loginAction } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
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
import { ShieldCheck, UserCog } from "lucide-react";
import type { Metadata } from "next";

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
        <Card className="border-border/70 shadow-lg shadow-brand-500/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Trade login</CardTitle>
            <CardDescription>
              Enter your trade credentials to see stock lists, shipment
              schedule and supplier info.
            </CardDescription>
          </CardHeader>
          <form action={loginAction}>
            <CardContent className="space-y-4">
              <input
                type="hidden"
                name="redirectTo"
                value={redirectTo ?? "/"}
              />
              <div className="space-y-2">
                <Label htmlFor="username">Username or email</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="you@yourshop.co.uk"
                  defaultValue="trade-demo"
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
                  defaultValue="demo"
                  required
                />
              </div>
              <input type="hidden" name="role" value="trade" />
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                className="w-full bg-brand-500 text-white hover:bg-brand-600"
              >
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                Sign in
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Forgotten your password?{" "}
                <Link href="/contact" className="underline hover:text-foreground">
                  Contact us
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>

        <Card className="mt-4 border-dashed border-brand-300/60 bg-brand-50/50">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-semibold">
              Demo shortcuts
            </CardTitle>
            <CardDescription className="text-xs">
              For the pitch — skip straight to a signed-in session.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-0">
            <form action={loginAction}>
              <input type="hidden" name="username" value="trade-demo" />
              <input type="hidden" name="role" value="trade" />
              <input type="hidden" name="redirectTo" value={redirectTo ?? "/"} />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <ShieldCheck className="mr-1.5 h-4 w-4 text-brand-600" />
                Enter as trade customer
              </Button>
            </form>
            <form action={loginAction}>
              <input type="hidden" name="username" value="colin" />
              <input type="hidden" name="role" value="admin" />
              <input type="hidden" name="redirectTo" value="/admin" />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <UserCog className="mr-1.5 h-4 w-4 text-brand-600" />
                Enter admin dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don&apos;t have a trade account?{" "}
          <Link
            href="/contact"
            className="font-medium text-brand-700 underline-offset-4 hover:underline"
          >
            Apply here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
