import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid sm:grid-cols-2 gap-2 pb-6 flex-1 w-full">
      <div className="hidden sm:grid bg-green-600 rounded-xl items-center justify-center">
        Logo Img
      </div>

      <div className="flex w-full">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "hover:bg-black text-sm",
              card: "w-full h-full",
              cardBox: "w-full h-full",
              rootBox: "w-full h-full",
              headerTitle: "text-2xl",
            },
          }}
        />
      </div>
    </div>
  );
}
