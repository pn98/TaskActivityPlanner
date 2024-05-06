"use client";
import React from "react";
import { useGlobalState } from "../context/globalProvider";
import TaskItem from "../Components/TaskItem/taskItem";
import { getPayment, createPayment } from "../actions/payment";
import { useEffect } from "react";
import Payment from "../Components/payment";

// define the Page component
function page() {
  // access necessary global state
  const { incompleteTasks, tasks } = useGlobalState();
  // initialize payment state
  const [payment, setPayment] = React.useState<any>(null);

  // effect to check for incomplete tasks and scroll to them
  useEffect(() => {
    const incompleteTaskExists = tasks.some(
      (task: { isCompleted: any }) => !task.isCompleted
    );

    if (incompleteTaskExists) {
      window.location.href = "#incomplete-tasks";
    }
  }, [tasks]);

  // effect to fetch payment information on component mount
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

  // function to handle payment creation
  const handlePayment = async () => {
    const { payment, error } = await createPayment();

    if (error) {
      console.log("Error creating payment: ", error);
    } else {
      console.log("Payment created: ", payment);
      setPayment(payment);
    }
  };

  // render Payment component if payment information is not available
  if (!payment) {
    return <Payment onPaymentSuccess={handlePayment} />;
  }

  // render the page content
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Title</th>
            <th style={{ textAlign: "left" }}>Description</th>
            <th style={{ textAlign: "left" }}>Date</th>
            <th style={{ textAlign: "left" }}>Workload</th>
            <th style={{ textAlign: "left" }}>Priority</th>
            <th style={{ textAlign: "left" }}>Duration</th>
            <th style={{ textAlign: "left" }}>Mood</th>
            <th style={{ textAlign: "left" }}>Actual Workload</th>
            <th style={{ textAlign: "left" }}>Mood After</th>
            <th style={{ textAlign: "left" }}>Actual Duration</th>
            <th style={{ textAlign: "left" }}>Status</th>
            <th style={{ textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        {incompleteTasks.map((task: any) => (
          <TaskItem share={true} key={task._id} {...task} />
        ))}
      </table>
    </div>
  );
}

export default page;
