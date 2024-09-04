import { useRemoveResearch } from "@/api/research";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
   
  export function AlertDialogRemoveResearch({ researchID }: { researchID: string }) {
    const {
        mutate: removeResearch,
        isLoading,
        revalidateQuery,
      } = useRemoveResearch(researchID);

    const handleRemoveResearch = async () => {

        console.log(researchID)

        const response = await removeResearch(researchID);

      if (response?.error) {
        return toast.error("Aconteceu um erro ao tentar excluir a pesquisa");
      }
      revalidateQuery("/research");
      return toast.success("Pesquisa excluída com sucesso!");
    };

    return (
    <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
              <TrashIcon className="h-4 w-4 mr-2" />
                Excluir Pesquisa
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza de que deseja excluir a pesquisa?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Ao excluir a pesquisa, todos os dados associados serão excluídos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500" onClick={() => handleRemoveResearch()}>
                    Continuar
                    </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    </>
    )
  }