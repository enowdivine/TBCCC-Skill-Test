import { decodeToken } from "react-jwt";

const useId = () => {
  const userToken = localStorage.getItem("user");
  const decodedToken = decodeToken(userToken);
  const id = decodedToken.userId;

  return id;
};

export default useId;
