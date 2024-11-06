// app/routes/auth.register.tsx
import { Link, useOutletContext } from "@remix-run/react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { login, register } from "~/utils/auth.server";
import { SignUpSchema } from "~/schema/auth";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  const { CardWrapper } = useOutletContext<{
    CardWrapper: ({ children }: { children: React.ReactNode }) => JSX.Element;
  }>();

  return (
    <>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
        Create your account
      </h2>

      <CardWrapper>
        <RegisterForm />
      </CardWrapper>
    </>
  );
}

type ActionData = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  error?: string;
};

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<ActionData | Response> => {
  const formData = await request.formData();
  console.log(formData);
  try {
    const result = SignUpSchema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"), // Tambahkan ini
    });

    if (!result.success) {
      return json(
        {
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await register(result.data);
    const { headers } = await login({
      email: result.data.email,
      password: result.data.password,
      request,
    });
    return redirect("/dashboard", { headers });
  } catch (error: any) {
    console.log("error cuy");
    return json(
      {
        error: error.message || "An error occurred during registration",
      },
      { status: 400 }
    );
  }
};
