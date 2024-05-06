"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";

// defining the page component
function page() {
  // rendering the SignIn component from clerk
  return (
    <div className="flex items-center justify-center h-full">
      <SignIn />
    </div>
  );
}

export default page;
