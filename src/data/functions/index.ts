import type { CSFFunction } from '../../types';

// Colors match the official NIST CSF 2.0 wheel diagram
// GV: yellow, ID: blue, PR: purple, DE: orange, RS: coral, RC: green
export const csfFunctions: CSFFunction[] = [
  {
    id: 'GV',
    code: 'GV',
    name: 'Governar',
    nameEn: 'GOVERN',
    description: 'Estabelecer e monitorar a estratégia, expectativas e políticas organizacionais para gerenciar riscos de cibersegurança.',
    objective: 'Garantir que a estratégia de cibersegurança esteja alinhada às prioridades organizacionais, com papéis definidos, políticas estabelecidas e supervisão adequada da gestão de riscos.',
    layers: ['strategic'],
    color: '#C8A800',       // darker yellow for text contrast on white
    colorLight: '#FFF9C4',  // light yellow background
    colorHex: '#FFF59D',    // official wheel color
    icon: 'Shield',
    categoryIds: ['GV.OC', 'GV.RM', 'GV.RR', 'GV.PO', 'GV.OV', 'GV.SC'],
  },
  {
    id: 'ID',
    code: 'ID',
    name: 'Identificar',
    nameEn: 'IDENTIFY',
    description: 'Desenvolver uma compreensão organizacional para gerenciar riscos de cibersegurança relacionados a sistemas, pessoas, ativos, dados e capacidades.',
    objective: 'Criar e manter um entendimento claro do ambiente organizacional, dos ativos críticos, dos riscos existentes e das vulnerabilidades, como base para decisões de cibersegurança.',
    layers: ['strategic', 'tactical'],
    color: '#1A7FA8',       // darker blue for text
    colorLight: '#E0F4FB',  // light blue background
    colorHex: '#4BAED6',    // official wheel color
    icon: 'Search',
    categoryIds: ['ID.AM', 'ID.RA', 'ID.IM'],
  },
  {
    id: 'PR',
    code: 'PR',
    name: 'Proteger',
    nameEn: 'PROTECT',
    description: 'Utilizar salvaguardas para gerenciar riscos de cibersegurança e reduzir a probabilidade e o impacto de eventos adversos.',
    objective: 'Implementar controles e salvaguardas técnicas, físicas e administrativas para proteger ativos críticos e reduzir a superfície de ataque.',
    layers: ['tactical', 'operational'],
    color: '#5B57C0',       // darker purple for text
    colorLight: '#EEECFB',  // light purple background
    colorHex: '#8F8CE0',    // official wheel color
    icon: 'Lock',
    categoryIds: ['PR.AA', 'PR.AT', 'PR.DS', 'PR.PS', 'PR.IR'],
  },
  {
    id: 'DE',
    code: 'DE',
    name: 'Detectar',
    nameEn: 'DETECT',
    description: 'Encontrar e analisar possíveis ataques e comprometimentos de cibersegurança.',
    objective: 'Desenvolver e manter capacidades de monitoramento contínuo e análise de eventos para identificar atividades anômalas e incidentes de segurança em tempo hábil.',
    layers: ['operational', 'tactical'],
    color: '#C07800',       // darker orange for text
    colorLight: '#FFF3DC',  // light orange background
    colorHex: '#FDB642',    // official wheel color
    icon: 'Eye',
    categoryIds: ['DE.CM', 'DE.AE'],
  },
  {
    id: 'RS',
    code: 'RS',
    name: 'Responder',
    nameEn: 'RESPOND',
    description: 'Tomar ações relacionadas a um incidente de cibersegurança detectado.',
    objective: 'Desenvolver e manter capacidades para conter, analisar e mitigar incidentes de cibersegurança, comunicar adequadamente e aprender com os eventos.',
    layers: ['operational', 'tactical'],
    color: '#D93E38',       // darker coral for text
    colorLight: '#FFE8E7',  // light coral background
    colorHex: '#F96F67',    // official wheel color
    icon: 'Zap',
    categoryIds: ['RS.MA', 'RS.AN', 'RS.CO', 'RS.MI'],
  },
  {
    id: 'RC',
    code: 'RC',
    name: 'Recuperar',
    nameEn: 'RECOVER',
    description: 'Restaurar ativos e operações afetados por incidentes de cibersegurança.',
    objective: 'Planejar e executar atividades de recuperação para restaurar capacidades e serviços impactados, aplicando lições aprendidas para melhorar a resiliência organizacional.',
    layers: ['tactical', 'strategic'],
    color: '#1E9E52',       // darker green for text
    colorLight: '#E2FAF0',  // light green background
    colorHex: '#6EEA96',    // official wheel color
    icon: 'RefreshCw',
    categoryIds: ['RC.RP', 'RC.CO'],
  },
];

export const getFunctionById = (id: string): CSFFunction | undefined =>
  csfFunctions.find(f => f.id === id);
