"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <div className="pt-10">
      <Card className="max-w-[400px] mx-auto">
        <CardHeader>
          <h2 className="text-xl font-bold">Sign up</h2>

          <p className="text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Log in
            </Link>
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
