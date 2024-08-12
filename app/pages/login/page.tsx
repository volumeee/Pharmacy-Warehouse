"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Jika sudah login, redirect ke dashboard
      router.push("/");
    }
  }, [session, router]);

  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/", // Set callback URL untuk redirect otomatis setelah login
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleSignIn}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
