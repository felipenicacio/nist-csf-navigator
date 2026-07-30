import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, BookOpen, Target, MessageSquare, CheckCircle } from 'lucide-react';
import { getFnColors } from '../utils/fnColors';

const fns = [
  { id: 'GV', name: 'Governar', verb: 'Estabelecer e monitorar', role: 'prevenir + detectar', desc: 'Define a estratégia, as políticas e a supervisão. É a base de tudo, sem governança, as demais Funções perdem direção.', always: true },
  { id: 'ID', name: 'Identificar', verb: 'Compreender', role: 'prevenir', desc: 'Entender o que a organização tem (ativos, dados, pessoas, fornecedores) e quais são os riscos associados.', always: true },
  { id: 'PR', name: 'Proteger', verb: 'Usar salvaguardas', role: 'prevenir', desc: 'Colocar controles para reduzir a chance de ataques acontecerem ou limitarem seu impacto.', always: true },
  { id: 'DE', name: 'Detectar', verb: 'Identificar e analisar', role: 'detectar', desc: 'Monitorar continuamente para encontrar ataques em andamento antes que causem dano maior.', always: true },
  { id: 'RS', name: 'Responder', verb: 'Agir', role: 'incidente', desc: 'O que fazer quando um incidente acontece: conter, analisar, comunicar e mitigar.', always: false },
  { id: 'RC', name: 'Recuperar', verb: 'Restaurar', role: 'incidente', desc: 'Restaurar operações normais depois de um incidente e aprender com o que aconteceu.', always: false },
];

const faqs = [
  {
    q: 'O NIST CSF é obrigatório?',
    a: 'Não. O NIST CSF é voluntário. Nenhuma lei federal brasileira exige sua adoção. No entanto, é amplamente reconhecido como referência de maturidade e muitas organizações, contratos e clientes passaram a exigir ou valorizar sua adoção.',
  },
  {
    q: 'Preciso implementar tudo de uma vez?',
    a: 'Não. O CSF é flexível, você começa pelo que faz mais sentido para o seu contexto e risco. Algumas organizações começam pelo GOVERN para estruturar a governança; outras começam pelo IDENTIFY para entender o que têm. Não existe sequência obrigatória.',
  },
  {
    q: 'O CSF substitui a ISO 27001 ou o CIS Controls?',
    a: 'Não. O CSF e outros frameworks são complementares. O CSF define o que alcançar (resultados); frameworks como NIST SP 800-53, ISO/IEC 27002 e CIS Controls descrevem como alcançar (controles). Muitas organizações usam o CSF como estrutura principal e referenciam outros frameworks para detalhar a implementação.',
  },
  {
    q: 'Como o CSF se aplica à minha organização se sou uma empresa pequena?',
    a: 'O CSF foi criado para ser adaptado a qualquer organização, independente de tamanho, setor ou maturidade técnica. Uma empresa pequena não precisa implementar todas as 106 Subcategorias, começa pelos resultados mais críticos para o seu negócio e expande progressivamente.',
  },
  {
    q: 'Qual é a diferença entre Função, Categoria e Subcategoria?',
    a: 'Função é o nível mais alto (ex: PROTECT). Categoria é um grupo de resultados dentro de uma Função (ex: Segurança de Dados). Subcategoria é o resultado específico (ex: "Dados em repouso são protegidos"). Pense como: área → tema → resultado concreto.',
  },
  {
    q: 'Por onde devo começar na prática?',
    a: 'O ponto de partida recomendado é criar um Organizational Profile: avalie onde sua organização está hoje (Current Profile) em relação aos resultados do CSF, defina onde quer chegar (Target Profile), identifique as lacunas e crie um plano de ação priorizado.',
  },
];

const IntroPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const onboardingAnswers = [
    {
      q: 'Qual é o seu perfil?',
      options: [
        { label: 'Gestor ou Diretor', sub: 'Decido sobre investimentos e estratégia', path: '/implementation', cta: 'Ver guia de implementação' },
        { label: 'CISO ou Especialista de Segurança', sub: 'Gerencio o programa de cibersegurança', path: '/consultant', cta: 'Acessar Consultant View' },
        { label: 'Profissional de TI', sub: 'Implanto os controles técnicos', path: '/framework', cta: 'Explorar o Framework' },
        { label: 'Estou apenas aprendendo', sub: 'Quero entender o NIST CSF', path: '/map', cta: 'Ver Framework Map' },
      ],
    },
  ];

  return (
    <div className="animate-fadeIn">

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #0B1F33 0%, #164E73 100%)' }}>
        <div className="max-w-screen-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-white/20 text-white/70">
            <BookOpen size={12} /> Introdução ao NIST CSF 2.0
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            O que é o NIST<br />Cybersecurity Framework?
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Um guia criado pelo governo dos Estados Unidos para ajudar qualquer organização a entender, gerenciar e reduzir seus riscos de cibersegurança, independente do tamanho, setor ou nível técnico.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/map" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors">
              Ver estrutura visual <ArrowRight size={14} />
            </Link>
            <Link to="/framework" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-900 transition-colors" style={{ backgroundColor: '#FFF59D' }}>
              Explorar o Framework <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-screen-lg mx-auto px-4 sm:px-6">

        {/* Por onde começar, onboarding */}
        <section className="py-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Por onde você quer começar?</h2>
            <p className="text-slate-500 text-sm">Selecione seu perfil para receber uma recomendação de caminho.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {onboardingAnswers[0].options.map(opt => (
              <Link key={opt.path} to={opt.path} className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
                <h3 className="text-sm font-bold text-slate-900 mb-1">{opt.label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{opt.sub}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: '#0B1F33' }}>
                  {opt.cta} <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* O que é e para que serve */}
        <section className="pb-14">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100" style={{ backgroundColor: '#F8FAFC' }}>
              <h2 className="text-xl font-bold text-slate-900 mb-1">O que é o NIST CSF 2.0?</h2>
              <p className="text-slate-500 text-sm">Entenda o conceito antes de entrar na estrutura técnica.</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '📋',
                    title: 'Uma taxonomia de resultados',
                    desc: 'O CSF descreve o que sua organização deve ser capaz de fazer em cibersegurança, não como fazer. Ele define resultados desejados, organizados em Funções, Categorias e Subcategorias.',
                  },
                  {
                    icon: '🏢',
                    title: 'Para qualquer organização',
                    desc: 'Criado para indústria, governo, academia e ONGs de qualquer tamanho e setor. A taxonomia é neutra em tecnologia, país e setor, adapte ao seu contexto.',
                  },
                  {
                    icon: '🔧',
                    title: 'Flexível, não prescritivo',
                    desc: 'O CSF não diz o que você é obrigado a fazer. Cada organização escolhe os resultados mais relevantes e define como alcançá-los com base em seus riscos e recursos.',
                  },
                  {
                    icon: '🌐',
                    title: 'Linguagem comum',
                    desc: 'Permite que executivos, gestores, técnicos e fornecedores falem sobre cibersegurança usando a mesma estrutura, facilitando decisões e comunicação interna e externa.',
                  },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Três usos principais */}
        <section className="pb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Para que o CSF é usado?</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">O CSF tem três usos principais que se complementam.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Target size={22} />,
                title: 'Compreender e Avaliar',
                desc: 'Descrever a postura atual de cibersegurança da organização, identificar lacunas e acompanhar o progresso ao longo do tempo.',
                example: 'Exemplo: "Onde estamos hoje em relação a cada resultado do CSF?"',
                color: '#1A7FA8',
                bg: '#E0F4FB',
              },
              {
                icon: <CheckCircle size={22} />,
                title: 'Priorizar',
                desc: 'Identificar e organizar ações para gerenciar riscos alinhadas à missão, requisitos regulatórios e objetivos de negócio.',
                example: 'Exemplo: "Quais riscos precisamos resolver primeiro com o orçamento disponível?"',
                color: '#1E9E52',
                bg: '#E2FAF0',
              },
              {
                icon: <MessageSquare size={22} />,
                title: 'Comunicar',
                desc: 'Fornecer linguagem comum para falar sobre riscos e capacidades de cibersegurança dentro e fora da organização.',
                example: 'Exemplo: "Como explicamos nossa postura de segurança para clientes e parceiros?"',
                color: '#5B57C0',
                bg: '#EEECFB',
              },
            ].map(use => (
              <div key={use.title} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: use.bg, color: use.color }}>
                  {use.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{use.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{use.desc}</p>
                <p className="text-xs text-slate-400 italic border-l-2 pl-3" style={{ borderColor: use.color }}>{use.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Respostas ao risco */}
        <section className="pb-14">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Como uma organização responde a um risco?</h2>
            <p className="text-slate-500 text-sm mb-6">O CSF reconhece que nem todo risco deve ser eliminado. Há quatro formas de responder a um risco negativo e três formas de lidar com oportunidades positivas.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Mitigar', desc: 'Reduzir a probabilidade ou impacto do risco', color: '#1E9E52', bg: '#E2FAF0' },
                { label: 'Transferir', desc: 'Repassar o risco a outra parte (ex: seguro)', color: '#1A7FA8', bg: '#E0F4FB' },
                { label: 'Evitar', desc: 'Descontinuar a atividade que gera o risco', color: '#C07800', bg: '#FFF3DC' },
                { label: 'Aceitar', desc: 'Reconhecer o risco e decidir não agir', color: '#64748B', bg: '#F1F5F9' },
              ].map(r => (
                <div key={r.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: r.bg }}>
                  <p className="text-sm font-bold mb-1" style={{ color: r.color }}>{r.label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
              A escolha depende do nível de risco, do custo do tratamento e do apetite a riscos da organização, definido na Função <strong className="text-slate-600">GOVERN</strong>.
            </p>
          </div>
        </section>

        {/* As 6 Funções com papel de cada uma */}
        <section className="pb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">As 6 Funções do CSF</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">Cada Função representa um papel distinto no gerenciamento de riscos. Todas devem ser abordadas, não existe sequência obrigatória.</p>
          </div>

          {/* Continuous vs incident-activated */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Contínuas, acontecem sempre</span>
              </div>
              <p className="text-xs text-slate-500">GV · ID · PR · DE devem operar continuamente, antes, durante e depois de qualquer incidente.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Ativadas em incidentes</span>
              </div>
              <p className="text-xs text-slate-500">RS · RC devem estar prontas a qualquer momento e são ativadas quando um incidente ocorre.</p>
            </div>
          </div>

          {/* GV special */}
          <div className="mb-3">
            <Link to="/framework/gv" className="group block bg-white rounded-2xl border-2 overflow-hidden hover:shadow-md transition-all" style={{ borderColor: getFnColors('GV').bg }}>
              <div className="flex items-center gap-4 px-6 py-4" style={{ backgroundColor: getFnColors('GV').bg }}>
                <span className="text-2xl font-black opacity-30 font-mono" style={{ color: getFnColors('GV').text }}>GV</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold" style={{ color: getFnColors('GV').text }}>GOVERN. Governar</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${getFnColors('GV').text}15`, color: getFnColors('GV').text }}>
                      Permeia todas as demais
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: `${getFnColors('GV').text}90` }}>Define estratégia, políticas, papéis e supervisão. Sem governança, as outras Funções perdem direção.</p>
                </div>
                <ArrowRight size={16} className="shrink-0 opacity-40 group-hover:opacity-80 transition-opacity" style={{ color: getFnColors('GV').text }} />
              </div>
              <div className="px-6 py-3 bg-white">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Contexto organizacional', 'Estratégia de riscos', 'Papéis e responsabilidades', 'Política', 'Supervisão', 'Cadeia de suprimentos'].map(t => (
                    <span key={t} className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />{t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>

          {/* Other 5 functions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {fns.filter(f => f.id !== 'GV').map(fn => {
              const c = getFnColors(fn.id);
              return (
                <Link key={fn.id} to={`/framework/${fn.id.toLowerCase()}`} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="px-4 py-3" style={{ backgroundColor: c.bg }}>
                    <span className="text-xs font-mono font-bold opacity-40" style={{ color: c.text }}>{fn.id}</span>
                    <h3 className="text-sm font-bold" style={{ color: c.text }}>{fn.name}</h3>
                    <p className="text-xs opacity-70 mt-0.5" style={{ color: c.text }}>{fn.verb}</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs text-slate-500 leading-relaxed">{fn.desc}</p>
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${fn.always ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {fn.always ? 'Contínua' : 'Sob incidente'}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">GV + ID + PR</strong> ajudam a <strong className="text-slate-700">prevenir e se preparar</strong> para incidentes. 
              <span className="mx-2">·</span>
              <strong className="text-slate-700">GV + DE + RS + RC</strong> ajudam a <strong className="text-slate-700">detectar e gerenciar</strong> incidentes quando ocorrem.
            </p>
          </div>
        </section>

        {/* Quem faz o quê, fluxo hierárquico */}
        <section className="pb-14">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Quem faz o quê no CSF?</h2>
            <p className="text-slate-500 text-sm mb-6">O CSF funciona como uma linguagem comum entre três níveis da organização. A informação flui em duas direções, de cima para baixo (estratégia) e de baixo para cima (resultados e riscos).</p>
            <div className="space-y-3">
              {[
                {
                  role: 'Executivos e Alta Direção',
                  fn: 'GOVERN',
                  color: '#C8A800', bg: '#FFF9C4',
                  do: ['Definem missão, prioridades e apetite a riscos', 'Estabelecem a estratégia de cibersegurança', 'Integram cibersegurança com outros riscos corporativos (ERM)'],
                  receive: 'Recebem: KPIs, KRIs e relatórios de postura de cibersegurança',
                },
                {
                  role: 'Gestores e CISOs',
                  fn: 'ID · PR · DE',
                  color: '#1A7FA8', bg: '#E0F4FB',
                  do: ['Traduzem o apetite a riscos em tolerância operacional', 'Criam Organizational Profiles baseados em riscos', 'Desenvolvem e acompanham planos de ação'],
                  receive: 'Recebem: objetivos estratégicos de cibersegurança',
                },
                {
                  role: 'Profissionais e Equipes Técnicas',
                  fn: 'PR · DE · RS · RC',
                  color: '#1E9E52', bg: '#E2FAF0',
                  do: ['Implementam os controles e salvaguardas', 'Monitoram sistemas e detectam eventos', 'Respondem e recuperam em incidentes'],
                  receive: 'Recebem: orientações e planos de ação dos gestores',
                },
              ].map((level, i) => (
                <div key={level.role} className="rounded-xl border overflow-hidden" style={{ borderColor: `${level.color}30` }}>
                  <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: level.bg }}>
                    <span className="text-xl font-black opacity-20" style={{ color: level.color }}>{i + 1}</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold" style={{ color: level.color }}>{level.role}</h3>
                      <span className="text-xs font-mono opacity-70" style={{ color: level.color }}>Funções: {level.fn}</span>
                    </div>
                  </div>
                  <div className="px-5 py-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Responsabilidades</p>
                      <ul className="space-y-1">
                        {level.do.map(d => (
                          <li key={d} className="text-xs text-slate-600 flex gap-2"><span style={{ color: level.color }}>→</span>{d}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="sm:border-l sm:pl-3 border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Fluxo de informação</p>
                      <p className="text-xs text-slate-500 italic">{level.receive}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>↕</span>
              <span>Fluxo bidirecional, estratégia desce, resultados e riscos sobem</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Perguntas frequentes</h2>
            <p className="text-slate-500 text-sm">Dúvidas comuns de quem está começando com o NIST CSF.</p>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-800 pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-slate-400 shrink-0" /> : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-slate-50">
                    <p className="text-sm text-slate-600 leading-relaxed pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Next steps */}
        <section className="pb-14">
          <div className="bg-slate-900 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Pronto para explorar?</h2>
            <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">Escolha o próximo passo conforme seu objetivo agora.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Ver Framework Map', desc: 'Visão visual de toda a estrutura', to: '/map', icon: '🗺️' },
                { label: 'Guia de Implementação', desc: 'Processo de 5 etapas com Profiles', to: '/implementation', icon: '📋' },
                { label: 'Consultant View', desc: 'Roteiro de assessment por subcategory', to: '/consultant', icon: '🔍' },
              ].map(item => (
                <Link key={item.to} to={item.to} className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-4 text-left transition-colors group">
                  <span className="text-xl mb-2 block">{item.icon}</span>
                  <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                  <p className="text-xs text-white/50">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IntroPage;
