import { Link } from "react-router-dom";
import './ForgetPassword.css';
import { FaArrowLeft } from "react-icons/fa";

const ForgetPassword = () => {
  return (
    <div className='LoginApp'>
      <div className='LoginHorizontalLine'></div>
      <div className='LoginContent'>
        <h1 className='Loginadmin'>ADMIN</h1>
        <form className='LoginForm' onSubmit={(e) => e.preventDefault()}>
          <Link to='/'><FaArrowLeft className="Loginforgetpasswordarrow" /></Link>
          <h1>Forgot Password</h1>
          <p>Enter your email address and we’ll send a link to reset your password</p>
          <div className='Loginemail'>
            <label>Enter your email address:</label> <br />
            <input type='Loginemail' placeholder='Email address' />
          </div>
          <button className="Loginrequestbtn">REQUEST PASSWORD</button>
          <div className="Loginlinks">
            <Link id="LoginLinks" to='/'>Back to Log in</Link>
            <Link id="LoginLinks" to='/ChangePassword'>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;