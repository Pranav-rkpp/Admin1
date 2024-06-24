import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import SignInForm from './pages/Login/SignInForm'
import AddNewSubscription from './pages/AddNewSubscription/AddNewSubscription'
import Dashboard from './pages/Dashboard/Dashboard'
import RequireAuth from './Components/RequireAuth/RequireAuth'
import EditSubscription from './pages/EditSubscription/EditSubscription'

function Admin() {

  const navigate = useNavigate();

  //Delete Detail function
  const handleDelete = async (id) => {
    try {
      await api.delete(`/Details/${id}`);
      const detailList = details.filter(info => (info.id).toString() !== id);
      setDetails(detailList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <Routes>
      <Route path='/login' element={<SignInForm />} />
      <Route path='/ForgetPassword' element={<ForgetPassword />} />
      <Route path='/ChangePassword' element={<ChangePassword />} />

      {/* Protected Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AddNewSubscription" element={<AddNewSubscription />} />
        <Route path='/EditSubscription/:id' element={<EditSubscription />} />
        <Route path="*" element={<h1 style={{ textAlign: 'center' }}>OOPs you came to the wrong page</h1>} />
      </Route>
    </Routes>
  )
}

export default Admin;