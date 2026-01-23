// Authentication temporarily disabled – direct access
const ProtectedRoute = ({ children }) => {
  // No auth checks; render children directly
  return children;
};

export default ProtectedRoute;
