import { GiHamburgerMenu } from "react-icons/gi";
import { MdHomeFilled } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { ImStatsDots } from "react-icons/im";
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sideBar">
            <GiHamburgerMenu />
            <MdHomeFilled />
            <IoIosMail />
            <FaRegCalendarCheck />
            <IoMdCheckboxOutline />
            <ImStatsDots />
        </aside>
    );
}

export default Sidebar;