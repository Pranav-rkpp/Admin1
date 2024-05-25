import { Link } from "react-router-dom";
import './ChangePassword.css';
import { FaArrowLeft } from "react-icons/fa";

const ChangePassword = () =>{
    return(
      <div className='LoginApp'>
      <div className='LoginHorizontalLine'></div>
      <div className='LoginContent'>
        <h1 className='Loginadmin'>ADMIN</h1>
        <form className='LoginForm' onSubmit={(e)=> e.preventDefault()}>
          <Link to='/ForgetPassword'><FaArrowLeft className="Loginchangepasswordarrow"/></Link>
          <h1>Change password</h1>
          <p>Please set a new password</p>
          <div className='Loginemail'>
            <label>New password:</label> <br/>
            <input type='email' placeholder='New Password'/>
          </div>
          <div className='Loginpassword'>
            <label>Confirm password:</label> <br/>
            <input type='password' placeholder='Confirm Password'/>
          </div>
          <button>CHANGE PASSWORD</button>
          <div className="Loginchangepasswordlinks"  id="LoginLinks">
              <Link id="LoginLinks" to='/'>Back to Log in</Link>
              <Link id="LoginLinks" to='/ChangePassword'>Register</Link>
          </div>
        </form>
        </div>
    </div>
    );
}

export default ChangePassword;