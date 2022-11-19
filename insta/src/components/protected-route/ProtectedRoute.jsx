import { Navigate } from 'react-router-dom';

const ProctectedRoute = ({ children }) => {

      const user = JSON.parse(localStorage.getItem("user"))
      if (!user) {
            return <Navigate to="/" />;
      }
      else {
            return children;
      }

};

export default ProctectedRoute;