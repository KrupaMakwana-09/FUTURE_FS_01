import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, Mail, ChevronDown ,EyeIcon} from "lucide-react";
import { Button } from "./ui/button";
import krupaPhoto from "@assets/krupa1_1780377029296.jpeg";

const ROLES = [
  "Full Stack Developer",
  "Computer Engineering Student",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        timer = setTimeout(() => {}, 500); // Pause before typing new
      } else {
        timer = setTimeout(() => {
          setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        }, 50); // Deleting speed
      }
    } else {
      if (displayedText === currentRole) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Pause at full text
      } else {
        timer = setTimeout(() => {
          setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        }, 100); // Typing speed
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Particle background simulation */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium mb-2">Hi, I'm</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-accent dark:from-white">
                Krupa Makwana
              </span>
            </h1>
            <div className="h-12 mb-8">
              <span className="text-xl md:text-2xl text-primary/80 font-mono">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white border-0">
                <span className="relative z-10 flex items-center gap-2">
                  View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button asChild variant="outline" className="border-primary/20 hover:border-primary/50 bg-background/50 backdrop-blur">
                <a href="/Resume_Krupa_Makwana.pdf" target="_blank" rel="noopener noreferrer">
                  <EyeIcon className="w-4 h-4 mr-2" /> View Resume
                </a>
              </Button>
              <Button asChild variant="outline" className="border-primary/20 hover:border-primary/50 bg-background/50 backdrop-blur">
                <a href="/Resume_Krupa_Makwana.pdf" download>
                  <Download className="w-4 h-4 mr-2" /> Download Resume
                </a>
              </Button>
              <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} variant="ghost" className="hover:bg-primary/10">
                <Mail className="w-4 h-4 mr-2" /> Contact Me
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent animate-spin-slow opacity-20 blur-2xl" />
              <div className="absolute inset-2 rounded-full border-2 border-primary/30 p-2">
                <div className="w-full h-full rounded-full bg-card/80 backdrop-blur-sm border border-white/10 overflow-hidden">
                  <img
                    src={krupaPhoto}
                    alt="Krupa Makwana"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 20%" }}
                    data-testid="img-hero-avatar"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce cursor-pointer"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
