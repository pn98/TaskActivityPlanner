"use client";
import { useSession } from "@clerk/nextjs";

export default function Page() {
  const { session } = useSession();

  return (
    <div>
      <h1 className="text-4xl font-semibold">Page</h1>

      <div className="flex items-center gap-6">
        <img
          src={session?.user.imageUrl}
          alt="Profile Picture"
          className="h-20 mt-8 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-semibold mt-4">
            {session?.user.fullName}
          </h2>

          <p className="text-gray-200 mt-2">
            {session?.user.primaryEmailAddress
              ? session?.user.primaryEmailAddress.emailAddress
              : "No email"}
          </p>

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
