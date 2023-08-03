import axios from "axios";

const API_URL = `${process.env.REACT_APP_ENDPOINT}/api/${process.env.REACT_APP_API_VERSION}/auth`;

const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }

  return response.data;
};

const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.token));
  }

  return response.data;
};

const authServices = {
  register,
  login,
};

export default authServices;
