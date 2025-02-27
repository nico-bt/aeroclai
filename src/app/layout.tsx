import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#075056" } }}>
      <html lang="en">
        <body className="max-w-[1200px] mx-auto min-h-screen flex flex-col">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

function Header() {
  return (
    <header className="flex gap-4 mb-8 border-b-2 p-4">
      <Link href={"/"} className="cursor-pointer mr-auto">
        <Image src="/logo.png" alt="Logo" height={24} width={85} />
      </Link>

      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
    </header>
  );
}
