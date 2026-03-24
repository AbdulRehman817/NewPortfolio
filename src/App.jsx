import { motion } from "framer-motion";
import { Button } from "../src/components/ui/button";
import { Badge } from "../src/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../src/components/ui/card";
import { Navbar } from "../src/components/Navbar";
import { Footer } from "../src/components/Footer";


// ── Inline SVG icons (zero lucide-react dependency) ────────────────────────
const ArrowRight = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);
const Github = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const ExternalLink = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);
const Mail = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const MapPin = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
// ───────────────────────────────────────────────────────────────────────────

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
    <div className="min-h-screen bg-[#f2f2f0] text-foreground selection:bg-secondary selection:text-white overflow-x-hidden w-full">
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
            <motion.p variants={fadeUp} className="font-mono text-[#332d86] font-bold mb-6 text-lg">
              FULL STACK DEVELOPER
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter leading-[1.05] mb-8 text-balance"
            >
              HI, I'M <span className="text-[#342e87]">ABDUL</span> REHMAN.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
            >
              Crafting clean &amp; modern web solutions — from pixel-perfect UIs to robust backend logic.
            </motion.p>
<motion.div variants={fadeUp} className="flex flex-wrap gap-4">
  
  {/* BLACK BUTTON */}
  <button
    onClick={scrollToWork}
    className="group flex items-center gap-2 bg-black text-white px-8 py-4 text-lg font-medium border-2 border-black hover:bg-transparent hover:text-black transition-all duration-300"
  >
    View My Work
    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
  </button>

  {/* OUTLINE BUTTON */}
  <a
    href="/resume.pdf"
    download
    className="flex items-center justify-center px-8 py-4 text-lg font-medium border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300"
  >
    Download Resume
  </a>

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
                <div className="w-24 h-2 bg-[#342e87] mb-8"></div>
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
  <h3 className="text-xl font-bold mb-6 tracking-wide">
    CORE TECHNOLOGIES
  </h3>

  <div className="flex flex-wrap gap-4">
    {SKILLS.map((skill) => (
      <motion.div key={skill} variants={fadeUp}>
        <div className="px-6 py-3 text-sm  border border-gray-300 bg-white font-bold text-black shadow-sm">
          {skill}
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>
            </div>
          </div>
        </section>

        {/* WORK/PROJECTS SECTION */}
  <section id="work" className="py-24 bg-[#f2f2f0] w-full">
  
  {/* Inner Container */}
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    
    {/* Heading */}
    <div className="mb-16">
      <h2 className="text-4xl md:text-5xl font-black mb-6">
        SELECTED WORK
      </h2>
      <div className="w-24 h-2 bg-black mb-8"></div>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
      {PROJECTS.map((project) => (
        <div
          key={project.id}
          className="border bg-white border-white p-6 flex flex-col justify-between hover:shadow-md transition"
        >
          {/* Top */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              {project.title}
            </h3>

            <p className="text-gray-600 mb-6">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs border px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
        <div className="flex gap-6 mt-8 pt-6 border-t">
  
  <a
    href={project.github}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 text-sm hover:underline"
  >
    <Github className="w-4 h-4" />
    Code
  </a>

  <a
    href={project.live}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 text-sm hover:underline"
  >
    <ExternalLink className="w-4 h-4" />
    Live Site
  </a>

</div>
        </div>
      ))}
    </div>

  </div>
</section>

        {/* SERVICES SECTION */}
      <section
  id="services"
  className="py-24 md:py-32 bg-[#050505] text-white"
>
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    
    {/* Heading */}
    <div className="mb-20">
      <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
        WHAT I DO
      </h2>
      <div className="w-20 h-1 bg-indigo-600"></div>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          className="border border-gray-700 p-8 hover:border-gray-500 transition"
        >
          {/* Title */}
          <h3 className="text-2xl font-semibold mb-4">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-[#342e87] text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
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