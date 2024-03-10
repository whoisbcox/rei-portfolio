import { jwtDecode } from "jwt-decode";

const useUser = () => {
  const jwt = localStorage.getItem('jwt');
  if (null == jwt) return { user: null };
  const decoded = jwtDecode(jwt);
  const userId = decoded ? decoded._id : undefined;
  return { userId };
}

export default useUser