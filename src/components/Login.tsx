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
    <div>
      <GoogleLogin
        onError={handleError}
        onSuccess={handleSuccess}
        type="icon"
        theme="outline"
        shape="circle"
        size="medium"
      />
    </div>
  );
};
