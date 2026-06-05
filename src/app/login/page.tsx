"use client";

import { useRouter } from "next/navigation";
// ui
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
// zod validation
import * as z from "zod";
// RHF
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// hooks
import useLogin from "@/src/hooks/useLogin";
import { AxiosError } from "axios";
import { AuthErrorResponse } from "@/src/types";

// zod shcema =====
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const router = useRouter();
  // login hook
  const loginMutation = useLogin();

  // reacthookfrom
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // form submit handler
  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        console.log("Login successful");
        toast.success("Logged in successfully", {
          position: "top-center",
        });
        setTimeout(() => router.push("/"), 1000);
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<AuthErrorResponse>;
        console.error("Login failed:", axiosError.response?.data?.message);
        toast.error(
          axiosError.response?.data?.message ||
            "Login failed, please try again",
          { position: "top-center" },
        );
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-full mt-10">
      <Card className="w-full max-w-md p-5 py-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription className="text-lg">
            enter your email and a password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Email Field */}
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email" className="text-xl">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  className="py-5 border border-custom-grey text-xl"
                  placeholder="john@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <FieldDescription className="text-red-500">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>
              {/* Password Field */}
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password" className="text-xl">
                  Password
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  className="py-5 border border-custom-grey text-xl"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password ? (
                  <FieldDescription className="text-red-500">
                    {errors.password.message}
                  </FieldDescription>
                ) : (
                  <FieldDescription>
                    Must be at least 8 characters long
                  </FieldDescription>
                )}
              </Field>
              {/* Submit Button */}
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner className="w-4 h-6" />
                      Logging In...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
