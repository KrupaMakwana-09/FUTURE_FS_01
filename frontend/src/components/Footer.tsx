import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 bg-background">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-muted-foreground text-sm">
          © 2025 Krupa Makwana. All rights reserved.
        </div>
        
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="https://github.com/KrupaMakwana-09" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Github className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/krupa-makwana-33552231a" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Linkedin className="w-4 h-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:krupa.makwana@email.com" className="hover:text-foreground transition-colors">
            <Mail className="w-4 h-4" />
            <span className="sr-only">Email</span>
          </a>
        </div>

        <div className="text-sm text-muted-foreground">
          Made with ❤️ using React & Tailwind
        </div>
      </div>
    </footer>
  );
}
