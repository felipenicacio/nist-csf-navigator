export { csfFunctions, getFunctionById } from './functions';
export { csfCategories, getCategoryById, getCategoriesByFunction } from './categories';
export { allSubcategories, getSubcategoryById, getSubcategoriesByCategory, getSubcategoriesByFunction } from './subcategories';
export { frameworks, getFrameworkById, getFrameworksByCategory } from './frameworks';

export const glossaryTerms = [
  { term: 'Risco', termEn: 'Risk', definition: 'A combinação da probabilidade de um evento adverso ocorrer e do impacto que causaria. Gerenciar riscos significa reduzir probabilidade, impacto, ou ambos.' },
  { term: 'Ativo', termEn: 'Asset', definition: 'Qualquer coisa de valor para a organização: dados, sistemas, hardware, software, pessoas, instalações ou serviços.' },
  { term: 'Controle', termEn: 'Control', definition: 'Medida técnica, administrativa ou física implementada para reduzir riscos de segurança. Exemplos: autenticação multifator, firewall, política de senhas.' },
  { term: 'Apetite a Riscos', termEn: 'Risk Appetite', definition: 'O nível geral de risco que a organização está disposta a aceitar em busca de seus objetivos. Definido pela alta direção.' },
  { term: 'Tolerância a Riscos', termEn: 'Risk Tolerance', definition: 'Os limites operacionais específicos aceitáveis em torno do apetite a riscos. Mais concreto e mensurável que o apetite.' },
  { term: 'Incidente de Segurança', termEn: 'Security Incident', definition: 'Evento que compromete ou ameaça comprometer a confidencialidade, integridade ou disponibilidade de informações ou sistemas.' },
  { term: 'Confidencialidade', termEn: 'Confidentiality', definition: 'Garantia de que as informações só são acessíveis a quem tem autorização. Violada por vazamentos e acessos não autorizados.' },
  { term: 'Integridade', termEn: 'Integrity', definition: 'Garantia de que as informações não foram alteradas de forma não autorizada. Violada por modificações indevidas de dados.' },
  { term: 'Disponibilidade', termEn: 'Availability', definition: 'Garantia de que sistemas e informações estão acessíveis quando necessário. Violada por ataques de negação de serviço (DDoS) ou falhas.' },
  { term: 'Vulnerabilidade', termEn: 'Vulnerability', definition: 'Fraqueza em um sistema, processo ou controle que pode ser explorada por uma ameaça para causar dano.' },
  { term: 'Ameaça', termEn: 'Threat', definition: 'Agente ou evento com potencial de explorar uma vulnerabilidade e causar dano. Pode ser externa (hackers) ou interna (erros humanos, insiders).' },
  { term: 'Ransomware', termEn: 'Ransomware', definition: 'Tipo de malware que criptografa os dados da vítima e exige pagamento (resgate) para restaurar o acesso. Um dos ataques mais comuns e impactantes atualmente.' },
  { term: 'Autenticação Multifator (MFA)', termEn: 'Multi-Factor Authentication', definition: 'Método de verificação de identidade que exige dois ou mais fatores: algo que você sabe (senha), tem (token) ou é (biometria).' },
  { term: 'Postura de Cibersegurança', termEn: 'Cybersecurity Posture', definition: 'Estado geral da capacidade de uma organização de prevenir, detectar e responder a riscos de cibersegurança.' },
  { term: 'Cadeia de Suprimentos', termEn: 'Supply Chain', definition: 'Conjunto de fornecedores, parceiros e terceiros que fornecem produtos, softwares ou serviços à organização. Cada um pode introduzir riscos de cibersegurança.' },

  { term: 'Cibersegurança', termEn: 'Cybersecurity', definition: 'Prevenção de danos, proteção e restauração de computadores, sistemas de comunicação eletrônica, serviços de comunicação eletrônica, comunicações com fio e eletrônicas, e as informações contidas nessas tecnologias.' },
  { term: 'Risco de Cibersegurança', termEn: 'Cybersecurity Risk', definition: 'Probabilidade e possível impacto de um evento que explore vulnerabilidades de sistemas de informação para comprometer confidencialidade, integridade ou disponibilidade.' },
  { term: 'Function', termEn: 'Function', definition: 'Agrupamento de resultados de cibersegurança de alto nível no NIST CSF. O CSF 2.0 possui seis Functions: Govern, Identify, Protect, Detect, Respond e Recover.' },
  { term: 'Categoria', termEn: 'Category', definition: 'Subdivisão de uma Function em grupos de resultados de cibersegurança estreitamente relacionados. O CSF 2.0 possui 17 Categories distribuídas entre as seis Functions.' },
  { term: 'Subcategoria', termEn: 'Subcategory', definition: 'Declaração de resultado específico de cibersegurança dentro de uma Category. O CSF 2.0 possui 106 Subcategories.' },
  { term: 'Core', termEn: 'Core', definition: 'Conjunto de resultados de cibersegurança desejados organizados em Functions, Categories e Subcategories. É a espinha dorsal do NIST CSF.' },
  { term: 'Perfil Atual', termEn: 'Current Profile', definition: 'Representa os resultados de cibersegurança que a organização está alcançando no momento presente.' },
  { term: 'Perfil Alvo', termEn: 'Target Profile', definition: 'Representa os resultados de cibersegurança que a organização deseja alcançar, com base em seus objetivos e tolerância a riscos.' },
  { term: 'Análise de Gaps', termEn: 'Gap Analysis', definition: 'Comparação entre o Current Profile e o Target Profile para identificar a diferença entre o estado atual e o desejado.' },
  { term: 'Tier', termEn: 'Tier', definition: 'Nível de sofisticação das práticas de gestão de riscos de cibersegurança de uma organização. O CSF define quatro Tiers: Partial, Risk Informed, Repeatable e Adaptive.' },
  { term: 'Gestão de Riscos', termEn: 'Risk Management', definition: 'Processo de identificação, análise, avaliação, tratamento e monitoramento de riscos para mantê-los em níveis aceitáveis.' },
  { term: 'Gestão de Riscos da Cadeia de Suprimentos', termEn: 'Supply Chain Risk Management', definition: 'Processo de identificação e gestão de riscos de cibersegurança introduzidos por fornecedores, produtos e serviços de terceiros.' },
  { term: 'Incidente', termEn: 'Incident', definition: 'Ocorrência que efetiva ou potencialmente compromete a confidencialidade, integridade ou disponibilidade de sistemas ou dados, ou que viola políticas de segurança.' },
  { term: 'Recuperação', termEn: 'Recovery', definition: 'Restauração de capacidades e serviços afetados por um incidente de cibersegurança.' },
  { term: 'Resiliência', termEn: 'Resilience', definition: 'Capacidade de antecipar, resistir, absorver, adaptar-se e recuperar-se de condições adversas, ataques ou comprometimentos.' },
  { term: 'Perfil Organizacional', termEn: 'Organizational Profile', definition: 'Mecanismo do CSF 2.0 para descrever o estado atual ou desejado da cibersegurança de uma organização em relação aos resultados do Core.' },
  { term: 'Menor Privilégio', termEn: 'Least Privilege', definition: 'Princípio de segurança pelo qual usuários, sistemas e processos recebem apenas os privilégios mínimos necessários para realizar suas funções.' },
];
