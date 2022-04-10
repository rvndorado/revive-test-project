import admin from "firebase-admin";
import { fireConfig } from "./fireConfig";

try {
  admin.initializeApp({
    credential: admin.credential.cert(fireConfig),
  });
} catch (error: any) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

export default admin;
