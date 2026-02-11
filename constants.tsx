
import { Subject, SubjectData, Question } from './types';

export const CHARACTERS = {
  GAIA: {
    name: "Gaia",
    role: "Doutora em Gestão Ambiental (IFAL/IMA)",
    bio: "Especialista em didática das ciências e licenciamento de grandes obras. Minha missão é te ensinar a proteger o bioma através da lei.",
    avatar: "🔬",
    color: "emerald",
    specialty: "Avaliação de Impactos Ambientais"
  },
  SOFIA: {
    name: "Sofia",
    role: "Mestre em Ética e Legislação (CFBio)",
    bio: "Mentora de novos biólogos em ética profissional e biossegurança. Vamos discutir a dignidade da vida e o rigor da lei.",
    avatar: "⚖️",
    color: "indigo",
    specialty: "Bioética e Legislação"
  }
};

export const SUBJECTS_DATA: Record<Subject, SubjectData> = {
  [Subject.AIA]: {
    title: Subject.AIA,
    description: "Instrumento da Política Nacional do Meio Ambiente (Lei 6.938/81) para prevenção de danos ecológicos.",
    facilitator: CHARACTERS.GAIA,
    syllabus: [
      {
        title: "Teoria Geral da AIA e PNMA",
        content: "A AIA é o processo de identificar, prever e mitigar os efeitos de projetos no ambiente. No Brasil, ela é sustentada pelo Art. 225 da CF/88. Não é apenas burocracia, é ciência aplicada à prevenção.",
        keyPoints: ["Princípio do Poluidor-Pagador", "Prevenção vs Precaução", "Sustentabilidade"],
        legalFramework: ["CF/88 Art. 225", "Lei 6.938/81"],
        conceptMap: [
          { id: "1", label: "PNMA", description: "Política Nacional do Meio Ambiente.", connection: "Estabelece a" },
          { id: "2", label: "AIA", description: "Avaliação prévia de danos.", connection: "Exige o" },
          { id: "3", label: "EIA/RIMA", description: "Estudo e Relatório de Impacto.", connection: "Resulta no" },
          { id: "4", label: "Licenciamento", description: "A autorização do Estado." }
        ]
      },
      {
        title: "Resoluções CONAMA 001/86 e 237/97",
        content: "O coração técnico da AIA. A 001/86 define o que precisa de EIA/RIMA (obras de grande porte). A 237/97 detalha as etapas: Licença Prévia, de Instalação e de Operação.",
        keyPoints: ["Critérios de Impacto", "Audiências Públicas", "Trifásico"],
        legalFramework: ["CONAMA 001/86", "CONAMA 237/97"],
        conceptMap: [
          { id: "a", label: "CONAMA 001/86", description: "Regras do EIA/RIMA.", connection: "Complementa a" },
          { id: "b", label: "CONAMA 237/97", description: "Regras do Licenciamento.", connection: "Garante a" },
          { id: "c", label: "Participação Social", description: "Ouvir a comunidade afetada." }
        ]
      }
    ],
    quiz: [
      {
        id: "aia-pro-1",
        text: "Durante uma consultoria para um novo aterro sanitário, você nota que o diagnóstico ambiental não considerou a fauna endêmica. Qual princípio da PNMA está sendo violado?",
        options: [
          "Princípio da Publicidade",
          "Princípio da Prevenção",
          "Princípio da Precaução",
          "Princípio do Usuário-Recebedor"
        ],
        correctAnswer: 1,
        explanation: "Pense na diferença: Prevenção lida com riscos CONHECIDOS (sabemos que o aterro afeta a fauna). Precaução lida com incertezas científicas. Como biólogo, você deve garantir que o inventário de fauna seja completo para prevenir danos certos.",
        source: "PNMA - Lei 6.938/81",
        level: "Profissional"
      }
    ],
    curiosities: [
      { title: "O Caso Alagoano", content: "A mineração de sal-gema é um exemplo trágico de onde a monitoração pós-licenciamento falhou. Aprenda com isso.", icon: "fa-warning" }
    ]
  },
  [Subject.BIOETHICS]: {
    title: Subject.BIOETHICS,
    description: "Estudo da conduta ética em pesquisas, experimentação e exercício profissional do Biólogo.",
    facilitator: CHARACTERS.SOFIA,
    syllabus: [
      {
        title: "Fundamentos da Bioética e Principialismo",
        content: "A Bioética moderna nasce da necessidade de proteger a vida após abusos históricos. Os quatro pilares guiam toda decisão: Autonomia, Beneficência, Não-Maleficência e Justiça.",
        keyPoints: ["Código de Nuremberg", "Relatório Belmont", "Ética Profissional"],
        legalFramework: ["Resolução CNS 466/12", "Código de Ética CFBio"],
        conceptMap: [
          { id: "1", label: "Autonomia", description: "Respeito ao sujeito.", connection: "Lado a lado com" },
          { id: "2", label: "Beneficência", description: "Fazer o bem.", connection: "Evitando a" },
          { id: "3", label: "Não-Maleficência", description: "Não causar dano.", connection: "Buscando a" },
          { id: "4", label: "Justiça", description: "Equidade no acesso e riscos." }
        ]
      },
      {
        title: "Legislação do Biólogo (CFBio)",
        content: "A profissão de biólogo é regulamentada pela Lei 6.684/79. A ética profissional não é apenas moral, é um conjunto de resoluções que, se descumpridas, podem levar à perda do registro.",
        keyPoints: ["ART (Anotação de Resp. Técnica)", "Sigilo Profissional", "Biossegurança"],
        legalFramework: ["Lei 6.684/79", "Resolução CFBio 002/02"],
        conceptMap: [
          { id: "x", label: "Habilitação", description: "CRBio ativo.", connection: "Permite a" },
          { id: "y", label: "Responsabilidade", description: "Emissão de ART.", connection: "Regida pela" },
          { id: "z", label: "Ética", description: "Conduta profissional exemplar." }
        ]
      }
    ],
    quiz: [
      {
        id: "bio-pro-1",
        text: "Um biólogo é convidado a assinar um laudo de fauna sem ter ido ao campo, com a promessa de que os dados são confiáveis. Segundo o Código de Ética do Biólogo, ele deve:",
        options: [
          "Assinar, pois confia na equipe técnica.",
          "Assinar apenas se houver registro fotográfico.",
          "Recusar, pois o biólogo é responsável pela veracidade dos dados que assina.",
          "Assinar e colocar uma observação de que não esteve no local."
        ],
        correctAnswer: 2,
        explanation: "A ética profissional exige responsabilidade direta. Assinar algo sem verificação pessoal é uma infração grave que compromete a integridade da profissão e do bioma.",
        source: "Resolução CFBio 002/2002",
        level: "Profissional"
      }
    ],
    curiosities: [
      { title: "Biossegurança", content: "Não é só usar luvas; é entender o risco que um organismo geneticamente modificado pode causar ao ecossistema.", icon: "fa-biohazard" }
    ]
  }
};

export const INTEGRATED_CASES = [
  {
    id: "case-maceio",
    title: "Crise Geológica de Maceió",
    description: "Analise como a AIA falhou na detecção de subsidência e como a ética das empresas envolvidas deve ser julgada à luz dos direitos humanos e ambientais.",
    outcome: "Destaque para a importância da monitoração contínua e da independência do perito ambiental.",
    subject: "AIA + Bioética"
  }
];
