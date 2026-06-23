import { Provider, Publication } from './types';

export const CATEGORIES = [
  { 
    id: 'limpeza', 
    label: 'Limpeza', 
    iconId: 'Sparkles', 
    color: '#0052cc',
    imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'eletricista', 
    label: 'Electricista', 
    iconId: 'Zap', 
    color: '#feaa00',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'canalizacao', 
    label: 'Canalização & Pichelaria', 
    iconId: 'Wrench', 
    color: '#004b59',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'ac_frio', 
    label: 'AC & Frio', 
    iconId: 'Wind', 
    color: '#00b8d9',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'mecanica', 
    label: 'Mecânica Auto', 
    iconId: 'Car', 
    color: '#825500',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'estafetas', 
    label: 'Estafetas & Entregas', 
    iconId: 'Truck', 
    color: '#ba1a1a',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'jardinagem', 
    label: 'Jardinagem & Piscinas', 
    iconId: 'Leaf', 
    color: '#10b981',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'carpintaria', 
    label: 'Carpintaria & Marcenaria', 
    iconId: 'Hammer', 
    color: '#b45309',
    imageUrl: 'https://images.unsplash.com/photo-1460135426161-9fb93e214cfd?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'pintura', 
    label: 'Pintura & Acabamentos', 
    iconId: 'Paintbrush', 
    color: '#6366f1',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'pedreiro', 
    label: 'Pedreiro & Ladrilhador', 
    iconId: 'HardHat', 
    color: '#475569',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'ti_informatica', 
    label: 'TI & Computadores', 
    iconId: 'Laptop', 
    color: '#3b82f6',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'explicacoes', 
    label: 'Explicações & Aulas', 
    iconId: 'BookOpen', 
    color: '#ec4899',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'estetica', 
    label: 'Cabelo & Estética', 
    iconId: 'Scissors', 
    color: '#d946ef',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'babysitter', 
    label: 'Babysitter & Cuidados', 
    iconId: 'Baby', 
    color: '#06b6d4',
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'reparacao_eletro', 
    label: 'Reparação de Eletrodomésticos', 
    iconId: 'Tv', 
    color: '#f97316',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=600'
  }
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'marcus-sterling',
    name: 'Marcus Sterling',
    title: 'Eletricista Master & Especialista em Automação',
    category: 'eletricista',
    rating: 4.9,
    reviewCount: 124,
    location: 'Talatona, Kilamba, Maianga e arredores',
    experienceYears: '12+',
    completedJobs: 850,
    satisfactionRate: 98,
    isVerified: true,
    featured: true,
    avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400',
    basePrice: 85000,
    priceType: 'visita',
    aboutText: 'Especialista em sistemas elétricos residenciais e comerciais em Luanda, com vasta experiência em lidar com as particularidades da rede local. Ofereço soluções robustas de energia sustentável e automação de alto padrão para condomínios e moradias. Foco total na segurança, normas técnicas e acabamentos de excelência. Do Talatona ao centro da cidade, garanto um serviço confiável e pontual para quem não abre mão da qualidade.',
    services: [
      {
        id: 'ms-s1',
        name: 'Consultoria e Smart Home',
        price: 249000,
        priceType: 'total',
        description: 'Configuração de ecossistema inteligente em Luanda: iluminação, segurança e climatização sustentável.',
        tag: 'Mais Solicitado',
        duration: '4-8 Horas'
      },
      {
        id: 'ms-s2',
        name: 'Manutenção Geral',
        price: 85000,
        priceType: 'visita',
        description: 'Reparos rápidos, quadros elétricos e diagnósticos completos de carga e tensão elétrica residencial.',
        tag: 'Essencial',
        duration: '1-3 Horas'
      },
      {
        id: 'ms-s3',
        name: 'Vistoria de Segurança',
        price: 150000,
        priceType: 'total',
        description: 'Auditoria técnica detalhada para novos imóveis ou renovações de seguros.',
        duration: '2-4 Horas'
      },
      {
        id: 'ms-s4',
        name: 'Proteção de Rede',
        price: 0,
        priceType: 'orcamento',
        description: 'Instalação de estabilizadores industriais e UPS inteligentes para toda a casa em Luanda.',
        duration: 'Sob Orçamento'
      }
    ],
    portfolio: [
      {
        id: 'proj-1',
        title: 'Painel Domótico Integrado',
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'proj-2',
        title: 'Automação Comercial',
        imageUrl: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'proj-3',
        title: 'Projeto de Luzes LED Gourmet',
        imageUrl: 'https://images.unsplash.com/photo-1565538810844-1e119bf0994a?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'proj-4',
        title: 'Gerador & Rede Estabilizada',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
      }
    ],
    testimonials: [
      {
        id: 'test-1',
        clientName: 'Sandra Costa',
        avatar: 'SC',
        rating: 5,
        text: 'O Marcus resolveu os problemas constantes de queda de tensão na nossa casa no Talatona. Foi muito profissional e pontual.',
        date: 'há 2 semanas'
      },
      {
        id: 'test-2',
        clientName: 'Manuel Diniz',
        avatar: 'MD',
        rating: 5,
        text: 'Instalação fantástica de iluminação inteligente na nossa varanda. Recomendo imenso o seu rigor nos acabamentos.',
        date: 'há 1 mês'
      }
    ]
  },
  {
    id: 'sparkle-solutions',
    name: 'Sparkle Solutions',
    title: 'Serviço Premium de Limpeza profunda',
    category: 'limpeza',
    rating: 4.9,
    reviewCount: 96,
    location: 'Talatona, Luanda Sul, Alvalade e Benfica',
    experienceYears: '5+',
    completedJobs: 1420,
    satisfactionRate: 97,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=400',
    basePrice: 59000,
    priceType: 'visita',
    aboutText: 'A Sparkle Solutions oferece serviços corporativos e residenciais especializados de higienização profissional no centro e sul de Luanda. Utilizamos produtos biodegradáveis e equipamentos de última geração.',
    services: [
      {
        id: 'sparkle-s1',
        name: 'Limpeza Profunda',
        price: 59000,
        priceType: 'total',
        description: 'Tratamento rigoroso de carpetes, estofados, pavimentos e vidros de alto padrão.',
        tag: 'Destaque',
        duration: '4-6 Horas'
      },
      {
        id: 'sparkle-s2',
        name: 'Limpeza Padrão',
        price: 35000,
        priceType: 'visita',
        description: 'Manutenção periódica para apartamentos e vivendas familiares.',
        duration: '2-4 Horas'
      }
    ],
    portfolio: [
      {
        id: 'sp-p1',
        title: 'Higienização de Vivendas',
        imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800'
      }
    ],
    testimonials: [
      {
        id: 'sp-t1',
        clientName: 'Ana Paula',
        avatar: 'AP',
        rating: 5,
        text: 'Serviço de limpeza cirúrgico antes da nossa mudança. Estão de parabéns pelo profissionalismo em Luanda.',
        date: 'há 3 dias'
      }
    ]
  },
  {
    id: 'canalizacao-luanda-sul',
    name: 'Canalização Luanda Sul',
    title: 'Equipa de Canalização Geral de Urgência',
    category: 'canalizacao',
    rating: 4.9,
    reviewCount: 78,
    location: 'Luanda Sul, Talatona, Viana e Central',
    experienceYears: '8+',
    completedJobs: 920,
    satisfactionRate: 96,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400',
    basePrice: 35000,
    priceType: 'h',
    aboutText: 'Atendimento urgente 24/7 para ruturas, entupimentos e infiltrações graves com certificações hidráulicas internacionais rápidas no território de Luanda.',
    services: [
      {
        id: 'can-s1',
        name: 'Reparação de Tubagem Premium',
        price: 70975,
        priceType: 'total',
        description: 'Intervenção avançada em fugas no solo de betão ou paredes azulejadas.',
        tag: 'Urgente',
        duration: '2-3 Horas'
      },
      {
        id: 'can-s2',
        name: 'Desentupimento Mecânico',
        price: 35000,
        priceType: 'h',
        description: 'Limpeza interna de canos obstruídos com sondas de alta pressão.',
        duration: '1-2 Horas'
      }
    ],
    portfolio: [],
    testimonials: []
  },
  {
    id: 'ecodreno-kilamba',
    name: 'EcoDreno Kilamba',
    title: 'Especialistas em saneamento e escoamento',
    category: 'canalizacao',
    rating: 4.7,
    reviewCount: 42,
    location: 'Kilamba, Camama e arredores',
    experienceYears: '4+',
    completedJobs: 330,
    satisfactionRate: 92,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400',
    basePrice: 25000,
    priceType: 'visita',
    aboutText: 'Soluções modernas e ecológicas de escoamento e filtragem de reservatórios residenciais na centralidade do Kilamba.',
    services: [
      {
        id: 'eco-s1',
        name: 'Limpeza de Cisterna Hidráulica',
        price: 45000,
        priceType: 'total',
        description: 'Lavagem técnica profunda e desinfestação segura de caixas de água.',
        duration: '3-4 Horas'
      },
      {
        id: 'eco-s2',
        name: 'Manutenção Geral Preventiva',
        price: 25000,
        priceType: 'visita',
        description: 'Diagnóstico por câmaras para desígnios preventivos de sifões e conexões.',
        duration: '1-2 Horas'
      }
    ],
    portfolio: [],
    testimonials: []
  },
  {
    id: 'mestre-da-maianga',
    name: 'Mestre da Maianga',
    title: 'Instalações Especiais e Soldadura Hidráulica',
    category: 'canalizacao',
    rating: 5.0,
    reviewCount: 65,
    location: 'Maianga, Miramar, Alvalade e Cruzeiro',
    experienceYears: '15+',
    completedJobs: 1100,
    satisfactionRate: 100,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    basePrice: 45000,
    priceType: 'h',
    aboutText: 'Empresa de elite dirigida pelo engenheiro Rui Mendes. Projetos hidráulicos complexos, soldadura por fusão PPR e ligações em vivendas históricas da Maianga.',
    services: [
      {
        id: 'mestre-s1',
        name: 'Instalação de Sistemas Multicamadas',
        price: 95000,
        priceType: 'total',
        description: 'Montagem completa com tubos multicamadas e ligações duráveis.',
        tag: 'Recomendado',
        duration: '4-6 Horas'
      },
      {
        id: 'mestre-s2',
        name: 'Manutenção e Pressão de Rede',
        price: 45000,
        priceType: 'h',
        description: 'Calibração técnica e substituição rápida de torneiras ou válvulas.',
        duration: '1-3 Horas'
      }
    ],
    portfolio: [],
    testimonials: []
  },
  {
    id: 'resposta-rapida-alvalade',
    name: 'Resposta Rápida Alvalade',
    title: 'Técnico Geral de Torneiras e Registos',
    category: 'canalizacao',
    rating: 4.8,
    reviewCount: 112,
    location: 'Alvalade, Miramar, Mutamba e Cruzeiro',
    experienceYears: '9+',
    completedJobs: 790,
    satisfactionRate: 95,
    isVerified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
    basePrice: 30000,
    priceType: 'h',
    aboutText: 'Reparos rápidos de canalizadores qualificados no coração de Alvalade. Substituição expressa de autoclismos, torneiras e deteção de humidade indesejada.',
    services: [
      {
        id: 'resp-s1',
        name: 'Reparo de Redução de Fuga',
        price: 30000,
        priceType: 'h',
        description: 'Substituição imediata de vedantes, filtros e torneiras corroidas.',
        duration: '1 Hora'
      }
    ],
    portfolio: [],
    testimonials: []
  }
];

export const INITIAL_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    providerId: 'marcus-sterling',
    providerName: 'Marcus Sterling',
    providerTitle: 'Eletricista Master & Especialista em Automação',
    providerAvatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400',
    category: 'eletricista',
    content: 'Finalizei ontem a instalação de um sistema completo de domótica e luz sustentável numa vivenda no Talatona. Toda a cablagem antiga foi substituída por sistemas eficientes em conformidade. O quadro elétrico agora possui supressores de picos de corrente e inversores adequados para garantir estabilidade mesmo com flutuações de gerador ou da rede pública!',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
    likes: 34,
    commentsCount: 5,
    date: 'Hoje, às 08:30 AM',
    tag: 'Trabalho Concluído'
  },
  {
    id: 'pub-2',
    providerId: 'sparkle-solutions',
    providerName: 'Sparkle Solutions',
    providerTitle: 'Serviço Premium de Limpeza profunda',
    providerAvatar: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=400',
    category: 'limpeza',
    content: '🔔 PROMOÇÃO DE INÍCIO DE SEMANA EM LUANDA! Garanta 15% de desconto em qualquer Limpeza de Mudança ou Limpeza Pós-Obra reservada esta semana através do ServiLink! A nossa equipa de elite leva todo o material biodegradável e equipamentos industriais de sucção. Deixe a sua moradia a brilhar no Kilamba ou Alvalade!',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=800',
    likes: 21,
    commentsCount: 3,
    date: 'Ontem',
    tag: 'Oferta Especial'
  },
  {
    id: 'pub-3',
    providerId: 'resposta-rapida-alvalade',
    providerName: 'Resposta Rápida Alvalade',
    providerTitle: 'Técnico Geral de Torneiras e Registos',
    providerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
    category: 'canalizacao',
    content: '⚠️ Dica técnica sobre infiltrações ocultas: É frequente surgir humidade nas paredes adjacentes à casa de banho em apartamentos mais antigos no Alvalade e Miramar. Antes de partir os azulejos, verifique se o anel vedante do autoclismo não tem fuga de fluxo residual, pois a gravidade conduz essa fuga silenciosa para a parede do quarto vizinho! Evite dores de cabeça maiores.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    likes: 45,
    commentsCount: 8,
    date: 'Há 3 dias',
    tag: 'Dica Útil'
  }
];

