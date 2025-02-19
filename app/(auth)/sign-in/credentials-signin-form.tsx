"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
const CredentialsSigninForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const {pending} = useFormStatus();

    return (
        <Button disabled={pending}
         className="w-full"
         variant={"default"}
        >
            {pending ? "Signing in..." : "Sign in"}
        </Button>
    )
  }
  return (
    <form action={action}>
      <input 
        type="hidden"
        name="callbackUrl"
        value={callbackUrl}
      />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            autoComplete="email"
            defaultValue={""}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            autoComplete="password"
            defaultValue={""}
          />
        </div>
        <div>
          <SignInButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="link" target="_self">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSigninForm;
