
import logo from '../../image/logo.png';
import AmericanFlag from '../../image/AmericanFlag.png';
import { FaAngleDown } from "react-icons/fa6";
import { FaCaretUp } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import profile from '../../image/profile.png';
import './Header.css';


const Header = () => {
    return (
        <header className="Header">
            <img src={logo} alt="Logo" width={24.57} height={24} />
            <div className='companyLogoTitle'>
                <img src={logo} alt="Logo" width={102.04} height={100} />
                <h1>ANT Technology</h1>
            </div>
            <div className="Branch">
                <p>Branch:</p>
                <div className="select-wrapper">
                    <select>
                        <option value="health">HEALTH</option>
                    </select>
                    <FaAngleDown className="select-icon" />
                </div>
            </div>
            <button className='country'>
                <img src={AmericanFlag} alt='American Flag' width={35} height={17} />
                <span>English</span>
                <FaCaretUp />
            </button>
            <MdNotificationsNone className='NotifyIcon' />
            <div className="Profile">
                <img src={profile} alt='Profile Pic' width={78} height={78} />
                <div>
                    <h2>Smith</h2>
                    <p>Admin</p>
                    <MdOutlineSettings className='settingIcon' />
                </div>
            </div>
        </header>
    );
}

export default Header;