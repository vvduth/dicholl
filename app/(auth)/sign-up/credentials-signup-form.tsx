"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { signUpuser } from "@/lib/actions/user.action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
const CredentialsSignupForm = () => {
  const [data, action] = useActionState(signUpuser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const {pending} = useFormStatus();

    return (
        <Button disabled={pending}
         className="w-full"
         variant={"default"}
        >
            {pending ? "Signing up..." : "Sign up"}
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
          <Label htmlFor="name">name</Label>
          <Input
            id="name"
            name="name"
            required
            type="text"
            autoComplete="name"
            defaultValue={""}
          />
        </div>
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
          <Label htmlFor="confirmPassword">confirmPassword</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            required
            type="password"
            autoComplete="confirmPassword"
            defaultValue={""}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="link" target="_self">
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignupForm;
