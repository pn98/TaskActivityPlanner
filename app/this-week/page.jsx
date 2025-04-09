"use client";

import dynamic from "next/dynamic";

// Dynamically import CalendarView to avoid SSR issues
const CalendarView = dynamic(() => import("../Components/CalendarView/WeeklyCalendar"), {
  ssr: false,
});

export default function ThisWeekPage() {
  return (
    <main className="p-4 bg-black min-h-screen">
      <CalendarView />
    </main>
  );
}
