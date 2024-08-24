"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
  ScatterChartIcon,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";

const researchCards = [
  {
    title: "Market Trends",
    description: "Analyze market trends over time",
  },
  {
    title: "Growth Projections",
    description: "View company growth projections",
  },
  {
    title: "Market Share",
    description: "Examine market share distribution",
  },
];

export default function Component() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [researches, setResearches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3333/research");
      setResearches(response.data.researches);
    };
    fetchData();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Resultado das pesquisas</h1>
      <p className="text-muted-foreground mb-6">
        Selecione uma pesquisa para ver os gráficos e análises detalhados.
      </p>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researches.map((card, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCard === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedCard(index)}
            >
              <Link href={`/resultados/${card.id}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>{card.title}</span>
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">
                      Clique para ver o gráfico
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </ScrollArea>
      {selectedCard !== null && (
        <div className="mt-6 p-4 bg-muted rounded-md">
          <p>You selected: {researchCards[selectedCard].title}</p>
          <p>
            Click here to view the full graph (not implemented in this example)
          </p>
        </div>
      )}
    </div>
  );
}
