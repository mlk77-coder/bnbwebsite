import axiosInstance from "@/lib/axios";
import { actionHandleError } from "@/lib/utils";

export const contactUsAction = async ({
  token,
  body,
}: {
  token: string;
  body: FormData;
}) => {
  try {
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
    await axiosInstance.post(`contact-us`, body, {
      headers,
    });
    return "success";
  } catch (error) {
    return actionHandleError(error);
  }
};
