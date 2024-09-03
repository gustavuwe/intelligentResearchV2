"use client";

import { useSignIn } from "@/api/auth";
import { signInSchema, SignInSchema } from "@/api/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const router = useRouter();
  const { mutate: signIn, error, isLoading } = useSignIn();
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: SignInSchema) => {
    const response = await signIn(values);
    if (response?.error) {
      return;
    }

    return router.push("/home");
  };

  return (
    <main>
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="flex flex-col items-center justify-center w-full max-w-md gap-4 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center">Fazer Login</h1>
          <Form {...form}>
            <form
              className="w-full flex flex-col items-center justify-center gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Usuário"
                        className="border-black"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Senha"
                        className="border-black"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isLoading}
              >
                Login
              </Button>
            </form>
          </Form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
