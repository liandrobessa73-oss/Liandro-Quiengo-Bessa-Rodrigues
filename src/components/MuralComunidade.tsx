import React, { useState } from 'react';
import {
  Heart,
  MessageSquare,
  Share2,
  CheckCircle2,
  Zap,
  Sparkles,
  Wrench,
  Wind,
  Car,
  Truck,
  PlusCircle,
  Tag,
  ImageIcon,
  ArrowRight,
  User,
  Users
} from 'lucide-react';
import { CATEGORIES } from '../data';
import { Publication } from '../types';

interface MuralComunidadeProps {
  currentUser: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role?: 'Cliente' | 'Profissional';
    experience?: string;
    speciality?: string;
  } | null;
  setCurrentUser: (user: any) => void;
  publicationsList: Publication[];
  setPublicationsList: React.Dispatch<React.SetStateAction<Publication[]>>;
  handleViewProvider: (providerId: string) => void;
  showAlert: (text: string, type?: 'success' | 'error' | 'info') => void;
  filterSelectedCategory?: string; // If we want to automatically filter inside the main listing page
}

const PRESET_IMAGES = [
  {
    id: 'img-none',
    label: 'Apenas Texto 📝',
    url: ''
  }
];

export const MuralComunidade: React.FC<MuralComunidadeProps> = ({
  currentUser,
  setCurrentUser,
  publicationsList,
  setPublicationsList,
  handleViewProvider,
  showAlert,
  filterSelectedCategory = "Todos"
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(filterSelectedCategory);
  
  // Publication Form States
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('limpeza');
  const [tag, setTag] = useState<Publication['tag']>('Trabalho Concluído');
  const [selectedImagePreset, setSelectedImagePreset] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showAlert('A imagem deve ter menos de 5MB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImagePreset(event.target.result as string);
          showAlert('Foto carregada do telefone com sucesso!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Likes and Interaction State Simulation
  const handleLike = (id: string) => {
    setPublicationsList(prev => prev.map(pub => {
      if (pub.id === id) {
        const liked = !pub.likedByUser;
        return {
          ...pub,
          likes: liked ? pub.likes + 1 : pub.likes - 1,
          likedByUser: liked
        };
      }
      return pub;
    }));
  };

  const handleShare = (id: string) => {
    showAlert('Ligação da publicação copiada para a área de transferência!', 'success');
  };

  // Submit helper
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      showAlert('Por favor, escreva uma mensagem para publicar!', 'error');
      return;
    }

    if (!currentUser) {
      showAlert('Por favor, faça login para criar publicações.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Find matching mock provider, or use a custom one
      const dummyProviderId = currentUser.speciality?.toLowerCase().includes('canalizac') 
        ? 'resposta-rapida-alvalade' 
        : currentUser.speciality?.toLowerCase().includes('limp')
        ? 'sparkle-solutions'
        : 'marcus-sterling';

      const newPublication: Publication = {
        id: `pub-${Date.now()}`,
        providerId: dummyProviderId, // Links to a real simulated provider so details work
        providerName: currentUser.name,
        providerTitle: currentUser.speciality || 'Prestador Autónomo Certificado',
        providerAvatar: currentUser.avatar,
        category: category,
        content: content,
        imageUrl: selectedImagePreset || undefined,
        likes: 0,
        commentsCount: 0,
        date: 'Agora mesmo',
        tag: tag,
        likedByUser: false
      };

      setPublicationsList(prev => [newPublication, ...prev]);
      setIsSubmitting(false);
      setContent('');
      setSelectedImagePreset('');
      setIsFormExpanded(false);
      showAlert('Publicação criada com sucesso no Mural de Luanda!', 'success');
    }, 600);
  };

  // Quick switch user role for testing
  const toggleRole = () => {
    if (!currentUser) return;
    const isClient = currentUser.role === 'Cliente';
    const updated = {
      ...currentUser,
      role: isClient ? 'Profissional' : 'Cliente',
      speciality: isClient ? 'Electricista Autónomo' : 'Consumidor / Cliente',
      experience: isClient ? 'Intermédio (3-5 anos)' : 'Nenhuma (Procura contratar profissionais)'
    };
    setCurrentUser(updated);
    showAlert(
      isClient 
        ? 'Alterou para o perfil Profissional! Agora pode fazer publicações de serviços!' 
        : 'Mudou de volta para o perfil de Cliente.',
      'info'
    );
  };

  // Pre-filter with active pill selection
  const filteredPublications = publicationsList.filter(pub => {
    const term = activeCategory.toLowerCase();
    if (term === 'todos') return true;
    return pub.category.toLowerCase() === term;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. CREATOR BOX (FOR PROFESSIONALS OR TO CONVERT CLIENTS) */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm">
        {currentUser?.role === 'Profissional' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/60">
              <div className="w-10 h-10 rounded-full border border-primary/20 overflow-hidden bg-primary-container">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-display font-bold text-on-surface text-sm block">{currentUser.name}</span>
                <span className="text-primary text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  <span>Espaço de Publicação do Prestador</span>
                </span>
              </div>
            </div>

            {/* Click to expand editor fields */}
            {!isFormExpanded ? (
              <div 
                onClick={() => setIsFormExpanded(true)}
                className="bg-surface-container-low hover:bg-surface-container border border-outline-variant/80 rounded-xl px-4 py-3 cursor-pointer text-outline text-sm transition-colors"
              >
                Escreva a sua oferta especial ou partilhe um trabalho feito recentemente...
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {/* Textarea */}
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Descrição da publicação
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={500}
                    rows={4}
                    placeholder="Seja descritivo: ex: 'Acabei de desentupir uma canalização profunda no condomínio tal...'"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface resize-none transition-all"
                  />
                  <div className="flex justify-between items-center text-[10px] text-outline px-1 mt-1">
                    <span>Formatado profissionalmente para o ecossistema local</span>
                    <span>{content.length}/500</span>
                  </div>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category select */}
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Área Técnica / Categoria
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 text-sm font-semibold focus:outline-none"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tag/Type select */}
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Etiqueta do Post
                    </label>
                    <select
                      value={tag}
                      onChange={(e) => setTag(e.target.value as Publication['tag'])}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 text-sm font-semibold focus:outline-none"
                    >
                      <option value="Trabalho Concluído">✔️ Trabalho Concluído</option>
                      <option value="Oferta Especial">🎉 Oferta Especial</option>
                      <option value="Dica Útil">💡 Dica Útil</option>
                      <option value="Disponibilidade de Hoje">📅 Disponibilidade de Hoje</option>
                      <option value="Anúncio">📢 Anúncio Oficial</option>
                    </select>
                  </div>
                </div>

                {/* Pre-set Image Selector & Custom Phone Upload */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Foto de Portfólio (Preset ou Escolher do Telefone)
                  </label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {PRESET_IMAGES.map(img => (
                      <button
                        type="button"
                        key={img.id}
                        onClick={() => setSelectedImagePreset(img.url)}
                        className={`text-xs p-2.5 rounded-xl border font-medium text-center transition-all ${
                          selectedImagePreset === img.url 
                            ? 'bg-primary/10 border-primary text-primary font-bold' 
                            : 'bg-surface-container-low border-outline-variant hover:bg-surface-container'
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}

                    {/* Custom upload triggering native file browser */}
                    <label className="relative flex flex-col items-center justify-center p-2.5 rounded-xl border border-dashed border-primary hover:bg-primary/5 cursor-pointer text-center text-xs font-bold text-primary transition-all">
                      <ImageIcon className="w-4 h-4 mb-1" />
                      <span>Fotos do Telefone 📱</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleCustomImageUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* Real-time preview of selected image */}
                  {selectedImagePreset && (
                    <div className="mt-2 p-3 bg-surface-container border border-outline-variant rounded-xl flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-outline-variant bg-white shrink-0">
                        <img 
                          src={selectedImagePreset} 
                          alt="Pré-visualização" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow">
                        <span className="text-xs font-bold text-on-surface block">Foto Pronta</span>
                        <span className="text-[10px] text-outline">Esta foto será inserida na sua publicação</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setSelectedImagePreset('')}
                        className="text-red-500 hover:text-red-700 font-bold text-xs px-2.5 py-1 rounded hover:bg-red-50 transition"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormExpanded(false)}
                    className="px-4 py-2 text-xs font-bold hover:bg-surface-container text-on-surface-variant rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-container text-white text-xs font-bold px-5 py-2.5 rounded-lg transition flex items-center gap-1.5 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>Publicando...</span>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        <span>Publicar no Mural</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          /* Client user placeholder conversion block */
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2.5 rounded-full text-primary shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-on-surface">É um Prestador de Serviços Autónomo em Luanda?</h4>
                <p className="text-on-surface-variant text-xs mt-0.5">
                  Publique fotos de trabalhos concluídos, dicas técnicas e promoções especiais diretamente no Início e na aba de Prestadores para conseguir novas reservas!
                </p>
              </div>
            </div>
            <button
              onClick={toggleRole}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-primary hover:bg-opacity-90 active:scale-95 transition"
            >
              Ativar Modo Prestador
            </button>
          </div>
        )}
      </div>

      {/* 2. CATEGORY PILL SELECTOR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveCategory('Todos')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'Todos'
              ? 'bg-primary text-white font-bold shadow-sm'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
          }`}
        >
          Todas as Categorias
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all capitalize flex items-center gap-1.5 ${
              activeCategory === cat.id
                ? 'bg-primary text-white font-bold shadow-sm'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
            }`}
          >
            {cat.id === 'limpeza' && <Sparkles className="w-3.5 h-3.5" />}
            {cat.id === 'eletricista' && <Zap className="w-3.5 h-3.5" />}
            {cat.id === 'canalizacao' && <Wrench className="w-3.5 h-3.5" />}
            {cat.id === 'ac_frio' && <Wind className="w-3.5 h-3.5" />}
            {cat.id === 'mecanica' && <Car className="w-3.5 h-3.5" />}
            {cat.id === 'estafetas' && <Truck className="w-3.5 h-3.5" />}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 3. LIST OF DYNAMIC PUBLICATIONS */}
      {filteredPublications.length === 0 ? (
        <div className="text-center py-12 bg-surface-container rounded-2xl border border-outline-variant/60">
          <p className="text-outline text-sm font-bold">Nenhuma publicação cadastrada para esta categoria.</p>
          <p className="text-outline text-xs mt-1">Seja o primeiro a publicar ativando o Modo Prestador!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPublications.map((pub) => {
            const relativeCat = CATEGORIES.find(c => c.id === pub.category);
            
            return (
              <div 
                key={pub.id} 
                className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group/card"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between pb-4 border-b border-outline-variant/40">
                    <div 
                      onClick={() => handleViewProvider(pub.providerId)}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-11 h-11 rounded-full border border-primary/20 overflow-hidden bg-primary-container relative shrink-0">
                        <img 
                          src={pub.providerAvatar} 
                          alt={pub.providerName} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-display font-bold text-on-surface text-sm hover:text-primary transition-colors block">
                            {pub.providerName}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-transparent" title="Verificado" />
                        </div>
                        <span className="text-on-surface-variant text-xs font-body-sm block truncate max-w-[200px]">
                          {pub.providerTitle}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      {/* Sub-label tag */}
                      <span className="text-[10px] font-bold text-outline block mb-1">
                        {pub.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        <Tag className="w-2.5 h-2.5" />
                        <span>{pub.tag}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="py-4 space-y-3">
                    <p className="text-on-surface text-sm leading-relaxed font-body">
                      {pub.content}
                    </p>

                    {pub.imageUrl && (
                      <div className="h-44 md:h-52 rounded-xl overflow-hidden bg-surface-container-high border border-outline-variant/60 relative">
                        <img 
                          src={pub.imageUrl} 
                          alt="Portfólio / Trabalho" 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Interactions */}
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/40 text-on-surface-variant text-xs font-semibold">
                  
                  {/* Category back-reference pill */}
                  <span className="text-[10px] uppercase font-bold text-outline flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-md">
                    {relativeCat?.id === 'limpeza' && <Sparkles className="w-3 h-3 text-primary" />}
                    {relativeCat?.id === 'eletricista' && <Zap className="w-3 h-3 text-amber-500" />}
                    {relativeCat?.id === 'canalizacao' && <Wrench className="w-3 h-3 text-cyan-500" />}
                    {relativeCat?.id === 'ac_frio' && <Wind className="w-3 h-3 text-blue-400" />}
                    {relativeCat?.id === 'mecanica' && <Car className="w-3 h-3 text-yellow-600" />}
                    {relativeCat?.id === 'estafetas' && <Truck className="w-3 h-3 text-red-500" />}
                    <span>{relativeCat?.label || pub.category}</span>
                  </span>

                  <div className="flex items-center gap-4">
                    {/* Like button */}
                    <button 
                      onClick={() => handleLike(pub.id)}
                      className={`flex items-center gap-1.5 transition-colors p-1.5 rounded-lg ${
                        pub.likedByUser 
                          ? 'text-red-500 bg-red-100/40 font-bold' 
                          : 'hover:text-red-500 hover:bg-surface-container-low'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${pub.likedByUser ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{pub.likes} Gosto</span>
                    </button>

                    {/* Chat redirection / book directly button */}
                    <button 
                      onClick={() => handleViewProvider(pub.providerId)}
                      className="text-primary bg-primary/5 hover:bg-primary/10 flex items-center gap-1.5 p-1.5 rounded-lg transition-colors group"
                    >
                      <span>Reservar</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    
                    {/* Share */}
                    <button 
                      onClick={() => handleShare(pub.id)}
                      className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-lg transition-all"
                      title="Partilhar"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Footer disclaimer */}
      <div className="flex items-center gap-1.5 justify-center py-2 text-[10px] text-outline font-medium">
        <Users className="w-3.5 h-3.5" />
        <span>Participe no Mural Certificado ServiLink Luanda de forma gratuita.</span>
      </div>

    </div>
  );
};
