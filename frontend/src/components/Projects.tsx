import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const CATEGORIES = ["All", "Full Stack", "Frontend"];

const projects = [
  {
    title: "Personal Portfolio Website",
    description: "A premium, dark-themed personal portfolio showcasing skills, projects, and experience with modern animations.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    github: "https://github.com/KrupaMakwana-09",
    live: "#",
    gradient: "from-purple-600 to-blue-600"
  },
  
  {
    title: "Smart Calculator",
    description: "A professional web calculator featuring responsive grid keyboard, dynamic math evaluation, history tracking, and a seamless light/dark mode transition.",
    tech: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6)"],
    category: "Frontend",
    github: "https://github.com/KrupaMakwana-09/CODSOFT-03",
    live: "https://krupamakwana-09.github.io/CODSOFT-03/",
    gradient: "from-orange-500 via-red-500 to-pink-500"
  },
  {
    title: "Responsive Landing Page",
    description: "A sleek, modern and fully responsive landing page built with clean layouts, engaging call-to-actions, and beautiful animations to maximize user conversion.",
    tech: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6)"],
    category: "Frontend",
    github: "https://github.com/KrupaMakwana-09/CODSOFT",
    live: "https://krupamakwana-09.github.io/CODSOFT/",
    gradient: "from-blue-500 via-indigo-500 to-purple-500"
 }
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-8" />
            
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat 
                      ? "bg-primary text-white" 
                      : "bg-white/5 text-muted-foreground hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="glass-panel overflow-hidden group flex flex-col h-full"
                >
                  <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center relative overflow-hidden`}>
                     <div className="absolute inset-0 bg-black/20" />
                     <h3 className="text-2xl font-bold text-white z-10 px-4 text-center">{project.title}</h3>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-muted-foreground text-sm mb-6 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded bg-background border border-white/5 text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-auto">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent border-white/10 hover:bg-white/5" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" /> Code
                        </a>
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-white" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" /> Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
