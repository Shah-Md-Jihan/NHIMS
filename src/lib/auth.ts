import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("user");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["admin", "patient", "doctor"],
        input: false,
        defaultValue: "patient",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = user.role;
          if (role !== "admin" && role !== "patient" && role !== "doctor") {
            return {
              data: {
                ...user,
                role: "patient",
              },
            };
          }
        },
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
