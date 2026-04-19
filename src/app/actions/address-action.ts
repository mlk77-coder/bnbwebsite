import axiosInstance from "@/lib/axios";
import { actionHandleError } from "@/lib/utils";

export const addAddressAction = async ({
  token,
  body,
}: {
  token: string;
  body: FormData;
}) => {
  try {
    await axiosInstance.post(`locations`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};

export const deleteAddressAction = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  try {
    await axiosInstance.delete(`locations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};

export const editAddressAction = async ({
  token,
  id,
  body,
}: {
  token: string;
  id: number;
  body: FormData;
}) => {
  try {
    await axiosInstance.post(`locations/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};
