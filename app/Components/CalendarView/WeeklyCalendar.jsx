"use client";

import React from "react";
import { Calendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import localizer from "./localizer";
import { useGlobalState } from "../../context/globalProvider";

export default function TaskCalendar() {
  const { tasks } = useGlobalState();

  const events = tasks.map((task) => ({
    title: task.title || "Task",
    start: new Date(task.date),
    end: new Date(task.date),
    allDay: true,
  }));

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        startAccessor="start"
        endAccessor="end"
        className="custom-calendar"
      />

      <style jsx global>{`
        .calendar-container {
          height: 80vh;
          padding: 1rem;
        }

        .custom-calendar,
        .rbc-calendar,
        .rbc-time-view,
        .rbc-time-content,
        .rbc-timeslot-group,
        .rbc-time-header,
        .rbc-day-slot,
        .rbc-date-cell,
        .rbc-event,
        .rbc-event-content,
        .rbc-label,
        .rbc-timeslot-group,
        .rbc-time-header-cell,
        .rbc-time-content > * {
          background-color: transparent !important;
          color: white !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }

        .rbc-toolbar,
        .rbc-header {
          background: transparent !important;
          color: white !important;
        }

        .rbc-selected {
          background-color: rgba(255, 255, 255, 0.2) !important;
        }

        .rbc-today {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
    </div>
  );
}
