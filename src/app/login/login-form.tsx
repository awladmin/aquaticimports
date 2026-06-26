"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
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
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [supabase] = useState(() => createClient());
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Please enter your email.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      // shouldCreateUser: false ensures only existing accounts can sign in;
      // unknown emails don't trigger a code or create a user. The error (if
      // any) is intentionally swallowed so the UI never reveals whether the
      // address is registered.
      await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: { shouldCreateUser: false },
      });
      setStep("code");
    } finally {
      setPending(false);
    }
  };

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim();
    if (!cleanCode) {
      setError("Please enter the code from your email.");
      return;
    }
    setError(null);
    setPending(true);
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: cleanCode,
      type: "email",
    });
    if (verifyError) {
      setError(
        "That code didn't work. It may have expired. Try again, or send a fresh one.",
      );
      setPending(false);
      return;
    }
    // Success: don't clear pending. The spinner stays spinning until the full
    // page reload tears this component down, so the user never sees the button
    // pop back to a clickable state in the gap between verify and navigation.
    // Full reload (rather than client-side navigation) ensures the freshly
    // written auth cookies are sent on the next request.
    window.location.href = redirectTo;
  };

  if (step === "email") {
    return (
      <Card className="border-border/70 shadow-lg shadow-brand-500/5">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Trade login</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a sign-in code.
          </CardDescription>
        </CardHeader>
        <form onSubmit={sendCode}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourshop.co.uk"
                autoComplete="email"
                autoFocus
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 border-t-0 bg-transparent pt-6">
            <Button
              type="submit"
              variant="brand"
              className="w-full"
              disabled={pending}
            >
              {pending ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-1.5 h-4 w-4" />
              )}
              {pending ? "Sending..." : "Send me a code"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return (
    <Card className="border-border/70 shadow-lg shadow-brand-500/5">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Check your email</CardTitle>
        <CardDescription>
          If you have an account, we&apos;ve sent a sign-in code to{" "}
          <span className="font-medium text-foreground">{email}</span>. Enter
          it below to sign in.
        </CardDescription>
      </CardHeader>
      <form onSubmit={verifyCode}>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="code">Sign-in code</Label>
            <Input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              maxLength={8}
              placeholder="12345678"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t-0 bg-transparent pt-6">
          <Button
            type="submit"
            variant="brand"
            className="w-full"
            disabled={pending}
          >
            {pending ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : null}
            {pending ? "Signing you in..." : "Sign in"}
          </Button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError(null);
            }}
            disabled={pending}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <ArrowLeft className="h-3 w-3" />
            Use a different email
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
