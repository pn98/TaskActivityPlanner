"use client";

import React from "react";
import { useGlobalState } from "../context/globalProvider";
import TaskItem from "../Components/TaskItem/TaskItem";

// CompletedPage component definition
function CompletedPage() {
  // Extracting completedTasks from global state
  const { completedTasks } = useGlobalState();

  return (
    // Container for the completed tasks table
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Horizontal overflow container to make the table scrollable on small screens */}
      <div style={{ overflowX: "auto" }}>
        {/* Table with fixed layout and collapsed borders */}
        <table style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {/* Column headings */}
              {[
                "Title",
                "Description",
                "Date",
                "Start Time",
                "Duration (Minutes)",
                "Workload",
                "Predicted Mood",
                "Priority",
                "Actual Workload",
                "Post Task Mood Perception",
                "Actual Duration",
                "Status",
                "Actions",
              ].map((heading) => (
                // Each heading cell
                <th
                  key={heading}
                  style={{
                    textAlign: "center", // Center text
                    color: "#D7CEC7", // Text color
                    whiteSpace: "nowrap", // Prevent text from wrapping
                    overflow: "hidden", // Hide overflow text
                    textOverflow: "ellipsis", // Show ellipsis for overflow text
                    padding: "0.3rem", // Padding inside cell
                    border: "1px solid #D7CEC7", // Border style
                    width: heading === "Description" ? "200px" : "100px", // Fixed width for columns
                    fontSize: "0.8rem", // Smaller font size
                  }}
                >
                  {/* Inner div to allow text wrapping within the set width */}
                  <div
                    style={{
                      maxWidth: "100%", // Ensure it doesn't exceed the cell width
                      whiteSpace: "normal", // Allow text to wrap
                      margin: "0 auto", // Center the text
                    }}
                  >
                    {heading}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Render each completed task */}
            {completedTasks.map((task: any) => (
              <TaskItem key={task.id} {...task} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompletedPage;
