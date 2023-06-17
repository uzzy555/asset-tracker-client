import { FakeProductClient } from "../../http/config";

export const getAllManufacturersApi = async () => {
  try {
    const res = await FakeProductClient.get("api/v1/auth/getAllManufacturers");
    return res;
  } catch (error) {
    throw error;
  }
};
