import {list, check, todo, home} from "./Icons";

const MainMenu = [
    {
        id: 1,
        title: "Dashboard",
        icon: home,
        link: "/dashboard",
    },
    {
        id: 2,
        title: "Checklist",
        icon: list,
        link: "/priority",
    },
    {
        id: 3,
        title: "Completed",
        icon: check,
        link: "/completed",
    },
    {
        id: 4,
        title: "Complete Now",
        icon: todo,
        link: "/incomplete",
    },
];

export default MainMenu;