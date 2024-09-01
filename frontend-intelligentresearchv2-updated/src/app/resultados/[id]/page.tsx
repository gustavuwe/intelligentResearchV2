// "use client";

// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";

// // Mock data for candidates and their vote percentages across neighborhoods
// const candidatesData = [
//   {
//     name: "Alice Johnson",
//     data: [
//       { neighborhood: "Downtown", votes: 35 },
//       { neighborhood: "Suburbia", votes: 28 },
//       { neighborhood: "Riverside", votes: 22 },
//       { neighborhood: "Hillside", votes: 15 },
//     ],
//   },
//   {
//     name: "Bob Smith",
//     data: [
//       { neighborhood: "Downtown", votes: 30 },
//       { neighborhood: "Suburbia", votes: 32 },
//       { neighborhood: "Riverside", votes: 25 },
//       { neighborhood: "Hillside", votes: 13 },
//     ],
//   },
//   {
//     name: "Carol Williams",
//     data: [
//       { neighborhood: "Downtown", votes: 20 },
//       { neighborhood: "Suburbia", votes: 25 },
//       { neighborhood: "Riverside", votes: 35 },
//       { neighborhood: "Hillside", votes: 20 },
//     ],
//   },
//   {
//     name: "David Brown",
//     data: [
//       { neighborhood: "Downtown", votes: 15 },
//       { neighborhood: "Suburbia", votes: 15 },
//       { neighborhood: "Riverside", votes: 18 },
//       { neighborhood: "Hillside", votes: 52 },
//     ],
//   },
// ];

// export default function Component() {
//   const [selectedCandidate, setSelectedCandidate] = useState(candidatesData[0]);

//   return (
//     <div className="flex h-screen bg-background">
//       {/* Sidebar */}
//       <aside className="w-64 border-r bg-muted/40">
//         <ScrollArea className="h-full">
//           <div className="p-4">
//             <h2 className="text-lg font-semibold mb-4">Candidates</h2>
//             <div className="space-y-2">
//               {candidatesData.map((candidate) => (
//                 <Button
//                   key={candidate.name}
//                   variant={
//                     selectedCandidate.name === candidate.name
//                       ? "default"
//                       : "ghost"
//                   }
//                   className="w-full justify-start"
//                   onClick={() => setSelectedCandidate(candidate)}
//                 >
//                   {candidate.name}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </ScrollArea>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           Vote Distribution for {selectedCandidate.name}
//         </h1>
//         <div className="h-[650px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={selectedCandidate.data}
//               margin={{
//                 top: 20,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="neighborhood" />
//               <YAxis
//                 label={{
//                   value: "Votes (%)",
//                   angle: -90,
//                   position: "insideLeft",
//                 }}
//               />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="votes" fill="#8884d8" name="Votes (%)" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { cache, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import axios from "axios";
import { Candidate, Voter } from "@/app/home/page";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getCookie } from "@/utils/cookieUtils";
import { CustomJWTPayload, verifyJWT } from "@/utils/jwtVerification";

interface Idata {
  neighborhood: string;
  votes: number;
}

interface CandidateData {
  name: string;
  data: Idata[];
}

// Mock data for candidates and their vote percentages across neighborhoods
const candidatesData = [
  {
    name: "Alice Johnson",
    data: [
      { neighborhood: "Downtown", votes: 35 },
      { neighborhood: "Suburbia", votes: 28 },
      { neighborhood: "Riverside", votes: 22 },
      { neighborhood: "Hillside", votes: 15 },
    ],
  },
  {
    name: "Bob Smith",
    data: [
      { neighborhood: "Downtown", votes: 30 },
      { neighborhood: "Suburbia", votes: 32 },
      { neighborhood: "Riverside", votes: 25 },
      { neighborhood: "Hillside", votes: 13 },
    ],
  },
  {
    name: "Carol Williams",
    data: [
      { neighborhood: "Downtown", votes: 20 },
      { neighborhood: "Suburbia", votes: 25 },
      { neighborhood: "Riverside", votes: 35 },
      { neighborhood: "Hillside", votes: 20 },
    ],
  },
  {
    name: "David Brown",
    data: [
      { neighborhood: "Downtown", votes: 15 },
      { neighborhood: "Suburbia", votes: 15 },
      { neighborhood: "Riverside", votes: 18 },
      { neighborhood: "Hillside", votes: 52 },
    ],
  },
];

const chartConfig = {
  desktop: {
    label: "Votes",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Component() {
  const router = useRouter();
  const params = useParams();
  // const candidatesData2: CandidateData[] = []

  // const geralData: CandidateData[] = []

  const [candidatesData2, setCandidatesData] = useState<CandidateData[]>([]);
  const [geralData, setGeralData] = useState<CandidateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateData | null>({ name: "todos os candidatos", data: [] });
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<CustomJWTPayload | null>(null);

  // useEffect(() => {
  //   const cookieToken = getCookie('token');
  //   setToken(cookieToken);

  //   async function checkAuth() {
  //     const payload = await verifyJWT();
  //     if (payload) {
  //       setUserData(payload);
  //     }
  //   }

  //   checkAuth();
  // }, [router, userData]);

  // useEffect(() => {
  //   async function checkAuthAdmin() {
  //     if (token) {
  //       console.log(userData)
  //       if (userData?.role === 'ADMIN') {
  //         setIsAdmin(true);
  //         setIsLoading(false);
  //       }
  //     }
  //   }
  //   checkAuthAdmin();
  // }, [userData, token])

  useEffect(() => {
    async function checkAuth() {
      const cookieToken = getCookie('token');
      setToken(cookieToken);

      if (cookieToken) {
        try {
          const payload = await verifyJWT();
          if (payload) {
            setUserData(payload);
            if (payload.role === 'ADMIN') {
              setIsAdmin(true);
            } else {
              router.push('/login');
            }
          } else {
            router.push('/login');
          }
        } catch (error) {
          router.push('/login')
          console.error('Failed to verify JWT:', error);
        }
      }

      setIsLoading(false);
    }

    checkAuth();
  }, [router]);

  // useEffect(() => {
  //   try {
  //     const getCandidates = async (): Promise<void> => {
  //       const response = await axios.get("http://localhost:3333/candidate");
  
  //       if (response.status === 200) {
  //         await response.data.candidates.map((candidate: Candidate) => {
  //           candidatesData2.push({ name: candidate.name,  data: [] });
  
  //           candidate.Voters.map((voter: Voter) => {
  //             const voterNeighborhood = voter.neighborhood
  
  //             const neighborhoodData = candidatesData2[candidatesData2.findIndex(candidate => candidate.name === candidate.name)].data.find(d => d.neighborhood === voterNeighborhood);
  
  //             if (neighborhoodData) {
  //               candidatesData2[candidatesData2.findIndex(candidate => candidate.name === candidate.name)].data[candidatesData2[candidatesData2.findIndex(candidate => candidate.name === candidate.name)].data.findIndex(d => d.neighborhood === voterNeighborhood)].votes += 1;
  //             } else {
  //               candidatesData2[candidatesData2.findIndex(candidate => candidate.name === candidate.name)].data.push({ neighborhood: voterNeighborhood, votes: 0 });
  //             }
  //           });
  //         })
  //       }
  //     }
  
  //     getCandidates()
  
  //     const getGeralData = async (): Promise<void> => {
  //       function sumVotes(candidateName: string): number {
  //         // Encontra o candidato com o nome fornecido
  //         const candidate = candidatesData2.find(c => c.name === candidateName);
        
  //         if (!candidate) {
  //           console.log(`Candidato com o nome ${candidateName} não encontrado.`);
  //           return 0;
  //         }
        
  //         // Soma todos os votos no array `data` do candidato
  //         const totalVotes = candidate.data.reduce((total, item) => total + item.votes, 0);
        
  //         return totalVotes;
  //       }
    
  //       geralData.push({ name: "todos os candidatos", data: [] });
    
  //       candidatesData2.map((candidate: CandidateData) => {
  //         const candidateAllVotes = { neighborhood: candidate.name, votes: sumVotes(candidate.name) };
  //         geralData[0].data.push(candidateAllVotes);
  //       })
  //     }
  
  //     getGeralData()
  //     setSelectedCandidate(geralData[0]);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }

  // }, [candidatesData2, geralData]);

  // useEffect(() => {
  //   try {
  //     const getCandidates = async (): Promise<void> => {
  //       const response = await axios.get("http://localhost:3333/candidate");
  
  //       if (response.status === 200) {
  //         const data: CandidateData[] = [];
  //         await response.data.candidates.map((candidate: Candidate) => {
            
  //           data.push({ name: candidate.name,  data: [] });
  
  //           candidate.Voters.map((voter: Voter) => {
  //             const voterNeighborhood = voter.neighborhood
  
  //             const neighborhoodData = data[data.findIndex(data => data.name === candidate.name)].data.find(d => d.neighborhood === voterNeighborhood);
  
  //             if (neighborhoodData) {
  //               data[data.findIndex(candidate => candidate.name === candidate.name)].data[data[data.findIndex(candidate => candidate.name === candidate.name)].data.findIndex(d => d.neighborhood === voterNeighborhood)].votes += 1;
  //             } else {
  //               data[data.findIndex(candidate => candidate.name === candidate.name)].data.push({ neighborhood: voterNeighborhood, votes: 0 });
  //             }
  //           });
  //         })
  //         setCandidatesData(data);
  //       }
  //     }
  
  //     getCandidates()
  
  //     const getGeralData = async (): Promise<void> => {
  //       function sumVotes(candidateName: string): number {
  //         // Encontra o candidato com o nome fornecido
  //         const candidate = candidatesData2.find(c => c.name === candidateName);
        
  //         if (!candidate) {
  //           console.log(`Candidato com o nome ${candidateName} não encontrado.`);
  //           return 0;
  //         }
        
  //         // Soma todos os votos no array `data` do candidato
  //         const totalVotes = candidate.data.reduce((total, item) => total + item.votes, 0);
        
  //         return totalVotes;
  //       }

  //       const geralDataVariable: CandidateData[] = [];
    
  //       geralDataVariable.push({ name: "todos os candidatos", data: [] });
    
  //       candidatesData2.map((candidate: CandidateData) => {
  //         const candidateAllVotes = { neighborhood: candidate.name, votes: sumVotes(candidate.name) };
  //         geralDataVariable[0].data.push(candidateAllVotes);
  //       })

  //       setGeralData(geralDataVariable);
  //     }
  
  //     getGeralData()
  //     setSelectedCandidate(geralData[0]);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //     console.log(geralData[0])
  //   }

  // }, [candidatesData2, geralData]);

  useEffect(() => {
    const fetchData = async () => {
      const researchId = params?.id;
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/candidate/findByResearchId/${researchId}`, {
          withCredentials: true,
        });

        console.log(response)
  
        if (response.status === 200) {
          const data: CandidateData[] = [];
          response.data.candidates.forEach((candidate: any) => {
            const candidateData: CandidateData = { name: candidate.name, data: [] };
  
            candidate.Voters.forEach((voter: any) => {
              const neighborhoodData = candidateData.data.find(d => d.neighborhood === voter.neighborhood);
  
              if (neighborhoodData) {
                neighborhoodData.votes += 1;
              } else {
                candidateData.data.push({ neighborhood: voter.neighborhood, votes: 1 });
              }
            });
  
            data.push(candidateData);
          });
  
          setCandidatesData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  useEffect(() => {
    if (candidatesData2.length > 0) {
      const geralDataVariable: CandidateData[] = [{ name: "todos os candidatos", data: [] }];

      candidatesData2.forEach((candidate) => {
        const totalVotes = candidate.data.reduce((sum, item) => sum + item.votes, 0);
        geralDataVariable[0].data.push({ neighborhood: candidate.name, votes: totalVotes });
      });

      setGeralData(geralDataVariable);
      setSelectedCandidate(geralDataVariable[0]);
    }
  }, [candidatesData2]);


  if (isLoading) {
    return <Loading />;
  }

  if (!selectedCandidate) {
    return <p>Erro ao carregar os dados</p>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 border-r bg-muted/40">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Candidatos</h2>
          <div className="space-y-2">
            {candidatesData2.map((candidate) => (
              <Button
                key={candidate.name}
                variant={
                  selectedCandidate.name === candidate.name ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setSelectedCandidate(candidate)}
              >
                {candidate.name}
              </Button>
            ))}
          </div>
        </div>
      </aside>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4">
            <SheetHeader>
              <SheetTitle>Candidatos</SheetTitle>
            </SheetHeader>
            <div className="space-y-2">
              {candidatesData2.map((candidate) => (
                <Button
                  key={candidate.name}
                  variant={
                    selectedCandidate.name === candidate.name ? "default" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  {candidate.name}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de votos para {selectedCandidate.name}</CardTitle>
            <CardDescription>Por bairro</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={selectedCandidate.data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                width={500} // You can adjust or remove the width to make it responsive
                height={300} // Adjust the height as needed
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="neighborhood" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="votes" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Visualização de votos
            </div>
          </CardFooter>
        </Card>
      </main>
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