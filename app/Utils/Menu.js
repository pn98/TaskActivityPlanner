import { home, list, todo, edit } from "./Icons";

const menu = [
  {
    id: 1,
    title: "Dashboard",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Priority",
    icon: list,
    link: "/priority",
  },
  {
    id: 3,
    title: "Completed Tasks",
    icon: todo,
    link: "/completed",

  },
  {
    id: 4,
    title: "To Complete",
    icon: edit,
    link: "/todo",
  },
];

export default menu;
