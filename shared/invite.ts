import type { FeatureFlags } from "./features.js";

export type EventType = "graduation" | "wedding";

export interface InviteConfig {
  eventType: EventType;
  identity: {
    slug: string;
    title: string;
    description: string;
    domain: string;
  };
  features: FeatureFlags;
  people: {
    primaryFirstName: string;
    primaryFullName: string;
    secondaryFirstName?: string;
    secondaryFullName?: string;
    courseOrSubtitle: string;
    monogram: string;
    signatureQuote: string;
  };
  event: {
    label: string;
    dateText: string;
    dateLong: string;
    timeText: string;
    startsAt: string;
    endsAt: string;
    venue: string;
    venueName: string;
    venueImageAsset: string;
    mapsUrl: string;
    wazeUrl: string;
    dressCode: string;
    confirmationDeadline: string;
  };
  events: Array<{
    id: string;
    name: string;
    dateText: string;
    dateLong: string;
    timeText: string;
    startsAt: string;
    venueName: string;
    venue: string;
    mapsUrl: string;
    wazeUrl: string;
    dressCode: string;
    imageAsset: string;
  }>;
  navigation: Array<{ label: string; href: string }>;
  hero: {
    eyebrow: string;
    name: string;
    supportingName: string;
    courseLine: string;
    metaLine: string;
    primaryCta: string;
    imageAsset: string;
  };
  story: {
    label: string;
    title: string;
    images: Array<{ asset: string; alt: string }>;
    paragraphs: string[];
    quote: string;
    quoteAuthor: string;
  };
  gallery: {
    label: string;
    title: string;
    description: string;
    paragraphs: string[];
    slides: Array<{
      asset: string;
      alt: string;
      caption: string;
      positionClass?: string;
      aspect?: "portrait" | "landscape";
    }>;
  };
  celebration: {
    label: string;
    title: string;
    dateAccent: { day: string; month: string; time: string };
    primaryImageAsset: string;
    scheduleNarrative: string;
    locationNarrative: string;
    quickNotes: Array<{ title: string; description: string }>;
  };
  rsvp: {
    label: string;
    title: string;
    description: string;
    infoItems: string[];
    maxCompanions: number;
    whatsappNumber: string;
    whatsappIntl: string;
    openWhatsAppAfterSubmit: boolean;
    successMessage: string;
    messagePlaceholder: string;
  };
  giftList: {
    enabled: boolean;
    title: string;
    description: string;
    pixKey: string;
    pixName: string;
    instructions: string;
  };
  footer: {
    name: string;
    closing: string;
    brand: string;
    adminLabel: string;
  };
  theme: {
    style: string;
    primaryColor: string;
  };
}

export const inviteConfig: InviteConfig = {
  eventType: "graduation",
  identity: {
    slug: "formatura-vitoria",
    title: "Vitória Cézar | Formatura Direito",
    description: "Convite digital de formatura de Vitória Cézar Jeronimo Pereira — Direito (PUC Goiás).",
    domain: "vitoria.lumaconvites.com.br",
  },
  features: {
    rsvp: true,
    admin: true,
    giftList: false,
    music: false,
    gallery: true,
    countdown: true,
    dressCode: true,
  },
  people: {
    primaryFirstName: "Vitória",
    primaryFullName: "Vitória Cézar Jeronimo Pereira",
    courseOrSubtitle: "Direito",
    monogram: "VC",
    signatureQuote: "Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.",
  },
  event: {
    label: "Missa de Formatura",
    dateText: "10/08/2026",
    dateLong: "10 de agosto de 2026",
    timeText: "19h00",
    startsAt: "2026-08-10T19:00:00-03:00",
    endsAt: "2026-08-10T22:00:00-03:00",
    venue: "Praça Universitária c/ 1ª Avenida Qd.85 Lt.43, Setor Leste Universitário, Goiânia - GO",
    venueName: "Paróquia Universitária São João Evangelista",
    venueImageAsset: "venue-castelo.jpg",
    mapsUrl: "https://maps.app.goo.gl/tr7ZrTtBLH1GKSSy7",
    wazeUrl: "https://waze.com/ul?q=Paróquia%20Universitária%20São%20João%20Evangelista%20Goiânia&navigate=yes",
    dressCode: "Esporte fino (Evitar roupas curtas ou decotadas)",
    confirmationDeadline: "10/08/2026",
  },
  events: [
    {
      id: "missa",
      name: "Missa de Formatura",
      dateText: "10/08/2026",
      dateLong: "10 de agosto de 2026",
      timeText: "19h00",
      startsAt: "2026-08-10T19:00:00-03:00",
      venueName: "Paróquia Universitária São João Evangelista",
      venue: "Praça Universitária c/ 1ª Avenida Qd.85 Lt.43, Setor Leste Universitário, Goiânia - GO",
      mapsUrl: "https://maps.app.goo.gl/tr7ZrTtBLH1GKSSy7",
      wazeUrl: "https://waze.com/ul?q=Paróquia%20Universitária%20São%20João%20Evangelista%20Goiânia&navigate=yes",
      dressCode: "Esporte fino (Evitar roupas curtas ou decotadas)",
      imageAsset: "venue-missa.jpg"
    },
    {
      id: "colacao",
      name: "Colação de Grau",
      dateText: "11/08/2026",
      dateLong: "11 de agosto de 2026",
      timeText: "19h30",
      startsAt: "2026-08-11T19:30:00-03:00",
      venueName: "Centro de Convenções da PUC Goiás",
      venue: "Câmpus II, Av. Engler, 507, Jardim Mariliza, Goiânia - GO",
      mapsUrl: "https://maps.app.goo.gl/Vbw6ozyoiZQnDY1QA",
      wazeUrl: "https://waze.com/ul?q=Centro%20de%20Convenções%20da%20PUC%20Goiás&navigate=yes",
      dressCode: "Esporte fino",
      imageAsset: "venue-puc.jpg"
    },
    {
      id: "festa",
      name: "Festa de Formatura",
      dateText: "22/08/2026",
      dateLong: "22 de agosto de 2026",
      timeText: "12h00",
      startsAt: "2026-08-22T12:00:00-03:00",
      venueName: "Casa Leal Festas",
      venue: "Av. das Indústrias, 601, Quadra 151 Lote 47 Sala 301, Santa Genoveva, Goiânia - GO",
      mapsUrl: "https://maps.app.goo.gl/mjBQPy8hGmS7prto9",
      wazeUrl: "https://waze.com/ul?q=Casa%20Leal%20Festas%20Santa%20Genoveva%20Goiânia&navigate=yes",
      dressCode: "Esporte fino (Evitar roupas quentes)",
      imageAsset: "vitoria-family-1"
    }
  ],
  navigation: [
    { label: "Mensagem", href: "#jornada" },
    { label: "Galeria", href: "#familia" },
    { label: "Eventos", href: "#celebracao" },
    { label: "RSVP", href: "#rsvp" },
  ],
  hero: {
    eyebrow: "Convite de Formatura",
    name: "Vitória Cézar",
    supportingName: "Jeronimo Pereira",
    courseLine: "Direito • PUC Goiás",
    metaLine: "10, 11 e 22 de Agosto de 2026 • Goiânia",
    primaryCta: "Confirmar presença",
    imageAsset: "vitoria-hero",
  },
  story: {
    label: "Minha jornada",
    title: "Minha História",
    images: [
      { asset: "vitoria-portrait-1", alt: "Vitória Cézar" }
    ],
    paragraphs: [
      "Após anos de dedicação, desafios superados e constante aprendizado, tenho a imensa alegria de celebrar minha graduação em Direito pela PUC Goiás. Esta conquista é o fruto de muito esforço, fé inabalável e o apoio inestimável daqueles que estiveram ao meu lado.",
      "A jornada acadêmica me ensinou que o Direito vai muito além dos códigos e tribunais; trata-se de buscar a justiça, defender a dignidade humana e lutar por um mundo mais equitativo. Cada desafio superado foi um degrau para o crescimento profissional e pessoal.",
      "Agradeço profundamente a Deus por iluminar meu caminho, aos meus professores pelo conhecimento compartilhado, e de modo muito especial à minha família e amigos, que foram meu porto seguro, torcida e base incondicional em todos os momentos.",
      "É com o coração cheio de gratidão e alegria que convido você para celebrar comigo este encerramento de ciclo e o início de uma nova e promissora etapa!"
    ],
    quote: "Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.",
    quoteAuthor: "Provérbios 16:3",
  },
  gallery: {
    label: "Momentos",
    title: "Galeria",
    description: "Fotos especiais desta jornada.",
    paragraphs: [
      "Agradeço a Deus por me sustentar em cada passo, e à minha família e amigos que foram meu apoio e base incondicional ao longo de toda essa caminhada."
    ],
    slides: [
      { asset: "vitoria-hero", alt: "Vitória Cézar", caption: "A comemoração de uma grande vitória.", aspect: "landscape" },
      { asset: "vitoria-portrait-1", alt: "Vitória Cézar", caption: "A conquista de um sonho.", aspect: "portrait" },
      { asset: "vitoria-portrait-2", alt: "Vitória Cézar", caption: "A realização de um grande sonho.", aspect: "portrait" },
      { asset: "vitoria-family-1", alt: "Vitória com família", caption: "Minha família, minha base.", aspect: "landscape" }
    ],
  },
  celebration: {
    label: "Celebração",
    title: "Os Eventos",
    dateAccent: { day: "10", month: "Agosto", time: "19h00" },
    primaryImageAsset: "vitoria-portrait-1",
    scheduleNarrative: "Preparamos cada detalhe para comemorar esta conquista especial.",
    locationNarrative: "Veja abaixo as informações completas de cada um dos eventos.",
    quickNotes: [
      { title: "Traje", description: "Esporte Fino para todos os eventos. Para a Missa, evitar roupas curtas ou decotadas. Para a Festa, evitar roupas muito quentes." },
      { title: "Confirmação", description: "Por favor, confirme sua presença pelo RSVP até dia 10/08/2026." },
      { title: "Fotos", description: "Amamos fotos! Registre cada momento e compartilhe conosco!" },
    ],
  },
  rsvp: {
    label: "RSVP",
    title: "Confirme sua Presença",
    description: "Sua confirmação é essencial para que possamos organizar este momento com todo carinho.",
    infoItems: [
      "Confirme sua presença até o dia 10/08/2026.",
      "Traje sugerido: Esporte fino."
    ],
    maxCompanions: 4,
    whatsappNumber: "62995257351",
    whatsappIntl: "5562995257351",
    openWhatsAppAfterSubmit: true,
    successMessage: "Sua confirmação foi recebida com sucesso! Obrigado!",
    messagePlaceholder: "Se desejar, escreva uma mensagem especial para a Vitória.",
  },
  giftList: {
    enabled: false,
    title: "Lista de Presentes",
    description: "Se desejar contribuir com este momento especial.",
    pixKey: "",
    pixName: "",
    instructions: "Obrigado pelo carinho!",
  },
  footer: {
    name: "Vitória Cézar",
    closing: "Obrigada por fazer parte desta história. Será uma alegria celebrar com você!",
    brand: "Luma Convites Digitais",
    adminLabel: "Painel Admin",
  },
  theme: {
    style: "classic-elegant",
    primaryColor: "#5e101a",
  },
};

export const defaultSource = "site";
export const eventSlug = inviteConfig.identity.slug;
