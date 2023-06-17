import { FakeProductClient } from "../../http/config";

export const getAllDistributorsApi = async (payload) => {
  try {
    const res = await FakeProductClient.get("api/v1/auth/getAllDistributors", {
      params: {
        organization_code: payload,
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const inviteDistributorsApi = async (payload) => {
  try {
    const res = await FakeProductClient.post(
      "api/v1/auth/emailInvitation",
      payload
    );
    return res;
  } catch (error) {
    throw error;
  }
};
