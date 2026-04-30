import axiosInstance from "@/lib/axios";
import { actionHandleError } from "@/lib/utils";

export const updateProfileAction = async ({
  body,
  token,
}: {
  body: { name: string; email: string; phone: string };
  token: string;
}) => {
  try {
    await axiosInstance.put(`/auth/profile`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};

export const updateAvatarAction = async ({
  body,
  token,
}: {
  body: FormData;
  token: string;
}) => {
  try {
    await axiosInstance.post(`/auth/avatar`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};

export const changePasswordAction = async ({
  body,
  token,
}: {
  body: FormData;
  token: string;
}) => {
  try {
    await axiosInstance.post(`change-password`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};
