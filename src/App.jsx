import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, MapPin, X, ExternalLink, Sun, Moon, Send } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion';
const SectionHeader = ({ num, title, isDark }) => (
  <div className="mb-12">
    <p className={`text-sm font-bold tracking-[0.2em] uppercase ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
      — {num} {title}
    </p>
  </div>
);

const GithubIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 
    5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 
    0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 
    1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 
    1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.27-5.23-5.64 
    0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.01 
    0 0 .96-.31 3.15 1.17a10.9 10.9 0 012.87-.39c.97 
    0 1.95.13 2.87.39 2.19-1.48 3.15-1.17 
    3.15-1.17.62 1.56.23 2.72.11 
    3.01.73.8 1.18 1.82 1.18 3.07 
    0 4.38-2.69 5.35-5.25 5.63.41.35.78 
    1.04.78 2.1 0 1.52-.01 2.75-.01 
    3.13 0 .3.21.65.79.54A11.5 11.5 0 0023.5 
    12C23.5 5.65 18.35.5 12 .5z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 
    2.24 5 5 5h14c2.76 0 5-2.24 
    5-5V5c0-2.76-2.24-5-5-5zM7.12 
    20H3.56V9h3.56v11zM5.34 
    7.43c-1.14 0-2.06-.93-2.06-2.06 
    0-1.14.93-2.06 2.06-2.06 
    1.14 0 2.06.93 2.06 2.06 
    0 1.14-.93 2.06-2.06 
    2.06zM20.44 20h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 
    0-2.16 1.46-2.16 2.96V20H9.29V9h3.42v1.5h.05c.48-.9 
    1.66-1.87 3.42-1.87 3.66 0 4.33 2.41 4.33 
    5.55V20z"/>
  </svg>
);

const BrutalistButton = ({ children, className = '', yellow = false, onClick, isDark = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 0.98, x: 2, y: 2, boxShadow: '0px 0px 0px 0px transparent' }}
      onClick={onClick}
      className={`
        px-8 py-4 font-anton uppercase text-xl border-4
        transition-colors flex items-center justify-center gap-2
        ${yellow
          ? 'bg-[#FFE500] text-black border-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#FFD700]'
          : isDark
            ? 'bg-[#111] text-white border-white shadow-[4px_4px_0px_0px_#fff] hover:bg-[#222]'
            : 'bg-white text-black border-black shadow-[4px_4px_0px_0px_#000] hover:bg-gray-100'
        }
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

const AnimatedCounter = ({ from, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const FadeInSection = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default function BrutalistPortfolio() {
  const [isDark, setIsDark] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorVariant, setCursorVariant] = useState('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 500 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - (cursorVariant === 'project' ? 40 : 20));
      mouseY.set(e.clientY - (cursorVariant === 'project' ? 40 : 20));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, cursorVariant]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: 'HTML', yellow: false },
    { name: 'CSS', yellow: false },
    { name: 'JavaScript', yellow: true },
    { name: 'React', yellow: true },
    { name: 'Next.js', yellow: false },
    { name: 'Tailwind CSS', yellow: true },
    { name: 'Node.js', yellow: false },
    { name: 'Express', yellow: false },
    { name: 'MongoDB', yellow: true },
    { name: 'Firebase', yellow: false },
    { name: 'REST APIs', yellow: true },
    { name: 'Auth.js', yellow: false },
    { name: 'GitHub', yellow: false },
  ];

  const projects = [
    {
      id: '01',
      title: 'E-Commerce Platform',
      tech: ['React JS', 'MongoDB', 'Tailwind CSS', 'Node.js', 'Express'],
      shortDesc: 'Full e-commerce with cart & admin',
      overview: 'A full-featured e-commerce platform built with React JS on the frontend and Node.js/Express on the backend. MongoDB handles data persistence. Includes a complete admin panel for inventory management.',
      features: ['Product catalog with search & filter', 'Shopping cart with real-time updates', 'Admin panel', 'Order tracking', 'Mobile-first responsive design'],
      github: 'https://github.com/AbdulRehman817/E-Commerce-Website-ReactJs',
      live: 'https://e-commerce-website-react-js-gules.vercel.app/',
      year: '2024',
      type: 'Full Stack Web App',
    },
    {
      id: '02',
      title: 'CreateiSoft – Software Company Website',
      tech: ['React',  'Tailwind CSS', 'Lucide-React'],
      shortDesc: 'Modern software company website',
      overview: 'A modern and responsive software company website built to showcase services like custom development, IT consulting, and team augmentation. Designed with a focus on clean UI, scalability, and professional business presentation.',
      features: ['Fully responsive design', 'Service-based architecture layout', 'Clean UI/UX for business presentation', 'Optimized performance and fast loading', 'Reusable components'],
      github: 'https://github.com/AbdulRehman817/CreateiSoft_Website',
      live: 'https://createi-soft-website.vercel.app/',
      year: '2025',
      type: 'Corporate Website',
    },
    {
      id: '03',
      title: 'Chat App',
      tech: ['React', 'Node.js', 'Firebase', 'Express', 'MongoDB'],
      shortDesc: 'Real-time messaging',
      overview: 'A real-time messaging platform built on React using Firebase. Users can send messages instantly, and see online status — all without page refreshes.',
      features: ['Real-time chat functionality powered by Firebase listeners', 'Secure authentication system using Firebase Auth', 'Online presence indicators', 'Media sharing (images/files) via Firebase Storage', 'Clean minimal chat UI'],
      github: 'https://github.com/AbdulRehman817/Chat-App',
      live: 'https://chat-app-sc7o.vercel.app/',
      year: '2023',
      type: 'Real-time App',
    },
  ];

  return (
    <div className={`relative min-h-screen font-grotesk overflow-x-hidden transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>

      {/* Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&display=swap');
        .font-anton { font-family: 'Anton', sans-serif; }
        .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes glitch {
          0%, 100% { transform: skewX(0); }
          25% { transform: skewX(-2deg); }
          75% { transform: skewX(1deg); }
        }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .glitch-hover:hover { animation: glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
      `}</style>

      {/* Page Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-anton text-[20vw] text-white"
            >
              AR.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorVariant === 'project' ? 80 : 40,
          height: cursorVariant === 'project' ? 80 : 40,
          backgroundColor: cursorVariant === 'project' ? '#FFE500' : 'transparent',
          border: cursorVariant === 'project' ? 'none' : `4px solid ${isDark ? '#fff' : '#000'}`,
        }}
      />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b-4 transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] border-white' : 'bg-white border-black'}`}>
        <div className="font-anton text-4xl cursor-pointer">AR</div>
        <div className="hidden md:flex items-center gap-8 font-anton text-xl">
          <a href="#about" className="hover:text-[#FF2D00] transition-colors">ABOUT</a>
          <a href="#projects" className="hover:text-[#FF2D00] transition-colors">PROJECTS</a>
          <a href="#contact" className="hover:text-[#FF2D00] transition-colors">CONTACT</a>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`w-12 h-12 flex items-center justify-center border-4 transition-colors ${isDark ? 'border-white hover:bg-gray-800' : 'border-black hover:bg-gray-100'}`}
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <BrutalistButton yellow onClick={() => setIsHireModalOpen(true)} isDark={isDark} className="px-6 py-2 text-lg">
            HIRE ME
          </BrutalistButton>
        </div>
      </nav>

      {/* Hero */}
      <section className={`min-h-[90vh] pt-32 px-6 flex flex-col justify-center relative border-b-8 ${isDark ? 'border-white' : 'border-black'}`}>
        <div className={`absolute top-0 left-0 w-full h-8 border-b-4 mt-24 ${isDark ? 'border-white' : 'border-black'}`} />
        <div className="relative z-10 space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-anton text-[clamp(80px,14vw,180px)] leading-[0.8] tracking-tighter uppercase mt-6"
          >
            ABDUL
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={!isLoading ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block bg-[#FFE500] text-black border-4 border-black px-6 py-2 my-4 -rotate-2 shadow-[6px_6px_0px_0px_#000]"
          >
            <span className="font-bold text-xl md:text-3xl uppercase tracking-widest">Full-Stack Developer</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-anton text-[clamp(80px,14vw,180px)] leading-[0.8] tracking-tighter uppercase"
          >
            REHMAN
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={!isLoading ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col md:flex-row justify-between items-end gap-8"
        >
          <div className="flex items-center gap-2 font-bold uppercase">
            <MapPin className="w-5 h-5" />
            <span>Available for freelance — Pakistan</span>
          </div>
          <div className="flex gap-4">
            <BrutalistButton yellow isDark={isDark} onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              VIEW WORK
            </BrutalistButton>
            <BrutalistButton isDark={isDark} onClick={() => setIsHireModalOpen(true)}>
              CONTACT
            </BrutalistButton>
          </div>
        </motion.div>
        <div className={`absolute top-32 right-8 font-anton text-[20vw] opacity-5 pointer-events-none select-none ${isDark ? 'text-white' : 'text-black'}`}>
          (01)
        </div>
      </section>

      {/* Marquee */}
      <div className={`w-full overflow-hidden border-b-8 py-4 flex whitespace-nowrap ${isDark ? 'bg-[#FFE500] text-black border-white' : 'bg-black text-white border-black'}`}>
        <div className="animate-marquee inline-block font-anton text-3xl md:text-4xl tracking-wider">
          AVAILABLE FOR WORK · FULL-STACK DEVELOPER · REACT · NODE.JS · OPEN TO COLLABORATE · PAKISTAN · AVAILABLE FOR WORK · FULL-STACK DEVELOPER · REACT · NODE.JS · OPEN TO COLLABORATE · PAKISTAN ·&nbsp;
        </div>
      </div>

      {/* About */}
      <section id="about" className={`px-6 py-32 border-b-8 relative ${isDark ? 'border-white' : 'border-black'}`}>
        <FadeInSection>
          <SectionHeader num="001" title="ABOUT" isDark={isDark} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
            <div className={`md:pr-8 md:border-r-4 ${isDark ? 'border-white' : 'border-black'}`}>
              <h2 className="font-anton text-5xl md:text-7xl leading-tight uppercase">
                I BUILD THINGS THAT WORK AND LOOK <span className="text-[#FF2D00]">GREAT.</span>
              </h2>
            </div>
            <div className="space-y-12 md:pl-8">
              <p className={`text-xl md:text-2xl leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                I'm Abdul Rehman, a full-stack developer based in Pakistan.
                I specialize in building robust web applications using React, Node.js, and MongoDB.
                I believe in clean code, bold design, and experiences that leave a mark.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Projects', target: 10, suffix: '+' },
                  { label: 'Years', target: 2, suffix: '+' },
                  { label: 'Dedication', target: 100, suffix: '%' },
                  { label: 'Passion', target: 24, suffix: '/7' },
                ].map((stat, i) => (
                  <div key={i} className={`border-4 p-6 ${isDark ? 'bg-[#111] border-white shadow-[4px_4px_0px_0px_#fff]' : 'bg-white border-black shadow-[4px_4px_0px_0px_#000]'}`}>
                    <div className="font-anton text-4xl mb-2 flex items-end">
                      <AnimatedCounter from={0} to={stat.target} duration={2} />
                      {stat.suffix}
                    </div>
                    <div className="font-bold uppercase text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Skills */}
      <section className={`px-6 py-32 border-b-8 overflow-hidden relative ${isDark ? 'bg-[#111] border-white' : 'bg-gray-50 border-black'}`}>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 2px, transparent 2px)`, backgroundSize: '30px 30px' }}
        />
        <FadeInSection>
          <SectionHeader num="002" title="SKILLS" isDark={isDark} />
          <div className="flex flex-wrap gap-4 relative z-10">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className={`border-4 px-6 py-3 font-bold uppercase text-sm md:text-lg cursor-default
                  ${skill.yellow
                    ? 'bg-[#FFE500] text-black border-black shadow-[4px_4px_0px_0px_#000]'
                    : isDark
                      ? 'bg-[#222] text-white border-white shadow-[4px_4px_0px_0px_#fff]'
                      : 'bg-white text-black border-black shadow-[4px_4px_0px_0px_#000]'
                  }`}
              >
                {skill.name}
              </motion.div>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* Projects */}
      <section id="projects" className={`py-32 border-b-8 ${isDark ? 'border-white' : 'border-black'}`}>
        <FadeInSection>
          <div className="px-6 mb-16">
            <SectionHeader num="003" title="SELECTED WORK" isDark={isDark} />
          </div>
          <div className="flex flex-col">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                onMouseEnter={() => setCursorVariant('project')}
                onMouseLeave={() => setCursorVariant('default')}
                onClick={() => setSelectedProject(project)}
                className={`group border-t-4 w-full transition-colors duration-300 cursor-pointer
                  ${isDark ? 'border-white hover:bg-[#FFE500] hover:text-black' : 'border-black hover:bg-[#FFE500]'}`}
              >
                <div className="px-6 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 flex-grow">
                    <span className={`font-anton text-4xl transition-colors ${isDark ? 'text-gray-600 group-hover:text-black' : 'text-gray-400 group-hover:text-black'}`}>
                      [{project.id}]
                    </span>
                    <div>
                      <h3 className="font-anton text-4xl md:text-6xl mb-2 glitch-hover inline-block">{project.title}</h3>
                      <p className={`font-bold uppercase text-sm mb-1 ${isDark ? 'text-gray-400 group-hover:text-gray-800' : 'text-gray-600 group-hover:text-gray-800'}`}>
                        {project.tech.slice(0, 3).join(' · ')}
                      </p>
                      <p className={isDark ? 'text-gray-500 group-hover:text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}>
                        {project.shortDesc}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-grow items-center px-8">
                    <div className={`h-1 flex-grow opacity-20 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-white group-hover:bg-black' : 'bg-black'}`} />
                  </div>
                  <div className="font-anton text-6xl group-hover:translate-x-4 transition-transform">→</div>
                </div>
              </motion.div>
            ))}
            <div className={`border-t-4 w-full ${isDark ? 'border-white' : 'border-black'}`} />
          </div>
        </FadeInSection>
      </section>

      {/* Services */}
      <section className={`px-6 py-32 border-b-8 ${isDark ? 'border-white' : 'border-black'}`}>
        <FadeInSection>
          <SectionHeader num="004" title="SERVICES" isDark={isDark} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'UI DESIGN', yellow: false },
              { title: 'SERVER LOGIC', yellow: true },
              { title: 'API INTEGRATION', yellow: false },
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className={`border-4 p-8 md:p-12 transition-colors
                  ${service.yellow
                    ? 'bg-[#FFE500] text-black border-black shadow-[6px_6px_0px_0px_#000]'
                    : isDark
                      ? 'bg-[#111] text-white border-white shadow-[6px_6px_0px_0px_#fff]'
                      : 'bg-white text-black border-black shadow-[6px_6px_0px_0px_#000]'
                  }`}
              >
                <h3 className="font-anton text-3xl md:text-4xl mb-4">{service.title}</h3>
                <div className={`w-12 h-2 mb-6 ${service.yellow ? 'bg-black' : isDark ? 'bg-white' : 'bg-black'}`} />
                <p className={`font-medium text-lg ${service.yellow ? 'text-gray-900' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Building robust, scalable, and beautifully brutal solutions from the ground up.
                </p>
              </motion.div>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* Contact */}
      <section id="contact" className={`bg-[#FFE500] border-t-8 py-32 px-6 ${isDark ? 'border-white' : 'border-black'}`}>
        <FadeInSection>
          <div className="max-w-6xl mx-auto text-center text-black">
            <h2 className="font-anton text-[clamp(60px,10vw,150px)] leading-[0.9] uppercase mb-12">
              LET'S BUILD<br />SOMETHING.
            </h2>
            <a
              href="mailto:abdulrehmanbey1718@gmail.com"
              className="inline-block font-anton text-3xl md:text-5xl border-b-8 border-black hover:text-[#FF2D00] hover:border-[#FF2D00] transition-colors pb-2 mb-16"
            >
              abdulrehmanbey1718@gmail.com
            </a>
            <div className="flex flex-wrap justify-center gap-6">
              <BrutalistButton className="flex items-center gap-3" isDark={false} onClick={() => window.open('https://github.com', '_blank')}>
                <GithubIcon className="w-6 h-6" /> GITHUB
              </BrutalistButton>
              <BrutalistButton className="flex items-center gap-3" isDark={false} onClick={() => window.open('https://linkedin.com', '_blank')}>
                <LinkedinIcon className="w-6 h-6" /> LINKEDIN
              </BrutalistButton>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-8 flex justify-between items-center font-bold uppercase text-sm border-t-4 transition-colors duration-300 ${isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`}>
        <div>© {new Date().getFullYear()} ABDUL REHMAN</div>
        <div className="flex items-center gap-2">
          <span>STAY BRUTAL</span>
          <div className="animate-spin-slow inline-block">®</div>
        </div>
      </footer>

      {/* Project Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: 'circOut' }}
            className={`fixed inset-0 z-[100] overflow-y-auto ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}
          >
            <div className={`sticky top-0 z-10 px-6 py-6 border-b-4 flex justify-between items-center ${isDark ? 'border-white bg-[#0a0a0a]' : 'border-black bg-white'}`}>
              <button
                onClick={() => setSelectedProject(null)}
                className="font-anton text-2xl md:text-4xl hover:text-[#FF2D00] transition-colors flex items-center gap-2"
              >
                ← BACK
              </button>
              <div className="flex items-center gap-4">
                <span className="font-anton text-2xl text-gray-400">[{selectedProject.id}]</span>
                <span className={`px-4 py-1 text-sm font-bold border-2 bg-[#FFE500] text-black ${isDark ? 'border-white' : 'border-black'}`}>
                  PROJECT DETAIL
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`p-2 border-2 hover:bg-[#FFE500] hover:text-black transition-colors ${isDark ? 'border-white' : 'border-black'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-6 py-16 max-w-7xl mx-auto">
              <h1 className="font-anton text-[clamp(50px,8vw,120px)] leading-[0.9] uppercase mb-12">
                {selectedProject.title}
              </h1>
              <div className={`w-full h-4 mb-16 bg-[#FFE500] border-y-4 ${isDark ? 'border-white' : 'border-black'}`} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-12">
                  <div>
                    <h3 className={`font-anton text-3xl mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>OVERVIEW</h3>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed">{selectedProject.overview}</p>
                  </div>
                
                  <div>
                    <h3 className={`font-anton text-3xl mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>KEY FEATURES</h3>
                    <ul className="space-y-4">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-xl md:text-2xl font-bold">
                          <span className="text-[#FFE500] font-anton text-3xl mt-[-4px]">→</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-12">
                  <div>
                    <h3 className={`font-anton text-2xl mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>TECH STACK</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className={`px-4 py-2 border-2 font-bold uppercase text-sm
                            ${isDark ? 'border-white shadow-[2px_2px_0px_0px_#fff] bg-[#111]' : 'border-black shadow-[2px_2px_0px_0px_#000] bg-white'}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={`p-6 border-4 ${isDark ? 'border-white bg-[#111]' : 'border-black bg-gray-50'}`}>
                    <div className="mb-6">
                      <p className={`text-sm font-bold uppercase mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>YEAR</p>
                      <p className="font-anton text-3xl">{selectedProject.year}</p>
                    </div>
                    <div>
                      <p className={`text-sm font-bold uppercase mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>TYPE</p>
                      <p className="font-anton text-3xl">{selectedProject.type}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 pt-8">
                    <BrutalistButton className="w-full flex justify-between items-center group" isDark={isDark} onClick={() => window.open(selectedProject.github, '_blank')}>
                      <span>GITHUB</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </BrutalistButton>
                    <BrutalistButton yellow className="w-full flex justify-between items-center group" isDark={isDark} onClick={() => window.open(selectedProject.live, '_blank')}>
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </BrutalistButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hire Me Modal */}
      <AnimatePresence>
        {isHireModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`w-full max-w-2xl border-4 flex flex-col max-h-[90vh] overflow-y-auto
                ${isDark
                  ? 'bg-[#111] border-white shadow-[8px_8px_0px_0px_#fff] text-white'
                  : 'bg-white border-black shadow-[8px_8px_0px_0px_#000] text-black'
                }`}
            >
              <div className={`p-6 border-b-4 flex justify-between items-center bg-[#FFE500] text-black ${isDark ? 'border-white' : 'border-black'}`}>
                <h2 className="font-anton text-3xl md:text-5xl">LET'S WORK TOGETHER</h2>
                <button
                  onClick={() => setIsHireModalOpen(false)}
                  className="p-2 border-4 border-black bg-white hover:bg-black hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold uppercase mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="JOHN DOE"
                      className={`w-full p-4 border-4 font-medium outline-none focus:bg-[#FFE500] focus:text-black transition-colors
                        ${isDark ? 'bg-[#0a0a0a] border-white text-white placeholder:text-gray-600' : 'bg-gray-50 border-black text-black placeholder:text-gray-400'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="john.doe@example.com"
                      className={`w-full p-4 border-4 font-medium outline-none focus:bg-[#FFE500] focus:text-black transition-colors
                        ${isDark ? 'bg-[#0a0a0a] border-white text-white placeholder:text-gray-600' : 'bg-gray-50 border-black text-black placeholder:text-gray-400'}`}
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="TELL ME ABOUT YOUR PROJECT..."
                      className={`w-full p-4 border-4 font-medium outline-none focus:bg-[#FFE500] focus:text-black transition-colors resize-none
                        ${isDark ? 'bg-[#0a0a0a] border-white text-white placeholder:text-gray-600' : 'bg-gray-50 border-black text-black placeholder:text-gray-400'}`}
                    />
                  </div>
                  <BrutalistButton yellow className="w-full flex justify-center items-center gap-2 mt-4" isDark={isDark} onClick={() => setIsHireModalOpen(false)}>
                    SEND MESSAGE <Send className="w-5 h-5" />
                  </BrutalistButton>
                </div>

                <div className={`pt-6 mt-6 border-t-4 text-center ${isDark ? 'border-white' : 'border-black'}`}>
                  <p className="font-bold uppercase mb-4">OR REACH ME DIRECTLY</p>
                  <div className="flex justify-center gap-4">
                    {[
                      { href: 'mailto:hello@abdulrehmanbey1718@gmail.com', icon: <Mail className="w-6 h-6" /> },
                      { href: 'https://github.com/AbdulRehman817', icon: <GithubIcon className="w-6 h-6" /> },
                      { href: 'https://www.linkedin.com/in/abdulrehman1718/', icon: <LinkedinIcon className="w-6 h-6" /> },
                    ].map((link, i) => (
                      <a
                        key={i}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`p-3 border-4 hover:bg-[#FFE500] hover:text-black transition-colors ${isDark ? 'border-white hover:border-black' : 'border-black'}`}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
