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
import useRegister from "@/src/hooks/useRegister";
import { AxiosError } from "axios";
import { AuthErrorResponse } from "@/src/types";

// zod shcema =====
const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
//=======

function RegisterPage() {
  const router = useRouter();
  // register hook
  const registerMutation = useRegister();

  // React Hook Form
  const {
    register, // connects an input to form
    handleSubmit, // rhf wrapper for onSubmit, runs validation first
    formState: { errors }, // validation error messages
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema), // use Zod as my validator
  });

  // form submit handler
  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values, {
      onSuccess: () => {
        console.log("Registration successful!");
        toast.success("Account Created Successfully", {
          position: "top-center",
        });
        setTimeout(() => router.push("/login"), 1000);
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<AuthErrorResponse>;
        console.error(
          "Registration failed:",
          axiosError.response?.data?.message,
        );
        toast.error(
          axiosError.response?.data?.message ||
            "Registration failed, please try again",
          { position: "top-center" },
        );
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-full mt-10">
      <Card className="w-full max-w-md p-5 py-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
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
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner className="w-4 h-4" />
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
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

export default RegisterPage;
