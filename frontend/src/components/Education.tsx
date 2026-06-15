import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              className="glass-panel p-6 hover:-translate-y-1 transition-transform"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-foreground">Bachelor of Engineering in Computer Engineering</h3>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  2026 – Present
                </span>
              </div>
              <h4 className="text-lg text-muted-foreground mb-4 font-medium">Marwadi University, Rajkot, Gujarat</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Currently pursuing a Bachelor of Engineering in Computer Engineering and have successfully completed the 2nd year of the program. Studying core computer science subjects including Data Structures and Algorithms, Database Management Systems (DBMS), Object-Oriented Programming (OOP), Web Technologies, Computer Networks, Operating Systems, Computer Organization and Architecture, Discrete Mathematics, and Graph Theory. Actively participating in technical workshops, coding challenges, and hands-on projects to strengthen problem-solving and software development skills.
              </p>
            </motion.div>

            <motion.div
              className="glass-panel p-6 hover:-translate-y-1 transition-transform"
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-foreground">Higher Secondary Certificate (HSC)</h3>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                  March 2024
                </span>
              </div>
              <h4 className="text-lg text-muted-foreground mb-4 font-medium">BAPS Swaminarayan Vidhya Mandir, Gondal, Gujarat</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Completed Higher Secondary Education with 85.56%, demonstrating strong academic performance and a solid foundation in mathematics, science, and analytical thinking. Actively participating in technical workshops, coding challenges, and hands-on projects to strengthen problem-solving and software development skills.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
