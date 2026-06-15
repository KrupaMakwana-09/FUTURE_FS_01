import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative bg-primary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <motion.div 
              className="glass-panel p-8 md:p-10 hover:border-primary/30 transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Future Interns</h3>
                    <h4 className="text-lg text-primary font-medium">Full Stack Web Development Intern</h4>
                  </div>
                </div>
                <div className="bg-background border border-white/10 px-4 py-2 rounded-full text-sm text-muted-foreground whitespace-nowrap w-fit">
                  Internship
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Worked on full-stack projects, gaining hands-on experience in building modern web applications 
                  using React, Node.js, and MongoDB.
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Designed and implemented responsive frontend interfaces with React and Tailwind CSS.</li>
                  <li>Built scalable REST APIs using Express and Node.js for robust backend communication.</li>
                  <li>Collaborated in a team environment, participating in code reviews and agile workflows.</li>
                  <li>Integrated database solutions ensuring data integrity and fast query performance.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="glass-panel p-8 md:p-10 hover:border-primary/30 transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-secondary/20">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Codsoft</h3>
                    <h4 className="text-lg text-primary font-medium">Web Developer Intern</h4>
                  </div>
                </div>
                <div className="bg-background border border-white/10 px-4 py-2 rounded-full text-sm text-muted-foreground whitespace-nowrap w-fit">
                  Internship
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Currently working as a Web Developer Intern at Codsoft, focusing on web application interfaces and user-facing experiences. The internship is ongoing and is expected to complete in June.
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>Building responsive web pages using React and Tailwind CSS for modern browser experiences.</li>
                  <li>Collaborating on UI/UX improvements and cross-browser compatibility fixes.</li>
                  <li>Integrating frontend components with REST APIs and data-driven interfaces.</li>
                  <li>Troubleshooting web bugs, improving performance, and maintaining documentation.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
