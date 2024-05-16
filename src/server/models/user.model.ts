import { z } from "zod";
import { userCollection } from "$server/core/db.js";
import type { User } from "$server/types.js";
import bcryptjs from "bcryptjs";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50)
});

async function checkCredentials({ email, password }: UserCredentials) {
  const user = await userCollection.findOne({ email });
  if (!user) return null;
  const isRightPassword = await bcryptjs.compare(password, user.password);
  return isRightPassword
    ? { email, role: user.role }
    : null;
}

async function createUser(data: UserCredentials): Promise<{ error: unknown; }> {
  try {
    const parseResult = userSchema.safeParse(data);

    if (!parseResult.success)
      return { error: parseResult.error.format() };

    const { email, password } = parseResult.data;
    const userWithSameEmail = await userCollection.findOne({ email });

    if (userWithSameEmail)
      return { error: "Email address already in use." };

    const salt = await bcryptjs.genSalt();
    const insertResult = await userCollection.insertOne({
      email,
      password: await bcryptjs.hash(password, salt),
      role: "USER"
    });

    return {
      error: insertResult.acknowledged ? null : "An error occurred."
    };
  } catch (error) {
    return { error };
  }
}

export default {
  checkCredentials,
  createUser
};

type UserCredentials = Pick<User, "email" | "password">;