import React from 'react'
import MainNavigator from '../navigator/main-navigator'
import Home from '../home/home'
import { Authenticator } from '@aws-amplify/ui-react'
import { Outlet } from 'react-router-dom'
// import { Auth } from 'aws-amplify'
import { Amplify } from 'aws-amplify'


function AuthenticatorPage() {

  const [userRole, setUserRole] = React.useState(null)

  React.useEffect(() => {
    checkUserRole()
  }, [])

  async function checkUserRole() {
    try {
      const user = await  Amplify.Auth.currentAuthenticatedUser()
      const groups = user.signInUserSession.accessToken.payload['cognito:groups']
      if (groups && groups.includes('admin')) {
        setUserRole('admin')
      } else {
        setUserRole('user')
      }
    } catch (error) {
      console.log('Error checking user role:', error)
      setUserRole('user') // Default to user role if there's an error
    }
  }

  return (
    <div className='authenticator'>
       <Authenticator>
        {({ signOut }) => (
          <main>
            <header className='App-header'>
             <MainNavigator signOut={signOut}/>
                <Outlet/>
            </header>
          </main>
        )}
      </Authenticator>
    </div>
  )
}

export default AuthenticatorPage