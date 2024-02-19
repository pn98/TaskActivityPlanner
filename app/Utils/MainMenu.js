import { home, list, todo, mailIcon, bell, gear, edit } from "./Icons";

const MainMenu = [
    {
        id: 1,
        title: "Dashboard",
        icon: home,
        link: "/Dashboard",
    },
    {
        id: 2,
        title: "Checklist",
        icon: list,
        link: "/Checklist",
    },
    {
        id: 3,
        title: "Calendar",
        icon: todo,
        link: "/Calendar",
        
    },
    {
        id: 4,
        title: "Messages",
        icon: mailIcon,
        link: "/Messages",
    },
    {
        id: 5,
        title: "Notifications",
        icon: bell,
        link: "/Notifications",
    },
    {
        id: 6,
        title: "Preferences",
        icon: gear,
        link: "/Preferences",
    },
    {
        id: 7,
        title: "Smart Scheduling",
        icon: edit,
        link: "/SmartScheduling",
    },
];

export default MainMenu;