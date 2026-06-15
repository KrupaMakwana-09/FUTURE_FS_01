import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, Send, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(null);
  const [formMessage, setFormMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    setFormMessage("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/contact`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I will get back to you soon.",
      });
      setFormStatus("success");
      setFormMessage("Your message has been sent successfully.");
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unable to send message",
        description: "Please try again later or email me directly.",
      });
      setFormStatus("error");
      setFormMessage("Unable to send your message right now. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
            <p className="mt-4 text-muted-foreground">Feel free to reach out for collaborations or just a friendly hello!</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="md:col-span-2 space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <a href="mailto:krupamakwana16@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-white/5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>krupamakwana16@gmail.com</span>
                  </a>
                  
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-white/5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span>Gujarat, India</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Social Profiles</h4>
                  <div className="flex gap-4">
                    <a href="https://github.com/KrupaMakwana-09" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-white/5 hover:bg-primary hover:text-white hover:border-primary transition-all">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/krupa-makwana-33552231a" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-background flex items-center justify-center border border-white/5 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="glass-panel p-6 lg:p-8 space-y-4">
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                    <Input id="name" name="name" required placeholder="John Doe" className="bg-background/50 border-white/10 focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Your Email</label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-background/50 border-white/10 focus:border-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" name="subject" required placeholder="Project Inquiry" className="bg-background/50 border-white/10 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" name="message" required placeholder="How can I help you?" className="min-h-[150px] bg-background/50 border-white/10 focus:border-primary resize-none" />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white py-6">
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" /> Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Send Message
                    </div>
                  )}
                </Button>
                {formStatus && (
                  <div
                    className={`rounded-lg px-4 py-3 text-sm font-medium mt-4 ${
                      formStatus === "success"
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        : "bg-red-500/10 text-red-500 border border-red-500/20"
                    }`}
                    role="status"
                  >
                    {formMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
