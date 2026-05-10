import axiosInstance from "@/lib/axios";
import { actionHandleError } from "@/lib/utils";
import { AddressMutationPayload } from "@/types/address";

export const addAddressAction = async ({
  token,
  body,
}: {
  token: string;
  body: AddressMutationPayload;
}) => {
  try {
    await axiosInstance.post(`addresses`, body, {
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
    await axiosInstance.delete(`addresses/${id}`, {
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
  body: AddressMutationPayload;
}) => {
  try {
    await axiosInstance.put(`addresses/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};

export const setDefaultAddressAction = async ({
  token,
  id,
}: {
  token: string;
  id: number;
}) => {
  try {
    await axiosInstance.post(
      `addresses/${id}/set-default`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};
