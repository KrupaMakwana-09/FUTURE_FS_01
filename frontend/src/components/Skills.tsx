import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2 } from "lucide-react";
import { 
  SiC, SiCplusplus, SiJavascript, SiPython, 
  SiHtml5, SiCss, SiReact, SiTailwindcss, 
  SiNodedotjs, SiExpress, SiMongodb, SiMysql, 
  SiGit, SiGithub, SiPostman,
  SiOpenjdk
} from "react-icons/si";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "C", icon: SiC, level: 85, color: "text-blue-500" },
      { name: "C++", icon: SiCplusplus, level: 85, color: "text-blue-600" },
      { name: "Java", icon: SiOpenjdk, level: 75, color: "text-red-500" },
      { name: "JavaScript", icon: SiJavascript, level: 80, color: "text-yellow-400" },
      { name: "Python", icon: SiPython, level: 70, color: "text-blue-400" },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: SiHtml5, level: 92, color: "text-orange-500" },
      { name: "CSS3", icon: SiCss, level: 90, color: "text-blue-500" },
      { name: "React.js", icon: SiReact, level: 80, color: "text-cyan-400" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 80, color: "text-teal-400" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 80, color: "text-green-500" },
      { name: "Express.js", icon: SiExpress, level: 75, color: "text-gray-400" },
    ]
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: 80, color: "text-green-600" },
      { name: "MySQL", icon: SiMysql, level: 75, color: "text-blue-500" },
    ]
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: SiGit, level: 85, color: "text-orange-600" },
      { name: "GitHub", icon: SiGithub, level: 90, color: "text-white" },
      { name: "VS Code", icon: Code2, level: 95, color: "text-blue-500" },
      { name: "Postman", icon: SiPostman, level: 85, color: "text-orange-500" },
    ]
  }
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants} className="glass-panel p-6">
              <h3 className="text-lg font-semibold mb-6 text-foreground border-b border-white/10 pb-2">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, sIdx) => {
                  const Icon = skill.icon;
                  return (
                    <div key={sIdx}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${skill.color}`} />
                          <span className="text-sm font-medium">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1) }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
