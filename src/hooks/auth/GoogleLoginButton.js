import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios'; // импорт axios

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GoogleLoginButton = () => {
  const [token, setToken] = useState(null);

  const handleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    const receivedToken = credentialResponse.credential;
    setToken(receivedToken);
    sendTokenToBackend(receivedToken);
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const sendTokenToBackend = (token) => {
    axios.post(`${API_URL}/api/users/auth/google/`, { token }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Token sent to backend successfully');
        } else {
          console.error('Failed to send token to backend');
        }
      })
      .catch((error) => {
        console.error('Error sending token to backend:', error);
      });
  };

  return (
    <GoogleOAuthProvider clientId="1093979259932-crrapug660vsftv9pclko1o2nata4kgu.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
