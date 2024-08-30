import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

const SignOutButton: React.FC = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white p-2 rounded-md w-20"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
