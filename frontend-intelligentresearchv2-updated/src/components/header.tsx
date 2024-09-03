import { useLogout } from "@/api/auth";
import { MegaphoneIcon, TrashIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const Header = ({ isAdmin }: { isAdmin: boolean }) => {
  const router = useRouter();
  const { mutate: logout, isLoading } = useLogout();

  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <nav className="hidden md:block">
        <ul className="flex flex-row gap-3">
          {isAdmin && (
            <Button variant="default">
              <Link href="/resultados" className="flex justify-between">
                <UsersIcon className="h-4 w-4 mr-2" />
                Dados das pesquisas
              </Link>
            </Button>
          )}
          <Button variant="outline">
            <Link href="/reportar" className="flex justify-between">
              <MegaphoneIcon className="h-4 w-4 mr-2" />
              Reportar erro
            </Link>
          </Button>
          <Button
            onClick={async () => {
              const result = await logout();

              if (result?.error) {
                return toast.error("Aconteceu um erro ao tentar fazer logout");
              }
              return router.push("/login");
            }}
            variant="ghost"
            className="text-red-500"
            disabled={isLoading}
          >
            <TrashIcon color="red" className="h-4 w-4 mr-2" />
            Fazer Logout
          </Button>
        </ul>
      </nav>
    </>
  );
};
