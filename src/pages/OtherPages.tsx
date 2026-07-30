import React, { useState } from 'react';
import PageIntro from '../components/ui/PageIntro';
import { getFnColors } from '../utils/fnColors';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { frameworks } from '../data/frameworks';
import { glossaryTerms } from '../data';
import { csfCategories } from '../data/categories';
import { csfFunctions } from '../data/functions';
import { allSubcategories } from '../data';
// import { MappingTypeBadge } from '../components/ui';

// ── TIERS ────────────────────────────────────────────────────────────────────
export const TiersPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<'governance' | 'management'>('governance');

  const tiers = [
    {
      n: 1, name: 'PARTIAL', color: '#DC2626', bg: '#FEF2F2',
      desc: 'Práticas ad hoc e reativas. Sem processo formalizado. Consciência de riscos limitada.',
      governance: [
        'Sem processo organizacional de gestão de riscos de cibersegurança definido',
        'Riscos de cibersegurança não são identificados de forma consistente',
        'Papéis e responsabilidades não estão formalizados',
        'Não há estratégia de riscos aprovada pela liderança',
      ],
      management: [
        'Gestão de riscos ad hoc, sem metodologia definida',
        'Compartilhamento de informações de ameaças não ocorre ou é informal',
        'Riscos de fornecedores não são sistematicamente avaliados',
        'Resposta a incidentes é reativa e não documentada',
      ],
      examples: ['Sem política formal de segurança', 'Inventário de ativos incompleto', 'Sem avaliações periódicas de risco'],
    },
    {
      n: 2, name: 'RISK INFORMED', color: '#D97706', bg: '#FFFBEB',
      desc: 'Maior consciência de riscos. Aprovação da liderança. Práticas parcialmente formalizadas.',
      governance: [
        'Prioridades de riscos de cibersegurança são estabelecidas pela liderança, mas não formalmente documentadas',
        'Existe consciência dos riscos, mas não há abordagem organizacional completa',
        'Algumas políticas existem mas não cobrem todo o escopo necessário',
        'Papéis e responsabilidades existem em algumas áreas',
      ],
      management: [
        'Existência de consciência de riscos cibernéticos em nível organizacional',
        'Avaliações de risco ocorrem, mas não são recorrentes ou repetíveis',
        'Informações de ameaças são compartilhadas informalmente',
        'Dependências da cadeia de suprimentos são reconhecidas mas não totalmente gerenciadas',
      ],
      examples: ['Política existente mas não amplamente seguida', 'Avaliações de risco sem metodologia consistente', 'Plano de resposta básico'],
    },
    {
      n: 3, name: 'REPEATABLE', color: '#1E9E52', bg: '#E2FAF0',
      desc: 'Práticas formalizadas, documentadas e aprovadas. Processos repetíveis e consistentes.',
      governance: [
        'Estratégia de gestão de riscos de cibersegurança aprovada pela liderança e documentada',
        'Políticas formalizadas, comunicadas e revisadas periodicamente',
        'Papéis, responsabilidades e autoridades claramente definidos',
        'Cadeia de suprimentos incluída no programa de gestão de riscos',
      ],
      management: [
        'Avaliações de risco são realizadas com metodologia definida e de forma periódica',
        'Compartilhamento de informações de ameaças é regular e estruturado',
        'Riscos de fornecedores são avaliados formalmente',
        'Planos de resposta e recuperação testados e atualizados',
      ],
      examples: ['SIEM implementado e monitorado', 'Avaliações periódicas com metodologia', 'Plano de resposta testado regularmente'],
    },
    {
      n: 4, name: 'ADAPTIVE', color: '#1A7FA8', bg: '#E0F4FB',
      desc: 'Adaptação ativa baseada em aprendizado contínuo e previsão de ameaças.',
      governance: [
        'Liderança adapta a estratégia com base no ambiente de ameaças e em lições aprendidas',
        'Cibersegurança está integrada à cultura e às decisões de negócio',
        'Relações com parceiros e fornecedores incluem colaboração ativa em segurança',
        'Contribuição ativa para comunidades de compartilhamento de informações',
      ],
      management: [
        'Análise preditiva de ameaças e threat hunting proativo',
        'Automação extensiva de detecção e resposta',
        'Melhoria contínua baseada em dados, métricas e lições aprendidas',
        'Compartilhamento ativo de inteligência com setor e comunidade',
      ],
      examples: ['Threat hunting proativo', 'Participação em ISACs', 'Programa orientado a dados e métricas'],
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0F766E' }}>NIST CSF 2.0. NIST SP 1302</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">CSF Tiers</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed text-sm">
          Os Tiers caracterizam o rigor das práticas de gestão de riscos de cibersegurança de uma organização. Cada Tier possui dois componentes distintos: <strong className="text-slate-700">Governance</strong> (relativo ao GOVERN) e <strong className="text-slate-700">Management</strong> (relativo às outras 5 Funções).
        </p>
      </div>

      <PageIntro
        title="O que são os Tiers?"
        plain="Os Tiers descrevem o quão rigorosa é a gestão de riscos de cibersegurança da organização, do ad hoc (Tier 1) ao adaptativo (Tier 4)."
        detail="Não são etapas que precisam ser seguidas em ordem. O objetivo não é atingir o Tier 4, é identificar o nível adequado ao seu contexto e risco."
        learnMore={{ label: 'Voltar à introdução', to: '/intro' }}
      />
      {/* Key notes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { title: 'Não são etapas obrigatórias', desc: 'O objetivo não é atingir o Tier 4. O Tier correto é o que atende ao contexto e ao risco da organização.' },
          { title: 'Selecionados pela liderança', desc: 'A seleção do Tier desejado é responsabilidade da liderança organizacional, não da equipe técnica.' },
          { title: 'Aplicados por Função ou Categoria', desc: 'Os Tiers podem ser selecionados globalmente ou por Função/Categoria para maior granularidade.' },
        ].map(n => (
          <div key={n.title} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-bold text-slate-800 mb-1">{n.title}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{n.desc}</p>
          </div>
        ))}
      </div>

      {/* Component toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveComponent('governance')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border-2 ${activeComponent === 'governance' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          Cybersecurity Risk Governance
          <span className="ml-2 text-xs opacity-60">Função GOVERN</span>
        </button>
        <button
          onClick={() => setActiveComponent('management')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors border-2 ${activeComponent === 'management' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          Cybersecurity Risk Management
          <span className="ml-2 text-xs opacity-60">Funções ID · PR · DE · RS · RC</span>
        </button>
      </div>

      {/* Tiers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {tiers.map(tier => (
          <div key={tier.n} className="bg-white rounded-2xl border-2 p-6" style={{ borderColor: tier.color }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black" style={{ backgroundColor: tier.bg, color: tier.color }}>
                T{tier.n}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Nível {tier.n}</p>
                <h2 className="text-lg font-bold" style={{ color: tier.color }}>{tier.name}</h2>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{tier.desc}</p>

            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: tier.color }}>
                {activeComponent === 'governance' ? 'Cybersecurity Risk Governance' : 'Cybersecurity Risk Management'}
              </p>
              <ul className="space-y-1.5">
                {(activeComponent === 'governance' ? tier.governance : tier.management).map((item, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tier.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Exemplos práticos</p>
              <div className="flex flex-wrap gap-1.5">
                {tier.examples.map((e, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-lg" style={{ backgroundColor: tier.bg, color: tier.color }}>{e}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tiers + Profiles connection */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Como Tiers e Profiles se conectam</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          O Tier selecionado pela liderança define o nível de rigor esperado para o Current e Target Profile de cada Função. Por exemplo, se a liderança determina que a organização deve operar no Tier 2 para as Funções IDENTIFY e PROTECT, o Current Profile reflete o quanto o Tier 2 está sendo alcançado hoje, e o Target Profile define as melhorias necessárias para alcançá-lo plenamente.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          {[
            { label: 'Liderança seleciona Tier', sub: 'por Função ou globalmente', color: '#0B1F33' },
            { arrow: true },
            { label: 'Current Profile', sub: 'quanto do Tier está sendo alcançado', color: '#64748B' },
            { arrow: true },
            { label: 'Gap Analysis', sub: 'diferença para o Tier alvo', color: '#C07800' },
            { arrow: true },
            { label: 'Target Profile', sub: 'alcançar plenamente o Tier selecionado', color: '#1E9E52' },
          ].map((item, i) =>
            'arrow' in item ? (
              <span key={i} className="text-slate-300 font-bold hidden sm:block">→</span>
            ) : (
              <div key={i} className="text-center px-4 py-2.5 rounded-xl border" style={{ borderColor: `${item.color}40`, backgroundColor: `${item.color}08` }}>
                <p className="text-xs font-bold" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// ── PROFILES ─────────────────────────────────────────────────────────────────
export const ProfilesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'community' | 'cprt'>('overview');

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0F766E' }}>NIST CSF 2.0. NIST SP 1301</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Organizational Profiles</h1>
        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
          Profiles são o mecanismo central do CSF 2.0 para descrever o estado atual e desejado da cibersegurança. São criados selecionando e priorizando outcomes do CSF Core relevantes ao contexto organizacional.
        </p>
      </div>

      <PageIntro
        title="O que são os Organizational Profiles?"
        plain="Um Profile descreve a postura de cibersegurança atual ou desejada da organização usando os resultados do CSF Core."
        detail="O Current Profile mostra onde você está. O Target Profile mostra onde quer chegar. A diferença entre eles é o Gap Analysis."
        learnMore={{ label: 'Voltar à introdução', to: '/intro' }}
      />
      {/* Three cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          { title: 'Current Profile', icon: '◎', color: '#64748B', bg: '#F8FAFC', desc: 'Outcomes que a organização está alcançando atualmente. Documenta práticas, status e avaliação de cada resultado.' },
          { title: 'Gap Analysis', icon: '△', color: '#C07800', bg: '#FFF3DC', desc: 'Diferença entre o Current e o Target Profile. Base para o Action Plan priorizado por risco e impacto.' },
          { title: 'Target Profile', icon: '◉', color: '#1E9E52', bg: '#E2FAF0', desc: 'Outcomes desejados, com prioridade definida. Considera novos requisitos, tecnologias e tendências de ameaças.' },
        ].map(p => (
          <div key={p.title} className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="text-4xl mb-3" style={{ color: p.color }}>{p.icon}</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { id: 'overview', label: 'Processo e campos' },
          { id: 'community', label: 'Community Profiles' },
          { id: 'cprt', label: 'Informative References e CPRT' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeTab === tab.id ? 'text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            style={activeTab === tab.id ? { backgroundColor: '#0B1F33' } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Fields */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Campos do Perfil Organizacional</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left font-bold text-slate-700" colSpan={2}>Outcome CSF</th>
                    <th className="px-4 py-3 text-left font-bold text-blue-700 border-l border-slate-200" colSpan={3}>Perfil Atual</th>
                    <th className="px-4 py-3 text-left font-bold text-green-700 border-l border-slate-200" colSpan={2}>Perfil Alvo</th>
                  </tr>
                  <tr className="border-b border-slate-200 text-xs text-slate-500 bg-slate-50">
                    <th className="px-4 py-2 text-left">Identificador</th>
                    <th className="px-4 py-2 text-left">Descrição</th>
                    <th className="px-4 py-2 text-left border-l border-slate-200">Práticas</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Avaliação</th>
                    <th className="px-4 py-2 text-left border-l border-slate-200">Prioridade</th>
                    <th className="px-4 py-2 text-left">Metas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 text-xs">
                    <td className="px-4 py-3 font-mono font-bold text-purple-700">PR.PS-01</td>
                    <td className="px-4 py-3 text-slate-600">Configurações de segurança estabelecidas</td>
                    <td className="px-4 py-3 text-slate-500 border-l border-slate-200">Baselines definidos para plataformas principais; uso não monitorado</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded font-semibold">Parcial</span></td>
                    <td className="px-4 py-3 text-slate-600">3/5</td>
                    <td className="px-4 py-3 border-l border-slate-200"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded font-semibold">Alta</span></td>
                    <td className="px-4 py-3 text-slate-500">Baselines aplicados a todos os sistemas; desvios detectados automaticamente</td>
                  </tr>
                  <tr className="text-xs">
                    <td className="px-4 py-3 font-mono font-bold text-blue-700">ID.RA-01</td>
                    <td className="px-4 py-3 text-slate-600">Vulnerabilidades identificadas e documentadas</td>
                    <td className="px-4 py-3 text-slate-500 border-l border-slate-200">Varreduras mensais com Nessus em sistemas críticos</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded font-semibold">Em andamento</span></td>
                    <td className="px-4 py-3 text-slate-600">4/5</td>
                    <td className="px-4 py-3 border-l border-slate-200"><span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded font-semibold">Média</span></td>
                    <td className="px-4 py-3 text-slate-500">Expandir para todos os ambientes incluindo nuvem; varreduras semanais</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3 italic">Exemplo ilustrativo baseado no template oficial NIST SP 1301. Os campos podem ser adaptados ao contexto da organização.</p>
          </div>

          {/* How to use */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Como usar os Profiles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Autoavaliação', desc: 'Documentar o estado atual de cada outcome do CSF Core com práticas, status e avaliação.' },
                { title: 'Planejamento', desc: 'Definir o Target Profile com prioridades baseadas nos objetivos de negócio e na tolerância a riscos.' },
                { title: 'Gap Analysis', desc: 'Comparar Current e Target para identificar lacunas e desenvolver Action Plan estruturado.' },
                { title: 'Comunicação', desc: 'Comunicar a postura de cibersegurança à liderança e às partes interessadas em linguagem de negócio.' },
                { title: 'Monitoramento', desc: 'Revisar os Profiles periodicamente com KPIs e KRIs para acompanhar o progresso.' },
                { title: 'Fornecedores', desc: 'Criar Target Profiles por nível de criticidade de fornecedor para comunicar requisitos de segurança.' },
              ].map(item => (
                <div key={item.title} className="flex gap-3">
                  <ChevronRight size={14} className="text-teal-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">O que são Community Profiles</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Um Community Profile é um baseline de outcomes do CSF criado para múltiplas organizações com interesses e objetivos comuns, geralmente um setor, subssetor, tipo de tecnologia ou caso de uso específico.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Base para o Target Profile', desc: 'Uma organização pode copiar um Community Profile relevante como ponto de partida para seu próprio Target Profile.' },
                { title: 'Adaptável', desc: 'O Community Profile pode ser ajustado, alterando prioridades, adicionando Subcategorias ou Informative References específicos.' },
                { title: 'Criado por setores', desc: 'Setores como saúde, financeiro, energia e manufatura publicam Community Profiles específicos para suas necessidades.' },
                { title: 'Disponível no NIST', desc: 'O NIST mantém repositório de Community Profiles públicos em csrc.nist.gov/projects/cybersecurity-framework.' },
              ].map(item => (
                <div key={item.title} className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm font-bold text-slate-800 mb-1">{item.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              <strong>Dica:</strong> Antes de criar um Profile do zero, verifique se existe um Community Profile para o seu setor. Isso acelera o processo e garante alinhamento com as melhores práticas setoriais.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'cprt' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Informative References</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Informative References são os mapeamentos formais entre os outcomes do CSF e outros documentos, padrões, diretrizes, regulações e boas práticas. Eles ajudam a entender como alcançar cada outcome do CSF usando referências que a organização já conhece ou utiliza.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { fw: 'NIST SP 800-53', desc: 'Catálogo de controles de segurança e privacidade, referência mais completa para implementação técnica.' },
                { fw: 'ISO/IEC 27001', desc: 'Requisitos para SGSI, complementar ao CSF para organizações que buscam certificação.' },
                { fw: 'CIS Controls v8', desc: 'Controles priorizados e práticos, ideal para organizações que precisam de guidance direto e acionável.' },
              ].map(item => (
                <div key={item.fw} className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm font-bold text-slate-800 mb-1">{item.fw}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">NIST Cybersecurity & Privacy Reference Tool (CPRT)</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              O CPRT é a ferramenta oficial do NIST para acessar, navegar e baixar os mapeamentos entre o CSF e outros frameworks. É a fonte autorizada para Informative References, sempre atualizada pelo NIST.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { title: 'CSF Core em JSON e Excel', desc: 'Baixar o Core completo em formatos machine-readable para integração com ferramentas.' },
                { title: 'Implementation Examples', desc: 'Exemplos concisos e orientados à ação para cada Subcategoria, publicados pelo NIST.' },
                { title: 'Mapeamentos atualizados', desc: 'Consultar mapeamentos entre CSF e NIST SP 800-53, ISO 27002, CIS Controls e outros.' },
                { title: 'Submit mappings', desc: 'Organizações podem submeter seus próprios mapeamentos para inclusão no CPRT.' },
              ].map(item => (
                <div key={item.title} className="flex gap-2">
                  <ChevronRight size={14} className="text-teal-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://csrc.nist.gov/projects/cprt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: '#0B1F33' }}
            >
              Acessar o NIST CPRT ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// ── CROSSWALK ─────────────────────────────────────────────────────────────────
export const CrosswalkPage: React.FC = () => {
  const [selectedFn, setSelectedFn] = useState<string>('GV');
  const fnCats = csfCategories.filter(c => c.functionId === selectedFn);
  const fn = csfFunctions.find(f => f.id === selectedFn)!;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Mapeamentos</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Framework Crosswalk</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Explore os relacionamentos entre o NIST CSF 2.0 e outros frameworks. Os mapeamentos são orientativos e não representam equivalências absolutas.
        </p>
      </div>

      <PageIntro
        title="O que é um Crosswalk?"
        plain="Crosswalk é o mapeamento entre os resultados do CSF e outros frameworks e padrões, como NIST SP 800-53, ISO/IEC 27002 e CIS Controls."
        detail="Esses mapeamentos mostram quais controles de outros frameworks contribuem para alcançar cada resultado do CSF. São orientativos, não equivalências 1:1."
      />
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <p className="text-sm text-amber-700">
          <strong>Importante:</strong> Os mapeamentos abaixo são orientativos. Frameworks têm objetivos diferentes e um controle pode atender parcialmente a múltiplos resultados. O contexto organizacional deve sempre ser considerado.
        </p>
      </div>

      {/* Function selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {csfFunctions.map(f => (
          <button
            key={f.id}
            onClick={() => setSelectedFn(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border`}
            style={selectedFn === f.id
              ? { backgroundColor: f.color, color: 'white', borderColor: f.color }
              : { backgroundColor: 'white', color: f.color, borderColor: f.color }}
          >
            {f.code}, {f.nameEn}
          </button>
        ))}
      </div>

      {/* Categories with crosswalk */}
      <div className="space-y-6">
        {fnCats.map(cat => {
          const subs = allSubcategories.filter(s => s.categoryId === cat.id);
          const allNist = subs.flatMap(s => s.mappings.nist80053).filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i);
          const allIso = subs.flatMap(s => s.mappings.iso27002).filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i);
          const allCis = subs.flatMap(s => s.mappings.cisControls).filter((v, i, arr) => arr.findIndex(x => x.id === v.id) === i);

          return (
            <div key={cat.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center gap-3 p-5 border-b border-slate-100" style={{ backgroundColor: fn.colorLight }}>
                <span className="font-mono text-sm font-bold px-2 py-0.5 rounded" style={{ backgroundColor: fn.color, color: 'white' }}>{cat.code}</span>
                <h3 className="font-semibold text-slate-800">{cat.name}</h3>
                <Link to={`/category/${cat.id}`} className="ml-auto text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1">
                  Ver detalhe <ChevronRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {[
                  { label: 'NIST SP 800-53', items: allNist, color: '#1E40AF', bg: '#DBEAFE' },
                  { label: 'ISO/IEC 27002', items: allIso, color: '#065F46', bg: '#D1FAE5' },
                  { label: 'CIS Controls', items: allCis, color: '#92400E', bg: '#FEF3C7' },
                ].map(fw => (
                  <div key={fw.label} className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: fw.color }}>{fw.label}</p>
                    {fw.items.length > 0 ? (
                      <div className="space-y-1.5">
                        {fw.items.slice(0, 5).map(item => (
                          <div key={item.id} className="flex items-center gap-2">
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ color: fw.color, backgroundColor: fw.bg }}>{item.id}</span>
                            <span className="text-xs text-slate-600 line-clamp-1">{item.name}</span>
                          </div>
                        ))}
                        {fw.items.length > 5 && <p className="text-xs text-slate-400">+{fw.items.length - 5} mais</p>}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">Sem mapeamento direto nesta versão</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── FRAMEWORKS ────────────────────────────────────────────────────────────────
export const FrameworksPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'nist', label: 'NIST' },
    { id: 'iso', label: 'ISO/IEC' },
    { id: 'cis', label: 'CIS' },
    { id: 'risk', label: 'Risco' },
    { id: 'continuity', label: 'Continuidade' },
    { id: 'threat', label: 'Ameaças' },
  ];
  const filtered = activeCategory === 'all' ? frameworks : frameworks.filter(f => f.category === activeCategory);



  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Referências</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Frameworks Relacionados</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          O NIST CSF 2.0 é complementado por diversos outros frameworks de segurança, risco e continuidade. Explore como cada um se relaciona com o CSF.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === c.id ? 'text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            style={activeCategory === c.id ? { backgroundColor: '#0B1F33' } : {}}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(fw => (
          <div key={fw.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{fw.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{fw.fullName}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-medium shrink-0">{fw.organization}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{fw.description}</p>
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Relação com NIST CSF</p>
              <p className="text-sm text-slate-600">{fw.relationToCSF}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Funções Relacionadas</p>
              <div className="flex flex-wrap gap-1.5">
                {fw.relatedFunctions.map(f => (
                  <Link key={f} to={`/framework/${f.toLowerCase()}`}
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: getFnColors(f).bg }}
                  >
                    {f}
                  </Link>
                ))}
              </div>
            </div>
            {fw.website && (
              <a href={fw.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                Documentação oficial ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── GLOSSARY ─────────────────────────────────────────────────────────────────
export const GlossaryPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const filtered = query
    ? glossaryTerms.filter(t =>
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.termEn.toLowerCase().includes(query.toLowerCase()) ||
        t.definition.toLowerCase().includes(query.toLowerCase())
      )
    : glossaryTerms;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Referência</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Glossário</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          Termos e conceitos fundamentais do NIST CSF 2.0 e da cibersegurança em geral.
        </p>
      </div>

      <PageIntro
        title="Novo no NIST CSF?"
        plain="Este glossário explica os termos técnicos usados no framework em linguagem acessível."
        detail="Se quiser entender o CSF do zero, comece pela Introdução."
        learnMore={{ label: 'Ver Introdução ao NIST CSF', to: '/intro' }}
      />
      <div className="mb-8">
        <input
          type="text"
          placeholder="Pesquisar termos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-3">
        {filtered.map(term => (
          <div key={term.term} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <h3 className="text-base font-bold text-slate-900">{term.term}</h3>
                <p className="text-xs text-slate-400 font-mono">{term.termEn}</p>
              </div>
              <div className="flex-1 pl-4 border-l border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">{term.definition}</p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-400 text-center py-10">Nenhum termo encontrado para "{query}"</p>
        )}
      </div>
    </div>
  );
};

// ── ABOUT ─────────────────────────────────────────────────────────────────────
export const AboutPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Sobre</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">NIST CSF 2.0 Navigator</h1>
    </div>

    <div className="space-y-5">

      {/* Sobre o projeto */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Sobre o projeto</p>
        <p className="text-slate-600 text-sm leading-relaxed">
          O NIST CSF 2.0 Navigator é uma ferramenta educacional open source que transforma o NIST Cybersecurity Framework 2.0 em uma experiência visual, interativa e acessível. O objetivo é facilitar a compreensão do framework, orientar sua implementação e explorar relações com outros frameworks de segurança, risco e continuidade, como NIST SP 800-53, ISO/IEC 27002, CIS Controls e MITRE ATT&CK.
        </p>
        <a
          href="https://github.com/felipenicacio/nist-csf-navigator"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline"
        >
          Ver repositório no GitHub ↗
        </a>
      </div>

      {/* Sobre o autor */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#0B1F33' }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#14B8A6' }}>Sobre o autor</p>

        {/* Avatar + nome */}
        <div className="flex items-center gap-4 mb-5">
          <img
            src="./assets/avatar.jpg"
            alt="Felipe Nicácio"
            className="w-20 h-20 rounded-full object-cover shrink-0"
            style={{ border: '3px solid #14B8A6' }}
          />
          <div>
            <p className="text-white font-bold text-lg leading-tight">Felipe Nicácio</p>
            <p className="text-sm font-semibold mt-0.5" style={{ color: '#14B8A6' }}>
              Consultor em Segurança da Informação
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Consultor em Segurança da Informação, Privacidade de Dados e Continuidade de Negócios.
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.linkedin.com/in/felipe-nicacio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0A66C2', color: '#fff' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/felipenicacio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href="mailto:felipenicacio@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            felipenicacio@gmail.com
          </a>
          <a
            href="https://wa.me/5521979044865"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366', color: '#fff' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            (21) 97904-4865
          </a>
        </div>
      </div>

      {/* Aviso legal */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Aviso legal</p>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>O <strong>NIST CSF</strong> é desenvolvido pelo National Institute of Standards and Technology (NIST).</li>
          <li>Os <strong>padrões ISO/IEC</strong> são publicados pela ISO e IEC.</li>
          <li>Os <strong>CIS Controls</strong> são mantidos pelo Center for Internet Security.</li>
          <li>O <strong>MITRE ATT&CK</strong> é desenvolvido pela MITRE Corporation.</li>
          <li>Este Navigator não é endossado por nenhuma dessas organizações.</li>
        </ul>
        <p className="text-slate-500 text-sm leading-relaxed mt-4">
          Os mapeamentos apresentados são orientativos e não representam equivalências absolutas entre frameworks. Um controle pode contribuir parcialmente para múltiplos resultados do CSF. O contexto organizacional deve sempre ser considerado.
        </p>
      </div>

    </div>
  </div>
);
