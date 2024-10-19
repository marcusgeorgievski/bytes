"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  conditions: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions.",
  }),
});

interface PostResponse {
  message?: string;
  error?: string;
}

export function SignupForm() {
  const router = useRouter();

  const [postResponse, setPostResponse] = useState<PostResponse>({
    message: undefined,
    error: undefined,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      conditions: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setPostResponse({ message: undefined, error: undefined });

    try {
      router.push("/login");
    } catch (error: any) {
      setPostResponse({ error: error.message });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name, you can change it later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                We&apos;ll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="l0veapp1es%" {...field} type="password" />
              </FormControl>
              <FormDescription>Minimum 4 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="conditions"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center rounded-md p-2 gap-2 mb-2 mt-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="flex items-center -translate-y-[3px] ">
                <FormLabel className="text-sm font-normal">
                  I accept the{" "}
                  <Link
                    href="/examples/forms"
                    className="hover:text-blue-500 underline"
                  >
                    terms and conditions
                  </Link>
                  .
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign up
        </Button>

        {postResponse.error && (
          <p className="mt-4 text-red-600 text-center text-sm">
            {postResponse.error}
          </p>
        )}
        {postResponse.message && (
          <p className="mt-4 text-green-600 text-center text-sm">
            {postResponse.message}
          </p>
        )}
      </form>
    </Form>
  );
}
