import { 
  
   
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  Cpu, 
  Globe, 
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Database,
  Server,
  Lock,
  Link,
  Flame,
  Wind,
  Atom,
  FileCode,
  BarChart2,
  Table,
  Hash
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring,
  useMotionValue, 
  useMotionValueEvent,
  animate 
} from "motion/react";


const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with React JS and Node.js/Express",
    longDescription: "A full-featured e-commerce platform built with React JS on the frontend and Node.js/Express on the backend. MongoDB handles data persistence. Includes a complete admin panel for inventory management.",
    image: "https://picsum.photos/seed/quantum/1200/800",
   tags:['React JS','MongoDB','Tailwind CSS','Node.js','Express'],
    link: "#",
    github: "#",
    gallery: [
      "https://picsum.photos/seed/q1/1200/800",
      "https://picsum.photos/seed/q2/1200/800",
      "https://picsum.photos/seed/q3/1200/800"
    ]
  },
  {
    id: 2,
    title: "Chat App",
    description: "A real-time messaging platform built on React using Firebase.",
    longDescription: "A real-time messaging platform built on React using Firebase. Users can send messages instantly, and see online status — all without page refreshes.",
    image: "https://picsum.photos/seed/fashion/1200/800",
    tags:['React JS','Firebase','Tailwind CSS'],
    link: "#",
    github: "#",
    gallery: [
      "https://picsum.photos/seed/e1/1200/800",
      "https://picsum.photos/seed/e2/1200/800",
      "https://picsum.photos/seed/e3/1200/800"
    ]
  },
  {
    id: 3,
    title: "Software Company Landing Page",
    description: "A modern and responsive software company landing page",
    longDescription: "A modern and responsive software company website built to showcase services like custom development, IT consulting, and team augmentation. Designed with a focus on clean UI, scalability, and professional business presentation.",
    tags:["React","Tailwind CSS","Lucide-React"],
    image: "https://picsum.photos/seed/social/1200/800",
   
    link: "#",
    github: "#",
    gallery: [
      "https://picsum.photos/seed/n1/1200/800",
      "https://picsum.photos/seed/n2/1200/800",
      "https://picsum.photos/seed/n3/1200/800"
    ]
  }
];

const SKILLS = [
  { name: "HTML", level: 98, icon: <FileCode className="w-5 h-5" />, description: "Expert in semantic HTML5, accessibility (ARIA), and SEO best practices." },
  { name: "CSS", level: 95, icon: <Palette className="w-5 h-5" />, description: "Advanced CSS3, Flexbox, Grid, and complex animations with modern techniques." },
  { name: "JavaScript", level: 92, icon: <Code2 className="w-5 h-5" />, description: "Deep understanding of ES6+, asynchronous programming, and functional patterns." },
  { name: "React", level: 95, icon: <Atom className="w-5 h-5" />, description: "Proficient in hooks, context API, performance optimization, and state management." },
  { name: "Next.js", level: 90, icon: <Globe className="w-5 h-5" />, description: "Experienced in SSR, SSG, ISR, and App Router for high-performance apps." },
  { name: "Tailwind CSS", level: 98, icon: <Wind className="w-5 h-5" />, description: "Rapid UI development with utility-first CSS and custom configuration." },
  { name: "Node.js", level: 85, icon: <Server className="w-5 h-5" />, description: "Building scalable server-side applications and RESTful microservices." },
  { name: "Express", level: 82, icon: <Cpu className="w-5 h-5" />, description: "Middleware development, routing, and backend logic for web services." },
  { name: "MongoDB", level: 80, icon: <Database className="w-5 h-5" />, description: "NoSQL database design, aggregation pipelines, and data modeling." },
  { name: "Firebase", level: 88, icon: <Flame className="w-5 h-5" />, description: "Real-time databases, authentication, and serverless cloud functions." },
  { name: "REST APIs", level: 90, icon: <Link className="w-5 h-5" />, description: "Designing and consuming secure, well-documented API endpoints." },
  { name: "Auth.js", level: 85, icon: <Lock className="w-5 h-5" />, description: "Implementing secure authentication flows and session management." },
  { name: "GitHub", level: 95, icon: <FiGithub className="w-5 h-5" />, description: "Version control, collaborative workflows, and CI/CD integration." },

  // Data Science
  { name: "Python", level: 40, icon: <Code2 className="w-5 h-5" />, description: "Learning Python fundamentals, scripting, and data-focused libraries." },
  { name: "Pandas", level: 35, icon: <Table className="w-5 h-5" />, description: "Exploring data manipulation, cleaning, and analysis with DataFrames." },
  { name: "NumPy", level: 35, icon: <Hash className="w-5 h-5" />, description: "Working with numerical arrays and mathematical operations for data processing." },
  { name: "Matplotlib", level: 30, icon: <BarChart2 className="w-5 h-5" />, description: "Creating data visualizations and charts to communicate insights clearly." },
];

// --- Components ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 2);
      dotY.set(e.clientY - 2);
    };

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <>
      <motion.div 
        className="custom-cursor hidden md:block will-change-transform" 
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? "rgba(99, 102, 241, 0.1)" : "transparent",
          borderColor: isHovered ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.3)"
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      />
      <motion.div 
        className="custom-cursor-dot hidden md:block will-change-transform" 
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: isHovered ? 0 : 1
        }}
      />
    </>
  );
};

const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const SkillCard = ({ skill, index }) => {
  const percentageRef = useRef(null);
  const hasAnimated = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => {
        if (!hasAnimated.current && percentageRef.current) {
          animate(0, skill.level, {
            duration: 1.5,
            ease: "easeOut",
            delay: 0.2 + (index * 0.05),
            onUpdate: (latest) => {
              if (percentageRef.current) {
                percentageRef.current.textContent = `${Math.round(latest)}%`;
              }
            }
          });
          hasAnimated.current = true;
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 cursor-help will-change-transform"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-500">
            {skill.icon}
          </div>
          <h4 className="text-lg font-bold tracking-tight text-zinc-200 group-hover:text-white transition-colors">{skill.name}</h4>
        </div>
        <div 
          ref={percentageRef}
          className="text-sm font-mono font-bold text-zinc-500 group-hover:text-indigo-400 transition-colors"
        >
          0%
        </div>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ 
            type: "spring", 
            stiffness: 50, 
            damping: 20, 
            delay: 0.2 + (index * 0.05) 
          }}
          viewport={{ once: true }}
          className="h-full bg-indigo-500 relative overflow-hidden"
        >
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-0 w-full mb-4 z-50 pointer-events-none"
          >
            <div className="p-4 rounded-xl bg-indigo-600 text-white shadow-2xl relative">
              <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Proficiency: {skill.level}%</div>
              <p className="text-sm leading-relaxed font-medium">{skill.description}</p>
              <div className="absolute top-full left-6 w-3 h-3 bg-indigo-600 rotate-45 -translate-y-1.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ContactModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-indigo-500 font-mono text-xs uppercase tracking-widest block">Contact</span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">LET'S WORK TOGETHER</h2>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-indigo-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Message</label>
                    <textarea 
                      rows={4}
                      placeholder="Tell me about your project..." 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-hidden focus:border-indigo-500/50 transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full py-5 bg-white text-black rounded-2xl font-bold hover:bg-zinc-200 transition-all active:scale-95">
                    Send Message
                  </button>
                </form>

                <div className="space-y-6 pt-4">
                  <div className="h-px w-full bg-white/10" />
                  <div className="text-center space-y-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 block">OR REACH ME DIRECTLY</span>
                    <div className="flex justify-center space-x-4">
                      <a href="mailto:abdulrehmanbey1718@gmail.com" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-all">
                        <Mail className="w-5 h-5" />
                      </a>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-all">
                       <FiGithub className="w-5 h-5"/>
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500/50 transition-all">
                        <LuLinkedin className="w-5 h-5"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <div className="relative aspect-video w-full">
            {project.videoUrl ? (
              <video 
                src={project.videoUrl} 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-indigo-500 text-white">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">{project.title}</h2>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-6 text-white">About the Project</h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-12">
                  {project.longDescription}
                </p>
                
                <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-indigo-500 pl-4">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.gallery.map((img, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl overflow-hidden aspect-video relative group/img"
                    >
                      <img 
                        src={img} 
                        alt={`${project.title} gallery ${i}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Links</h4>
                  <div className="space-y-4">
                    <a href={project.link} className="flex items-center justify-between p-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors">
                      Live Preview <ExternalLink className="w-4 h-4" />
                    </a>
                    {project.github && (
                      <a href={project.github} className="flex items-center justify-between p-3 rounded-xl glass text-white font-bold hover:bg-white/10 transition-colors">
                        Source Code <FiGithub className="w-4 h-4"/>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.map(tag => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 rounded-lg bg-white/5 text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative z-[110]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl md:text-3xl font-display font-bold tracking-tighter cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          AR<span className="text-indigo-500">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
         
          <button 
            onClick={onContactClick}
            className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-[120] p-2 -mr-2 text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            className="w-6 h-6 flex flex-col justify-center space-y-1.5"
          >
            <motion.span 
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } }}
              className="w-full h-0.5 bg-white rounded-full block origin-center"
            />
            <motion.span 
              variants={{ closed: { opacity: 1, x: 0 }, open: { opacity: 0, x: 10 } }}
              className="w-full h-0.5 bg-white rounded-full block"
            />
            <motion.span 
              variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 } }}
              className="w-full h-0.5 bg-white rounded-full block origin-center"
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[100] bg-black md:hidden flex flex-col justify-center items-center p-6"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
            
            <div className="flex flex-col items-center space-y-8 w-full max-w-xs">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={linkVariants}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-display font-bold text-white hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div variants={linkVariants} className="pt-8 flex space-x-8">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full glass text-white">
                  <FiGithub className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full glass text-white">
                 <LuLinkedin className="w-6 h-6"/>
                </a>
              </motion.div>

              <motion.button 
                variants={linkVariants}
                onClick={() => {
                  setIsMenuOpen(false);
                  onContactClick();
                }}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold text-lg"
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProjectCard = ({ project, onClick }) => {
const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  const imgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const imgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        y: -15,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={onClick}
      className="group cursor-pointer relative perspective-1000 will-change-transform"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="aspect-video overflow-hidden rounded-2xl md:rounded-[2rem] mb-6 md:mb-8 bg-zinc-900 border border-white/5 relative group-hover:shadow-[0_30px_60px_rgba(99,102,241,0.25)] transition-shadow duration-500"
      >
        <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-500 z-10" />
        <motion.img 
          src={project.image} 
          alt={project.title} 
          style={{ x: imgX, y: imgY, scale: 1.2 }}
          className="w-full h-full object-cover transition-opacity duration-500 opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="px-2">
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-3 mb-3 md:mb-4"
        >
         
        </motion.div>
        
        <motion.h3 
          variants={itemVariants}
          whileHover={{ x: 5 }}
          className="text-xl md:text-2xl font-display font-bold mb-3 md:mb-4 group-hover:text-white transition-colors tracking-tight flex items-center"
        >
          {project.title}
          <ArrowRight className="w-5 h-5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-indigo-500" />
        </motion.h3>
        
        <motion.p 
          variants={itemVariants}
          className="text-zinc-500 text-sm md:text-base line-clamp-2 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300"
        >
          {project.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500/30 mesh-gradient overflow-x-hidden">
      <div className="noise" />
      <CustomCursor />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            x: [0, 80, 0],
            y: [0, 40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl will-change-transform"
        />
        <motion.div 
          animate={{ 
            x: [0, -120, 0],
            y: [0, 80, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-purple-500/5 rounded-full blur-2xl will-change-transform"
        />
      </div>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-500 z-[150] origin-left shadow-[0_0_20px_rgba(99,102,241,0.5)]"
        style={{ scaleX }}
      >
        <div className="absolute top-0 right-0 h-full w-24 bg-linear-to-r from-transparent to-white/40 blur-sm" />
      </motion.div>

      <Navbar onContactClick={() => setIsContactModalOpen(true)} />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
        {/* Background Marquee */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.03] select-none overflow-hidden whitespace-nowrap z-0">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="text-[20vw] font-display font-black uppercase leading-none flex will-change-transform"
          >
            <span>DEVELOPER • DESIGNER • CREATOR •&nbsp;</span>
            <span>DEVELOPER • DESIGNER • CREATOR •&nbsp;</span>
          </motion.div>
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 -z-10 opacity-20" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
            backgroundSize: "60px 60px"
          }} 
        />
        
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[-10%] -left-20 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] will-change-transform" 
          />
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-[-10%] -right-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] will-change-transform" 
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-4 mb-8"
            >
             
             
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[clamp(80px,11vw,180px)] font-display font-bold tracking-tighter mb-12 leading-[0.85] uppercase"
            >
              ABDUL <br />
              <span className="text-gradient inline-block transform -skew-x-6">REHMAN</span>
            </motion.h1>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-6 items-center"
              >
                <MagneticButton 
                  className="px-10 py-5 bg-white text-black rounded-2xl font-bold hover:bg-zinc-200 transition-all flex items-center group text-lg shadow-2xl shadow-white/10"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Projects <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                
                <motion.a 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  href="/public/resume.pdf" 
                  download 
                  className="px-8 py-5 bg-zinc-900/40 border border-white/10 rounded-2xl flex items-center space-x-3 hover:bg-white/10 hover:border-indigo-500/30 transition-all group glass"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <ExternalLink className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white transition-colors">Download Resume</span>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="hidden lg:block text-right"
              >
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2">Based in</p>
                <p className="text-white font-bold text-xl">Pakistan, Asia</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
       
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 border-y border-white/5 bg-zinc-900/10 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Left Side: Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <span className="text-indigo-500 font-mono text-xs uppercase tracking-widest mb-8 block">About Me</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] uppercase">
                I BUILD THINGS THAT WORK <br />
                AND LOOK <span className="text-indigo-500">GREAT.</span>
              </h2>
            </motion.div>

            {/* Right Side: Content */}
            <div className="lg:w-1/2 flex flex-col md:flex-row gap-8 lg:gap-12">
              {/* Vertical Divider (Visible on Desktop) */}
              <div className="hidden md:block w-px h-auto bg-white/10 self-stretch" />

              <div className="flex-1 space-y-12">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-zinc-400 text-lg md:text-xl leading-relaxed"
                >
I'm Abdul Rehman, based in Pakistan — a full-stack developer with a growing passion for Data Science. I've built robust web applications using React, Node.js, and MongoDB, and I'm now expanding my skills with Python, data analysis, and machine learning. I believe in clean code, bold design, and experiences that leave a mark.                </motion.p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {[
                    { label: "PROJECTS", value: "15", suffix: "+" },
                    { label: "YEARS", value: "02", suffix: "+" },
                    { label: "DEDICATION", value: "100", suffix: "%" },
                    { label: "PASSION", value: "24", suffix: "/7" }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="p-6 md:p-8 bg-zinc-900/40 border border-white/5 rounded-2xl group hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden will-change-transform"
                    >
                      <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-500" />
                      <div className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter mb-2 relative z-10">
                        {stat.value}<span className="text-indigo-500">{stat.suffix}</span>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 relative z-10 group-hover:text-zinc-400 transition-colors">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-indigo-500 font-mono text-xs uppercase tracking-widest mb-4 block">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Featured Projects</h2>
              <p className="text-zinc-500 text-lg">A selection of my recent works across various industries and technologies.</p>
            </div>
            <button className="text-indigo-400 font-bold flex items-center hover:gap-3 transition-all group">
              View All Projects <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12 space-y-8 md:space-y-12">
            {PROJECTS.map((project) => (
              <div key={project.id} className="break-inside-avoid pt-4">
                <ProjectCard 
                  project={project} 
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
    <section id="services" className="py-32 relative overflow-hidden">
  <div className="absolute inset-0 bg-zinc-900/10 -z-10" />
  <div className="container mx-auto px-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
      <div className="max-w-2xl">
        <span className="text-indigo-500 font-mono text-xs uppercase tracking-widest mb-4 block">Expertise</span>
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Services</h2>
        <p className="text-zinc-500 text-lg">Specialized solutions for modern digital challenges, blending aesthetics with technical excellence.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {[
        { 
          name: "UI/UX DESIGN", 
          icon: <Palette className="w-8 h-8" />, 
          desc: "Crafting visually stunning and intuitive user experiences that resonate with users.",
          tags: ["Figma", "Design Systems", "Prototyping"],
          isNew: false
        },
        { 
          name: "SERVER LOGIC", 
          icon: <Cpu className="w-8 h-8" />, 
          desc: "Building robust, scalable, and high-performance backend architectures for complex apps.",
          tags: ["Node.js", "PostgreSQL", "Architecture"],
          isNew: false
        },
        { 
          name: "API INTEGRATION", 
          icon: <Globe className="w-8 h-8" />, 
          desc: "Connecting systems with high-performance API solutions and seamless data flow.",
          tags: ["REST", "GraphQL", "Webhooks"],
          isNew: false
        },
        { 
          name: "DATA SCIENCE", 
          icon: <BarChart2 className="w-8 h-8" />, 
          desc: "Exploring data analysis, visualization, and machine learning to turn raw data into real insights.",
          tags: ["Python", "Pandas", "NumPy", "Matplotlib"],
          isNew: true
        }
      ].map((service, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`p-10 bg-zinc-900/40 border rounded-[2.5rem] group transition-all duration-500 relative overflow-hidden flex flex-col h-full will-change-transform ${
            service.isNew
              ? "border-amber-500/20 hover:border-amber-500/40"
              : "border-white/5 hover:border-indigo-500/30"
          }`}
        >
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            service.isNew
              ? "bg-linear-to-b from-amber-500/0 to-amber-500/5"
              : "bg-linear-to-b from-indigo-500/0 to-indigo-500/5"
          }`} />

          {service.isNew && (
            <span className="absolute top-6 right-6 text-[10px] font-mono uppercase tracking-widest text-amber-400/80 border border-amber-500/20 px-2 py-1 rounded-md">
              Learning
            </span>
          )}

          <div className={`w-16 h-16 rounded-2xl bg-zinc-900 border flex items-center justify-center mb-10 transition-all duration-500 relative z-10 group-hover:scale-110 ${
            service.isNew
              ? "text-amber-400 border-white/10 group-hover:bg-amber-500/10 group-hover:border-amber-500/20"
              : "text-indigo-400 border-white/10 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20"
          }`}>
            {service.icon}
          </div>

          <h4 className="text-2xl font-bold mb-4 tracking-tight relative z-10 group-hover:text-white transition-colors">
            {service.name}
          </h4>
          <p className="text-zinc-500 text-lg leading-relaxed mb-8 relative z-10 group-hover:text-zinc-400 transition-colors flex-grow">
            {service.desc}
          </p>
          <div className="flex flex-wrap gap-2 relative z-10">
            {service.tags.map(tag => (
              <span key={tag} className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-1 rounded-md ${
                service.isNew
                  ? "text-amber-400/60 border-amber-500/10"
                  : "text-indigo-400/60 border-indigo-500/10"
              }`}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Skills Section */}
      <section id="skills" className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-indigo-500 font-mono text-xs uppercase tracking-widest mb-4 block">Stack</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Skills</h2>
            <p className="text-zinc-500 text-lg">A deep dive into my technical toolkit and proficiency levels.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {SKILLS.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 md:py-48">
        <div className="container mx-auto px-6">
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12 md:space-y-20"
            >
              <div className="space-y-4">
                <span className="text-indigo-500 font-mono text-xs uppercase tracking-widest block">Get in touch</span>
                <h2 className="text-4xl md:text-8xl font-display font-bold leading-tight">
                  Let's Build Something <br className="hidden md:block" />
                  <span className="text-gradient">Together</span>
                </h2>
              </div>

              <div className="flex flex-col items-center space-y-12">
                <div className="space-y-8 flex flex-col items-center">
                  <a href="mailto:hello@nexus.io" className=" text-2xl md:text-4xl font-bold hover:text-indigo-400 transition-colors group break-all px-4">
                  abdulrehmanbey1718@gmail.com
                  </a>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <a href="https://github.com/AbdulRehman817" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 hover:bg-white/10 hover:border-indigo-500/30 transition-all group">
                      <FiGithub className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                      <span className="text-sm font-bold uppercase tracking-widest">Github</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 hover:bg-white/10 hover:border-indigo-500/30 transition-all group">
                      <LuLinkedin  className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                      <span className="text-sm font-bold uppercase tracking-widest">Linkedin</span>
                    </a>
                  </div>
                </div>

              
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display font-bold text-2xl">
            AR<span className="text-indigo-500">.</span>
          </div>
          <div className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} AR. All rights reserved.
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
