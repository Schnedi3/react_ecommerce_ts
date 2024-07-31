import "../css/login.css";

import { GoogleLogin } from "@react-oauth/google";
import { GoogleCredentialResponse } from "@react-oauth/google";

export const Login = () => {
  const handleError = () => {
    console.log("Login failed");
  };

  const handleSuccess = (credentialResponse: GoogleCredentialResponse) => {
    console.log(credentialResponse);
  };

  return (
    <section className="container">
      <div className="login__container">
        <GoogleLogin
        onError={handleError}
        onSuccess={handleSuccess}
        shape="circle"
      />
      </div>
    </section>
  );
};
