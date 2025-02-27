import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 items-center justify-center mt-32">
      <h1 className="font-semibold text-5xl">Home Page</h1>
      <p className="text-2xl">Welcome</p>
      <Link
        href="/messages"
        className="underline-offset-4 underline rounded px-6 py-4 hover:text-white hover:bg-green-800"
      >
        Go to Messages
      </Link>
    </main>
  );
}
