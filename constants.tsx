
import { Subject, SubjectData } from './types';

export const APP_LOGO_DESCRIPTION = "Circulo roxo com as letras 'zé' em preto e um 'R' registrado ao lado.";

export const CHARACTERS = {
  GAIA: {
    name: "Gaia",
    role: "Doutora em Gestão Ambiental (IFAL/IMA)",
    bio: "Especialista em licenciamento e avaliação de impactos. Gaia orienta sobre o rigor técnico e metodológico exigido nos órgãos ambientais.",
    avatar: "🌿",
    color: "emerald"
  },
  SOFIA: {
    name: "Sofia",
    role: "Consultora em Legislação e Bioética (CFBio)",
    bio: "Especialista em Direito da Biodiversidade. Sofia desvenda os marcos éticos e as responsabilidades legais do Biólogo no Brasil.",
    avatar: "⚖️",
    color: "indigo"
  }
};

export const DAILY_LIFE_BIOLOGY = [
  {
    title: "O Sal da Cozinha",
    content: "O caso da Braskem em Maceió demonstra como a falha na AIA de atividades de mineração pode levar ao colapso de bairros inteiros.",
    discipline: "AIA",
    icon: "fa-salt-shaker"
  },
  {
    title: "Rótulo de Transgênicos",
    content: "O triângulo 'T' nos alimentos é um dever bioético de informação ao consumidor sobre a origem biotecnológica do produto.",
    discipline: "Bioética",
    icon: "fa-triangle-exclamation"
  },
  {
    title: "Microplásticos no Peixe",
    content: "Estudos de AIA modernos agora exigem a análise de persistência de microplásticos, que afetam a saúde humana via cadeia trófica.",
    discipline: "AIA",
    icon: "fa-fish-fins"
  },
  {
    title: "Caramujo Africano",
    content: "A introdução de espécies invasoras para fins comerciais sem AIA prévia causou um desastre biológico e sanitário no Brasil.",
    discipline: "Bioética/Legislação",
    icon: "fa-bug"
  },
  {
    title: "Propriedade de Sementes",
    content: "O Biólogo atua na legislação para garantir que sementes crioulas não sejam patenteadas indevidamente por corporações.",
    discipline: "Legislação",
    icon: "fa-seedling"
  },
  {
    title: "Testes de Cosméticos",
    content: "A proibição do uso de animais para cosméticos no Brasil é uma vitória direta da mobilização bioética no CONCEA.",
    discipline: "Bioética",
    icon: "fa-pump-soap"
  }
];

export const INTEGRATED_CASES = [
  {
    id: "int-1",
    title: "Liberação de Mosquitos Transgênicos (Aedes aegypti)",
    description: "Uso da linhagem OX513A para controle de dengue. AIA: impacto na cadeia alimentar. Bioética: consentimento comunitário e princípio da precaução.",
    outcome: "Exigiu autorização da CTNBio e licenciamento do IBAMA, gerando jurisprudência sobre manipulação genética ambiental.",
    subject: "Integrado",
    source: "CTNBio (Comissão Técnica Nacional de Biossegurança)."
  },
  {
    id: "int-2",
    title: "Usina Hidrelétrica de Belo Monte",
    description: "Um dos casos mais complexos de AIA do mundo. Impacto no fluxo do Rio Xingu e deslocamento de povos indígenas (Bioética Social).",
    outcome: "Resultou em condicionantes ambientais bilionárias e críticas sobre a eficácia do RIMA em traduzir riscos sociais.",
    subject: "Integrado",
    source: "IBAMA / MPF."
  },
  {
    id: "int-3",
    title: "Biopirataria e Protocolo de Nagoya",
    description: "Uso de conhecimentos tradicionais da Amazônia para criar fármacos sem repartição de benefícios. Fere a legislação de biodiversidade.",
    outcome: "Criação do SisGen no Brasil para regular o acesso ao patrimônio genético e garantir ética na pesquisa com espécies nativas.",
    subject: Subject.BIOETHICS,
    source: "Ministério do Meio Ambiente (CGen)."
  },
  {
    id: "int-4",
    title: "Edição Genética CRISPR-Cas9",
    description: "A capacidade de 'recortar' genes gera dilemas sobre a eugenia e a modificação permanente do pool gênico de espécies silvestres.",
    outcome: "A comunidade científica internacional propôs uma moratória para edições em linhagens germinativas humanas.",
    subject: Subject.BIOETHICS,
    source: "Science / National Institutes of Health."
  }
];

export const SUBJECTS_DATA: Record<Subject, SubjectData> = {
  [Subject.AIA]: {
    title: Subject.AIA,
    description: "Estudo sistemático dos efeitos de atividades humanas sobre o ecossistema, fundamentado na Política Nacional do Meio Ambiente.",
    facilitator: CHARACTERS.GAIA,
    syllabus: [
      {
        title: "Fundamentos e Marcos Legais",
        content: "A AIA no Brasil é regida pela Lei 6.938/81 e pelas Resoluções CONAMA 001/86 e 237/97. Ela é um instrumento preventivo que deve ocorrer antes da instalação de projetos potencialmente poluidores.",
        keyPoints: ["Lei 6.938/81", "CONAMA 001/86", "Licenciamento Trifásico"],
        scientificRef: "Sánchez, L. E. (2020). Avaliação de Impacto Ambiental: conceitos e métodos."
      },
      {
        title: "EIA e RIMA: Diferenças Cruciais",
        content: "O EIA é técnico e denso; o RIMA é o relatório em linguagem acessível para audiências públicas. O biólogo deve saber comunicar o risco técnico para a sociedade civil.",
        keyPoints: ["Audiência Pública", "Linguagem Acessível", "Transparência"],
        scientificRef: "Milaré, É. (2018). Direito do Ambiente."
      }
    ],
    quiz: [
      {
        id: "aia-1",
        text: "Qual destas atividades exige obrigatoriamente a elaboração de EIA/RIMA segundo a Resolução CONAMA 001/86?",
        options: [
          "Abertura de pequenas trilhas ecológicas",
          "Construção de estradas de ferro e rodovias",
          "Reforma de jardins em áreas urbanas",
          "Instalação de pequenos quiosques de praia"
        ],
        correctAnswer: 1,
        explanation: "Grandes obras de infraestrutura exigem o estudo mais complexo (EIA/RIMA) devido ao alto potencial de fragmentação de habitat.",
        source: "Resolução CONAMA nº 001/1986."
      },
      {
        id: "aia-2",
        text: "O que caracteriza o Princípio da Precaução na AIA?",
        options: [
          "Esperar o dano ocorrer para depois agir",
          "Na dúvida sobre riscos graves ou irreversíveis, deve-se agir preventivamente",
          "Sempre autorizar projetos se gerarem empregos",
          "Ignorar impactos pequenos"
        ],
        correctAnswer: 1,
        explanation: "A ausência de certeza científica absoluta não deve ser usada como razão para postergar medidas eficazes para evitar a degradação ambiental.",
        source: "Declaração da Rio-92."
      }
    ],
    cases: [
      {
        id: "aia-c1",
        title: "Rompimento da Barragem de Fundão (Mariana)",
        description: "Falha catastrófica no monitoramento de impactos. O lama de rejeitos destruiu a bacia do Rio Doce e chegou ao oceano.",
        outcome: "Revisão total da legislação de barragens e condenação por falhas no Plano de Recuperação de Áreas Degradadas (PRAD).",
        subject: Subject.AIA,
        source: "Ministério Público Federal / IBAMA."
      }
    ],
    curiosities: [
      {
        title: "Bioindicadores de Alarme",
        content: "Certas abelhas desaparecem de uma área anos antes de sensores detectarem poluição química grave. Elas são as 'sentinelas' de uma AIA bem feita.",
        icon: "fa-bee"
      }
    ]
  },
  [Subject.BIOETHICS]: {
    title: Subject.BIOETHICS,
    description: "Normas de conduta moral e ética profissional, focadas na proteção da vida e no cumprimento das resoluções do CFBio.",
    facilitator: CHARACTERS.SOFIA,
    syllabus: [
      {
        title: "Bioética Principialista",
        content: "Baseada nos quatro pilares: Autonomia, Beneficência, Não-maleficência e Justiça, aplicados à saúde e pesquisa biológica.",
        keyPoints: ["Principialismo", "Relatório Belmont", "Ética Clínica"],
        scientificRef: "Beauchamp, T. L. & Childress, J. F. (2019)."
      },
      {
        title: "Biodireito e Biossegurança",
        content: "A Lei de Biossegurança (Lei 11.105/05) regula o uso de OGM e a pesquisa com células-tronco embrionárias no Brasil.",
        keyPoints: ["Lei 11.105/05", "OGM", "Células-Tronco"],
        scientificRef: "Garrafa, V. (2015). Bioética e Saúde Pública."
      }
    ],
    quiz: [
      {
        id: "bio-1",
        text: "Qual o foco principal do Princípio dos 3Rs na experimentação animal?",
        options: [
          "Reproduzir, Reciclar e Reutilizar",
          "Substituir, Reduzir e Refinar",
          "Racionalizar, Reagir e Responder",
          "Remover, Reformar e Recolocar"
        ],
        correctAnswer: 1,
        explanation: "Os 3Rs visam o uso ético de animais: substituir, reduzir e refinar técnicas.",
        source: "Lei Arouca (11.794/08)."
      },
      {
        id: "bio-2",
        text: "No Brasil, quem autoriza pesquisas com Organismos Geneticamente Modificados (OGM)?",
        options: [
          "Apenas o diretor da faculdade",
          "A CTNBio (Comissão Técnica Nacional de Biossegurança)",
          "Qualquer laboratório privado",
          "O Ministério da Agricultura apenas"
        ],
        correctAnswer: 1,
        explanation: "A CTNBio é o órgão máximo de consulta e autorização técnica para biossegurança de OGMs no Brasil.",
        source: "Lei 11.105/05."
      }
    ],
    cases: [
      {
        id: "bio-c1",
        title: "Caso Henrietta Lacks (Células HeLa)",
        description: "Uso de células humanas para pesquisa sem consentimento da paciente. Um marco na discussão sobre autonomia e propriedade biológica.",
        outcome: "Mudança global nas regras de consentimento informado para uso de material biológico humano.",
        subject: Subject.BIOETHICS,
        source: "Johns Hopkins Medicine."
      }
    ],
    curiosities: [
      {
        title: "O Cérebro em um Chip",
        content: "Organoides cerebrais estão sendo cultivados em laboratório. O dilema atual é: em que ponto um aglomerado de células começa a ter 'senciência'?",
        icon: "fa-brain"
      }
    ]
  }
};
