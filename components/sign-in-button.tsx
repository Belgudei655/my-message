"use client";
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { provider, auth, db } from "@/utils/firebase";

const SignInButton: React.FC = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="bg-blue-500 text-white p-2 rounded-md"
    >
      Sign in with Google
    </button>
  );
};

export default SignInButton;
