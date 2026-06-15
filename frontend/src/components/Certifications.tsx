import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Award, EyeIcon } from "lucide-react";

const certifications = [
  {
    title: "CCNA Introduction to Networks",
    issuer: "Certificate",
    gradient: "from-sky-500 to-cyan-600",
    pdf: "/certificates/ccna-introduction.pdf",
  },
  {
    title: "CCNA Switching, Routing, and Wireless Essentials",
    issuer: "Certificate",
    gradient: "from-teal-500 to-emerald-600",
    pdf: "/certificates/ccna-switching.pdf",
  },
  {
    title: "Linux Essentials",
    issuer: "Certificate",
    gradient: "from-amber-500 to-orange-600",
    pdf: "/certificates/linux-essentials.pdf",
  },
  {
    title: "Operating Systems Basics",
    issuer: "Certificate",
    gradient: "from-red-500 to-pink-600",
    pdf: "/certificates/os-basics.pdf",
  },
];

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

 const openPDF = (url: string | undefined) => {
  if (!url) return;
  window.open(url, "_blank");
};

  return (
    <section id="certifications" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Certifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                className="glass-panel overflow-hidden group relative"
                whileHover={{ y: -8 }}
              >
                {/* gradient bar */}
                <div className={`h-2 bg-gradient-to-r ${cert.gradient}`} />

                <div className="p-6">
                  {/* view button */}
                  <button
                    onClick={() => openPDF(cert.pdf)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <EyeIcon className="w-5 h-5 text-primary" />
                  </button>

                  {/* icon */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-primary" />
                  </div>

                  {/* content */}
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  <p className="text-muted-foreground">{cert.issuer}</p>

                  {/* open button */}
                  <button
                    onClick={() => openPDF(cert.pdf)}
                    className="mt-4 text-sm text-primary hover:underline"
                  >
                    View Certificate
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}