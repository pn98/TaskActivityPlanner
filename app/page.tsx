"use client";
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";

export default function Home() {
  return <Tasks />;
}
