"use client";

import { useFormStatus } from "react-dom";
import Spinner from "./spinner";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  form?: string;
}

export default function SubmitButton({
  children,
  className,
  form,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      form={form}
      disabled={pending}
      className={`${className} inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all`}
    >
      {pending ? (
        <>
          <Spinner />
          <span>Saving...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}