"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
// ui
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldDescription } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
// hooks
import useCreatePost from "@/src/hooks/useCreatePost";
import { AuthErrorResponse } from "@/src/types";

const MAX_POST_LENGTH = 150;

const postSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Post can't be empty")
    .max(MAX_POST_LENGTH, `Post must be ${MAX_POST_LENGTH} characters or less`),
});

type PostFormValues = z.infer<typeof postSchema>;

interface Props {
  onSuccess: () => void;
}

export function CreatePostForm({ onSuccess }: Props) {
  const createPostMutation = useCreatePost();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: { content: "" },
  });

  const charCount = watch("content").length;
  const isOverLimit = charCount > MAX_POST_LENGTH;

  const onSubmit = (values: PostFormValues) => {
    createPostMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Post shared", { position: "top-center" });
        onSuccess();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<AuthErrorResponse>;
        toast.error(
          axiosError.response?.data?.message || "Couldn't create post",
          { position: "top-center" },
        );
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Field data-invalid={!!errors.content}>
        <Textarea
          placeholder="How's the line looking?"
          aria-invalid={!!errors.content}
          className="min-h-32 max-h-64 resize-none border border-custom-grey"
          autoFocus
          {...register("content")}
        />
        <div className="flex justify-between gap-2 text-sm">
          <FieldDescription className="text-red-500">
            {errors.content?.message}
          </FieldDescription>
          <span
            className={`shrink-0 ${isOverLimit ? "text-red-500" : "text-custom-grey"}`}
          >
            {charCount}/{MAX_POST_LENGTH}
          </span>
        </div>
      </Field>

      <Button
        type="submit"
        className="self-end bg-custom-blue text-white"
        disabled={
          createPostMutation.isPending || charCount === 0 || isOverLimit
        }
      >
        {createPostMutation.isPending ? (
          <span className="flex items-center gap-2">
            <Spinner className="w-4 h-4" />
            Posting...
          </span>
        ) : (
          "Post"
        )}
      </Button>
    </form>
  );
}
