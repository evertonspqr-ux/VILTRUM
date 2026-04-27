import { Shield, BrainCircuit, Globe } from 'lucide-react';

export const recruitmentPaths = [
  {
    id: "soldier",
    title: "SOLDADO VILTRUMITA",
    subtitle: "Para os que sustentam a linha de frente.",
    description: "Sua força será a fundação do nosso domínio. Seu corpo será a arma que esmaga rebeliões e assegura a submissão de civilizações inteiras.",
    requirements: ["Pureza Genética", "Submissão Absoluta à Cadeia de Comando", "Capacidade de Voo Otimizada"],
    icon: Shield,
    color: "text-blood-red",
    borderColor: "border-blood-red/50",
    bgColor: "hover:bg-blood-red/10"
  },
  {
    id: "infiltrator",
    title: "AGENTE DE INFILTRAÇÃO",
    subtitle: "Para os que preparam mundos antes da conquista.",
    description: "Você viajará sozinho para mundos distantes. Irá se integrar, estudar as fraquezas sistêmicas e paralisar as defesas antes da armada chegar.",
    requirements: ["Ciclo de Vida Extenso", "Mimetismo Cultural", "Frieza Emocional Comprovada"],
    icon: Globe,
    color: "text-uniform-blue",
    borderColor: "border-uniform-blue/50",
    bgColor: "hover:bg-uniform-blue/10"
  },
  {
    id: "strategist",
    title: "ESTRATEGISTA IMPERIAL",
    subtitle: "Para os que transformam resistência em submissão.",
    description: "Mentes afiadas pela Grande Purificação. Planeje campanhas milenares, gerencie a expansão e calcule a taxa de extermínio necessária de cada planeta subjugado.",
    requirements: ["Intelecto Elevado", "Falta de Empatia Crítica", "Conhecimento Avançado Tático"],
    icon: BrainCircuit,
    color: "text-silver",
    borderColor: "border-silver/50",
    bgColor: "hover:bg-silver/10"
  }
];
