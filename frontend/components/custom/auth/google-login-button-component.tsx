"use client";

import FormMessageComponent from "@/components/custom/form/form-message-component";
import { useGoogleLoginMutation } from "@/hooks/use-google-login-mutation";
import { LoaderCircle } from "lucide-react";

const GoogleLoginButtonComponent = () => {
  const { mutate, isPending, error } = useGoogleLoginMutation();

  const handleClick = () => {
    mutate();
  };

  return (
    <div className="mx-auto mt-8 flex w-full max-w-reading flex-col gap-3 border-t border-line pt-8">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="btn-secondary justify-center"
      >
        {isPending && (
          <LoaderCircle className="size-4 animate-spin" aria-hidden />
        )}
        Google로 계속하기
      </button>
      <FormMessageComponent
        urgent
        className="form-error"
        message={error ? error.message : ""}
      />
    </div>
  );
};

export default GoogleLoginButtonComponent;
