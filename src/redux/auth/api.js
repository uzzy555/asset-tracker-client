import { FakeProductClient } from "../../http/config";

export const DistributorSignUpApi = async (payload) => {
  try {
    const res = await FakeProductClient.post(
      "api/v1/auth/signUpAsDistributor",
      payload
    );
    return res;
  } catch (e) {
    throw e;
  }
};
export const ManufacturerSignUpApi = async (payload) => {
  try {
    const res = await FakeProductClient.post(
      "api/v1/auth/signUpAsManufacture",
      payload
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const loginApi = async (payload) => {
  try {
    const res = await FakeProductClient.post("api/v1/auth/signIn", payload);
    return res;
  } catch (error) {
    throw error;
  }
};
