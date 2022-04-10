import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import admin from "../../../firebaseAdmin/firebase";
import { User } from "../../../common/types";

const fetchData = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    const firebase = admin.firestore();

    const usersResponse = await axios.get("https://reqres.in/api/users");
    const users: User[] = usersResponse.data.data;
    let dataCount = 0;

    const batch = firebase.batch();
    users.forEach((user) => {
      const usersCollection = firebase.collection("users").doc();
      batch.set(usersCollection, {
        email: user.email,
        last_name: user.last_name,
        first_name: user.first_name,
        avatar: user.avatar,
        date: admin.firestore.Timestamp.now(),
      });
      dataCount += 1;
    });
    batch.set(
      firebase
        .collection("user_count")
        //@ts-ignore
        .doc(process.env.count_document_id?.toString()),
      {
        count: dataCount,
      }
    );
    batch.commit();
    return response.status(200).end();
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
};

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;
  if (method === "POST") {
    fetchData(request, response);
  }
};

export default handler;
