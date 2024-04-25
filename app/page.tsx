"use client";
import Tasks from "./Components/Tasks/Tasks";
import { useGlobalState } from "./Context/globalProvider";

export default function Home() {
  return <Tasks />;
}
