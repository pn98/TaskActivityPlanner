import { home, todo, edit, calendar, user, gear } from "./Icons";

const menu = [
  {
    id: 1,
    title: "Dashboard",
    icon: home,
    link: "/",
  },
  {
    id: 6,
    title: "This Week",
    icon: calendar,
    link: "/this-week",
  },
  {
    id: 4,
    title: "This Year",
    icon: calendar,
    link: "/heatmap",
  },
  {
    id: 2,
    title: "Completed",
    icon: todo,
    link: "/completed",

  },
  {
    id: 3,
    title: "Incomplete",
    icon: edit,
    link: "/todo",
  },
  {
    id: 5,
    title: "Today",
    icon: edit,
    link: "/ToDo",
  },
];

export default menu;
