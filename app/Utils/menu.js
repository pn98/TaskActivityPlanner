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
    id: 5,
    title: "Share",
    icon: user,
    link: "/share",
  },
];

export default menu;
