"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

interface PostResponse {
  message?: string;
  error?: string;
}

export function LoginForm() {
  const router = useRouter();

  const [postResponse, setPostResponse] = useState<PostResponse>({
    message: undefined,
    error: undefined,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setPostResponse({ message: undefined, error: undefined });

    try {
    } catch (error) {
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
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
                <Input placeholder="password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-6">
          Sign in
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
