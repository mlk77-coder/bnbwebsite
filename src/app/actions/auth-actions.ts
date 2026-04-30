import axiosInstance from '@/lib/axios';
import { actionHandleError } from '@/lib/utils';

type LoginBody = {
  phone: string;
};

type RegisterBody = LoginBody & {
  name: string;
  email: string;
};

export const authAction = async (url: string, body: FormData) => {
  try {
    await axiosInstance.post(url, body);
    return 'success';
  } catch (error) {
    return actionHandleError(error);
  }
};

const authJsonAction = async (url: string, body: LoginBody | RegisterBody) => {
  try {
    await axiosInstance.post(url, body);
    return 'success';
  } catch (error) {
    return actionHandleError(error);
  }
};

export const registerAction = async (body: FormData) =>
  authAction('/register', body);

export const registerWithOtpAction = async (body: RegisterBody) =>
  authJsonAction('/auth/register', body);

export const loginWithOtpAction = async (body: LoginBody) =>
  authJsonAction('/auth/login', body);

export const resendOtpAction = async (body: LoginBody) =>
  authJsonAction('/auth/resend-otp', body);

export const sendCodeAction = async (body: FormData) =>
  authAction('/reset-password', body);

export const verifiedAccountAction = async (body: FormData) =>
  authAction('/verify-account', body);

export const checkCodeAction = async (body: FormData) =>
  authAction('/check-code', body);
export const resetPasswordAction = async (body: FormData) =>
  authAction('/edit-password', body);
