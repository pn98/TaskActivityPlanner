"use client";
import { useSession } from "@clerk/nextjs";

// Define the Page component
export default function Page() {
  const { session } = useSession(); // Retrieve session information

  return (
    <div>
      <h1 className="text-4xl font-semibold" style={{ color: "#D7CEC7" }}>
        Account Information
      </h1>

      <div className="flex items-center gap-6">
        {/* Display user's profile picture */}
        <img
          src={session?.user.imageUrl}
          alt="Profile Picture"
          className="h-20 mt-8 rounded-full"
        />

        <div>
          {/* Display user's full name */}
          <h2 className="text-2xl font-semibold mt-4" style={{ color: "#D7CEC7" }}>
            {session?.user.fullName}
          </h2>

          {/* Display user's primary email address */}
          <p className="text-gray-200 mt-2">
            Email Address:{" "}
            {session?.user.primaryEmailAddress
              ? session?.user.primaryEmailAddress.emailAddress
              : "No email"}
          </p>

          {/* Display user's join date */}
          <p className="text-gray-200 mt-2">
            Joined:{" "}
            {session?.user.createdAt
              ? new Date(session?.user.createdAt).toLocaleDateString()
              : "No date"}
          </p>
        </div>
      </div>
    </div>
  );
}
