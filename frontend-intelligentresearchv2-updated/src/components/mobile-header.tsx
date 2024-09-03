import { useLogout } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChartColumn, LogOutIcon, MegaphoneIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const MobileHeader = ({ isAdmin }: { isAdmin: boolean }) => {
  const router = useRouter();
  const { mutate: logout, isLoading } = useLogout();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-4  border-b border-solid">
          <SheetTitle className="text-left font-bold">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-5">
          {isAdmin && (
            <SheetClose asChild>
              <Button
                className="gap-2 justify-start bg-black hover:bg-gray-800"
                variant="default"
              >
                <Link href="/resultados" className="flex flex-row gap-2">
                  <ChartColumn size={18} /> Dados das pesquisas
                </Link>
              </Button>
            </SheetClose>
          )}
          <SheetClose asChild>
            <Button className="gap-2 justify-start" variant="outline">
              <Link href="/reportar" className="flex flex-row gap-2">
                <MegaphoneIcon size={18} /> Reportar um erro
              </Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              onClick={async () => {
                const result = await logout();

                if (result?.error) {
                  return toast.error(
                    "Aconteceu um erro ao tentar fazer logout"
                  );
                }
                return router.push("/login");
              }}
              className="gap-2 justify-start text-red-500"
              variant="ghost"
            >
              <LogOutIcon color="red" size={18} /> Fazer Logout
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
