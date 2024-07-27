/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/z9tYT2os8Qr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function cpfCardComponent() {
  return (
    <main className="w-full h-full">
      <h1 className="mt-5 text-5xl text-center sm:text-6xl font-bold font-roboto">
        Eleições 2024
      </h1>
      <Card className="w-full max-w-md mx-auto my-[20vh]">
        <CardHeader>
          <CardTitle>Insira seu CPF</CardTitle>
          <CardDescription>Por favor informe seu CPF</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-2">
              <Label htmlFor="cpf">Número de CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="111.111.111-11"
                pattern="^d{3}.d{3}.d{3}-d{2}$"
                title="Por favor insira um CPF válido no formato: 111.111.111-11"
                required
              />
            </div>
            <a className="hover:underline text-blue-500" href="/porque-pedimos">
              <p className="mt-3 text-xs text-blue-500">
                Por que pedimos este dado?
              </p>
            </a>
            <Button type="submit" className="mt-4">
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
