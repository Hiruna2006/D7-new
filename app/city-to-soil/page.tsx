"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cityToSoilService } from '@/src/modules/city-to-soil/services/city-to-soil.service';

const experts = cityToSoilService.getExperts();
const clubProjects = cityToSoilService.getClubProjects();

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---


// --- Components ---

// Section 1: Hero
function Hero() {
  useScroll(); // Hook call kept to maintain hook order if needed, or just remove if completely unused. But wait, useScroll returns an object.
  // Actually, if I remove y1/y2, I don't need scrollY either.
  
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center bg-campaign rounded-b-[2.5rem] md:rounded-b-[5rem] border-b border-white/5 shadow-2xl z-20">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
        <Image 
          src="/citytosoil/hero.png" 
          alt="City to Soil Hero" 
          fill 
          className="object-cover opacity-60" 
          priority
        />
        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[-5vh]">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white heading-serif mb-6 drop-shadow-2xl"
        >
          CITY TO SOIL
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-base sm:text-xl md:text-3xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed px-4"
        >
          Bridging the urban-rural divide to secure our nation's harvest.
        </motion.p>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] md:text-xs uppercase tracking-widest">Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
        </div>
      </motion.div>
    </section>
  );
}

// Section 2: Expert Board
function ExpertBoard({ onSelectExpert }: { onSelectExpert: (expert: typeof experts[0]) => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-4 relative z-10 bg-campaign">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="text-fuchsia font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Our Advisors</span>
          <h2 className="text-3xl md:text-6xl font-bold text-white heading-serif mb-6">Expert Guidance.</h2>
          <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-deepRed to-fuchsia mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experts.map((expert, index) => (
            <div key={index} className={cn(index === experts.length - 1 && experts.length % 2 !== 0 ? "md:col-span-2 md:w-3/4 md:mx-auto" : "")}>
              <ExpertCard 
                {...expert}
                delay={0.1 * (index + 1)}
                index={index}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                onClick={() => onSelectExpert(expert)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertCard({ name, title, org, delay, image, index, hoveredIndex, setHoveredIndex, onClick }: { 
  name: string, title: string, org: string, delay: number, image: string, index: number, hoveredIndex: number | null, setHoveredIndex: (i: number | null) => void, onClick: () => void 
}) {
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={onClick}
      className={cn(
        "group relative p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 cursor-pointer h-full",
        isDimmed ? "opacity-40 scale-[0.98] blur-[1px] grayscale" : "hover:border-fuchsia/50 hover:shadow-fuchsiaGlow hover:-translate-y-1"
      )}
    >
      {/* Spotlight Effect - Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandDeepRadial opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
      
      {/* Spotlight Effect - Inner */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brandFuchsiaRadial pointer-events-none" />
      
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 h-full">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-deepRed to-fuchsia p-[2px] shadow-lg group-hover:shadow-xl transition-shadow duration-500">
             <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
               <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
             </div>
          </div>
        </div>
        
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-fuchsia transition-colors duration-300">{name}</h3>
          <p className="text-white/80 font-medium text-sm mb-1 leading-snug">{title}</p>
          <p className="text-white/50 text-xs uppercase tracking-wide mb-4">{org}</p>
          
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center text-sm font-semibold text-fuchsia hover:text-white transition-colors group/link">
              Read Message
              <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExpertModal({ expert, onClose }: { expert: typeof experts[0], onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-campaign-surface border border-fuchsia/30 rounded-3xl p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full bg-gradient-to-br from-deepRed to-fuchsia p-[3px]">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-black">
              <Image src={expert.image} alt={expert.name} fill className="object-cover" />
            </div>
          </div>
          <div className="text-center md:text-left flex-grow">
            <h3 className="text-2xl md:text-3xl font-bold text-white heading-serif mb-2">{expert.name}</h3>
            <p className="text-fuchsia font-medium text-base mb-1">{expert.title}</p>
            <p className="text-white/60 text-sm mb-4">{expert.org}</p>
            
            <a 
              href={`mailto:${expert.email}?subject=Inquiry via City to Soil Platform`}
              className="inline-flex items-center px-5 py-2 rounded-full bg-deepRed hover:bg-deepCrimson text-white text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-deepRed/20"
            >
              Contact Expert
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </a>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="relative border-t border-white/5 pt-6">
            <span className="absolute top-4 left-0 text-6xl text-deepRed/20 font-serif -translate-x-2 -translate-y-4">“</span>
            <p className="text-white/90 leading-relaxed whitespace-pre-wrap relative z-10">{expert.message}</p>
            <span className="absolute bottom-0 right-0 text-6xl text-deepRed/20 font-serif translate-x-4 translate-y-8">”</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Section 3: Impact Dashboard
function ImpactDashboard() {
  const [startCount, setStartCount] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) setStartCount(true);
  }, [isInView]);

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden" ref={ref}>
       <div className="absolute inset-0 bg-campaign" />
       {/* Ambient glow */}
       <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-deepRed/10 blur-[120px] rounded-full pointer-events-none" />
       
       <div className="container mx-auto max-w-7xl px-4 relative z-10">
         <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Map Visual */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
               <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-square">
                 {/* Glowing backdrop for map */}
                 <div className="absolute inset-0 bg-deepRed/20 blur-3xl rounded-full transform scale-90" />
                 <Image 
                   src="/images/districtmap.png" 
                   alt="District Map" 
                   fill
                   className="object-contain drop-shadow-fuchsiaGlow grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                   priority
                 />
                 
                 {/* Animated Pulse Points */}
                 <div className="absolute top-[40%] left-[60%] w-3 h-3 bg-fuchsia rounded-full animate-ping" />
                 <div className="absolute top-[40%] left-[60%] w-3 h-3 bg-fuchsia rounded-full" />
                 
                 <div className="absolute top-[55%] left-[45%] w-2 h-2 bg-deepRed rounded-full animate-ping delay-700" />
                 <div className="absolute top-[55%] left-[45%] w-2 h-2 bg-deepRed rounded-full delay-700" />
               </div>
            </div>

            {/* Data */}
            <div className="w-full lg:w-1/2 space-y-10">
               <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia/10 border border-fuchsia/20 text-fuchsia text-xs font-bold tracking-wider uppercase mb-4">
                    <span className="w-2 h-2 rounded-full bg-fuchsia animate-pulse"/>
                    The Context: Cyclone Ditwah
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold text-white heading-serif mb-6 leading-tight">
                   A <span className="text-transparent bg-clip-text bg-gradient-to-r from-deepRed to-fuchsia">$4.1 Billion</span> blow to our nation's resilience.
                 </h2>
                 <p className="text-white/70 text-base md:text-lg leading-relaxed border-l-2 border-white/10 pl-6">
                   Cyclone Ditwah wasn't just a storm; it was a systemic shock that fractured our rural food basin, wiping out 4% of our GDP and pushing 227,000+ farming families to the brink.
                 </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <StatItem 
                   end={4.1} 
                   suffix="B" 
                   prefix="$"
                   label="Economic Loss" 
                   subLabel="Direct Physical Damage"
                   color="text-deepRed"
                   start={startCount}
                   decimals={1}
                 />
                 <StatItem 
                   end={129000} 
                   suffix="+" 
                   label="Hectares Destroyed" 
                   subLabel="Rice, Maize & Veg"
                   color="text-fuchsia"
                   start={startCount}
                 />
                 <StatItem 
                   end={227000} 
                   suffix="+" 
                   label="Families Impacted" 
                   subLabel="Farming Households"
                   color="text-white"
                   start={startCount}
                 />
               </div>
            </div>
         </div>
       </div>
    </section>
  );
}

function StatItem({ end, suffix, prefix = "", label, subLabel, color, start, decimals = 0 }: { end: number, suffix: string, prefix?: string, label: string, subLabel: string, color: string, start: boolean, decimals?: number }) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <div className={cn("text-3xl md:text-4xl font-bold mb-1", color)}>
        {prefix}
        {start ? <CountUp end={end} duration={2.5} separator="," decimals={decimals} /> : 0}
        <span className="text-xl ml-0.5">{suffix}</span>
      </div>
      <div className="text-white font-semibold text-sm">{label}</div>
      <div className="text-white/40 text-xs mt-1">{subLabel}</div>
    </div>
  );
}

// Section 4: Green Wall
function GreenWall() {
  return (
    <section className="py-16 md:py-24 bg-campaign relative z-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-white/50 font-bold tracking-widest uppercase text-sm mb-2 block">The Reaction</span>
            <h2 className="text-3xl md:text-6xl font-bold text-white heading-serif mb-4">Youth Action.</h2>
            <p className="text-white/60 text-base md:text-lg">
              Leo Clubs across the district are taking the lead. <span className="text-fuchsia font-semibold">#OneYouthOnePlant</span>
            </p>
          </div>
          <a href="#pledge" className="px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 text-sm font-bold">
            Join the Wall
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubProjects.map((club, index) => (
             <ClubProjectCard key={index} club={club} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClubProjectCard({ club, index }: { club: typeof clubProjects[0], index: number }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % club.images.length);
    }, 3000 + index * 500); // Stagger timings slightly
    return () => clearInterval(timer);
  }, [isHovered, club.images.length, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group overflow-hidden rounded-3xl bg-white/5 border border-white/10"
    >
      <div className="relative aspect-[4/3] w-full bg-black/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image 
              src={club.images[currentImage]} 
              alt={`${club.name} Project`} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {club.images.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300", 
                i === currentImage ? "bg-fuchsia w-4" : "bg-white/50"
              )} 
            />
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-fuchsia transition-colors">{club.name}</h3>
        <p className="text-white/50 text-sm">Community Service Project</p>
      </div>
    </motion.div>
  );
}

// Section 5: Digital Pledge
function DigitalPledge() {
  const [name, setName] = useState('');
  const [pledged, setPledged] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [floatingNames, setFloatingNames] = useState<{id: number, text: string, x: number, y: number, scale: number}[]>([
    { id: 1, text: "Thusal Ranawaka", x: 10, y: 20, scale: 0.8 },
    { id: 2, text: "Hansathi Imethma", x: 80, y: 15, scale: 0.9 },
    { id: 3, text: "Gaya Raddella", x: 20, y: 70, scale: 0.7 },
    { id: 4, text: "Naveed Hameed", x: 70, y: 60, scale: 0.85 },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setPledged(true);
    // Add to floating names
    setFloatingNames(prev => [...prev, {
      id: Date.now(),
      text: name,
      x: 50, // Starts center
      y: 50,
      scale: 1.2
    }]);
  };

  return (
    <section id="pledge" className="py-24 md:py-32 bg-black relative overflow-hidden min-h-[60vh] flex items-center justify-center">
      {/* Cloud of names background - Client Only to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
          {floatingNames.map((n) => (
            <FloatingName key={n.id} data={n} isNew={n.id > 100} />
          ))}
        </div>
      )}

      {/* Radial Gradient overlay to fade edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl"
        >
          <div className="mb-8">
            <span className="inline-block p-3 rounded-full bg-fuchsia/10 text-fuchsia mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/></svg>
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white heading-serif mb-4">Stand for Food Security</h2>
            <p className="text-white/60">Join the digital wall of guardians protecting our future.</p>
          </div>
          
          {!pledged ? (
            <form onSubmit={handlePledge} className="space-y-4">
               <div className="flex flex-col sm:flex-row gap-3">
                 <input 
                   type="text" 
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="Enter your full name"
                   className="flex-1 px-6 py-4 rounded-2xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-fuchsia focus:ring-1 focus:ring-fuchsia transition-all"
                 />
                 <button 
                   type="submit"
                   className="px-8 py-4 rounded-2xl bg-deepRed hover:bg-deepCrimson text-white font-bold transition-all transform hover:scale-105 shadow-lg shadow-deepRed/20 whitespace-nowrap"
                 >
                   I Pledge
                 </button>
               </div>
               <p className="text-white/30 text-xs mt-4">By pledging, you agree to support local agriculture.</p>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4"
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 ring-1 ring-green-500/30">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-2xl text-white font-bold mb-2">Thank you, {name}!</h3>
              <p className="text-white/60">Your name has been added to the cloud of guardians.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function FloatingName({ data, isNew }: { data: { text: string, x: number, y: number, scale: number }, isNew: boolean }) {
  // Generate random drift values on mount
  const [randomDrift] = useState(() => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    duration: 10 + Math.random() * 10
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: isNew ? "50%" : `${data.x}%`, y: isNew ? "50%" : `${data.y}%` }}
      animate={{ 
        opacity: [0.1, 0.4, 0.1], 
        scale: [data.scale, data.scale * 1.1, data.scale],
        x: [
          isNew ? "50%" : `${data.x}%`, 
          `${isNew ? (Math.random() * 80 + 10) : (data.x + randomDrift.x)}%`
        ],
        y: [
          isNew ? "50%" : `${data.y}%`, 
          `${isNew ? (Math.random() * 80 + 10) : (data.y + randomDrift.y)}%`
        ],
      }}
      transition={{ duration: randomDrift.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="absolute text-white font-bold whitespace-nowrap select-none blur-[1px] hover:blur-0 hover:opacity-100 transition-all duration-300 hover:scale-110 z-0 hover:z-10 cursor-default"
      style={{ fontSize: `${1.5 * data.scale}rem` }}
    >
      {data.text}
    </motion.div>
  );
}

// --- Main Page ---
export default function CityToSoilPage() {
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-fuchsia selection:text-white relative">
      <Hero />
      <ExpertBoard onSelectExpert={setSelectedExpert} />
      <ImpactDashboard />
      <GreenWall />
      <DigitalPledge />

      {/* Render Modal at the top level to avoid z-index/overflow issues */}
      <AnimatePresence>
        {selectedExpert && (
          <ExpertModal expert={selectedExpert} onClose={() => setSelectedExpert(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
