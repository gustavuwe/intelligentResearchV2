"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const json = JSON.stringify({ username, password });

            const response = await axios.post("http://localhost:3333/auth/sign-in", json, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.status === 200) {
                // Cookies.set("token", response.data.token, { expires: 7 }); // Expira em 7 dias

                console.log("Funcionou!")

                router.push("/home") // parei aqui
            }
        } catch (err) {
            console.error(err);
        }
    };

    return ( 
        <main>
            <div className="flex flex-col items-center justify-center max-w-[100%] min-h-[calc(100vh-100px)] gap-4">
                <h1 className="text-3xl font-bold text-center">Fazer Login</h1>
                <form className="mt-4 flex flex-col items-center justify-center gap-2" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Usuário"
                        className="mt-5 w-[calc(100%-20%)] max-w-[400px] border-black"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Senha"
                        className="w-[calc(100%-20%)] max-w-[400px] border-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        className="w-[calc(100%-20%)] max-w-[400px] mt-4"
                    >
                        Login
                    </Button>
                </form>
                {/* <Input type="text" className="mt-5 w-[calc(100%-20%)] max-w-[400px] border-black" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" className="w-[calc(100%-20%)] max-w-[400px]  border-black" onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" className="w-[calc(100%-20%)] max-w-[400px]" onClick={() => handleSubmit}>Login</Button> */}
            </div>
        </main>
     );
}
 
export default LoginPage;