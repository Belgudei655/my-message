"use client";
import React from "react";
import { ChatDisplay } from "@/components";
import SignInButton from "@/components/sign-in-button";
import { AuthProvider } from "@/utils/AuthContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      {user ? <ChatDisplay /> : <SignInButton />}
    </div>
  );
};

const Home = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Home;
