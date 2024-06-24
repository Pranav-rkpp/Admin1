import { Link, Navigate, useNavigate } from "react-router-dom";
import './Login.css'
import useAuth from "../../hooks/useAuth";
import api from '../../api/details'

const SignInForm = () => {

  const { setUsername, setPassword, username, password, setAuthToken, setLoggedIn } = useAuth();

  const credentials = {
    userName: username,
    password: password
  }
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/user/login', credentials);
      console.log(response.data);
      console.log(response.data.success.result.token)
      const authTokenObj = { AuthorizationToken: response.data.success.result.token }
      window.localStorage.setItem("AuthToken", JSON.stringify(authTokenObj))
      setLoggedIn((JSON.parse(localStorage.getItem('AuthToken'))).AuthorizationToken)
      setAuthToken((JSON.parse(localStorage.getItem('AuthToken'))).AuthorizationToken)
      navigate('/')
    }
    catch (err) {
      if (err) { console.log(err.message) }
    }

  }

  return (
    <div className='LoginApp'>
      <div className='LoginHorizontalLine'></div>
      <div className='LoginContent'>
        <h1 className='Loginadmin'>ADMIN</h1>
        <form className='LoginForm' onSubmit={(e) => handleSubmit(e)}>
          <h1>Sign in</h1>
          <p>Enter your email address and password to access</p>
          <div className='Loginemail'>
            <label htmlFor="Loginemail">Email address:</label> <br />
            <input type='email' id="Loginemail" placeholder='Enter your Email' onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='Loginpassword'>
            <label htmlFor="Loginpassword">Password:</label> <br />
            <input type='password' id="Loginpassword" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='LogincheckBox'>
            <input id='Logincheck' type='checkbox' />
            <label>Remember me</label>
          </div>
          <button>LOG IN</button>
          <Link id="LoginLinks" to='/ForgetPassword'>Forgot Password</Link>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;