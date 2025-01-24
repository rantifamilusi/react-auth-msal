import React from 'react';
import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from './auth/auth-config';


function App() {
  
  
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleLoginRedirect = () => {
      instance
          .loginRedirect({
              ...loginRequest,
              prompt: 'create',
          })
          .catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    })
    .catch((error) => console.log(error));

    window.location.reload();
  };
  return (
      <div className="card">
          <AuthenticatedTemplate>
              {activeAccount ? (
                  <><button onClick={handleLogoutRedirect}> Logout</button><p> You are signed in!</p></>
            ) : null}
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
          <button onClick={handleLoginRedirect}> Login</button>
          <p> Please sign in</p>
            </UnauthenticatedTemplate>
      </div>
  );
}

export default App;
