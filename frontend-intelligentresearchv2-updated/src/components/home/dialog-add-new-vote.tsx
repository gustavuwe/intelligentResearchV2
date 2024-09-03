import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SendIcon, VoteIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const DialogAddNewVote = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <VoteIcon className="h-4 w-4 mr-2" />
          Adicionar Voto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar voto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="candidate">Candidato</Label>
          {/* FIXME: wire up com candidatos */}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar candidato"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id"></SelectItem>
            </SelectContent>
          </Select>
          <div className="space-y-2">
            <Label htmlFor="voter">Votante</Label>
            <p className="text-sm text-muted-foreground">
              Insira as informações do votante
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="phonenumber">Número para contato</Label>
              <Input
                id="phonenumber"
                defaultValue=""
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
        <Button className="w-full">
          <SendIcon className="h-4 w-4 mr-2" />
          Enviar voto
        </Button>
      </DialogContent>
    </Dialog>
  );
};
