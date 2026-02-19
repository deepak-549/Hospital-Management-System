
import axios from "axios";

export const login = async (data) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/login",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};