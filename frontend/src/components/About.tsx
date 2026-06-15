import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 glass-panel p-8">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Computer Engineering Student</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hi, I'm Krupa Makwana, a Computer Engineering student with a strong passion for software development and web technologies. I enjoy building responsive, user-friendly applications and continuously expanding my knowledge of modern development tools and frameworks. Through academic and personal projects, I have developed skills in programming, problem-solving, database management, and web development. I am eager to apply my technical skills in real-world environments, collaborate with experienced professionals, and contribute to meaningful projects while growing as a developer.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 text-center hover:-translate-y-1 transition-transform">
                <div className="text-4xl font-bold text-primary mb-2">
                  <Counter end={2} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Years Learning</div>
              </div>
              <div className="glass-panel p-6 text-center hover:-translate-y-1 transition-transform">
                <div className="text-4xl font-bold text-accent mb-2">
                  <Counter end={10} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Projects</div>
              </div>
              <div className="glass-panel p-6 text-center hover:-translate-y-1 transition-transform">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  <Counter end={5} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Technologies</div>
              </div>
              <div className="glass-panel p-6 text-center flex flex-col items-center justify-center hover:-translate-y-1 transition-transform bg-primary/5">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mb-3" />
                <div className="text-sm font-semibold text-foreground uppercase tracking-wider">Open to Opportunities</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
