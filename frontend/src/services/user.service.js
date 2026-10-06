import api from "./api";

export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await api.patch("/users/profile", profileData);
  return response.data;
};