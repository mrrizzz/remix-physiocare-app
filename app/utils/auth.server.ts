import { json, createCookieSessionStorage, redirect } from "@remix-run/node";
import db from "./db.server";
import { getSession, commitSession } from "./session.server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login({
  email,
  password,
  request,
}: {
  email: string;
  password: string;
  request: Request;
}) {
  const account = await db.account.findUnique({
    where: { email },
  });

  if (!account || !(await bcrypt.compare(password, account.password))) {
    throw json({ message: "Invalid email or password" }, { status: 401 });
  }

  const payload = {
    id: account.id,
    email: account.email,
    role: account.role,
    username: account.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
  console.log(token);

  const session = await getSession(request.headers.get("Cookie"));
  session.set("token", token);

  const { password: _, ...accountWithoutPassword } = account;

  return {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
    account: accountWithoutPassword,
  };
}

export async function register({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const existingUser = await db.account.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    throw json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await db.$transaction(async (tx) => {
    const profile = await tx.profile.create({
      data: {
        name: username,
      },
    });

    const account = await tx.account.create({
      data: {
        email,
        password: hashedPassword,
        username,
        role: "PATIENT",
        profile_id: profile.id,
      },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            created_at: true,
          },
        },
      },
    });

    const { password: _, ...accountWithoutPassword } = account;
    return accountWithoutPassword;
  });
}

export async function logout(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
