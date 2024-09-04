"use client";

import { useRouter } from "next/navigation";

import { Header } from "@/components/header";
import { Existing } from "@/components/home/existing";

import { CreateNewResearch } from "@/components/home/create-new-research";
import { MobileHeader } from "@/components/mobile-header";

import { useAuthentication } from "@/hooks/useAuthentication";
import { Toaster } from "sonner";

export default function HomePage() {
  const router = useRouter();
  const { authenticated, isAdmin } = useAuthentication();

  if (!authenticated) {
    router.push("/login");
  }

  return (
    <>
      <Toaster richColors />
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Header isAdmin={isAdmin} />
            <div className="md:hidden">
              <MobileHeader isAdmin={isAdmin} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {isAdmin && <CreateNewResearch />}
            <Existing isAdmin={isAdmin} />
          </div>
        </div>
      </div>
    </>
  );
}
