
import { home, todo, edit, calendar, user, gear, join } from "./Icons";

const menu = [
  {
    id: 1,
    title: "Dashboard",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Complete",
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
    id: 4,
    title: "Heatmap",
    icon: calendar,
    link: "/heatmap",
  },
  {
    id: 6,
    title: "Payment",
    icon: join,
    link: "/payment",
  },
  {
    id: 5,
    title: "Share",
    icon: user,
    link: "/share",
  },
];

export default menu;
