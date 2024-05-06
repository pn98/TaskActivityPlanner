"use client";
import { useSession } from "@clerk/nextjs";

// define the Page component
export default function page() {
  const { session } = useSession(); // retrieve session information

  return (
    <div>
      <h1 className="text-4xl font-semibold">Page</h1>

      <div className="flex items-center gap-6">
        {/* display user's profile picture */}
        <img
          src={session?.user.imageUrl}
          alt="Profile Picture"
          className="h-20 mt-8 rounded-full"
        />

        <div>
          {/* display user's full name */}
          <h2 className="text-2xl font-semibold mt-4">
            {session?.user.fullName}
          </h2>

          {/* display user's primary email address */}
          <p className="text-gray-200 mt-2">
            {session?.user.primaryEmailAddress
              ? session?.user.primaryEmailAddress.emailAddress
              : "No email"}
          </p>

          {/* display user's join date */}
          <p className="text-gray-200 mt-2">
            Joined :{" "}
            {session?.user.createdAt
              ? new Date(session?.user.createdAt).toLocaleDateString()
              : "No date"}
          </p>
        </div>
      </div>
    </div>
  );
}
