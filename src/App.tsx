import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  Wrench,
  Wind,
  Car,
  Truck,
  Search,
  Star,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  ArrowLeft,
  Send,
  CheckCircle2,
  User,
  Users,
  Lock,
  Mail,
  ChevronRight,
  Menu,
  X,
  Check,
  Eye,
  EyeOff,
  MessageSquare,
  Briefcase,
  Award,
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  Compass,
  FileText,
  ShieldAlert,
  Sliders,
  LogOut,
  XCircle,
  Share2,
  Heart,
  CreditCard,
  History,
  Bell,
  HelpCircle,
  Edit2,
  Upload
} from 'lucide-react';
import { MOCK_PROVIDERS, CATEGORIES, INITIAL_PUBLICATIONS } from './data';
import { Provider, Service, BookingState, Publication } from './types';
import { MuralComunidade } from './components/MuralComunidade';

const ServiLinkLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      viewBox="0 0 100 110" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      
      {/* Pin head and body with stylish bottom-left gap */}
      <path
        d="M 25 74 C 18 67, 14 58, 14 48 C 14 28, 30 12, 50 12 C 70 12, 86 28, 86 48 C 86 68, 70 84, 50 102 C 45 97, 39 91, 35 85"
        stroke="url(#logoGrad)"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Interactive Network 'S' Ribbon */}
      <path
        d="M 58 38 M 58 38 H 48 C 41 38, 37 42, 37 48 C 37 54, 41 54, 48 54 H 54 C 61 54, 65 58, 65 64 C 65 72, 59 72, 48 72 H 32"
        stroke="url(#logoGrad)"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top Node Connection circle */}
      <circle 
        cx="58" 
        cy="38" 
        r="9" 
        fill="white" 
        stroke="url(#logoGrad)" 
        strokeWidth="5.5" 
      />

      {/* Bottom Node Connection circle */}
      <circle 
        cx="32" 
        cy="72" 
        r="9" 
        fill="white" 
        stroke="url(#logoGrad)" 
        strokeWidth="5.5" 
      />
    </svg>
  );
};

export default function App() {
  // Current main view: 'home' | 'login' | 'register' | 'forgot' | 'listing' | 'profile' | 'checkout' | 'success' | 'bookings' | 'user-profile'
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register' | 'forgot' | 'listing' | 'profile' | 'checkout' | 'success' | 'bookings' | 'user-profile'>('home');
  
  // Simulation States
  const [providersState, setProvidersState] = useState<Provider[]>(MOCK_PROVIDERS);
  const [selectedCategory, setSelectedCategory] = useState<string>('canalizacao');
  const [selectedProvider, setSelectedProvider] = useState<Provider>(MOCK_PROVIDERS[0]); // Default Marcus Sterling
  const [selectedService, setSelectedService] = useState<Service | null>(MOCK_PROVIDERS[0].services[1]); // Default Manutenção Geral
  
  // Rating & Evaluation States
  const [ratingBookingId, setRatingBookingId] = useState<string | null>(null);
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [ratingComment, setRatingComment] = useState<string>('');
  
  // Booking Custom Forms
  const [bookingDate, setBookingDate] = useState<number>(10); // Day of Oct 2024
  const [bookingTime, setBookingTime] = useState<string>('02:00 PM');
  const [bookingAddress, setBookingAddress] = useState<string>('');
  const [bookingApartment, setBookingApartment] = useState<string>('');
  const [bookingMunicipio, setBookingMunicipio] = useState<string>('Talatona');
  const [paymentMethod, setPaymentMethod] = useState<string>('Multicaixa Express');
  const [paymentPhone, setPaymentPhone] = useState<string>('923 000 000');
  
  // Searching & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterRating, setFilterRating] = useState<boolean>(false);
  const [filterLocation, setFilterLocation] = useState<string>('Todos');
  
  // Publications State
  const [publicationsList, setPublicationsList] = useState<Publication[]>(INITIAL_PUBLICATIONS);
  const [listingTab, setListingTab] = useState<'list' | 'publications'>('list');
  const [newPubContent, setNewPubContent] = useState<string>('');
  const [newPubCategory, setNewPubCategory] = useState<string>('eletricista');
  const [newPubTag, setNewPubTag] = useState<'Trabalho Concluído' | 'Oferta Especial' | 'Dica Útil' | 'Disponibilidade de Hoje' | 'Anúncio'>('Trabalho Concluído');
  const [newPubImage, setNewPubImage] = useState<string>('');
  
  // User Authentication
  const [emailInput, setEmailInput] = useState<string>('exemplo@servilink.co.ao');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [signUpName, setSignUpName] = useState<string>('');
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPhone, setSignUpPhone] = useState<string>('');
  const [signUpRole, setSignUpRole] = useState<'Cliente' | 'Profissional'>('Cliente');
  const [signUpExperience, setSignUpExperience] = useState<string>('Iniciante (Menos de 1 ano)');
  const [signUpSpeciality, setSignUpSpeciality] = useState<string>('Canalização');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState<string>('');
  const [recoveryEmail, setRecoveryEmail] = useState<string>('');
  const [recoverySuccess, setRecoverySuccess] = useState<boolean>(false);
  
  // State to hold pending booking if user is directed to login/register first
  const [pendingBooking, setPendingBooking] = useState<{ provider: Provider; service: Service } | null>(null);

  // Real active user simulation
  const [currentUser, setCurrentUser] = useState<{
    name: string; 
    email: string; 
    phone: string; 
    avatar: string;
    role?: 'Cliente' | 'Profissional';
    experience?: string;
    speciality?: string;
  } | null>(null);
  const [bookingsList, setBookingsList] = useState<Array<any>>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeProfileModal, setActiveProfileModal] = useState<'none' | 'edit-profile' | 'history' | 'payment' | 'addresses' | 'notifications' | 'security' | 'faq' | 'support'>('none');

  // Quick feedback alerts
  const [alertMsg, setAlertMsg] = useState<{type: 'success' | 'error' | 'info', text: string} | null>(null);

  const showAlert = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setAlertMsg({ type, text });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  // Helper calculation formulas matching exact payment screenshot values
  const taxiDeslocacao = 12525;
  const taxaPlataforma = 3750;
  
  const getSelectedServicePrice = () => {
    if (selectedService) return selectedService.price;
    return selectedProvider.basePrice;
  };

  const getInvoiceTotal = () => {
    const base = getSelectedServicePrice();
    if (base === 0) return 0; // "Sob Orçamento"
    return base + taxiDeslocacao + taxaPlataforma;
  };

  // Formatted currencies
  const formatKz = (value: number) => {
    if (value === 0) return 'Sob Orçamento';
    return `${value.toLocaleString('pt-AO')},00 Kz`;
  };

  // Switch context helper
  const handleViewProvider = (providerId: string) => {
    const prov = providersState.find(p => p.id === providerId);
    if (prov) {
      setSelectedProvider(prov);
      setSelectedService(prov.services[0] || null);
      setCurrentView('profile');
      window.scrollTo(0, 0);
    }
  };

  // Book action
  const handleInitiateBooking = (provider: Provider, service: Service) => {
    if (!currentUser) {
      setPendingBooking({ provider, service });
      showAlert('Crie uma conta para poder solicitar este serviço!', 'info');
      setCurrentView('register');
      window.scrollTo(0, 0);
      return;
    }
    setSelectedProvider(provider);
    setSelectedService(service);
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };

  // Confirm reservation submit
  const handleConfirmReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingAddress) {
      showAlert('Por favor insira um endereço para o serviço em Luanda.', 'error');
      return;
    }
    
    const newBooking = {
      id: `SL-${Math.floor(1000 + Math.random() * 9000)}`,
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      providerTitle: selectedProvider.title,
      avatar: selectedProvider.avatarUrl,
      serviceName: selectedService ? selectedService.name : 'Serviço Geral',
      date: `${bookingDate} de Outubro de 2024`,
      time: bookingTime,
      address: `${bookingAddress}, Apt/Casa ${bookingApartment || 'N/A'}, ${bookingMunicipio}, Luanda`,
      total: getInvoiceTotal(),
      status: 'Confirmado',
      paymentMethod,
      timestamp: new Date().toLocaleDateString('pt-AO')
    };

    setBookingsList([newBooking, ...bookingsList]);
    setCurrentView('success');
    window.scrollTo(0, 0);
  };

  const submitBookingRating = (bookingId: string) => {
    if (!ratingComment.trim()) {
      showAlert('Por favor, escreva um pequeno comentário sobre a sua experiência.', 'error');
      return;
    }

    setBookingsList(prev => prev.map(book => {
      if (book.id === bookingId) {
        const prov = providersState.find(p => p.id === book.providerId || p.name === book.providerName);
        if (prov) {
          const newTestimonial = {
            id: `test-${Date.now()}`,
            clientName: currentUser?.name || 'Cliente de Luanda',
            avatar: (currentUser?.name || "C")[0].toUpperCase(),
            rating: ratingStars,
            text: ratingComment,
            date: 'Hoje'
          };
          
          setProvidersState(prevProviders => prevProviders.map(p => {
            if (p.id === prov.id) {
              const updatedTestimonials = [newTestimonial, ...(p.testimonials || [])];
              const sum = updatedTestimonials.reduce((acc, t) => acc + t.rating, 0);
              const avg = Number((sum / updatedTestimonials.length).toFixed(1));
              return {
                ...p,
                rating: avg,
                reviewCount: updatedTestimonials.length,
                testimonials: updatedTestimonials
              };
            }
            return p;
          }));

          if (selectedProvider && selectedProvider.id === prov.id) {
            setSelectedProvider(prev => {
              if (!prev) return prev;
              const updatedTestimonials = [newTestimonial, ...(prev.testimonials || [])];
              const sum = updatedTestimonials.reduce((acc, t) => acc + t.rating, 0);
              const avg = Number((sum / updatedTestimonials.length).toFixed(1));
              return {
                ...prev,
                rating: avg,
                reviewCount: updatedTestimonials.length,
                testimonials: updatedTestimonials
              };
            });
          }
        }

        return {
          ...book,
          status: 'Concluído',
          rating: ratingStars,
          reviewText: ratingComment
        };
      }
      return book;
    }));

    showAlert('Muito obrigado pela sua avaliação! O seu testemunho foi publicado no perfil do especialista.', 'success');
    setRatingBookingId(null);
    setRatingComment('');
    setRatingStars(5);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col antialiased">
      
      {/* QUICK PRESENTATION ALERT */}
      {alertMsg && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-md py-sm rounded-lg shadow-xl border flex items-center gap-sm transition-all duration-300 animate-bounce ${
          alertMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
          alertMsg.type === 'error' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          {alertMsg.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {alertMsg.type === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
          <span className="font-body-sm font-medium">{alertMsg.text}</span>
        </div>
      )}

      {/* CORE FRAMEWORK TOP NAV BAR */}
      <nav id="main-navigation" className="bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-45">
        <div className="max-w-[1280px] mx-auto px-md md:px-lg h-16 flex items-center justify-between">
          <button
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center shadow-sm">
              <ServiLinkLogo className="w-6.5 h-6.5" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-primary tracking-tight block">ServiLink</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest block -mt-1">SERVIÇOS LOCAIS SOB DEMANDA</span>
            </div>
          </button>

          {/* Search bar helper in Top Nav (Desktop) */}
          <div className="hidden md:flex items-center relative w-80">
            <input
              type="text"
              placeholder="Pesquisar eletricistas, encanadores..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'listing') setCurrentView('listing');
              }}
              className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 text-sm font-body-sm outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
            />
            <Search className="w-4 h-4 text-outline absolute left-3" />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentView('home')} className={`font-label-md text-sm transition ${currentView === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>
              Início
            </button>
            <button onClick={() => { setSelectedCategory('canalizacao'); setCurrentView('listing'); }} className={`font-label-md text-sm transition ${currentView === 'listing' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>
              Prestadores
            </button>
            <button onClick={() => setCurrentView('bookings')} className={`font-label-md text-sm transition ${currentView === 'bookings' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>
              Minhas Reservas ({bookingsList.length})
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-on-surface">{currentUser.name}</span>
                  <button onClick={() => { setCurrentUser(null); showAlert('Sessão encerrada com sucesso', 'info'); }} className="text-[10px] text-red-600 hover:underline">
                    Sair
                  </button>
                </div>
                <div 
                  onClick={() => { setCurrentView('user-profile'); window.scrollTo(0, 0); }}
                  className="w-9 h-9 rounded-full overflow-hidden border border-outline-variant/60 cursor-pointer hover:opacity-90 transition-all shadow-sm flex items-center justify-center bg-primary-container"
                  title="Ver meu perfil"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-4 py-2 text-sm font-label-md text-primary hover:bg-surface-container rounded-lg transition"
                >
                  Entrar
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="px-4 py-2 text-sm font-label-md bg-primary-container text-white rounded-lg shadow-sm hover:opacity-90 transition"
                >
                  Criar Conta
                </button>
              </div>
            )}
          </div>

          {/* Toggle Mobile Menu */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant px-md py-sm flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Qual serviço procura hoje?"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'listing') setCurrentView('listing');
                }}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-9 pr-3 text-sm outline-none"
              />
              <Search className="w-4 h-4 text-outline absolute left-3 top-3" />
            </div>

            <button 
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-label-md text-sm border-b border-surface-container text-on-surface hover:text-primary"
            >
              Início
            </button>
            <button 
              onClick={() => { setSelectedCategory('canalizacao'); setCurrentView('listing'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-label-md text-sm border-b border-surface-container text-on-surface hover:text-primary"
            >
              Prestadores de Serviço
            </button>
            <button 
              onClick={() => { setCurrentView('bookings'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-label-md text-sm border-b border-surface-container text-on-surface hover:text-primary"
            >
              Minhas Reservas ({bookingsList.length})
            </button>

            {currentUser ? (
              <div className="flex items-center justify-between py-2 border-t border-surface-container">
                <button 
                  onClick={() => { setCurrentView('user-profile'); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-left hover:opacity-80 transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/60 flex items-center justify-center bg-primary-container">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs font-bold">{currentUser.name}</span>
                </button>
                <button onClick={() => { setCurrentUser(null); setMobileMenuOpen(false); }} className="text-xs text-red-600 font-bold">
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex gap-2 py-2 border-t border-surface-container">
                <button
                  onClick={() => { setCurrentView('login'); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 text-center text-sm font-label-md border border-outline-variant rounded-lg"
                >
                  Entrar
                </button>
                <button
                  onClick={() => { setCurrentView('register'); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 text-center text-sm font-label-md bg-primary-container text-white rounded-lg"
                >
                  Registar
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* RENDER ACTIVE SCREEN */}
      <main className="flex-grow">
        
        {/* ====================================
            1. HOME / LANDING SCREEN 
           ==================================== */}
        {currentView === 'home' && (
          <div className="animate-fade-in flex flex-col gap-16 md:gap-24 pb-16 md:pb-24">
            {/* Blue Jumbotron banner with beautiful background image */}
            <section className="relative text-white py-20 lg:py-24 px-md md:px-lg overflow-hidden bg-slate-900">
              {/* Background Ambient Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1600')` 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/40 pointer-events-none" />
              
              <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Left side text and search */}
                <div className="lg:col-span-7 space-y-lg text-left">
                  <div className="space-y-sm">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-black tracking-wider uppercase text-white">⭐ Plataforma Líder em Angola</span>
                    </div>
                    
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                      Serviços Técnicos <br />
                      <span className="text-[#feaa00]">Profissionais</span> em Luanda.
                    </h1>
                    
                    <p className="text-gray-300 font-body text-sm md:text-base max-w-xl leading-relaxed">
                      Ligue-se instantaneamente a eletricistas certificados, mecânicos experientes, canalizadores de urgência e equipas de limpeza avaliadas para o seu imóvel ou escritório.
                    </p>
                  </div>

                  {/* Highly styled primary search */}
                  <div className="bg-white rounded-full shadow-2xl p-2 flex items-center max-w-xl border border-outline-variant focus-within:ring-4 focus-within:ring-[#feaa00]/30 transition-all">
                    <div className="flex-grow flex items-center pl-4 gap-2">
                      <Search className="w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Pesquisar eletricistas, limpadores, mecânicos..."
                        className="w-full bg-transparent border-none py-1.5 text-slate-800 font-body-sm text-sm outline-none placeholder:text-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setCurrentView('listing');
                          }
                        }}
                      />
                    </div>
                    <button 
                      onClick={() => setCurrentView('listing')}
                      className="bg-[#feaa00] hover:bg-amber-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-full transition-all font-label-md flex items-center gap-1.5 shrink-0 shadow-md active:scale-95 duration-150"
                    >
                      <span>Pesquisar</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                </div>

                {/* Right side graphic layout */}
                <div className="lg:col-span-5 hidden lg:block relative">
                  <div className="relative mx-auto w-[320px] h-[480px] rounded-[2.5rem] border-[10px] border-slate-800 bg-slate-950 shadow-2xl overflow-hidden group">
                    {/* Phone Screen Mock */}
                    <img 
                      src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800" 
                      alt="Técnico ServiLink operando" 
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[4000ms]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Live indicator bubble floating inside screen */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-black tracking-wider text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Reservado Agora
                        </span>
                        <span className="text-[10px] text-gray-300 font-bold">Hoje, Alvalade</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img 
                          src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=100" 
                          alt="Marcus" 
                          className="w-8 h-8 rounded-full object-cover border border-white/30"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="text-xs font-bold block leading-tight">Marcus Sterling</span>
                          <span className="text-[9px] text-gray-300 block">Eletricidade Residencial</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ambient glowing shapes behind phone */}
                  <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/20 rounded-full filter blur-[80px]" />
                  <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#feaa00]/10 rounded-full filter blur-[80px]" />
                </div>
              </div>
            </section>

            {/* Categories Section */}
            <section className="max-w-[1280px] mx-auto w-full px-md md:px-lg py-4">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-on-surface tracking-tight">
                    Categorias Profissionais
                  </h2>
                  <p className="text-on-surface-variant text-xs md:text-sm">
                    Selecionados manualmente para garantir a estabilidade das suas instalações
                  </p>
                </div>
                <button 
                  onClick={() => { setSelectedCategory('canalizacao'); setCurrentView('listing'); }}
                  className="text-primary hover:underline font-semibold text-xs md:text-sm flex items-center gap-1"
                >
                  <span>Ver Tudo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
                {CATEGORIES.map((cat) => {
                  const bgImage = 
                    cat.id === 'limpeza' ? 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600' :
                    cat.id === 'eletricista' ? 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600' :
                    cat.id === 'canalizacao' ? 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600' :
                    cat.id === 'ac_frio' ? 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600' :
                    cat.id === 'mecanica' ? 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600' :
                    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=600';
                  
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentView('listing');
                        window.scrollTo(0, 0);
                      }}
                      className="group relative h-44 rounded-2xl overflow-hidden border border-outline-variant hover:border-primary transition-all duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer flex flex-col justify-end p-4 text-left"
                    >
                      {/* Realistic Service Background Image */}
                      <img 
                        src={bgImage} 
                        alt={cat.label} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {/* Deep realistic gradient overlay for optimal legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      
                      {/* Floating Glassmorphism Icon + Title */}
                      <div className="relative z-10 space-y-2.5 w-full">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 shadow-sm">
                          {cat.id === 'limpeza' && <Sparkles className="w-5 h-5" />}
                          {cat.id === 'eletricista' && <Zap className="w-5 h-5" />}
                          {cat.id === 'canalizacao' && <Wrench className="w-5 h-5" />}
                          {cat.id === 'ac_frio' && <Wind className="w-5 h-5" />}
                          {cat.id === 'mecanica' && <Car className="w-5 h-5" />}
                          {cat.id === 'estafetas' && <Truck className="w-5 h-5" />}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-black tracking-tight text-white block">
                            {cat.label}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>



            {/* MURAL DA COMUNIDADE COM PUBLICAÇÕES DOS PRESTADORES */}
            <section className="bg-surface-container-low/40 py-16 border-y border-outline-variant">
              <div className="max-w-[1280px] mx-auto px-md md:px-lg">
                <div className="mb-8">
                  <span className="text-primary font-bold text-xs uppercase tracking-wider block mb-1">Mural da Comunidade</span>
                  <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
                    Novidades & Publicações dos Prestadores
                  </h2>
                  <p className="text-on-surface-variant text-xs md:text-sm mt-1 max-w-2xl">
                    Fique por dentro das ofertas ativas, demonstrações de portfólio e recomendações preventivas compartilhadas por especialistas em Luanda.
                  </p>
                </div>

                <MuralComunidade
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  publicationsList={publicationsList}
                  setPublicationsList={setPublicationsList}
                  handleViewProvider={handleViewProvider}
                  showAlert={showAlert}
                  filterSelectedCategory="Todos"
                />
              </div>
            </section>


          </div>
        )}

        {/* ====================================
            2. LISTING SCREEN (Plumbers, etc.)
           ==================================== */}
        {currentView === 'listing' && (
          <div className="bg-surface-container-low min-h-screen py-8 animate-fade-in text-on-surface">
            <div className="max-w-[1280px] mx-auto px-md md:px-lg">
              
              {/* Filter Jumbotron */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-primary font-bold text-xs uppercase tracking-wider">Directório Certificado</span>
                    <h1 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface mt-1">
                      Serviços de {CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Prestação'}
                    </h1>
                    <p className="text-on-surface-variant text-sm mt-1">
                      Encontrámos {providersState.filter(p => p.category === selectedCategory).length} especialistas de confiança ativos na rede regional.
                    </p>
                  </div>

                  {/* Category switcher tabs inside listing */}
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.id)}
                        className={`text-xs px-3 py-1.5 rounded-full font-semibold transition ${
                          selectedCategory === c.id 
                            ? 'bg-primary text-white font-bold' 
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Filter buttons (from mockup) */}
                <div className="flex flex-wrap items-center gap-4 md:gap-5 p-6 bg-surface-container-low/40 rounded-xl mt-6 pt-6 border-t border-outline-variant">
                  <div className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer hover:opacity-90">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Filtros</span>
                  </div>

                  <button
                    onClick={() => setFilterRating(!filterRating)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                      filterRating 
                        ? 'bg-amber-500 border-amber-500 text-white font-bold' 
                        : 'bg-transparent border-outline-variant text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    Avaliação 4.5+ ★
                  </button>

                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="bg-transparent border border-outline-variant rounded-full text-xs px-3 py-1.5 font-bold focus:outline-none"
                  >
                    <option value="Todos">Todas as Zonas</option>
                    <option value="Talatona">Talatona</option>
                    <option value="Kilamba">Kilamba</option>
                    <option value="Maianga">Maianga</option>
                    <option value="Alvalade">Alvalade</option>
                  </select>

                  {(filterRating || filterLocation !== 'Todos' || searchQuery) && (
                    <button
                      onClick={() => { setFilterRating(false); setFilterLocation('Todos'); setSearchQuery(''); }}
                      className="text-primary text-xs hover:underline font-bold ml-2"
                    >
                      Limpar Filtros
                    </button>
                  )}
                </div>
              </div>

              {/* SUB-VIEW TAB CONTROLLER: LIST OR COMMUNITY WALL */}
              <div className="flex border-b border-outline-variant mb-6">
                <button
                  type="button"
                  onClick={() => setListingTab('list')}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 font-display text-sm font-bold transition-all outline-none ${
                    listingTab === 'list'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Lista de Profissionais ({providersState.filter(p => p.category === selectedCategory).length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setListingTab('publications')}
                  className={`flex items-center gap-2 px-6 py-3 border-b-2 font-display text-sm font-bold transition-all outline-none ${
                    listingTab === 'publications'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Mural de Publicações ({publicationsList.filter(p => p.category === selectedCategory).length})</span>
                </button>
              </div>

              {listingTab === 'list' ? (
                /* Grid of providers matching original image cards */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {providersState
                    .filter(p => p.category === selectedCategory)
                    .filter(p => !filterRating || p.rating >= 4.8)
                    .filter(p => filterLocation === 'Todos' || p.location.toLowerCase().includes(filterLocation.toLowerCase()))
                    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(provider => {
                      return (
                        <div
                          key={provider.id}
                          className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                        >
                          {/* Top layout */}
                          <div>
                            <div className="h-52 relative bg-surface-container-high">
                              <img
                                src={provider.avatarUrl}
                                alt={provider.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              
                              {/* Verified sticker */}
                              {provider.isVerified && (
                                <span className="absolute top-3 left-3 bg-primary text-white px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-lg uppercase flex items-center gap-1 shadow">
                                  <Check className="w-3 h-3 text-white stroke-[3]" />
                                  <span>Verificado</span>
                                </span>
                              )}

                              {/* Custom location flag */}
                              <span className="absolute bottom-3 left-3 bg-primary/90 text-white font-semibold text-xs py-1 px-3 rounded-md flex items-center gap-1.5 shadow-md">
                                <MapPin className="w-3.5 h-3.5 text-white" />
                                <span className="text-[11px] uppercase tracking-wide font-headline">TALATONA</span>
                              </span>

                              {/* Ratings float */}
                              <span className="absolute top-3 right-3 bg-white/95 text-on-surface px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span>{provider.rating.toFixed(1)}</span>
                              </span>
                            </div>

                            <div className="p-md md:p-lg space-y-md">
                              <div>
                                <h3 className="font-display font-bold text-xl text-on-surface flex items-center gap-2">
                                  <span>{provider.name}</span>
                                  {provider.isVerified && (
                                    <span className="text-primary-container" title="Certificado verificado">
                                      <CheckCircle2 className="w-5 h-5 fill-primary-container text-white stroke-[2]" />
                                    </span>
                                  )}
                                </h3>
                                <p className="text-xs font-semibold text-outline tracking-wider uppercase mt-1">
                                  {provider.title}
                                </p>
                              </div>

                              <p className="font-body-sm text-sm text-on-surface-variant line-clamp-3">
                                {provider.aboutText}
                              </p>

                              <div className="flex flex-wrap gap-1">
                                <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded text-xs">
                                  {provider.experienceYears} Anos Exp.
                                </span>
                                <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded text-xs">
                                  {provider.completedJobs}+ Obras Concluídas
                                </span>
                                <span className="bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded text-xs">
                                  {provider.satisfactionRate}% Satisfação
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Invoice CTA bar (matches original list screen layout) */}
                          <div className="p-md md:px-lg md:py-md bg-surface-container border-t border-outline-variant flex items-center justify-between">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-outline block">A PARTIR DE</span>
                              <span className="text-lg font-extrabold text-[#003d9b]">
                                {provider.basePrice === 0 ? 'Orçamento' : `${provider.basePrice.toLocaleString('pt-AO')} Kz/${provider.priceType}`}
                              </span>
                            </div>
                            <button
                              onClick={() => handleViewProvider(provider.id)}
                              className="bg-primary hover:bg-primary-container text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer"
                            >
                              Ver Perfil
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                /* community wall filter category matching selectedCategory! */
                <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="mb-6">
                    <h2 className="font-display text-lg md:text-xl font-black text-on-surface">Mural de {CATEGORIES.find(c => c.id === selectedCategory)?.label || 'Prestação'}</h2>
                    <p className="text-on-surface-variant text-xs md:text-sm">Conselhos, portefólios e dicas do sector de {CATEGORIES.find(c => c.id === selectedCategory)?.label || 'actuação'} partilhados em Luanda.</p>
                  </div>
                  <MuralComunidade
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    publicationsList={publicationsList}
                    setPublicationsList={setPublicationsList}
                    handleViewProvider={handleViewProvider}
                    showAlert={showAlert}
                    filterSelectedCategory={selectedCategory}
                  />
                </div>
              )}

              {/* If no items match filters */}
              {providersState.filter(p => p.category === selectedCategory).length === 0 && (
                <div className="bg-white border border-outline-variant rounded-xl p-lg text-center text-on-surface space-y-md">
                  <span className="text-4xl">🛠️</span>
                  <h3 className="font-display font-semibold text-lg">Nenhum profissional listado para esta categoria ainda</h3>
                  <p className="text-on-surface-variant text-sm">Trabalhamos intensamente para cadastrar eletricistas e encanadores examinados no centro de Luanda.</p>
                </div>
              )}

              {/* Float Map Button from original screenshot mock */}
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => showAlert('O mapa interativo de Luanda será aberto com dados de satélite GPS', 'info')}
                  className="bg-[#feaa00] text-[#291800] hover:bg-amber-500 font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-colors font-label-md text-sm fixed bottom-6 z-40"
                >
                  <MapPin className="w-5 h-5 text-[#291800]" />
                  <span>Ver Mapa de Luanda</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ====================================
            3. PROVIDER PROFILE SCREEN (Marcus Sterling, etc.)
           ==================================== */}
        {currentView === 'profile' && selectedProvider && (
          <div className="bg-surface-container-low py-8 animate-fade-in text-on-surface">
            <div className="max-w-[1280px] mx-auto px-md md:px-lg flex flex-col gap-10 md:gap-14">
              
              {/* Profile Back Link */}
              <button 
                onClick={() => { setCurrentView('listing'); }}
                className="flex items-center gap-1.5 text-primary font-bold text-sm tracking-tight hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para Lista de Prestadores</span>
              </button>

              {/* Big visual header profile card (matching Marcus screen!) */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-md md:p-lg">
                  
                  {/* Avatar left */}
                  <div className="md:col-span-5 space-y-md">
                    <div className="relative rounded-xl overflow-hidden h-[340px] border border-outline-variant group">
                      <img
                        src={selectedProvider.avatarUrl}
                        alt={selectedProvider.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1.5 font-bold text-xs rounded-lg flex items-center gap-1 shadow">
                        <Star className="w-4 h-4 fill-white text-white" />
                        <span>{selectedProvider.rating.toFixed(1)} ({selectedProvider.reviewCount})</span>
                      </span>
                    </div>

                    {/* Stats badges inside white card */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-surface-container-low border border-outline-variant p-2 text-center rounded-lg">
                        <span className="text-lg font-bold text-primary block">{selectedProvider.experienceYears}</span>
                        <span className="text-[10px] text-outline font-semibold tracking-wider uppercase">ANOS EXP.</span>
                      </div>
                      <div className="bg-surface-container-low border border-outline-variant p-2 text-center rounded-lg">
                        <span className="text-lg font-bold text-primary block">{selectedProvider.completedJobs}</span>
                        <span className="text-[10px] text-outline font-semibold tracking-wider uppercase">OBRAS</span>
                      </div>
                      <div className="bg-surface-container-low border border-outline-variant p-2 text-center rounded-lg">
                        <span className="text-lg font-bold text-primary block">{selectedProvider.satisfactionRate}%</span>
                        <span className="text-[10px] text-outline font-semibold tracking-wider uppercase">SATISFAÇÃO</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info right */}
                  <div className="md:col-span-7 space-y-md flex flex-col justify-between">
                    <div className="space-y-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                          NÍVEL MASTER CERTIFICADO
                        </span>
                        {selectedProvider.isVerified && (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                            <span>Garantia Ativa</span>
                          </span>
                        )}
                      </div>

                      <h1 className="font-display font-black text-2xl md:text-3xl text-on-surface tracking-tight mt-1">
                        {selectedProvider.name}
                      </h1>
                      <p className="text-outline text-sm font-semibold tracking-wide uppercase">
                        {selectedProvider.title}
                      </p>

                      <p className="text-on-surface-variant text-sm flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span>Luanda: {selectedProvider.location}</span>
                      </p>

                      <div className="pt-4 border-t border-outline-variant">
                        <h4 className="font-display font-bold text-sm text-on-surface uppercase tracking-wider mb-2">SOBRE</h4>
                        <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                          {selectedProvider.aboutText}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex items-center justify-between mt-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-outline block">Preço de Visita</span>
                        <span className="text-base font-bold text-primary">desde {selectedProvider.basePrice.toLocaleString('pt-AO')} Kz</span>
                      </div>
                      <button
                        onClick={() => {
                          if (selectedProvider.services.length > 0) {
                            handleInitiateBooking(selectedProvider, selectedProvider.services[0]);
                          } else {
                            showAlert('Este prestador de serviços não possui horários cadastrados neste momento.', 'error');
                          }
                        }}
                        className="bg-primary-container text-white px-5 py-2.5 font-bold text-xs rounded-lg transition hover:bg-primary shadow-sm"
                      >
                        Agendar Visita Regulamentar
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* LIST OF AVAILABLE SERVICES (Matching available services in original mockup!) */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm">
                <h3 className="font-display font-extrabold text-xl text-on-surface mb-6">
                  Serviços Disponíveis
                </h3>

                <div className="flex flex-col gap-6">
                  {selectedProvider.services.map(srv => {
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`p-md border rounded-xl transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          selectedService?.id === srv.id
                            ? 'bg-primary/5 border-primary ring-2 ring-primary/10'
                            : 'bg-transparent border-outline-variant hover:border-outline'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-bold text-base text-on-surface">{srv.name}</h4>
                            {srv.tag && (
                              <span className="bg-[#feaa00] text-[#684300] text-[9px] font-black px-2 py-0.5 rounded tracking-wider uppercase">
                                {srv.tag}
                              </span>
                            )}
                            {srv.duration && (
                              <span className="bg-surface-container text-on-surface-variant text-[10px] px-2 py-0.5 rounded">
                                {srv.duration}
                              </span>
                            )}
                          </div>
                          {srv.description && (
                            <p className="text-on-surface-variant text-xs leading-relaxed max-w-xl">{srv.description}</p>
                          )}
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-4">
                          <div className="text-right md:min-w-[140px]">
                            <span className="text-[10px] text-outline block font-bold uppercase">VALOR</span>
                            <span className="text-md font-bold text-primary block">
                              {srv.price === 0 ? 'Sob Orçamento' : `${srv.price.toLocaleString('pt-AO')},00 Kz`}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInitiateBooking(selectedProvider, srv);
                            }}
                            className="bg-primary-container text-white font-bold text-xs py-2 px-4 rounded-lg shadow-sm hover:opacity-95 text-center transition"
                          >
                            Reservar Agora
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* LOCAL PROJECTS IN ANGOLA PORTFOLIO GALLERY */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-on-surface">Projetos em Angola</h3>
                    <p className="text-on-surface-variant text-xs md:text-sm">Registo fotográfico de trabalhos concluídos de alta fidelidade em Luanda</p>
                  </div>
                  <button onClick={() => showAlert("Pasta completa de portfólio será processada", "info")} className="text-primary font-bold text-xs md:text-sm hover:underline">
                    Ver Portfólio →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-sm">
                  {selectedProvider.portfolio?.length > 0 ? (
                    selectedProvider.portfolio.map(port => (
                      <div key={port.id} className="relative rounded-lg overflow-hidden h-40 border border-outline-variant group">
                        <img src={port.imageUrl} alt={port.title} className="w-full h-full object-cover group-hover:scale-105 transition" referrerPolicy="no-referrer" />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-xs">
                          <p className="font-semibold">{port.title}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-4 bg-surface-container-low p-4 rounded text-center text-xs text-outline">
                      Galeria fotográfica de instalações em processamento.
                    </div>
                  )}
                </div>
              </div>

              {/* HISTORIC PUBLICATIONS BY SPECIFIC PROVIDER */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm">
                <div className="mb-6">
                  <h3 className="font-display font-extrabold text-xl text-on-surface">Partilhas & Notas de {selectedProvider.name}</h3>
                  <p className="text-on-surface-variant text-xs md:text-sm">Conselhos preventivos, anúncios técnicos e relatórios de obras realizados no terreno.</p>
                </div>

                {publicationsList.filter(pub => pub.providerId === selectedProvider.id).length === 0 ? (
                  <div className="text-center py-8 bg-surface-container-low rounded-xl border border-outline-variant/60">
                    <p className="text-outline text-xs font-bold">Este profissional ainda não fez partilhas públicas no mural.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    {publicationsList
                      .filter(pub => pub.providerId === selectedProvider.id)
                      .map(pub => (
                        <div key={pub.id} className="p-md bg-surface-container-low border border-outline-variant rounded-xl flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/60 mb-2">
                              <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider">{pub.tag}</span>
                              <span className="text-[10px] text-outline font-medium">{pub.date}</span>
                            </div>
                            <p className="text-on-surface-variant text-sm font-body-sm leading-relaxed mb-3">{pub.content}</p>
                            {pub.imageUrl && (
                              <div className="h-32 rounded-lg overflow-hidden border border-outline-variant mb-3">
                                <img src={pub.imageUrl} alt="Anexo do Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-outline-variant/60 text-xs">
                            <span className="text-outline text-[10px] uppercase font-bold">❤️ {pub.likes} curtidas</span>
                            <span className="text-primary font-bold uppercase text-[9px] tracking-wide">{pub.category}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* CLIENT TESTIMONIALS */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm">
                <h3 className="font-display font-extrabold text-xl text-on-surface mb-6">
                  Testemunhos de Clientes
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {selectedProvider.testimonials?.map(test => {
                    return (
                      <div key={test.id} className="p-md bg-surface-container-low border border-outline-variant rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                              {test.avatar}
                            </div>
                            <div>
                              <span className="font-bold text-xs block text-on-surface">{test.clientName}</span>
                              <span className="text-[10px] text-outline block">{test.date}</span>
                            </div>
                          </div>
                          <div className="flex text-amber-500">
                            {[...Array(test.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-on-surface-variant text-sm font-body-sm leading-relaxed italic">
                          "{test.text}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BOTTOM FLOATING CONTROL (MENSAGEM / AGENDAR VISITA MATCHING CHOROS SCREEN!) */}
              <div className="bg-surface-container border-t border-outline-variant p-md rounded-xl flex items-center justify-between gap-4 shadow-lg sticky bottom-4 z-40 bg-opacity-95 backdrop-blur-sm">
                <div>
                  <span className="text-[11px] block text-outline font-bold">PRESTADOR</span>
                  <span className="font-display font-bold text-base text-primary uppercase">{selectedProvider.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        showAlert('Por favor, inicie sessão para enviar mensagens diretas.', 'info');
                        setCurrentView('login');
                      } else {
                        showAlert(`Chat direto aberto com ${selectedProvider.name}. Envie sua mensagem técnica.`, 'success');
                      }
                    }}
                    className="bg-transparent hover:bg-surface-container-high text-primary border border-primary font-bold text-xs px-5 py-3 rounded-lg transition"
                  >
                    Mensagem
                  </button>
                  <button
                    onClick={() => {
                      if (selectedService) {
                        handleInitiateBooking(selectedProvider, selectedService);
                      } else if (selectedProvider.services.length > 0) {
                        handleInitiateBooking(selectedProvider, selectedProvider.services[0]);
                      }
                    }}
                    className="bg-primary hover:bg-primary-container text-white font-bold text-xs px-6 py-3 rounded-lg shadow-md hover:scale-[1.01] transition-all"
                  >
                    Agendar Visita
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ====================================
            4. CHECKOUT SCREEN (Pagamento e Reserva)
           ==================================== */}
        {currentView === 'checkout' && selectedProvider && (
          <div className="bg-surface-container-low py-8 animate-fade-in text-on-surface">
            <div className="max-w-[720px] mx-auto px-md md:px-lg space-y-md">
              
              <button 
                onClick={() => { setCurrentView('profile'); }}
                className="flex items-center gap-1.5 text-primary font-bold text-sm hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao Perfil de {selectedProvider.name}</span>
              </button>

              <div className="space-y-sm">
                <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight text-on-surface">
                  Pagamento e Reserva
                </h1>
                <p className="text-on-surface-variant text-sm">
                  Escolha sua data e hora preferidas para o serviço em Luanda.
                </p>
              </div>

              {/* Date & Time selection forms */}
              <form onSubmit={handleConfirmReservationSubmit} className="space-y-md">
                
                {/* Calendar Component Grid (Matching screen mockup perfectly) */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm space-y-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      <span>Selecionar Data</span>
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-outline">
                      <button type="button" onClick={() => showAlert('Mês anterior', 'info')} className="p-1 hover:text-primary">‹</button>
                      <span className="text-on-surface">Outubro 2024</span>
                      <button type="button" onClick={() => showAlert('Mês seguinte', 'info')} className="p-1 hover:text-primary">›</button>
                    </div>
                  </div>

                  {/* Calendar Matrix Oct 2024 */}
                  <div className="grid grid-cols-7 gap-1 text-center font-display text-xs">
                    {/* Days labels */}
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, idx) => (
                      <span key={idx} className="font-bold text-outline py-1">{day}</span>
                    ))}
                    
                    {/* Grayed empty days Sep */}
                    <span className="text-outline-variant py-2">29</span>
                    <span className="text-outline-variant py-2">30</span>
                    
                    {/* Oct days */}
                    {Array.from({ length: 16 }, (_, i) => i + 1).map((day) => {
                      const isSelected = bookingDate === day;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setBookingDate(day)}
                          className={`py-2 rounded-lg font-bold text-center transition ${
                            isSelected 
                              ? 'bg-[#0052cc] text-white ring-4 ring-[#0052cc]/25 relative' 
                              : 'hover:bg-surface-container text-on-surface'
                          }`}
                        >
                          <span>{day}</span>
                          {isSelected && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Available Hours Slots Picker */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm space-y-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Horários Disponíveis</span>
                    </h3>
                  </div>

                  {/* Slots category boxes (from original checkout image) */}
                  <div className="space-y-sm">
                    {/* Morning slots */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-outline tracking-wider block mb-2">MANHÃ</span>
                      <div className="flex flex-wrap gap-[8px]">
                        {['09:00 AM', '10:30 AM', '11:00 AM'].map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBookingTime(slot)}
                            className={`w-[110px] h-[44px] rounded-lg text-xs font-bold transition-all border ${
                              bookingTime === slot
                                ? 'bg-primary/5 border-primary text-primary ring-2 ring-primary/10'
                                : 'bg-transparent border-outline-variant text-on-surface hover:border-outline'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Afternoon slots */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-outline tracking-wider block mb-2">TARDE</span>
                      <div className="flex flex-wrap gap-[8px]">
                        {['02:00 PM', '03:30 PM', '05:00 PM'].map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBookingTime(slot)}
                            className={`w-[110px] h-[44px] rounded-lg text-xs font-bold transition-all border ${
                              bookingTime === slot
                                ? 'bg-[#0052cc]/10 border-[#0052cc] text-[#0052cc] ring-2 ring-[#0052cc]/15 font-extrabold'
                                : 'bg-transparent border-outline-variant text-on-surface hover:border-outline'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Night slots */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-outline tracking-wider block mb-2">NOITE</span>
                      <div className="flex flex-wrap gap-[8px]">
                        {['07:00 PM'].map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBookingTime(slot)}
                            className={`w-[110px] h-[44px] rounded-lg text-xs font-bold transition-all border ${
                              bookingTime === slot
                                ? 'bg-primary/5 border-primary text-primary ring-2 ring-primary/10'
                                : 'bg-transparent border-outline-variant text-on-surface hover:border-outline'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Address In Luanda Form (from original check screenshot!) */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm space-y-md">
                  <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Endereço do Serviço em Luanda</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface block">Rua ou Distrito (ex: Bairro Alvalade)</label>
                      <input
                        type="text"
                        placeholder="Rua ou Distrito (Ex: Bairro Alvalade)"
                        value={bookingAddress}
                        onChange={(e) => setBookingAddress(e.target.value)}
                        required
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-sm">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface block">Apartamento / Casa</label>
                        <input
                          type="text"
                          placeholder="Apartamento ou Casa"
                          value={bookingApartment}
                          onChange={(e) => setBookingApartment(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm focus:border-primary outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-on-surface block">Município</label>
                        <select
                          value={bookingMunicipio}
                          onChange={(e) => setBookingMunicipio(e.target.value)}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-sm focus:border-primary outline-none"
                        >
                          <option value="Talatona">Talatona</option>
                          <option value="Maianga">Maianga</option>
                          <option value="Alvalade">Alvalade</option>
                          <option value="Kilamba">Kilamba</option>
                          <option value="Cazenga">Cazenga</option>
                          <option value="Luanda Sul">Luanda Sul</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated payment selector (Multicaixa Express card in checkout image) */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm space-y-md">
                  <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <span>Método de Pagamento</span>
                  </h3>

                  <div className="p-md bg-surface-container-low border border-outline-variant rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-container text-white p-2.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                        EXPRESS
                      </div>
                      <div>
                        <span className="font-bold text-sm block">Multicaixa Express</span>
                        <span className="text-xs text-outline block">{paymentPhone.substring(0,3)} *** ***</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const cell = prompt('Introduza o seu telemóvel associado ao Multicaixa Express:', paymentPhone);
                        if (cell !== null) {
                          const cleaned = cell.replace(/[^0-9\s]/g, '');
                          const digits = cleaned.replace(/\D/g, '');
                          if (digits.length !== 9) {
                            showAlert('O telemóvel deve ter exatamente 9 dígitos.', 'error');
                            return;
                          }
                          setPaymentPhone(cleaned);
                          showAlert('Identificação Multicaixa Express atualizada!', 'success');
                        }
                      }}
                      className="text-primary hover:underline text-xs font-bold"
                    >
                      Alterar
                    </button>
                  </div>
                </div>

                {/* Reservas breakdown calculations */}
                <div className="bg-surface-container border border-outline-variant rounded-xl p-md md:p-lg space-y-md">
                  <h3 className="font-display font-bold text-base text-on-surface">Resumo da Reserva</h3>
                  
                  <div className="flex gap-4 p-3 bg-surface-container-lowest border border-outline-variant rounded-lg items-center">
                    <img
                      src={selectedProvider.avatarUrl}
                      alt={selectedProvider.name}
                      className="w-14 h-14 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-bold text-sm text-on-surface">{selectedService?.name || 'Serviço Regular'}</h4>
                      <p className="text-xs text-on-surface-variant font-medium">por {selectedProvider.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] font-bold">{selectedProvider.rating} ({selectedProvider.reviewCount} avaliações)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-sm pt-4 border-t border-outline-variant font-body-sm text-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Taxa Base do Serviço</span>
                      <span className="font-medium">{formatKz(getSelectedServicePrice())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Deslocação de Emergência</span>
                      <span className="font-medium">{formatKz(taxiDeslocacao)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Taxa de Plataforma</span>
                      <span className="font-medium">{formatKz(taxaPlataforma)}</span>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-outline-variant font-display text-base font-extrabold text-[#003d9b]">
                      <span>Valor Total</span>
                      <span>{formatKz(getInvoiceTotal())}</span>
                    </div>
                  </div>

                  {/* Submit checkout CTA matching the image */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#0052cc] hover:bg-primary-container text-white py-4.5 rounded-lg font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                    >
                      <span>Pagar com Multicaixa Express</span>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                    <p className="text-[10px] text-center text-outline mt-3 max-w-sm mx-auto">
                      Ao confirmar, você concorda com os nossos Termos de Serviço e Política de Privacidade.
                    </p>
                  </div>
                </div>

                {/* Blue warranty sticker on checkout bottom */}
                <div className="p-sm bg-primary/10 border border-primary/25 text-primary rounded-xl flex items-start gap-3">
                  <span className="p-1 bg-white rounded-full text-primary shrink-0">
                    <Check className="w-4 h-4 text-primary font-bold" />
                  </span>
                  <div className="space-y-0.5">
                    <h5 className="font-display font-bold text-xs">Garantia ServiLink Ativa</h5>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      Todas as reservas estão seguradas até o valor regulamentado de 8.000.000,00 Kz.
                    </p>
                  </div>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* ====================================
            5. LOGIN SCREEN (Bem-vindo de volta!)
           ==================================== */}
        {currentView === 'login' && (
          <div className="bg-surface-container-low min-h-screen py-12 flex items-center justify-center animate-fade-in text-on-surface px-md">
            
            {/* Visual split columns layout built identical to login screenshot */}
            <div className="w-full max-w-[1024px] grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-2xl shadow-xl bg-surface-container-lowest border border-outline-variant">
              
              {/* Left Side: Visual/Branding */}
              <div className="hidden lg:flex lg:col-span-7 bg-gradient-to-br from-primary to-primary-container relative items-center justify-center p-xl overflow-hidden text-white">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute -top-10 -left-10 w-[400px] h-[400px] rounded-full border-[60px] border-white/10 blur-3xl"></div>
                  <div className="absolute -bottom-20 -right-10 w-[300px] h-[300px] rounded-full border-[40px] border-white/20 blur-2xl"></div>
                </div>
                
                <div className="relative z-10 text-center space-y-6 max-w-sm">
                  <div className="flex justify-center flex-col items-center gap-1.5 grayscale brightness-200">
                    <ServiLinkLogo className="w-20 h-20" />
                    <h1 className="font-display font-black text-4xl tracking-tight text-white mt-2">ServiLink</h1>
                  </div>
                  
                  <p className="font-body-lg text-sm text-on-primary-container leading-relaxed opacity-95">
                    Liderando a transformação digital de serviços em Luanda. Conectamos profissionais talentosos a clientes que valorizam qualidade e confiança.
                  </p>

                  <div className="pt-4 grid grid-cols-2 gap-sm">
                    <div className="bg-white/10 border border-white/25 p-3 rounded-xl text-center">
                      <span className="font-display text-2xl font-black block text-white">50k+</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-on-primary-container text-white">Serviços Prestados</span>
                    </div>
                    <div className="bg-white/10 border border-white/25 p-3 rounded-xl text-center">
                      <span className="font-display text-2xl font-black block text-white">15k+</span>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-on-primary-container text-white">Profissionais</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-30">
                  <img
                    alt="Luanda Harbor Skyline"
                    src="https://images.unsplash.com/photo-1571210862729-78a52d3779a2?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover grayscale mix-blend-overlay"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Side: Login Form element */}
              <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center p-md md:p-xl bg-surface-container-lowest">
                <div className="w-full max-w-sm space-y-6">
                  
                  {/* Brand Header Mobile */}
                  <div className="flex flex-col items-center lg:items-start space-y-2 text-center lg:text-left">
                    <span className="lg:hidden font-display text-2xl font-bold text-primary tracking-tight">ServiLink</span>
                    <h2 className="font-display text-2xl font-bold text-on-surface">Bem-vindo de volta</h2>
                    <p className="text-on-surface-variant text-xs md:text-sm">Entre na sua conta para gerir os seus serviços em Luanda</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setCurrentUser({
                      name: emailInput.split('@')[0].toUpperCase(),
                      email: emailInput,
                      phone: '923 000 000',
                      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBllyswzleNGzWqzVP_JI6PPTUiBmP5zZRcGH-N-RveKcgBQXrhBfd7rVPiUMtmCyPIty3CaRMxbVs8PlFU2zDPwqm4sWFI-VFQLO9BGd2_BpnnA2zSOT3Kwyiir1jyHR54jDpp__ONduI1zzLaURxcQnuTbcj7XmifWlM-r2VIy2TDLzhR0r2Y4H-ZwaoybT-fSRA-Nb0WbewSs0ZgX8U6rvR86bQGVgHsAjL4LHC_19bP3zKrk_c'
                    });
                    showAlert(`Bem-vindo de volta ao ServiLink!`, 'success');
                    if (pendingBooking) {
                      setSelectedProvider(pendingBooking.provider);
                      setSelectedService(pendingBooking.service);
                      setPendingBooking(null);
                      setCurrentView('checkout');
                    } else {
                      setCurrentView('home');
                    }
                  }} className="space-y-sm">
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface block" htmlFor="email">E-mail ou Telemóvel</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                        <input
                          type="text"
                          id="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="exemplo@servilink.co.ao"
                          className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-on-surface block" htmlFor="password">Palavra-passe</label>
                        <button
                          type="button"
                          onClick={() => setCurrentView('forgot')}
                          className="text-xs text-primary hover:underline font-bold"
                        >
                          Esqueci-me da palavra-passe
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          placeholder="••••••••"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm outline-none transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0052cc] hover:bg-primary text-white font-bold py-3.5 rounded-lg shadow transition flex items-center justify-center gap-2 mt-4 cursor-pointer"
                    >
                      <span>Entrar</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </form>

                  {/* Social Dividers */}
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-outline-variant"></div>
                    <span className="flex-shrink mx-4 text-outline text-[11px] uppercase tracking-wider font-bold">Ou continuar com</span>
                    <div className="flex-grow border-t border-outline-variant"></div>
                  </div>

                  {/* Social Buttons (from mockup images) */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => showAlert('Autenticando via infraestrutura Google...', 'info')}
                      className="flex items-center justify-center gap-2 py-3 px-2 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low rounded-lg transition text-xs font-bold text-on-surface"
                    >
                      <span className="font-extrabold text-blue-600">G</span>
                      <span>Google</span>
                    </button>
                    <button
                      onClick={() => showAlert('Autenticando via Facebook...', 'info')}
                      className="flex items-center justify-center gap-2 py-3 px-2 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low rounded-lg transition text-xs font-bold text-on-surface"
                    >
                      <span className="font-extrabold text-blue-800">F</span>
                      <span>Facebook</span>
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-on-surface-variant font-medium">
                      Ainda não tem conta?{' '}
                      <button onClick={() => setCurrentView('register')} className="text-primary font-bold hover:underline">
                        Registe-se
                      </button>
                    </p>
                  </div>

                  {/* Footer small print */}
                  <footer className="pt-6 border-t border-surface-container flex flex-col items-center gap-1">
                    <div className="flex gap-4 text-xs text-outline font-bold">
                      <button onClick={() => showAlert('Documentação de termos', 'info')} className="hover:text-primary">Termos</button>
                      <span>•</span>
                      <button onClick={() => showAlert('Segurança e privacidade', 'info')} className="hover:text-primary">Privacidade</button>
                      <span>•</span>
                      <button onClick={() => showAlert('Suporte Angola', 'info')} className="hover:text-primary">Suporte</button>
                    </div>
                    <p className="text-[10px] text-outline-variant mt-2 font-semibold">© 2024 ServiLink Luanda. 100% Angolano.</p>
                  </footer>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* ====================================
            6. REGISTER ACCOUNT SCREEN (Crie a sua conta)
           ==================================== */}
        {currentView === 'register' && (() => {
          const isNameValid = signUpName.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(signUpName);
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const isEmailValid = emailRegex.test(signUpEmail);
          const digitsOnly = signUpPhone.replace(/\D/g, '');
          const isPhoneValid = digitsOnly.length === 9;
          const isPasswordValid = signUpPassword.length >= 8;
          const isPasswordMatch = signUpPassword.length > 0 && signUpPassword === signUpPasswordConfirm;
          const canSubmit = isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isPasswordMatch;

          return (
            <div className="bg-surface-container-low min-h-screen py-8 md:py-16 flex items-center justify-center animate-fade-in text-on-surface px-4 md:px-8">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
                
                {/* LEFT COLUMN: BRAND SPOTLIGHT & SOCIAL PROOF (Visible on Desktop) */}
                <div className="hidden lg:flex lg:col-span-5 bg-slate-950 p-8 flex-col justify-between text-white relative overflow-hidden">
                  {/* Visual Background Elements */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950 opacity-90 pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative space-y-8 z-10">
                    {/* Header Brand */}
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/20 p-2 rounded-xl border border-primary/30">
                        <ServiLinkLogo className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <span className="font-display font-black text-xl tracking-tight block text-white">ServiLink</span>
                        <span className="text-[10px] text-outline uppercase tracking-widest font-extrabold">Luanda Connect</span>
                      </div>
                    </div>

                    {/* Value Prop Shifts Based on Chosen Role */}
                    <div className="space-y-6 pt-4">
                      {signUpRole === 'Cliente' ? (
                        <div className="space-y-4 animate-fade-in">
                          <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            Perfil do Cliente (Contratar)
                          </span>
                          <h2 className="font-display text-2xl font-black tracking-tight leading-tight">
                            Contrate técnicos e profissionais locais em minutos.
                          </h2>
                          <p className="text-xs text-outline leading-relaxed">
                            Aceda a uma rede testada de profissionais independentes em Luanda. Sem taxas ocultas, faça pagamentos diretos com total tranquilidade.
                          </p>
                          <ul className="space-y-2.5 pt-2">
                            <li className="flex items-start gap-2 text-xs">
                              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>Profissionais com documentos verificados</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs">
                              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>Preços fechados sem comissões intermediárias</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs">
                              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>Cobertura em Talatona, Kilamba, Viana e mais</span>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div className="space-y-4 animate-fade-in bg-primary/5 p-4 rounded-2xl border border-primary/10">
                          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                            Perfil do Prestador (Trabalhar)
                          </span>
                          <h2 className="font-display text-2xl font-black tracking-tight leading-tight text-amber-400">
                            Multiplique as suas vendas e ganhe novos clientes.
                          </h2>
                          <p className="text-xs text-outline leading-relaxed">
                            Crie o seu portfólio profissional digital gratuito, receba solicitações de trabalho diretamente de quem procura e aumente as suas receitas mensais em Angola.
                          </p>
                          <ul className="space-y-2.5 pt-2">
                            <li className="flex items-start gap-2 text-xs text-amber-200">
                              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <span>Receba contactos ilimitados de clientes reais</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs text-amber-200">
                              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <span>Selo Oficial de Profissional Verificado</span>
                            </li>
                            <li className="flex items-start gap-2 text-xs text-amber-200">
                              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <span>Defina os seus próprios preços e horários</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Testimonial & Security Badge at Bottom */}
                  <div className="space-y-6 relative z-10 pt-4 border-t border-white/10">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2.5">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-[11px] italic text-outline leading-relaxed">
                        {signUpRole === 'Cliente' 
                          ? '"Encontrei um picheleiro em menos de 10 minutos para reparar uma fuga de água na Maianga. Tudo resolvido e sem complicações!"'
                          : '"O ServiLink mudou a minha vida. Consigo fechar de 3 a 5 novos orçamentos de pintura por semana na zona do Kilamba."'}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center font-bold text-[10px] text-primary">
                          {signUpRole === 'Cliente' ? 'SA' : 'MD'}
                        </div>
                        <span className="text-[10px] font-bold text-white">
                          {signUpRole === 'Cliente' ? 'Sofia Antunes (Moradora)' : 'Mateus Diogo (Pintor)'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-outline pt-1">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-emerald-500" />
                        Conexão Segura SSL
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Servidor Ativo
                      </span>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: REFINED SIGN UP FORM (All Devices) */}
                <div className="col-span-1 lg:col-span-7 p-6 md:p-10 flex flex-col justify-between space-y-6 bg-surface-container-lowest">
                  
                  {/* Top back & branding link */}
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setCurrentView('home')} 
                      className="text-xs font-bold text-outline-variant hover:text-primary flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar à Página Inicial
                    </button>
                    <div className="flex items-center gap-1 lg:hidden">
                      <ServiLinkLogo className="w-5 h-5" />
                      <span className="font-display font-black text-sm tracking-tight">ServiLink</span>
                    </div>
                  </div>

                  {/* Form Container */}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h1 className="font-display font-black text-2xl tracking-tight text-on-surface">Comece hoje mesmo</h1>
                      <p className="text-on-surface-variant text-xs">
                        Insira os seus dados de contacto para criar o seu perfil no ServiLink Luanda.
                      </p>
                    </div>

                    {/* INTERACTIVE ACCOUNT ROLE TABS */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant">
                        Como deseja usar o ServiLink?
                      </label>
                      <div className="grid grid-cols-2 p-1.5 bg-surface-container-low border border-outline-variant rounded-xl gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSignUpRole('Cliente');
                            showAlert('Mudou para o perfil de Cliente. Poderá contratar prestadores.', 'info');
                          }}
                          className={`py-3 rounded-lg flex items-center justify-center gap-2 transition duration-200 cursor-pointer ${
                            signUpRole === 'Cliente'
                              ? 'bg-[#0052cc] text-white font-extrabold shadow-md'
                              : 'text-on-surface-variant bg-transparent hover:text-on-surface font-medium'
                          }`}
                        >
                          <User className="w-4 h-4" />
                          <span className="text-xs">Quero Contratar</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSignUpRole('Profissional');
                            showAlert('Ativou Perfil Profissional! Preencha a especialidade abaixo.', 'info');
                          }}
                          className={`py-3 rounded-lg flex items-center justify-center gap-2 transition duration-200 cursor-pointer ${
                            signUpRole === 'Profissional'
                              ? 'bg-[#0052cc] text-white font-extrabold shadow-md'
                              : 'text-on-surface-variant bg-transparent hover:text-on-surface font-medium'
                          }`}
                        >
                          <Briefcase className="w-4 h-4" />
                          <span className="text-xs">Quero Oferecer Serviços</span>
                        </button>
                      </div>
                    </div>

                    {/* SUBMIT FORM WITH COMPREHENSIVE VALIDATION */}
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!isNameValid) {
                        showAlert('O nome completo deve conter exclusivamente letras e espaços (mínimo 2 letras).', 'error');
                        return;
                      }
                      if (!isEmailValid) {
                        showAlert('Por favor, introduza um endereço de e-mail com formato válido.', 'error');
                        return;
                      }
                      if (!isPhoneValid) {
                        showAlert('O telemóvel deve conter exatamente 9 dígitos angolanos (ex: 9xxxxxxxx).', 'error');
                        return;
                      }
                      if (!isPasswordValid) {
                        showAlert('A palavra-passe deve conter pelo menos 8 caracteres.', 'error');
                        return;
                      }
                      if (!isPasswordMatch) {
                        showAlert('As palavras-passe introduzidas não coincidem.', 'error');
                        return;
                      }

                      setCurrentUser({
                        name: signUpName.trim().toUpperCase() || 'CLIENTE',
                        email: signUpEmail.trim(),
                        phone: signUpPhone.trim(),
                        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBllyswzleNGzWqzVP_JI6PPTUiBmP5zZRcGH-N-RveKcgBQXrhBfd7rVPiUMtmCyPIty3CaRMxbVs8PlFU2zDPwqm4sWFI-VFQLO9BGd2_BpnnA2zSOT3Kwyiir1jyHR54jDpp__ONduI1zzLaURxcQnuTbcj7XmifWlM-r2VIy2TDLzhR0r2Y4H-ZwaoybT-fSRA-Nb0WbewSs0ZgX8U6rvR86bQGVgHsAjL4LHC_19bP3zKrk_c',
                        role: signUpRole,
                        experience: signUpRole === 'Profissional' ? signUpExperience : 'Nenhuma (Apenas busca contratar)',
                        speciality: signUpRole === 'Profissional' ? signUpSpeciality : 'Consumidor / Cliente'
                      });
                      showAlert('Conta criada com sucesso! Seus dados profissionais foram simulados e guardados.', 'success');
                      if (pendingBooking) {
                        setSelectedProvider(pendingBooking.provider);
                        setSelectedService(pendingBooking.service);
                        setPendingBooking(null);
                        setCurrentView('checkout');
                      } else {
                        setCurrentView('home');
                      }
                    }} className="space-y-4">
                      
                      {/* Name input */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-on-surface" htmlFor="fullName">Nome Completo</label>
                          {signUpName.length > 0 && (
                            <span className={`text-[10px] font-bold ${isNameValid ? 'text-emerald-600' : 'text-red-500'}`}>
                              {isNameValid ? '✓ Apenas letras' : '𐄂 Insira apenas letras'}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                          <input
                            type="text"
                            id="fullName"
                            placeholder="Nome Completo (ex: Marisa Manuel)"
                            required
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''))}
                            className={`w-full pl-10 pr-10 py-2.5 bg-surface-container-low border rounded-lg text-sm outline-none transition ${
                              signUpName.length === 0 
                                ? 'border-outline-variant focus:border-primary' 
                                : isNameValid 
                                  ? 'border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-500/5 focus:border-emerald-500' 
                                  : 'border-amber-500 focus:border-amber-500'
                            }`}
                          />
                          {signUpName.length > 0 && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                              {isNameValid ? (
                                <Check className="w-4 h-4 text-emerald-600 font-extrabold" />
                              ) : (
                                <ShieldAlert className="w-4 h-4 text-amber-500" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* E-mail Input */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-on-surface" htmlFor="signUpEmail">E-mail</label>
                          {signUpEmail.length > 0 && (
                            <span className={`text-[10px] font-bold ${isEmailValid ? 'text-emerald-600' : 'text-amber-500'}`}>
                              {isEmailValid ? '✓ E-mail válido' : '𐄂 Insira um e-mail válido'}
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                          <input
                            type="email"
                            id="signUpEmail"
                            placeholder="exemplo@servilink.co.ao"
                            required
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            className={`w-full pl-10 pr-10 py-2.5 bg-surface-container-low border rounded-lg text-sm outline-none transition ${
                              signUpEmail.length === 0 
                                ? 'border-outline-variant focus:border-primary' 
                                : isEmailValid 
                                  ? 'border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-500/5 focus:border-emerald-500' 
                                  : 'border-amber-500 focus:border-amber-500'
                            }`}
                          />
                          {signUpEmail.length > 0 && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                              {isEmailValid ? (
                                <Check className="w-4 h-4 text-emerald-600 font-extrabold" />
                              ) : (
                                <ShieldAlert className="w-4 h-4 text-amber-500" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Telemóvel Angolano Input */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-on-surface">Telemóvel de Angola</label>
                          {signUpPhone.length > 0 && (
                            <span className={`text-[10px] font-bold ${isPhoneValid ? 'text-emerald-600' : 'text-amber-500'}`}>
                              {isPhoneValid ? '✓ Telemóvel correto (9 dígitos)' : `Restam ${9 - signUpPhone.length} dígitos`}
                            </span>
                          )}
                        </div>
                        <div className={`flex border rounded-lg overflow-hidden transition focus-within:ring-1 ${
                          signUpPhone.length === 0 
                            ? 'border-outline-variant focus-within:border-primary' 
                            : isPhoneValid 
                              ? 'border-emerald-500 bg-emerald-500/5 focus-within:ring-emerald-500/20' 
                              : 'border-amber-500'
                        }`}>
                          <div className="flex items-center gap-1.5 px-3 bg-surface-container-high border-r border-outline-variant shrink-0">
                            <span className="text-xs font-extrabold text-[#ba1a1a]">🇦🇴</span>
                            <span className="text-xs font-bold text-on-surface-variant text-[11px]">+244</span>
                          </div>
                          <input
                            type="tel"
                            placeholder="9xx xxx xxx"
                            required
                            value={signUpPhone}
                            onChange={(e) => {
                              const digits = e.target.value.replace(/\D/g, '').substring(0, 9);
                              setSignUpPhone(digits);
                            }}
                            className="w-full px-3 py-2.5 bg-transparent border-none text-sm outline-none font-medium"
                          />
                          {isPhoneValid && (
                            <div className="flex items-center pr-3">
                              <Check className="w-4 h-4 text-emerald-600 font-extrabold" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Professional details: conditional slide-in experience blocks */}
                      {signUpRole === 'Profissional' && (
                        <div className="space-y-3 bg-primary/5 border border-primary/25 rounded-2xl p-4 animate-fade-in space-y-md">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#0052cc]" />
                            <span className="text-xs font-extrabold text-[#0052cc] uppercase tracking-wider block">Dados da Sua Experiência Profissional</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-extrabold text-on-surface-variant block uppercase">Sua Especialidade</label>
                              <select
                                value={signUpSpeciality}
                                onChange={(e) => setSignUpSpeciality(e.target.value)}
                                className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-xs outline-none text-on-surface font-semibold"
                              >
                                <option value="Canalização & Pichelaria">Canalização & Pichelaria</option>
                                <option value="Instalações Elétricas">Instalações Elétricas</option>
                                <option value="Pintura & Decor">Pintura e Acabamentos</option>
                                <option value="Ar Condicionado & Refrigeração">Ar Condicionado & Refrigeração</option>
                                <option value="Pedreiro & Ladrilhador">Pedreiro & Ladrilhador</option>
                                <option value="Limpeza Residencial/Industrial">Limpeza de Casas e Escritórios</option>
                                <option value="Mecânica de Viaturas">Mecânico Auto</option>
                                <option value="Serralharia Geral">Serralheiro de Ferro/Alumínio</option>
                                <option value="Outros Serviços Gerais">Outro Serviço Útil</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-extrabold text-on-surface-variant block uppercase">Tempo de Experiência</label>
                              <select
                                value={signUpExperience}
                                onChange={(e) => setSignUpExperience(e.target.value)}
                                className="w-full px-3 py-2 bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-xs outline-none text-on-surface font-semibold"
                              >
                                <option value="Iniciante (Menos de 1 ano)">Iniciante (Menos de 1 ano)</option>
                                <option value="Júnior (1 a 2 anos)">Júnior (1 a 2 anos)</option>
                                <option value="Pleno (3 a 5 anos)">Pleno (3 a 5 anos)</option>
                                <option value="Sénior (Mais de 5 anos)">Sénior (Mais de 5 anos de experiência)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Password inputs in clean horizontal grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-on-surface" htmlFor="signUpPass">Palavra-passe</label>
                            {signUpPassword.length > 0 && (
                              <span className={`text-[10px] font-bold ${isPasswordValid ? 'text-emerald-600' : 'text-amber-500'}`}>
                                {isPasswordValid ? '✓ Forte o suficiente' : 'Mín. 8 chars'}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                            <input
                              type={showPassword ? "text" : "password"}
                              id="signUpPass"
                              placeholder="Mínimo 8 caracteres"
                              required
                              value={signUpPassword}
                              onChange={(e) => setSignUpPassword(e.target.value)}
                              className={`w-full pl-10 pr-10 py-2.5 bg-surface-container-low border rounded-lg text-sm outline-none transition ${
                                signUpPassword.length === 0
                                  ? 'border-outline-variant'
                                  : isPasswordValid 
                                    ? 'border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-500/5' 
                                    : 'border-amber-500'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-on-surface" htmlFor="signUpPassConfirm">Confirmar Senha</label>
                            {signUpPasswordConfirm.length > 0 && (
                              <span className={`text-[10px] font-bold ${isPasswordMatch ? 'text-emerald-600' : 'text-amber-500'}`}>
                                {isPasswordMatch ? '✓ Coincidem' : 'Diferentes'}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                            <input
                              type={showPassword ? "text" : "password"}
                              id="signUpPassConfirm"
                              placeholder="Repita a palavra-passe"
                              required
                              value={signUpPasswordConfirm}
                              onChange={(e) => setSignUpPasswordConfirm(e.target.value)}
                              className={`w-full pl-10 pr-4 py-2.5 bg-surface-container-low border rounded-lg text-sm outline-none transition ${
                                signUpPasswordConfirm.length === 0
                                  ? 'border-outline-variant'
                                  : isPasswordMatch 
                                    ? 'border-emerald-500 ring-1 ring-emerald-500/20 bg-emerald-500/5' 
                                    : 'border-amber-500'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Terms and conditions */}
                      <div className="flex items-start gap-2.5 pt-1">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          defaultChecked
                          className="w-4 h-4 mt-0.5 rounded border-outline-variant text-[#0052cc] focus:ring-primary/20 accent-[#0052cc]"
                        />
                        <label className="text-[11px] text-on-surface-variant font-medium leading-relaxed" htmlFor="terms">
                          Aceito integralmente os <button type="button" onClick={() => showAlert('Termos de Serviço lidos e regulamentados em Angola', 'info')} className="text-[#0052cc] hover:underline font-bold">Termos de Serviço</button> e a <button type="button" onClick={() => showAlert('Suas informações estão cifradas em conformidade com as políticas de privacidade locais', 'info')} className="text-[#0052cc] hover:underline font-bold">Política de Privacidade</button> da plataforma.
                        </label>
                      </div>

                      {/* Submit action */}
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className={`w-full text-white font-bold py-3 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-4 cursor-pointer ${
                          canSubmit
                            ? 'bg-[#0052cc] hover:bg-[#003d9b]'
                            : 'bg-outline-variant cursor-not-allowed opacity-80'
                        }`}
                      >
                        <span>Registar Agora</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>

                    </form>

                    {/* Social networks & Alternative Signup options */}
                    <div className="space-y-4 pt-2">
                      <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-outline-variant"></div>
                        <span className="flex-shrink mx-4 text-outline text-[10px] uppercase tracking-wider font-extrabold text-outline-variant">Ou registe-se com</span>
                        <div className="flex-grow border-t border-outline-variant"></div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSignUpName('MARIA COSTA');
                            setSignUpEmail('maria.costa@gmail.com');
                            setSignUpPhone('924111222');
                            setSignUpPassword('MariaExemplo123');
                            setSignUpPasswordConfirm('MariaExemplo123');
                            showAlert('Preenchimento automático via Google efetuado!', 'info');
                          }}
                          className="flex items-center justify-center gap-2 py-2.5 px-3 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low rounded-xl transition text-xs font-bold text-on-surface cursor-pointer"
                        >
                          <span className="font-black text-rose-500 text-sm">G</span>
                          <span>Google</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSignUpName('MAURÍCIO NETO');
                            setSignUpEmail('mauricio.neto@sapo.ao');
                            setSignUpPhone('931444555');
                            setSignUpPassword('MauricioExemplo123');
                            setSignUpPasswordConfirm('MauricioExemplo123');
                            showAlert('Preenchimento automático via Facebook efetuado!', 'info');
                          }}
                          className="flex items-center justify-center gap-2 py-2.5 px-3 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low rounded-xl transition text-xs font-bold text-on-surface cursor-pointer"
                        >
                          <span className="font-black text-blue-700 text-sm">f</span>
                          <span>Facebook</span>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Switch to login option */}
                  <div className="pt-2 border-t border-outline-variant/60 flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant font-medium">Já é membro do ServiLink?</span>
                    <button 
                      onClick={() => setCurrentView('login')} 
                      className="text-[#0052cc] font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Iniciar Sessão →
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })()}

        {/* ====================================
            7. FORGOT PASSWORD SCREEN (Esqueceu-se da palavra-passe?)
           ==================================== */}
        {currentView === 'forgot' && (
          <div className="bg-surface-container-low min-h-screen py-16 flex items-center justify-center animate-fade-in text-on-surface px-md">
            
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-md md:p-lg shadow-xl w-full max-w-[440px] space-y-md">
              
              <div className="flex justify-center flex-col items-center gap-1.5">
                <ServiLinkLogo className="w-14 h-14" />
                <h2 className="font-display font-black text-xl text-[#0052cc] tracking-tight mt-1">ServiLink</h2>
              </div>

              <div className="space-y-sm">
                <h1 className="font-display font-medium text-xl text-on-surface">
                  Esqueceu-se da palavra-passe?
                </h1>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  Introduza o seu e-mail ou número de telemóvel para receber as instruções de recuperação de palavra-passe presencial.
                </p>
              </div>

              {/* Simulated form submission */}
              {!recoverySuccess ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!recoveryEmail) return;
                  setRecoverySuccess(true);
                  showAlert('Instruções enviadas com sucesso no simulador!', 'success');
                }} className="space-y-sm">
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface block" htmlFor="recoveryContact">E-mail ou Telemóvel</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                      <input
                        type="text"
                        id="recoveryContact"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        placeholder="exemplo@servilink.co.ao ou 923 000 000"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm outline-none transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0052cc] hover:bg-primary text-white font-bold py-3 px-4 rounded-lg shadow transition flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    <span>Enviar Instruções</span>
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </form>
              ) : (
                <div className="space-y-md animate-fade-in">
                  <div className="p-sm bg-teal-50 border border-teal-200 text-teal-800 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-xs block text-teal-900">Sucesso! Código de Envio Ativado</span>
                      <p className="text-[11px] leading-relaxed">
                        As instruções foram enviadas com sucesso para os dados de contacto: <strong>{recoveryEmail}</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => { setRecoverySuccess(false); setRecoveryEmail(''); }}
                    className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold py-2.5 rounded-lg text-xs transition"
                  >
                    Tentar Novamente ou Utilizar Outro Contacto
                  </button>
                </div>
              )}

              {/* Back links */}
              <div className="pt-4 border-t border-surface-container-high text-center">
                <button
                  type="button"
                  onClick={() => setCurrentView('login')}
                  className="text-xs text-primary hover:underline font-bold inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar ao Iniciar Sessão</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ====================================
            8. BOOKING SUCCESS VIEW
           ==================================== */}
        {currentView === 'success' && (
          <div className="bg-surface-container-low py-16 px-md animate-fade-in text-on-surface text-center">
            <div className="max-w-[480px] mx-auto bg-surface-container-lowest border border-outline-variant rounded-2xl p-md md:p-lg shadow-xl space-y-md">
              
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-10 h-10 text-emerald-600 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h1 className="font-display font-black text-2xl text-on-surface">Agendamento Solicitado!</h1>
                <p className="text-on-surface-variant text-xs leading-relaxed max-w-sm mx-auto">
                  A sua solicitação para {selectedService?.name || 'Visita Técnica'} com <strong>{selectedProvider.name}</strong> foi registada com sucesso no sistema ServiLink Luanda.
                </p>
              </div>

              {/* Booking preview details */}
              <div className="p-md bg-surface-container-low rounded-xl border border-outline-variant text-left text-xs font-body-sm space-y-sm">
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="text-outline uppercase tracking-wider font-semibold">TÉCNICO</span>
                  <span className="font-bold text-on-surface">{selectedProvider.name}</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="text-outline uppercase tracking-wider font-semibold">HORÁRIO</span>
                  <span className="font-bold text-[#003d9b]">{bookingDate} de Outubro de 2024, às {bookingTime}</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="text-outline uppercase tracking-wider font-semibold">ZONA</span>
                  <span className="font-bold text-on-surface">{bookingMunicipio}, Luanda</span>
                </div>
                <div className="flex justify-between border-b border-surface-container pb-2">
                  <span className="text-outline uppercase tracking-wider font-semibold">MÉTODO DE PAGAMENTO</span>
                  <span className="font-bold text-on-surface">{paymentMethod}</span>
                </div>
                <div className="flex justify-between font-display text-sm font-bold text-primary pt-2">
                  <span>VALOR CONFIRMADO</span>
                  <span>{formatKz(getInvoiceTotal())}</span>
                </div>
              </div>

              <div className="p-sm bg-[#825500]/5 border border-[#ffddb3] rounded-lg text-[#825500] text-center text-[11px] leading-relaxed">
                🔔 O profissional enviará um SMS/WhatsApp de confirmação do horário em instantes. Aguarde a notificação.
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('bookings')}
                  className="w-full bg-[#0052cc] hover:bg-primary text-white py-3 rounded-lg font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  Ver Minhas Reservas
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('home')}
                  className="w-full bg-surface-container text-on-surface hover:bg-surface-container-high py-3 rounded-lg font-bold text-xs transition-colors cursor-pointer"
                >
                  Voltar para Página Inicial
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ====================================
            9. RESERVATIONS LIST SCREEN
           ==================================== */}
        {currentView === 'bookings' && (
          <div className="bg-surface-container-low min-h-screen py-8 animate-fade-in text-on-surface">
            <div className="max-w-[720px] mx-auto px-md md:px-lg space-y-md">
              
              <div className="space-y-1">
                <h1 className="font-display font-black text-2xl md:text-3xl tracking-tight text-on-surface">
                  Minhas Reservas
                </h1>
                <p className="text-on-surface-variant text-sm">
                  Histórico de agendamentos e solicitações efetuadas na rede ServiLink.
                </p>
              </div>

              {bookingsList.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {bookingsList.map((book) => {
                    return (
                      <div key={book.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm space-y-md">
                        <div className="flex justify-between items-start border-b border-surface-container pb-md">
                          <div className="flex gap-3 items-center">
                            <img
                              src={book.avatar}
                              alt={book.providerName}
                              className="w-12 h-12 rounded-lg object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="text-[10px] text-outline block font-bold tracking-wider uppercase">{book.providerTitle}</span>
                              <h3 className="font-display font-bold text-sm text-on-surface">{book.providerName}</h3>
                              <p className="text-xs text-primary font-semibold">{book.serviceName}</p>
                            </div>
                          </div>
                          <span className={`border rounded text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase ${
                            book.status === 'Concluído' 
                              ? 'bg-amber-50 text-amber-800 border-amber-200' 
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}>
                            {book.status}
                          </span>
                        </div>

                        <div className="space-y-3 font-body-sm text-xs">
                          <div className="flex gap-md">
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-outline uppercase block font-medium">CÓDIGO</span>
                              <span className="font-bold">{book.id}</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-outline uppercase block font-medium">DATA / HORA PREVISTA</span>
                              <span className="font-bold text-[#003d9b]">{book.date} - {book.time}</span>
                            </div>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[10px] text-outline uppercase block font-medium">ENDEREÇO</span>
                            <p className="font-medium text-on-surface-variant leading-relaxed">{book.address}</p>
                          </div>
                        </div>

                        {/* Submitted Rating View */}
                        {book.rating && (
                          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-md space-y-2 mt-2">
                            <div className="flex items-center gap-1.5">
                              <div className="flex text-amber-400">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star
                                    key={idx}
                                    className={`w-4 h-4 ${idx < book.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-amber-900 font-bold text-xs uppercase tracking-wider">Serviço Avaliado ({book.rating}/5)</span>
                            </div>
                            <p className="text-on-surface-variant text-xs italic leading-relaxed">
                              "{book.reviewText}"
                            </p>
                          </div>
                        )}

                        {/* Interactive Rating Form */}
                        {ratingBookingId === book.id && (
                          <div className="bg-surface-container border border-outline-variant rounded-xl p-md space-y-3 mt-3 animate-fade-in text-on-surface">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-xs text-on-surface">Avaliar Serviço de {book.providerName}</span>
                              <p className="text-[11px] text-on-surface-variant">Selecione uma classificação de 1 a 5 estrelas:</p>
                            </div>

                            <div className="flex items-center gap-1.5 py-1">
                              {Array.from({ length: 5 }).map((_, idx) => {
                                const starValue = idx + 1;
                                return (
                                  <button
                                    key={starValue}
                                    type="button"
                                    onClick={() => setRatingStars(starValue)}
                                    className="p-1 rounded-sm focus:outline-none transition hover:scale-115 active:scale-90"
                                  >
                                    <Star
                                      className={`w-6 h-6 transition-colors duration-150 ${
                                        starValue <= ratingStars
                                          ? 'fill-amber-400 text-amber-400'
                                          : 'text-[#ccc]'
                                      }`}
                                    />
                                  </button>
                                );
                              })}
                              <span className="text-xs font-black block text-amber-800 ml-2 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 uppercase tracking-wider text-[9px]">
                                {ratingStars === 1 && 'Péssimo'}
                                {ratingStars === 2 && 'Ruim'}
                                {ratingStars === 3 && 'Regular'}
                                {ratingStars === 4 && 'Muito Bom'}
                                {ratingStars === 5 && 'Excelente!'}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <label htmlFor={`ratingComment-${book.id}`} className="block text-[10px] font-bold text-outline uppercase tracking-wider">Comentário / Testemunho</label>
                              <textarea
                                id={`ratingComment-${book.id}`}
                                rows={3}
                                value={ratingComment}
                                onChange={(e) => setRatingComment(e.target.value)}
                                placeholder="Descreva os pontos fortes, pontualidade e qualidade do serviço em Luanda..."
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs font-body-sm outline-none focus:border-primary transition-all resize-none text-on-surface"
                              />
                            </div>

                            <div className="flex gap-2 justify-end pt-1">
                              <button
                                type="button"
                                onClick={() => setRatingBookingId(null)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold font-display hover:bg-surface-container-high text-on-surface transition"
                              >
                                Cancelar
                              </button>
                              <button
                                type="button"
                                onClick={() => submitBookingRating(book.id)}
                                className="bg-[#feaa00] text-[#291800] hover:bg-amber-500 font-bold px-4 py-2 rounded-lg text-xs font-display flex items-center gap-1.5 transition active:scale-[0.98] shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Submeter Avaliação</span>
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="pt-md border-t border-surface-container flex justify-between items-center text-xs">
                          <div>
                            <span className="text-outline uppercase tracking-wider block font-bold text-[10px]">VALOR TOTAL CALCULADO</span>
                            <span className="text-base font-extrabold text-[#003d9b]">{formatKz(book.total)}</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => showAlert('Recibo em formato PDF faturado com sucesso em Luanda!', 'success')}
                              className="bg-transparent hover:bg-surface-container-high border border-outline-variant px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5 text-outline" />
                              <span>Recibo</span>
                            </button>

                            {!book.rating && ratingBookingId !== book.id && (
                              <button
                                onClick={() => {
                                  setRatingBookingId(book.id);
                                  setRatingStars(5);
                                  setRatingComment('');
                                }}
                                className="bg-primary text-white hover:bg-primary-container px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1"
                              >
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <span>Avaliar Serviço</span>
                              </button>
                            )}

                            {!book.rating && (
                              <button
                                onClick={() => {
                                  setBookingsList(bookingsList.filter(b => b.id !== book.id));
                                  showAlert(`Reserva ${book.id} cancelada com sucesso.`, 'info');
                                }}
                                className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-xs font-bold transition"
                              >
                                Cancelar
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg text-center text-on-surface space-y-md">
                  <div className="w-16 h-16 bg-surface-container-low text-outline rounded-full flex items-center justify-center mx-auto opacity-70">
                    <CalendarIcon className="w-8 h-8 text-outline" />
                  </div>
                  <div className="space-y-2 max-w-sm mx-auto text-center">
                    <h3 className="font-display font-bold text-lg">Sem agendamentos confirmados</h3>
                    <p className="text-on-surface-variant text-sm">
                      Ainda não efetuou nenhuma reserva no sistema. Visite os perfis dos canalizadores e clique em "Agendar Visita" para agendar agora.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSelectedCategory('canalizacao'); setCurrentView('listing'); }}
                    className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-lg text-xs font-bold transition shadow-sm inline-flex items-center gap-2"
                  >
                    <span>Encontrar Canalizadores Ativos</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ====================================
            10. USER PROFILE SCREEN
           ==================================== */}
        {currentView === 'user-profile' && currentUser && (
          <div className="bg-surface-container-low min-h-screen py-8 pb-24 animate-fade-in text-on-surface">
            <div className="max-w-[720px] mx-auto px-md md:px-lg space-y-md">
              
              {/* Profile Back Link */}
              <button 
                onClick={() => { setCurrentView('home'); }}
                className="flex items-center gap-1.5 text-primary hover:text-primary-container font-bold text-sm tracking-tight hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para Página Inicial</span>
              </button>

              {/* Profile Header Section with editable details */}
              <section className="bg-gradient-to-br from-[#003d9b] to-[#0052cc] text-white rounded-xl overflow-hidden shadow-md p-6 relative">
                {/* Background decorative circles */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border-[40px] border-white/20 blur-sm"></div>
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border-[30px] border-white/20 blur-sm"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center md:flex-row md:items-center md:gap-6 text-center md:text-left">
                  <div 
                    onClick={() => setActiveProfileModal('edit-profile')}
                    className="relative group cursor-pointer hover:opacity-95 transition-transform active:scale-95"
                  >
                    <img 
                      alt={currentUser.name} 
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg object-cover"
                      src={currentUser.avatar}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 right-0 bg-amber-500 text-on-secondary-container p-1.5 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                      <Edit2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 font-display">
                    <h2 className="text-2xl font-bold tracking-tight">{currentUser.name}</h2>
                    <div className="flex items-center justify-center md:justify-start gap-1 text-on-primary-container opacity-90 mt-1.5 text-sm">
                      <MapPin className="w-4 h-4 text-amber-400 stroke-[2.5]" />
                      <span className="font-semibold">Luanda, Angola (Talatona)</span>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-xs opacity-85">
                      <span className="bg-white/10 px-2.5 py-1 rounded-full">{currentUser.email}</span>
                      <span className="bg-white/10 px-2.5 py-1 rounded-full">{currentUser.phone}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Account Overview (Bento Style) */}
              <section className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setCurrentView('bookings')}
                  className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant flex flex-col items-center justify-center hover:bg-surface-container transition-all cursor-pointer group hover:shadow-md"
                >
                  <span className="text-primary font-black text-3xl md:text-4xl group-hover:scale-105 transition-transform">
                    {String(bookingsList.length).padStart(2, '0')}
                  </span>
                  <span className="font-label-md text-xs font-semibold text-on-surface-variant text-center mt-1">
                    Agendamentos Ativos
                  </span>
                </button>
                <button 
                  onClick={() => setActiveProfileModal('history')}
                  className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant flex flex-col items-center justify-center hover:bg-surface-container transition-all cursor-pointer group hover:shadow-md"
                >
                  <span className="text-secondary font-black text-3xl md:text-4xl group-hover:scale-105 transition-transform">
                    12
                  </span>
                  <span className="font-label-md text-xs font-semibold text-on-surface-variant text-center mt-1">
                    Serviços Concluídos
                  </span>
                </button>
              </section>

              {/* Experiência e Perfil do Usuário Card */}
              <section className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-outline-variant space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-bold text-sm text-[#003d9b]">Dados de Perfil & Experiência</h3>
                  </div>
                  <button 
                    onClick={() => setActiveProfileModal('edit-profile')}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    Editar Informações
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/60">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold block mb-1">Perfil do Utilizador</span>
                    <span className="text-xs font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block">
                      {currentUser.role || 'Cliente'}
                    </span>
                  </div>
                  <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/60">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold block mb-1">Especialidade Principal</span>
                    <span className="text-xs font-bold text-on-surface">
                      {currentUser.speciality || 'Consumidor / Cliente'}
                    </span>
                  </div>
                  <div className="bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/60">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold block mb-1">Tempo de Experiência</span>
                    <span className="text-xs font-semibold text-[#0052cc]">
                      {currentUser.experience || 'Nenhuma (Apenas busca contratar)'}
                    </span>
                  </div>
                </div>
              </section>

              {/* Menu List Section - Gestão de Conta */}
              <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
                <div className="p-4 border-b border-outline-variant bg-surface-container-low">
                  <h3 className="font-label-md text-xs font-extrabold text-[#003d9b] uppercase tracking-widest">
                    Gestão de Conta
                  </h3>
                </div>
                <nav className="flex flex-col divide-y divide-outline-variant/30">
                  <button 
                    onClick={() => { setCurrentView('bookings'); }}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-body-md text-sm font-semibold">Meus Agendamentos</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline" />
                  </button>

                  <button 
                    onClick={() => setActiveProfileModal('history')}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                        <History className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-body-md text-sm font-semibold">Histórico de Serviços</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline" />
                  </button>

                  <button 
                    onClick={() => setActiveProfileModal('payment')}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body-md text-sm font-semibold">Métodos de Pagamento</span>
                        <span className="text-[11px] text-amber-600 font-bold">{paymentMethod} ({paymentPhone})</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline" />
                  </button>

                  <button 
                    onClick={() => setActiveProfileModal('addresses')}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-body-md text-sm font-semibold">Endereços Guardados</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline" />
                  </button>

                  <button 
                    onClick={() => setActiveProfileModal('notifications')}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center relative">
                        <Bell className="w-4 h-4 text-primary" />
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">2</span>
                      </div>
                      <span className="font-body-md text-sm font-semibold">Notificações</span>
                    </div>
                    <div className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">2</div>
                  </button>

                  <button 
                    onClick={() => setActiveProfileModal('security')}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                        <Lock className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-body-md text-sm font-semibold">Segurança e Palavra-passe</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline" />
                  </button>
                </nav>
              </section>

              {/* Support Section */}
              <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
                <div className="p-4 border-b border-outline-variant bg-surface-container-low">
                  <h3 className="font-label-md text-xs font-extrabold text-[#003d9b] uppercase tracking-widest">
                    Suporte Técnico
                  </h3>
                </div>
                <nav className="flex flex-col divide-y divide-outline-variant/30">
                  <button 
                    onClick={() => setActiveProfileModal('faq')}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="font-body-md text-sm font-semibold">Centro de Ajuda</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline" />
                  </button>

                  <button 
                    onClick={() => setActiveProfileModal('support')}
                    className="w-full flex items-center justify-between p-4 hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <span className="font-body-md text-sm font-semibold">Contactar Suporte ServiLink</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline" />
                  </button>
                </nav>
              </section>

              {/* Logout Button */}
              <button 
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentView('home');
                  showAlert('Sessão encerrada com sucesso', 'info');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-red-600 text-red-600 hover:bg-red-50 text-sm font-bold rounded-lg transition-colors cursor-pointer active:scale-[0.99]"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair da Conta</span>
              </button>

            </div>
          </div>
        )}

        {/* PROFILE SUB-MODAL WINDOW OVERLAYS */}
        {activeProfileModal !== 'none' && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in text-on-surface">
            <div className="bg-white rounded-2xl border border-outline-variant shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="p-4 border-b border-surface-container flex items-center justify-between bg-surface-container-low text-on-surface">
                <h3 className="font-display font-medium text-sm text-primary flex items-center gap-2">
                  {activeProfileModal === 'edit-profile' && 'Editar Detalhes do Perfil'}
                  {activeProfileModal === 'history' && 'Histórico de Obras e Serviços'}
                  {activeProfileModal === 'payment' && 'Métodos de Pagamento Angola'}
                  {activeProfileModal === 'addresses' && 'Endereços Faturados'}
                  {activeProfileModal === 'notifications' && 'Notificações ServiLink'}
                  {activeProfileModal === 'security' && 'Alterar Palavra-passe'}
                  {activeProfileModal === 'faq' && 'Perguntas Frequentes (FAQ)'}
                  {activeProfileModal === 'support' && 'Apoio ao Cliente em Direto'}
                </h3>
                <button 
                  onClick={() => setActiveProfileModal('none')}
                  className="p-1 px-2.5 rounded-lg hover:bg-surface-container-high text-outline hover:text-on-surface font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-4 text-on-surface text-sm leading-relaxed flex-grow">
                
                {/* 1. Edit Profile Form */}
                {activeProfileModal === 'edit-profile' && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const name = currentUser?.name || '';
                    const email = currentUser?.email || '';
                    const phone = currentUser?.phone || '';

                    if (name.trim().length < 2) {
                      showAlert('O nome completo deve ter pelo menos 2 caracteres.', 'error');
                      return;
                    }
                    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                      showAlert('Introduza um endereço de e-mail válido.', 'error');
                      return;
                    }
                    const digits = phone.replace(/\D/g, '');
                    if (digits.length !== 9) {
                      showAlert('O telemóvel deve ter exatamente 9 dígitos.', 'error');
                      return;
                    }
                    showAlert('Perfil atualizado com sucesso!', 'success');
                    setActiveProfileModal('none');
                  }} className="space-y-4">
                    
                    {/* Avatar Upload and Preview */}
                    <div className="space-y-4 bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/50">
                      <label className="text-xs font-bold text-outline uppercase block">Foto de Perfil</label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img 
                          src={currentUser?.avatar} 
                          alt="Prévisualização" 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-sm bg-primary-container"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBllyswzleNGzWqzVP_JI6PPTUiBmP5zZRcGH-N-RveKcgBQXrhBfd7rVPiUMtmCyPIty3CaRMxbVs8PlFU2zDPwqm4sWFI-VFQLO9BGd2_BpnnA2zSOT3Kwyiir1jyHR54jDpp__ONduI1zzLaURxcQnuTbcj7XmifWlM-r2VIy2TDLzhR0r2Y4H-ZwaoybT-fSRA-Nb0WbewSs0ZgX8U6rvR86bQGVgHsAjL4LHC_19bP3zKrk_c';
                          }}
                        />
                        <div className="flex-grow text-center sm:text-left space-y-2">
                          <p className="text-xs text-on-surface-variant">Selecione uma imagem diretamente do seu telemóvel ou computador para atualizar a sua foto de perfil.</p>
                          <div className="flex justify-center sm:justify-start">
                            <label 
                              htmlFor="avatar-file-upload" 
                              className="bg-primary hover:bg-primary/95 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all text-xs font-bold shadow-sm select-none"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Escolher Foto do Dispositivo</span>
                            </label>
                            
                            <input 
                              id="avatar-file-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  // Validate file is less than 5MB to avoid storage overflow
                                  if (file.size > 5 * 1024 * 1024) {
                                    alert('Por favor, escolha uma imagem menor que 5MB.');
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    if (typeof reader.result === 'string') {
                                      setCurrentUser({ 
                                        ...currentUser!, 
                                        avatar: reader.result 
                                      });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-outline uppercase block">Nome Completo</label>
                      <input 
                        type="text" 
                        value={currentUser?.name || ''} 
                        onChange={(e) => setCurrentUser({ ...currentUser!, name: e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '') })}
                        className="w-full border border-outline-variant rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-bold text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-outline uppercase block">Endereço de Email</label>
                      <input 
                        type="email" 
                        value={currentUser?.email || ''} 
                        onChange={(e) => setCurrentUser({ ...currentUser!, email: e.target.value })}
                        className="w-full border border-outline-variant rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-outline uppercase block">Telemóvel (Express)</label>
                      <input 
                        type="text" 
                        value={currentUser?.phone || ''} 
                        onChange={(e) => setCurrentUser({ ...currentUser!, phone: e.target.value.replace(/[^0-9\s]/g, '') })}
                        className="w-full border border-outline-variant rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary font-bold text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-outline uppercase block">Tipo de Perfil</label>
                      <select 
                        value={currentUser?.role || 'Cliente'} 
                        onChange={(e) => {
                          const val = e.target.value as 'Cliente' | 'Profissional';
                          setCurrentUser({ 
                            ...currentUser!, 
                            role: val,
                            speciality: val === 'Profissional' ? 'Canalização & Pichelaria' : 'Consumidor / Cliente',
                            experience: val === 'Profissional' ? 'Iniciante (Menos de 1 ano)' : 'Nenhuma (Apenas busca contratar)'
                          });
                        }}
                        className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg p-2.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-on-surface font-bold"
                      >
                        <option value="Cliente">Cliente (Contratar Profissionais)</option>
                        <option value="Profissional">Profissional / Prestador (Prestar Serviços)</option>
                      </select>
                    </div>

                    {currentUser?.role === 'Profissional' && (
                      <div className="space-y-3 bg-surface-container-low/40 p-3 rounded-lg border border-outline-variant/60">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#0052cc] uppercase block">Sua Especialidade Principal</label>
                          <select 
                            value={currentUser?.speciality || 'Canalização & Pichelaria'} 
                            onChange={(e) => setCurrentUser({ ...currentUser!, speciality: e.target.value })}
                            className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg p-2 text-xs outline-none focus:border-primary text-on-surface font-semibold"
                          >
                            <option value="Canalização & Pichelaria">Canalização & Pichelaria</option>
                            <option value="Instalações Elétricas">Instalações Elétricas</option>
                            <option value="Pintura & Decor">Pintura & Acabamentos</option>
                            <option value="Ar Condicionado & Refrigeração">Ar Condicionado & Refrigeração</option>
                            <option value="Pedreiro & Ladrilhador">Pedreiro & Ladrilhador</option>
                            <option value="Limpeza Residencial/Industrial">Limpeza Residencial/Industrial</option>
                            <option value="Mecânica de Viaturas">Mecânica de Viaturas</option>
                            <option value="Serralharia Geral">Serralharia Geral</option>
                            <option value="Outros Serviços Gerais">Outro Serviço Geral</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#0052cc] uppercase block">Tempo de Experiência</label>
                          <select 
                            value={currentUser?.experience || 'Iniciante (Menos de 1 ano)'} 
                            onChange={(e) => setCurrentUser({ ...currentUser!, experience: e.target.value })}
                            className="w-full border border-outline-variant bg-surface-container-lowest rounded-lg p-2 text-xs outline-none focus:border-primary text-on-surface font-semibold"
                          >
                            <option value="Iniciante (Menos de 1 ano)">Iniciante (Menos de 1 ano)</option>
                            <option value="Júnior (1 a 2 anos)">Júnior (1 a 2 anos)</option>
                            <option value="Pleno (3 a 5 anos)">Pleno (3 a 5 anos)</option>
                            <option value="Sénior (Mais de 5 anos)">Sénior (Mais de 5 anos)</option>
                          </select>
                        </div>
                      </div>
                    )}
                    <div className="pt-2 flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setActiveProfileModal('none')}
                        className="flex-1 py-1.5 border border-outline-variant rounded-lg text-outline hover:bg-surface-container text-xs font-bold"
                      >
                        Cancelar
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-1.5 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-bold"
                      >
                        Gravar Alterações
                      </button>
                    </div>
                  </form>
                )}

                {/* 2. History of past services */}
                {activeProfileModal === 'history' && (
                  <div className="space-y-3">
                    <p className="text-xs text-outline font-bold">HISTÓRICO DE OBRAS CONCLUÍDAS DESDE DEZ 2023</p>
                    <div className="divide-y divide-outline-variant/35">
                      {[
                        { title: 'Substituição de Disjuntor Técnico', prov: 'Marcus Sterling', date: '12 Abr 2024', price: '45.000 Kz', status: 'Concluído', rate: 5 },
                        { title: 'Instalação de AC Climatização LG', prov: 'Canalização Luanda Sul', date: '28 Fev 2024', price: '89.000 Kz', status: 'Concluído', rate: 5 },
                        { title: 'Limpeza Industrial de Vivenda AL14', prov: 'Sparkle Solutions', date: '04 Jan 2024', price: '120.000 Kz', status: 'Concluído', rate: 4 },
                        { title: 'Pequena Infiltração na Cozinha', prov: 'Canalização Luanda Sul', date: '18 Dez 2023', price: '25.000 Kz', status: 'Concluído', rate: 5 }
                      ].map((hist, idx) => (
                        <div key={idx} className="py-3 flex justify-between items-center text-xs">
                          <div>
                            <span className="text-[10px] text-outline block font-medium uppercase">{hist.date} - {hist.prov}</span>
                            <span className="font-bold block text-sm mt-0.5">{hist.title}</span>
                            <div className="flex gap-0.5 mt-1">
                              {Array.from({ length: hist.rate }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-[#003d9b] block">{hist.price}</span>
                            <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-100 rounded px-1.5 py-0.5 mt-1 inline-block font-bold">PAGO</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Payment methods */}
                {activeProfileModal === 'payment' && (
                  <div className="space-y-4">
                    <p className="text-xs text-outline font-bold">MÉTODOS DE PAGAMENTO CONECTADOS</p>
                    <div className="bg-[#feaa00]/10 border border-[#ffddb3] rounded-xl p-4 flex items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <CreditCard className="w-6 h-6 text-[#9a6400]" />
                        <div>
                          <span className="font-bold block text-sm">Multicaixa Express</span>
                          <span className="text-xs text-on-surface-variant font-medium">Ativo com telemóvel: {paymentPhone}</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-amber-500 text-white rounded px-2 py-0.5 font-bold">PADRÃO</span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-outline uppercase block">Telemóvel Seguro Express</label>
                      <input 
                        type="text" 
                        value={paymentPhone} 
                        onChange={(e) => setPaymentPhone(e.target.value.replace(/[^0-9\s]/g, ''))}
                        className="w-full border border-outline-variant rounded-lg p-2 text-xs font-bold outline-none"
                      />
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button 
                        onClick={() => {
                          showAlert('Cartão de débito Multicaixa adicionado com sucesso!', 'success');
                          setActiveProfileModal('none');
                        }}
                        className="flex-1 py-2 border border-outline-variant hover:bg-surface-container rounded-lg text-xs font-bold"
                      >
                        + Adicionar Novo Cartão
                      </button>
                      <button 
                        onClick={() => {
                          const digits = paymentPhone.replace(/\D/g, '');
                          if (digits.length !== 9) {
                            showAlert('O telemóvel deve ter exatamente 9 dígitos.', 'error');
                            return;
                          }
                          showAlert('Dados de Multicaixa Express guardados com sucesso!', 'success');
                          setActiveProfileModal('none');
                        }}
                        className="flex-1 py-2 bg-primary hover:bg-primary-container text-white rounded-lg text-xs font-bold"
                      >
                        Salvar Padrão
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. Saved addresses */}
                {activeProfileModal === 'addresses' && (
                  <div className="space-y-4">
                    <p className="text-xs text-outline font-bold">ENDEREÇOS DE SERVIÇO EM LUANDA</p>
                    <div className="space-y-2 divide-y divide-outline-variant/20">
                      {[
                        { title: 'Casa Principal (Talatona)', detail: 'Dolce Vita, Vivenda 14A, Luanda' },
                        { title: 'Apartamento de Aluguer', detail: 'Centralidade do Kilamba, Bloco G12, Apt 402, Luanda' }
                      ].map((addr, idx) => (
                        <div key={idx} className="py-3 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-sm block">{addr.title}</span>
                            <span className="text-on-surface-variant block mt-0.5">{addr.detail}</span>
                          </div>
                          <button 
                            onClick={() => showAlert('Endereço padrão atualizado!', 'success')}
                            className="text-[#003d9b] hover:underline font-bold"
                          >
                            Usar
                          </button>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => {
                        const newAddr = prompt('Escreva o novo endereço para Luanda:');
                        if (newAddr) {
                          showAlert('Novo endereço guardado com sucesso em Luanda!', 'success');
                        }
                      }}
                      className="w-full py-2.5 border border-dashed border-outline-variant hover:border-primary rounded-lg text-xs font-bold text-primary flex items-center justify-center gap-1.5"
                    >
                      <span>+ Adicionar Novo Endereço</span>
                    </button>
                  </div>
                )}

                {/* 5. Notifications Feed */}
                {activeProfileModal === 'notifications' && (
                  <div className="space-y-3">
                    <p className="text-xs text-outline font-bold">NOTIFICAÇÕES RECENTES</p>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg text-xs">
                        <span className="font-bold text-primary block">CONFIRMAÇÃO DE AGENDAMENTO</span>
                        <p className="text-on-surface mt-1">O seu agendamento com Marcus Sterling para amanhã às 10:00 AM foi validado com sucesso!</p>
                        <span className="text-[9px] text-outline block mt-1">Há 15 minutos</span>
                      </div>
                      <div className="p-3 bg-stone-50 border border-outline-variant/30 rounded-lg text-xs">
                        <span className="font-bold text-on-surface block">SERVIÇO CONCLUÍDO</span>
                        <p className="text-on-surface-variant mt-1">O serviço "Infiltração Cozinha" com Canalização Luanda Sul foi concluído. Classifique o técnico para desbloquear 500 Kz de bónus!</p>
                        <span className="text-[9px] text-outline block mt-1">Há 3 dias</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Security & Password */}
                {activeProfileModal === 'security' && (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    showAlert('Palavra-passe alterada com sucesso!', 'success');
                    setActiveProfileModal('none');
                  }} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-outline uppercase block">Palavra-passe Atual</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full border border-outline-variant rounded-lg p-2 text-xs" 
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-outline uppercase block">Nova Palavra-passe</label>
                      <input 
                        type="password" 
                        placeholder="Mínimo 6 caracteres"
                        className="w-full border border-outline-variant rounded-lg p-2 text-xs" 
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-lg mt-2"
                    >
                      Alterar Palavra-passe
                    </button>
                  </form>
                )}

                {/* 7. Help Center FAQ FAQ */}
                {activeProfileModal === 'faq' && (
                  <div className="space-y-4">
                    <p className="text-xs text-outline font-bold">DÚVIDAS FREQUENTES EM ANGOLA</p>
                    <div className="space-y-3 text-xs max-h-[300px] overflow-y-auto pr-1">
                      {[
                        { q: 'Como funciona o pagamento via Multicaixa Express?', a: 'O pagamento é 100% seguro. Introduza o telemóvel associado, confirme a notificação no seu aplicativo bancário ou faça transferência imediata para o IBAN fornecido e anexe o comprovativo.' },
                        { q: 'O que é a Garantia ServiLink?', a: 'Todos os trabalhos agendados pelo ServiLink estão segurados contra incidentes residenciais acidentais até ao valor de 8.000.000 Kz!' },
                        { q: 'Como cancelar um agendamento?', a: 'Pode cancelar qualquer agendamento sem taxas adicionais até 4 horas antes do horário programado directamente nas "Minhas Reservas".' },
                        { q: 'Os técnicos são certificados mesmo?', a: 'Sim. Cada prestador de serviços passa por uma verificação presencial rigorosa do bilhete de identidade, registo criminal limpo e carteira profissional Angolana.' }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <span className="font-bold text-on-surface block text-sm">💡 {item.q}</span>
                          <p className="text-on-surface-variant font-medium leading-relaxed">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. Live Support Messaging */}
                {activeProfileModal === 'support' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-xs leading-relaxed text-[#003d9b]">
                      <strong>Assistente ServiLink Virtual:</strong> Olá, estamos online para ajudar! Envie-nos uma pergunta sobre a sua instalação residencial ou faturação.
                    </div>
                    <div className="h-32 border border-outline-variant/50 rounded-lg p-3 overflow-y-auto space-y-2 bg-stone-50 text-xs font-body-sm flex flex-col justify-end" id="chat-messages-box">
                      <div className="text-left bg-gray-200 text-on-surface rounded-lg p-2 max-w-[85%] self-start font-medium">
                        Qual é o seu problema ou dúvida com o ServiLink Luanda?
                      </div>
                      <div className="text-right bg-primary text-white rounded-lg p-2 max-w-[85%] self-end font-semibold">
                        A apoiar o seu utilizador João Manuel
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Escreva a sua mensagem..." 
                        className="flex-grow border border-outline-variant rounded-lg px-3 py-2 text-xs outline-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = (e.currentTarget as HTMLInputElement).value;
                            if (val.trim()) {
                              showAlert('Mensagem enviada com sucesso ao nosso suporte de Luanda!', 'success');
                              (e.currentTarget as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <button 
                        onClick={() => showAlert('Suporte alertado! Um agente entrará em contacto no prazo de 10 minutos.', 'success')}
                        className="bg-primary hover:bg-primary-container text-white text-xs font-bold px-4 py-2 rounded-lg"
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-surface-container border-t border-outline-variant text-right">
                <button 
                  onClick={() => setActiveProfileModal('none')}
                  className="bg-primary hover:bg-primary-container text-white px-5 py-2 rounded-lg text-xs font-bold"
                >
                  Concluir
                </button>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* MOBILE FIXED BOTTOM NAVIGATION BAR */}
      <nav id="mobile-bottom-navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-outline-variant shadow-lg flex justify-around items-center h-20 py-3 px-4 pb-safe bg-surface-container-lowest rounded-t-2xl">
        {/* Home tab */}
        <button 
          onClick={() => { setCurrentView('home'); window.scrollTo(0, 0); }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
            currentView === 'home' 
              ? 'text-primary font-black scale-105' 
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <ServiLinkLogo className="w-6 h-6 transition-transform hover:scale-110" />
          <span className="text-[10px] font-bold mt-1">Início</span>
        </button>

        {/* Search tab */}
        <button 
          onClick={() => { setCurrentView('listing'); window.scrollTo(0, 0); }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition ${
            currentView === 'listing' 
              ? 'text-primary font-black scale-105' 
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <Search className="w-6 h-6 transition-transform hover:scale-110" />
          <span className="text-[10px] font-bold mt-1">Pesquisar</span>
        </button>

        {/* Bookings tab */}
        <button 
          onClick={() => { setCurrentView('bookings'); window.scrollTo(0, 0); }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition relative ${
            currentView === 'bookings' 
              ? 'text-primary font-black scale-105' 
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <div className="relative">
            <FileText className="w-6 h-6 transition-transform hover:scale-110" />
            {bookingsList.filter(b => b.status !== 'Concluído').length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                {bookingsList.filter(b => b.status !== 'Concluído').length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold mt-1">Reservas</span>
        </button>

        {/* Profile tab (Active Profile page) */}
        <button 
          onClick={() => { setCurrentView('user-profile'); window.scrollTo(0, 0); }}
          className={`flex flex-col items-center justify-center transition p-2 rounded-xl ${
            currentView === 'user-profile' 
              ? 'bg-amber-100 text-amber-900 border border-amber-200 px-4 py-1.5 rounded-full scale-105' 
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          <User className={`w-6 h-6 transition-transform hover:scale-110 ${currentView === 'user-profile' ? 'text-amber-900' : ''}`} />
          <span className="text-[10px] font-bold mt-0.5">Perfil</span>
        </button>
      </nav>

      {/* CORE FRAMEWORK FOOTER */}
      <footer id="main-footer" className="bg-surface-container-high border-t border-outline-variant py-8 px-md md:px-lg mt-auto text-center">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-md">
          <div className="flex items-center gap-1.5">
            <ServiLinkLogo className="w-6.5 h-6.5" />
            <span className="font-display font-black text-base tracking-tight text-primary">ServiLink Luanda</span>
          </div>

          <div className="flex flex-wrap justify-center gap-md text-xs font-bold text-outline">
            <button onClick={() => setCurrentView('home')} className="hover:text-primary">Sobre Nós</button>
            <span className="w-1 h-1 rounded-full bg-outline-variant self-center"></span>
            <button onClick={() => showAlert('Termos de Serviço de ServiLink em Angola', 'info')} className="hover:text-primary">Termos do Utilizador</button>
            <span className="w-1 h-1 rounded-full bg-outline-variant self-center"></span>
            <button onClick={() => showAlert('Políticas de Privacidade de Angola', 'info')} className="hover:text-primary">Privacidade</button>
            <span className="w-1 h-1 rounded-full bg-outline-variant self-center"></span>
            <button onClick={() => showAlert('Linha direta de ajuda ao utilizador em Angola', 'info')} className="hover:text-primary">Linha de Apoio</button>
          </div>

          <p className="text-xs text-outline font-body-sm leading-relaxed max-w-sm">
            © 2024 ServiLink Angola. Conectando a excelência no mercado do Talatona à Maianga. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
