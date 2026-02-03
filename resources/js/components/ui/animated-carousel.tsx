import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from './button';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  gradient: string;
  textColor?: string;
}

interface AnimatedCarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  showThumbnails?: boolean;
  className?: string;
  variant?: 'hero' | 'compact' | 'minimal';
}

export function AnimatedCarousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showControls = true,
  showThumbnails = true,
  className = '',
  variant = 'hero'
}: AnimatedCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isPlaying && !isHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isHovered, autoPlayInterval, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (slides.length === 0) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const isCompact = variant === 'compact';
  const isMinimal = variant === 'minimal';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        <AnimatePresence mode="wait" custom={1}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 },
            }}
            className="absolute inset-0"
          >
            <div className={`relative h-full w-full ${slides[currentSlide].gradient}`}>
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className={`relative z-10 flex h-full items-center ${isCompact ? 'p-6' : isMinimal ? 'p-8' : 'p-8 md:p-16'}`}>
                <div className={`max-w-2xl ${isCompact ? 'max-w-lg' : ''}`}>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={`font-bold text-white ${isCompact ? 'text-2xl md:text-3xl' : isMinimal ? 'text-3xl md:text-4xl' : 'text-4xl md:text-6xl lg:text-7xl'}`}
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className={`mt-2 font-semibold text-white/90 ${isCompact ? 'text-lg md:text-xl' : isMinimal ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl lg:text-4xl'}`}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className={`mt-4 text-white/80 ${isCompact ? 'text-sm md:text-base' : isMinimal ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className={`mt-6 flex gap-4 ${isCompact ? 'flex-col sm:flex-row' : ''}`}
                  >
                    <Button
                      size={isCompact ? 'sm' : isMinimal ? 'default' : 'lg'}
                      className="btn-glow gradient-primary text-white shadow-2xl hover:shadow-indigo-500/50"
                    >
                      {slides[currentSlide].ctaText}
                    </Button>

                    {!isCompact && (
                      <Button
                        variant="outline"
                        size={isMinimal ? 'default' : 'lg'}
                        className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                      >
                        Learn More
                      </Button>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              {!isCompact && !isMinimal && (
                <>
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white/10 backdrop-blur-sm"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 right-20 h-20 w-20 rounded-full bg-white/5 backdrop-blur-sm"
                  />
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 text-white shadow-lg backdrop-blur-sm ring-1 ring-white/40 hover:bg-black/55"
          >
            <ChevronLeft className="h-7 w-7" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 text-white shadow-lg backdrop-blur-sm ring-1 ring-white/40 hover:bg-black/55"
          >
            <ChevronRight className="h-7 w-7" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="absolute right-4 top-4 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && variant === 'hero' && (
        <div className="mt-2 flex items-center justify-center gap-2 px-3 pb-2 pt-1">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`relative h-10 w-16 overflow-hidden rounded-md border transition-all ${
                i === currentSlide ? 'border-white shadow-md' : 'border-white/30 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <span className="sr-only">{s.title}</span>
              <div className="absolute inset-0 bg-black/20" />
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {isPlaying && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/50"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
          key={currentSlide}
        />
      )}
    </div>
  );
}
