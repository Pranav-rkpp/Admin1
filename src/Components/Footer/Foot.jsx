import './Footer.css';

const Footer = () => {

    const date = new Date().getFullYear();

    return (
        <footer className="Footer">
            &copy; {date} Copyright:ANT technology.️
        </footer>
    );
}
export default Footer;