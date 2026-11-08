import api from "./api";

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessageResponse {
  success: boolean;
  message: string;
  id: number;
}

export const submitContactMessage = async (
  payload: ContactMessagePayload,
): Promise<ContactMessageResponse> => {
  const response = await api.post<ContactMessageResponse>(
    "/api/contact",
    payload,
  );

  return response.data;
};
