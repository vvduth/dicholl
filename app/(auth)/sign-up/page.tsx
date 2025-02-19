import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import CredentialsSignupForm from "./credentials-signup-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Sign Up",
};

const SignupPage = async (props : {
  searchParams: Promise<{
    callbackUrl: string;
  }>
}) => {
  const {callbackUrl} = await props.searchParams;
  const session = await auth();

  if (session) {
    redirect(callbackUrl ||  "/");
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href={"/"} className="flex-center">
            <Image
              src={"/images/logo.svg"}
              alt="Logo"
              width={100}
              height={100}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Create you account</CardTitle>
          <CardDescription className="text-center">
            Enter your information below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignupForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
