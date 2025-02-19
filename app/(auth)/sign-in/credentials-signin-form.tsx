import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

const CredentialsSigninForm = () => {
  return (
    <form>
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
          <Button className="w-full">Sign in</Button>
        </div>
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
