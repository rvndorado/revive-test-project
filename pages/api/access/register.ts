import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../firebaseAdmin/firebase";
import { validateRegistration } from "../../../common/validate";

const register = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { email, password, confirmPassword } = request.body;
    const firebase = admin.auth();

    const { error } = validateRegistration(email, password, confirmPassword);
    if (!error) {
      const registerResponse = await firebase.createUser({
        email,
        password,
      });
      return response.status(200).json(registerResponse);
    } else {
      return response.status(400).json(error.details);
    }
  } catch (error: any) {
    return response.status(400).json(error);
  }
};

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;
  if (method === "POST") {
    register(request, response);
  }
};

export default handler;
