/* eslint-disable react/prop-types */
import { Spin } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = useSelector((state) => state.auth);
  const [isAuthorized, setIsAuthorized] = useState(null);
// console.log(token);

  useEffect(() => {
    if (token?.accessToken) {
      const decodeToken = jwtDecode(token?.accessToken);
      
      if (decodeToken?.role !== role) {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    } else {
      setIsAuthorized(false);
    }
  }, [token?.accessToken, role]);

  // Render loading state while checking the token
  if (isAuthorized === null) {
    return (
      <div className="flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  // Redirect if unauthorized
  if (isAuthorized === false) {
    return <Navigate to="/signin" replace />;
  }

  // Render children if authorized
  return <>{children}</>;
}

export default ProtectedRoute;
