import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// --- REAL DATA ---
const SKILLS = [
  "HTML", "CSS", "JavaScript", "React", "Tailwind CSS",
  "Next.js", "Node.js", "Express", "MongoDB", "Firebase",
  "GitHub", "Auth.js", "GraphQL", "PostgreSQL", "REST APIs"
];

const SERVICES = [
  {
    id: 1,
    title: "User Interface Design",
    description: "Designing beautiful, responsive, and user-friendly web interfaces using modern tools.",
    tags: ["TailwindCSS", "UX Focused", "React", "Next.js"],
  },
  {
    id: 2,
    title: "Smart Server Logic",
    description: "Building secure and scalable backends with modern technologies for smart web apps.",
    tags: ["Node.js", "GraphQL", "PostgreSQL", "MongoDB"],
  },
  {
    id: 3,
    title: "API Integration",
    description: "Seamlessly connecting apps with external services for enhanced functionality.",
    tags: ["REST APIs", "Auth0", "Firebase", "AppWrite"],
  },
];

const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with React JS, MongoDB, and Tailwind CSS. Includes product listings, cart, checkout, and admin panel.",
    tech: ["React JS", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 2,
    title: "Shopping Store",
    description: "A responsive e-commerce app built with Next.js, TypeScript, MongoDB/Mongoose, and Tailwind CSS. Features full product CRUD and authentication.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: 3,
    title: "Chat App",
    description: "A real-time messaging platform that allows users to communicate instantly. Built with WebSocket connections and a clean, minimal UI.",
    tech: ["React", "Node.js", "Socket.io", "Express"],
    github: "https://github.com",
    live: "https://example.com",
  }
];

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section id="hero" className="pt-48 pb-24 md:pt-64 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.p variants={fadeUp} className="font-mono text-secondary font-bold mb-6 text-lg">
              FULL STACK DEVELOPER
            </motion.p>
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter leading-[1.05] mb-8 text-balance"
            >
              HI, I'M <span className="text-secondary">ABDUL</span> REHMAN.
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            >
              Crafting clean & modern web solutions — from pixel-perfect UIs to robust backend logic.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button size="lg" onClick={scrollToWork} className="group">
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/resume.pdf" download>Download Resume</a>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 md:py-32 bg-card border-y-2 border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="md:col-span-5"
              >
                <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight mb-6">ABOUT ME</h2>
                <div className="w-24 h-2 bg-secondary mb-8"></div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I'm a Full Stack Developer passionate about crafting smooth, modern, and responsive web applications. I enjoy turning ideas into reality using the latest web technologies.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether it's building clean UI/UX or managing robust backend logic, I focus on writing efficient and elegant code that solves real-world problems. I'm always exploring new tools and staying inspired by design and technology.
                </p>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="md:col-span-7 flex flex-col justify-center"
              >
                <h3 className="text-xl font-bold font-display mb-6">CORE TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-3">
                  {SKILLS.map((skill, index) => (
                    <motion.div key={skill} variants={fadeUp}>
                      <Badge variant="surface" className="text-sm py-2 px-4 shadow-sm">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WORK/PROJECTS SECTION */}
        <section id="work" className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-6">SELECTED WORK</h2>
            <div className="w-24 h-2 bg-primary"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-secondary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base text-foreground/80 mb-6">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((t) => (
                        <Badge key={t} variant="outline" className="font-mono text-[10px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t-2 border-border/50 pt-6 mt-auto">
                    <Button variant="ghost" size="sm" asChild className="font-bold -ml-2">
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github className="w-4 h-4 mr-2" /> Code
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="font-bold">
                      <a href={project.live} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" /> Live Site
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 md:py-32 bg-primary text-primary-foreground border-y-2 border-primary">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="mb-16 md:mb-24"
            >
              <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-6 text-[#ffffff]">WHAT I DO</h2>
              <div className="w-24 h-2 bg-secondary"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <motion.div
                  key={service.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  className="border-2 border-primary-foreground/20 p-8"
                >
                  <h3 className="text-2xl font-bold font-display mb-4 text-[#ffffff]">{service.title}</h3>
                  <p className="text-primary-foreground/70 leading-relaxed mb-6">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 md:py-48 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-2xl mx-auto flex flex-col items-center"
          >
            <h2 className="text-5xl md:text-7xl font-black font-display tracking-tight mb-8">LET'S TALK.</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Currently open for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            <Button size="lg" asChild className="text-lg px-12 h-16 shadow-md hover:-translate-y-1 transition-transform">
              <a href="mailto:abdulrehmanbey1718@gmail.com">
                <Mail className="w-5 h-5 mr-3" />
                abdulrehmanbey1718@gmail.com
              </a>
            </Button>
            
            <div className="mt-8 flex flex-col items-center gap-3 text-muted-foreground font-mono font-semibold">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Karachi, Pakistan
              </div>
              <a href="tel:+923313301452" className="hover:text-secondary transition-colors">
                +(92) 331 330 1452
              </a>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
