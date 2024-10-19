"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { LoginForm } from "./loginForm";

export default function LoginPage() {
  return (
    <div className="pt-10">
      <Card className="max-w-[400px] mx-auto">
        <CardHeader>
          <h2 className="text-xl font-bold">Sign in</h2>

          <p className="text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
