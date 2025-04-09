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
<<<<<<< HEAD
    id: 4,
    title: "This Year",
    icon: calendar,
    link: "/heatmap",
  },
  {
    id: 2,
    title: "Completed",
=======
    id: 2,
    title: "Complete",
>>>>>>> 530f2b85c322b2862d872c773c43eb1292b693c0
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
<<<<<<< HEAD
    id: 5,
    title: "Today",
    icon: edit,
    link: "/ToDo",
=======
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
>>>>>>> 530f2b85c322b2862d872c773c43eb1292b693c0
  },
];

export default menu;
