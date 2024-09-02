"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GetInTouch = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
          withCredentials: true,
        });

        console.log(response)

        if (response.status !== 200) {
          router.push("/login");
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        router.push("/login");
      }
    };
    verifyToken();
}, [router]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    console.log(formData);

    formData.append("access_key", "db9b1d77-b67a-4b3c-bac3-a9b7985f534b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      event.target?.reset();
      setAlreadySubmitted(true);
    } else {
      console.log("Error", data);
    }
  };

  if (isLoading) return (
    <Loading />
  )

  return (
    <>
        <header className="p-5 h-[80px] bg-gray-50">
          <Button variant="outline" className="bg-gray-50 border-black">
      <Link href="/home" className="flex flex-row gap-2">
      <ArrowLeft size={32} color="black"/>
      <h1 className="text-2xl font-bold">Voltar</h1>
      </Link>
      </Button>
    </header>
    <section
      id="getInTouch"
      className="w-full h-screen py-12 md:py-24 lg:py-32 bg-gray-50"
    >
      <div className="container grid gap-6 px-4 md:px-6">
        {alreadySubmitted ? (
          <div className="space-y-2 text-center flex flex-row items-center justify-center">
            <Check size={60} color="green"/>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-500">
              Obrigado pelo feedback!
            </h2>
          </div>
        ) : (
          <>
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Reportar um problema
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {
                  "Caso tenha encontrado algum erro ou problema, por favor, nos informe para que possamos corrigi-lo."
                }
              </p>
            </div>
            <div className="mx-auto w-full max-w-md space-y-2">
              <form className="grid gap-4" onSubmit={onSubmit}>
                <Input
                  type="text"
                  placeholder="Nome"
                  className="max-w-lg flex-1"
                  name="Nome"
                />
                <Input
                  type="text"
                  placeholder="Número de telefone"
                  className="max-w-lg flex-1"
                  name="Numero"
                />
                <Textarea
                  placeholder="Informe aqui o que aconteceu"
                  className="max-w-lg flex-1"
                  rows={4}
                  name="Mensagem"
                />
                <Button type="submit">Reportar erro</Button>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
    </>
  );
};

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default GetInTouch;