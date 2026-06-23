export interface Service {
  id: string;
  name: string;
  price: number;
  priceType: 'h' | 'visita' | 'orcamento' | 'total';
  description?: string;
  tag?: string;
  duration?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  imageUrl: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  experienceYears: string;
  completedJobs: number;
  satisfactionRate: number;
  aboutText: string;
  avatarUrl: string;
  basePrice: number;
  priceType: string;
  services: Service[];
  portfolio: PortfolioProject[];
  testimonials: ClientTestimonial[];
  isVerified: boolean;
  featured?: boolean;
}

export interface BookingState {
  provider: Provider | null;
  selectedService: Service | null;
  selectedDate: string; // e.g. "2024-10-10"
  selectedTimeSlot: string; // e.g. "02:00 PM"
  address: string;
  apartment: string;
  municipio: string;
  paymentMethod: string;
  phoneNumber: string;
}

export interface Publication {
  id: string;
  providerId: string;
  providerName: string;
  providerTitle: string;
  providerAvatar: string;
  category: string;
  content: string;
  imageUrl?: string;
  likes: number;
  commentsCount: number;
  date: string;
  tag: 'Trabalho Concluído' | 'Oferta Especial' | 'Dica Útil' | 'Disponibilidade de Hoje' | 'Anúncio';
  likedByUser?: boolean;
}

