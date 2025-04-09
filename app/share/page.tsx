"use client";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context/globalProvider";
import TaskItem from "../Components/TaskItem/TaskItem";
import { getPayment, createPayment } from "../actions/payment";
import Payment from "../Components/payment";

function Page() {
  const { incompleteTasks, tasks } = useGlobalState();
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    const incompleteTaskExists = tasks.some((task: { isCompleted: any }) => !task.isCompleted);

    if (incompleteTaskExists) {
      window.location.href = "#incomplete-tasks";
    }
  }, [tasks]);

  useEffect(() => {
    const fetchPayment = async () => {
      const { payment, error } = await getPayment();

      if (error) {
        console.log("Error getting payment: ", error);
      } else {
        console.log("Payment: ", payment);
        setPayment(payment);
      }
    };

    fetchPayment();
  }, []);

  const handlePayment = async () => {
    const { payment, error } = await createPayment();

    if (error) {
      console.log("Error creating payment: ", error);
    } else {
      console.log("Payment created: ", payment);
      setPayment(payment);
    }
  };

  if (!payment) {
    return <Payment onPaymentSuccess={handlePayment} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <table style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {[
              "Title",
              "Description",
              "Date",
              "Start Time",
              "Estimated Duration",
              "Workload",
              "Predicted Mood",
              "Priority",
              "Actual Workload",
              "Post Task Mood Perception",
              "Actual Duration",
              "Status",
              "Actions",
            ].map((heading) => (
              <th
                key={heading}
                style={{
                  textAlign: "center",
                  color: "#D7CEC7",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  padding: "0.3rem",
                  border: "1px solid #D7CEC7",
                  width: heading === "Description" ? "200px" : "100px",
                  fontSize: "0.8rem",
                }}
              >
                <div
                  style={{
                    maxWidth: "100%",
                    whiteSpace: "normal",
                    margin: "0 auto",
                  }}
                >
                  {heading}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incompleteTasks.map((task: any) => (
            <TaskItem share={true} key={task._id} {...task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
