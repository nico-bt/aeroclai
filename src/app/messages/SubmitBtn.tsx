"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  type: "Delete" | "Add";
};

export default function SubmitButton({ type }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const text = type === "Delete" ? "Delete" : "Save Message";
  const pendingText = type === "Delete" ? "Deleting..." : "Saving...";
  const classNameByType =
    type === "Delete"
      ? "bg-red-600 hover:bg-red-900 text-white py-2 px-4 rounded focus:outline-none mb-2"
      : "bg-green-600 hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none mb-2";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${
        pending
          ? "bg-gray-400 cursor-not-allowed py-2 px-4 rounded mb-2"
          : classNameByType
      }`}
    >
      {pending ? pendingText : text}
    </button>
  );
}
