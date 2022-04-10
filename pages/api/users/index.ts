import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../firebaseAdmin/firebase";
import { User } from "../../../common/types";
import {
  validateNewUser,
  validateExistingUser,
  validateDeleteUser,
} from "../../../common/validate";

const getUsers = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const page: any = request.query.page;
    const offset = (parseInt(page) - 1) * 3;
    const firebase = admin.firestore();
    const usersCollection = await firebase
      .collection("users")
      .orderBy("date", "desc")
      .limit(3)
      .offset(offset)
      .get();
    const users: User[] = [];
    usersCollection.forEach((doc) => {
      const { email, first_name, last_name, avatar } = doc.data();
      users.push({ id: doc.id, email, first_name, last_name, avatar });
    });
    const userCount = await firebase
      .collection("user_count")
      //@ts-ignore
      .doc(process.env.count_document_id?.toString())
      .get();
    return response.status(200).json({users, totalCount: userCount.data()});
  } catch (error: any) {
    return response.status(400).json(error);
  }
};

const createUser = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    const firebase = admin.firestore();
    const { email, first_name, last_name, avatar } = request.body;
    const { error } = validateNewUser(email, first_name, last_name, avatar);
    console.log(error);
    if (!error) {
      const createUserResponse = await firebase.collection("users").add({
        email,
        first_name,
        last_name,
        avatar,
        date: admin.firestore.Timestamp.now(),
      });

      await firebase
        .collection("user_count")
        //@ts-ignore
        .doc(process.env.count_document_id?.toString())
        .update("count", admin.firestore.FieldValue.increment(1));
      return response.status(200).json({ id: createUserResponse.id });
    } else {
      return response.status(400).json(error.details);
    }
  } catch (error: any) {
    return response.status(400).json(error);
  }
};

const updateUser = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    const firebase = admin.firestore();
    const { id, email, first_name, last_name, avatar } = request.body;
    const { error } = validateExistingUser(
      id,
      email,
      first_name,
      last_name,
      avatar
    );
    if (!error) {
      await firebase.collection("users").doc(id).update({
        email,
        first_name,
        last_name,
        avatar,
      });
      return response.status(200).end();
    } else {
      return response.status(400).json(error.details);
    }
  } catch (error: any) {
    return response.status(400).json(error);
  }
};

const deleteUser = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    const firebase = admin.firestore();
    const { id } = request.body;
    const { error } = validateDeleteUser(id);
    if (!error) {
      await firebase.collection("users").doc(id).delete();
      await firebase
        .collection("user_count")
        //@ts-ignore
        .doc(process.env.count_document_id?.toString())
        .update("count", admin.firestore.FieldValue.increment(-1));
      return response.status(200).end();
    } else {
      return response.status(400).json(error.details);
    }
  } catch (error: any) {
    return response.status(400).json(error);
  }
};

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;
  if (method === "GET") {
    getUsers(request, response);
  } else if (method === "POST") {
    createUser(request, response);
  } else if (method === "PATCH") {
    updateUser(request, response);
  } else if (method === "DELETE") {
    deleteUser(request, response);
  }
};

export default handler;
