import { FakeProductClient } from "../../http/config";

export const addProductApi = async (payload) => {
  try {
    const res = await FakeProductClient.post("api/v1/auth/addProduct", payload);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllProductsForDistributorsApi = async (payload) => {
  try {
    const res = await FakeProductClient.get(
      "api/v1/auth/getProductDistributor",
      { params: { wallet_address: payload } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const getAllProductsForManufacturerApi = async (payload) => {
  try {
    const res = await FakeProductClient.get(
      "api/v1/auth/getProductManufacturer",
      { params: { wallet_address: payload } }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
export const getSingleProductApi = async (payload) => {
  try {
    const res = await FakeProductClient.get(
      `api/v1/auth/getSingleProduct/${payload}`
    );
    return res;
  } catch (error) {
    throw error;
  }
};
