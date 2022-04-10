import admin from "firebase-admin";
import { fireConfig } from "./fireConfig";

admin.initializeApp({
  credential: admin.credential.cert(fireConfig),
});

export default admin;
