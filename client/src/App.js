import Home from './components/Home'
import Navbar from './components/Navbar'
import AccessPoint from './components/AccessPoint'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ToastContainer, Flip } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import DotsLoading from './components/DotsLoading'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const { isLoading, authData } = useSelector((state) => state.auth)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [authData])
  console.log(user)
  console.log(isLoading)
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Navbar user={user} setUser={setUser} />
        {!user && isLoading ? (
          <div className="dotsLoading">
            <DotsLoading />
          </div>
        ) : user ? (
          <Home user={user} />
        ) : (
          <AccessPoint />
        )}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
