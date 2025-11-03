import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@repo/ui';

const createContainerVariants = (reduceMotion: boolean) => ({
  hidden: { opacity: reduceMotion ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: reduceMotion ? 0 : 0.3,
      staggerChildren: reduceMotion ? 0 : 0.2
    }
  }
});

const createItemVariants = (reduceMotion: boolean) => ({
  hidden: {
    opacity: reduceMotion ? 1 : 0,
    y: reduceMotion ? 0 : 30,
    scale: reduceMotion ? 1 : 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: reduceMotion ? 0 : 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
});

const createButtonVariants = (reduceMotion: boolean) => ({
  hidden: {
    opacity: reduceMotion ? 1 : 0,
    y: reduceMotion ? 0 : 20,
    scale: reduceMotion ? 1 : 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: reduceMotion ? 0 : 0.6,
      delay: reduceMotion ? 0 : 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  hover: reduceMotion ? {} : {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: reduceMotion ? {} : {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
});

const createBackgroundVariants = (reduceMotion: boolean) => ({
  hidden: {
    background: reduceMotion
      ? "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 100%)"
      : "hsl(var(--background))",
    transition: { duration: 0 }
  },
  visible: {
    background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 100%)",
    transition: {
      duration: reduceMotion ? 0 : 2,
      ease: "easeInOut"
    }
  }
});

interface AnimatedHeroProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  title = "React Starter Kit",
  description = "Modern full-stack web application template optimized for serverless deployment to CDN edge locations. Built with React, TypeScript, and the latest web technologies.",
  primaryButtonText = "Get Started",
  primaryButtonHref = "https://github.com/kriasoft/react-starter-kit",
  secondaryButtonText = "View on GitHub",
  secondaryButtonHref = "https://github.com/kriasoft/react-starter-kit"
}) => {
  // Check if user prefers reduced motion
  const shouldReduceMotion = useReducedMotion();

  // Create variants based on motion preference
  const containerVariants = createContainerVariants(shouldReduceMotion);
  const itemVariants = createItemVariants(shouldReduceMotion);
  const buttonVariants = createButtonVariants(shouldReduceMotion);
  const backgroundVariants = createBackgroundVariants(shouldReduceMotion);

  return (
    <motion.section
      className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center relative overflow-hidden"
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background elements - conditionally render based on motion preference */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/5 rounded-full blur-lg"
            animate={{
              x: [0, 20, 0],
              y: [0, 30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      )}

      <motion.div
        className="container mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
          variants={itemVariants}
        >
          <motion.span
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1, delay: shouldReduceMotion ? 0 : 0.5 }}
          >
            {title.split(' ').map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className="inline-block mr-3"
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 50
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.8,
                  delay: shouldReduceMotion ? 0 : (0.5 + wordIndex * 0.1),
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          {description.split('. ').map((sentence, sentenceIndex) => (
            <motion.span
              key={sentenceIndex}
              className="block mb-2"
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                y: shouldReduceMotion ? 0 : 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.6,
                delay: shouldReduceMotion ? 0 : (0.8 + sentenceIndex * 0.2),
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              {sentence}
              {sentenceIndex < description.split('. ').length - 1 && '.'}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
          variants={buttonVariants}
          whileHover={!shouldReduceMotion ? "hover" : undefined}
          whileTap={!shouldReduceMotion ? "tap" : undefined}
        >
            <Button
              size="lg"
              asChild
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <a
                href={primaryButtonHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">{primaryButtonText}</span>
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            </Button>
          </motion.div>

          <motion.div
          variants={buttonVariants}
          whileHover={!shouldReduceMotion ? "hover" : undefined}
          whileTap={!shouldReduceMotion ? "tap" : undefined}
        >
            <Button
              variant="outline"
              size="lg"
              asChild
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <a
                href={secondaryButtonHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">{secondaryButtonText}</span>
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating indicators */}
        {!shouldReduceMotion ? (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 1, 0.3],
              y: [20, 0, -10]
            }}
            transition={{
              duration: 2,
              delay: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="flex flex-col items-center text-muted-foreground/60">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-2xl"
              >
                ⌄
              </motion.div>
              <span className="text-sm mt-2">Scroll to explore</span>
            </div>
          </motion.div>
        ) : (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center text-muted-foreground/60">
              <div className="text-2xl">⌄</div>
              <span className="text-sm mt-2">Scroll to explore</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default AnimatedHero;