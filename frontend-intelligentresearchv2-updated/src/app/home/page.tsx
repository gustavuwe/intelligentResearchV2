// import axios from 'axios';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// export default async function HomePage() {
//   const cookieStore = cookies();
//   const token = cookieStore.get('token')?.value;

//   if (!token) {
//     redirect('/login');
//   }

//   try {
//     const response = await axios.get('http://localhost:3000/verify', {
//       headers: {
//         Cookie: `token=${token}`,
//       },
//     });

//     if (response.status !== 200) {
//       redirect('/login');
//     }
//   } catch (error) {
//     redirect('/login');
//   }

//   return <div>Conteúdo protegido</div>;
// }

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PlusIcon,
  SearchIcon,
  UserPlusIcon,
  UsersIcon,
  VoteIcon,
  ChevronDownIcon,
  SendIcon,
  XIcon,
  TrashIcon,
  MegaphoneIcon,
  MenuIcon,
  HomeIcon,
  LogOutIcon,
  GitGraphIcon,
  ChartColumn,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { PopoverClose } from "@radix-ui/react-popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

// Mock data for existing researches
// const initialResearches = [
//   { id: 1, title: "City Council Election", description: "Annual city council election", date: "2023-05-15", candidates: ["John Doe", "Jane Smith"], voters: ["Voter1", "Voter2", "Voter3"], votes: 750 },
//   { id: 2, title: "School Board Vote", description: "Selecting new school board members", date: "2023-05-14", candidates: ["Alice Johnson", "Bob Williams", "Carol Davis"], voters: ["Voter4", "Voter5"], votes: 450 },
//   { id: 3, title: "Neighborhood Association", description: "Electing neighborhood representatives", date: "2023-05-13", candidates: ["David Brown", "Eva Martinez", "Frank Wilson", "Grace Lee"], voters: ["Voter6", "Voter7", "Voter8", "Voter9"], votes: 180 },
//   { id: 4, title: "Local Referendum", description: "Vote on new city park proposal", date: "2023-05-12", candidates: ["Yes", "No"], voters: ["Voter10", "Voter11", "Voter12"], votes: 1500 },
//   { id: 5, title: "Student Government", description: "University student council elections", date: "2023-05-11", candidates: ["Team A", "Team B", "Team C"], voters: ["Voter13", "Voter14", "Voter15", "Voter16", "Voter17"], votes: 600 },
// ]

// Mock data for registered candidates and voters
// const registeredCandidates = [
//   "John Doe", "Jane Smith", "Alice Johnson", "Bob Williams", "Carol Davis",
//   "David Brown", "Eva Martinez", "Frank Wilson", "Grace Lee"
// ]

export interface Candidate {
  id?: string;
  name: string;
  imgUrl: string;
  votes: number;
  researchId: string;
  Voters: String[];
  Vote: Vote[];
}

export interface Voter {
  id: string;
  name: string;
  phoneNumber?: string;
  lat: string;
  long: string;
  candidateId: string;
  createdAt: string;
  updatedAt: string;
  Vote: Vote[];
}

export interface Vote {
  id?: string;
  voterId: string;
  candidateId: string;
  researchId: string;
}

export interface Research {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  candidates: Candidate[];
  Vote: Vote[];
}

const registeredCandidates: string[] = [];

const registeredVoters: string[] = [];

export default function HomePage() {
  // server handling
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // admin verification
  const [isAdmin, setIsAdmin] = useState(false);

  // geo location
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);

  // ui components
  const [researches, setResearches] = useState<Research[]>([]);
  const [newResearch, setNewResearch] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [isNewResearchOpen, setIsNewResearchOpen] = useState(false);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [activeResearch, setActiveResearch] = useState<number | null>(null);
  const [activeResearchIndex, setActiveResearchIndex] = useState<number | null>(
    null
  );
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedVoter, setSelectedVoter] = useState("");
  const [candidateSearch, setCandidateSearch] = useState("");
  const [voterSearch, setVoterSearch] = useState("");
  const [filteredCandidates, setFilteredCandidates] =
    useState(registeredCandidates);
  const [filteredVoters, setFilteredVoters] = useState(registeredVoters);
  const [refresh, setRefresh] = useState(false);
  const [refreshCandidates, setRefreshCandidates] = useState(false);
  const [refreshVoters, setRefreshVoters] = useState(false);
  const [voterName, setVoterName] = useState("");
  const [voterPhoneNumber, setVoterPhoneNumber] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("http://localhost:3333/auth/verify", {
          withCredentials: true,
        });

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

  useEffect(() => {
    const verifyTokenAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/auth/verify-admin",
          {
            withCredentials: true,
          }
        );

        if (response.status !== 200) {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
      }
    };

    verifyTokenAdmin();
  }, [isAdmin]);

  useEffect(() => {
    const getResearches = async () => {
      try {
        const response = await axios.get("http://localhost:3333/research", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setResearches(response.data.researches);
        }
      } catch (err) {
        console.error("Error fetching researches:", err);
      }
    };

    getResearches();
  }, [refresh]);

  useEffect(() => {
    async function getRegisteredCandidates() {
      const response = await axios.get("http://localhost:3333/candidate", {
        withCredentials: true,
      });

      if (response.status === 200) {
        response.data.candidates.map((candidate: Candidate) =>
          registeredCandidates.push(candidate.name)
        );
      }
    }
    getRegisteredCandidates();
  }, [refreshCandidates]);

  useEffect(() => {
    async function getRegisteredVoters() {
      const response = await axios.get("http://localhost:3333/voter", {
        withCredentials: true,
      });

      if (response.status === 200) {
        response.data.voters.map((voter: Voter) =>
          registeredVoters.push(voter.name)
        );
      }
    }
    getRegisteredVoters();
  }, [refreshVoters]);

  if (isLoading) {
    return <Loading />;
  }

  const handleResearchRegister = async (e: React.FormEvent) => {
    const getCurrentDate = () => {
      const date = new Date();
      return date.toISOString().split("T")[0];
    };

    try {
      const registerResearch = await axios.post(
        "http://localhost:3333/research/register",
        {
          title: newResearch.title,
          startDate: getCurrentDate(),
          endDate: newResearch.date,
          candidates: [],
          Vote: [],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (registerResearch.status === 201) {
        setResearches([...researches, registerResearch.data]);
        setNewResearch({
          title: "",
          description: "",
          date: "",
        });
        setIsNewResearchOpen(false);
        setRefresh((prev) => !prev);
      }

      // handleCreateResearch(e)
      setIsVoteModalOpen(false);
      setSelectedCandidate("");
      setSelectedVoter("");
      setActiveResearch(null);
    } catch (err) {
      console.error("Error registering research:", err);
    }
  };

  // const handleCreateResearch = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (newResearch.title.trim() && newResearch.date) {
  //     setResearches([...researches, {
  //       id: ,
  //       ...newResearch,
  //       candidates: [],
  //       voters: [],
  //       votes: 0
  //     }])
  //     setNewResearch({
  //       title: "",
  //       description: "",
  //       date: "",
  //     })
  //     setIsNewResearchOpen(false)
  //   }
  // }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewResearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCandidateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setCandidateSearch(searchTerm);
    setFilteredCandidates(
      registeredCandidates.filter((candidate) =>
        candidate.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleVoterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setVoterSearch(searchTerm);
    setFilteredVoters(
      registeredVoters.filter((voter) =>
        voter.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleSelectCandidate = (candidate: string) => {
    setSelectedCandidate(candidate);
    setCandidateSearch("");
  };

  const handleSelectVoter = (voter: string) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      });
    }
    setSelectedVoter(voter);
    setVoterSearch("");
  };

  const handleAddCandidate = async () => {
    console.log("chegou aqui");
    console.log(activeResearch);
    console.log(researches[activeResearch]);
    if (candidateSearch) {
      try {
        if (activeResearch !== null) {
          const response = await axios.post(
            "http://localhost:3333/candidate/register",
            {
              name: candidateSearch,
              imgUrl: "",
              researchId: researches[activeResearch].id.toString(),
              votes: 0,
              Voters: [],
              Vote: [],
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          if (response.status === 201) {
            setCandidateSearch("");
            setRefreshCandidates((prev) => !prev);
          }
        }
      } catch (err) {
        console.error("Error adding candidate:", err);
      }
    }
  };

  const handleAddVoter = async () => {
    console.log(selectedCandidate);
    if (selectedCandidate !== null && activeResearch !== null) {
      try {
        const response = await axios.post(
          "http://localhost:3333/voter/register",
          {
            name: voterName,
            phoneNumber: voterPhoneNumber,
            lat: "", // TODO: get lat and long from map
            long: "", // TODO: get lat and long from map
            candidateId: researches[activeResearch].candidates.find(
              (candidate: Candidate) => candidate.name === selectedCandidate
            ).id,
            Vote: [],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setRefreshVoters((prev) => !prev);
      } catch (err) {
        console.error("Error adding voter:", err);
      }
    }
  };

  //

  // const handleSendVote = () => {
  //   if (activeResearch && selectedCandidate && selectedVoter) {
  //     setResearches(researches.map((research, index) =>
  //       research.id === activeResearch
  //         ? {
  //             ...research,
  //             candidates: research.candidates[index].name.includes(selectedCandidate)
  //               ? research.candidates
  //               : [...research.candidates, selectedCandidate],
  //             voters: research.voters.includes(selectedVoter)
  //               ? research.voters
  //               : [...research.voters, selectedVoter],
  //             votes: research.votes + 1
  //           }
  //         : research
  //     ))
  //     setIsVoteModalOpen(false)
  //     setSelectedCandidate("")
  //     setSelectedVoter("")
  //     setActiveResearch(null)
  //   }
  // }

  const handleSendVote = async () => {
    // TODO: send vote to server
    const getVoterId = await axios.get(
      "http://localhost:3333/voter/findByName",
      {
        params: {
          name: selectedVoter,
        },
        withCredentials: true,
      }
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      });
    }

    const getCandidateId = await axios.get(
      "http://localhost:3333/candidate/findByName",
      {
        params: {
          name: selectedCandidate,
        },
        withCredentials: true,
      }
    );

    if (
      activeResearch !== null &&
      selectedCandidate !== null &&
      selectedVoter !== null
    ) {
      const response = await axios.post(
        "http://localhost:3333/vote/register",
        {
          voterId: getVoterId.data.voters[0].id,
          candidateId: getCandidateId.data.candidate[0].id,
          researchId: researches[activeResearch].id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log(getVoterId.data.voters[0].id);
        const updateVoterLoc = await axios.patch(
          `http://localhost:3333/voter/update/${getVoterId.data.voters[0].id}`,
          {
            lat: latitude !== null ? latitude.toString() : "", // TODO: maybe add a error to say that cant get geoloc
            long: longitude !== null ? longitude.toString() : "", // TODO: maybe add a error to say that cant get geoloc
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      }

      console.log(response);
    } else {
      console.log("Dados faltando"); // TODO: refactor handle error
    }

    setIsVoteModalOpen(false);
    setSelectedCandidate("");
    setSelectedVoter("");
    setActiveResearch(null);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
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
                <Link href="#" className="flex justify-between">
                  <MegaphoneIcon className="h-4 w-4 mr-2" />
                  Reportar erro
                </Link>
              </Button>
              <Button variant="ghost" className="text-red-500">
                <Link href="#" className="flex justify-between">
                  <TrashIcon color="red" className="h-4 w-4 mr-2" />
                  Fazer Logout
                </Link>
              </Button>
            </ul>
          </nav>
          <div className="md:hidden">
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
                  <SheetClose asChild>
                    <Button
                      className="gap-2 justify-start bg-black hover:bg-gray-800"
                      variant="default"
                    >
                      <Link href="#" className="flex flex-row gap-2">
                        <ChartColumn size={18} /> Dados das pesquisas
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="gap-2 justify-start" variant="outline">
                      <Link href="#" className="flex flex-row gap-2">
                        <MegaphoneIcon size={18} /> Reportar um erro
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="gap-2 justify-start text-red-500" variant="ghost">
                      <LogOutIcon color="red" size={18} /> Fazer Logout
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Criar uma nova pesquisa</CardTitle>
            </CardHeader>
            <CardContent>
              <Collapsible
                open={isNewResearchOpen}
                onOpenChange={setIsNewResearchOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {isNewResearchOpen
                      ? "Fechar formulario"
                      : "Abrir formulario"}
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <form onSubmit={handleResearchRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Insira o título da pesquisa"
                        value={newResearch.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Insira a descrição da pesquisa"
                        value={newResearch.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={newResearch.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Criar pesquisa
                    </Button>
                  </form>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pesquisas existentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {researches.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    Nenhuma pesquisa encontrada.
                  </p>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {researches.map((research) => (
                      <AccordionItem value={research.id} key={research.id}>
                        <AccordionTrigger>{research.title}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <p>
                              <strong>Data:</strong> {research.endDate}
                            </p>
                            <p className="truncate max-w-[230px]">
                              <strong>Candidatos:</strong>{" "}
                              {research.candidates.length > 0
                                ? research.candidates
                                    .map((candidate) => candidate.name)
                                    .join(", ")
                                : "Nenhum candidato"}
                            </p>
                            <p>
                              <strong>Quantidade de Votos:</strong>{" "}
                              {research.Vote.length}
                            </p>
                            <Button
                              className="w-full"
                              onClick={() => {
                                setActiveResearch(researches.indexOf(research));
                                setIsVoteModalOpen(true);
                              }}
                            >
                              <VoteIcon className="h-4 w-4 mr-2" />
                              Adicionar Voto
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isVoteModalOpen} onOpenChange={setIsVoteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar voto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="candidate">Candidato</Label>
              <Input
                id="candidate"
                placeholder="Procurar candidatos"
                value={candidateSearch}
                onChange={handleCandidateSearch}
              />
              {candidateSearch && (
                <ScrollArea className="h-[100px] border rounded-md p-2">
                  {filteredCandidates.map((candidate, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleSelectCandidate(candidate)}
                    >
                      {candidate}
                    </Button>
                  ))}
                </ScrollArea>
              )}
              {selectedCandidate && (
                <p className="text-sm font-medium">
                  Selecionado: {selectedCandidate}
                </p>
              )}
              <p className="text-gray-400 font-medium text-[11px]">
                quer adicionar um não existente?
              </p>
              <Button onClick={handleAddCandidate}>Adicionar Candidato</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="voter">Votante</Label>
              <Input
                id="voter"
                placeholder="Procurar votantes"
                value={voterSearch}
                onChange={handleVoterSearch}
              />
              {voterSearch && (
                <ScrollArea className="h-[100px] border rounded-md p-2">
                  {filteredVoters.map((voter, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleSelectVoter(voter)}
                    >
                      {voter}
                    </Button>
                  ))}
                </ScrollArea>
              )}
              {selectedVoter && (
                <p className="text-sm font-medium">
                  Selecionado: {selectedVoter}
                </p>
              )}
              <p className="text-gray-400 font-medium text-[11px]">
                quer adicionar um não existente?
              </p>
              {/* <Button><p>Adicionar Votante</p></Button> */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Adicionar Votante</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium leading-none">Dados</h4>
                        <PopoverClose asChild>
                          <Button variant="ghost" size="icon">
                            <XIcon className="w-4 h-4" />
                          </Button>
                        </PopoverClose>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Insira as informações do votante
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          defaultValue=""
                          className="col-span-2 h-8"
                          value={voterName}
                          onChange={(e) => setVoterName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="phonenumber">Número para contato</Label>
                        <Input
                          id="phonenumber"
                          defaultValue=""
                          className="col-span-2 h-8"
                          value={voterPhoneNumber}
                          onChange={(e) => setVoterPhoneNumber(e.target.value)}
                        />
                      </div>
                      <Button type="submit" onClick={handleAddVoter}>
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button
            onClick={handleSendVote}
            disabled={!selectedCandidate || !selectedVoter}
            className="w-full"
          >
            <SendIcon className="h-4 w-4 mr-2" />
            Enviar voto
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
