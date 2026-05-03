"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaCode, FaExternalLinkAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import CodeEditorCard from "@/components/portfolio/CodeEditorCard";
import {
  aboutText,
  achievements,
  experience,
  projects,
  skills,
  socialLinks,
} from "@/data/portfolio";

const sectionLinks = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "achievements",
  "contact",
];

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  codeforces: SiCodeforces,
  leetcode: SiLeetcode,
} as const;

function TypingText() {
  const texts = useMemo(
    () => [
      "Building scalable ideas.",
      "Optimizing engineering systems.",
      "Solving algorithmic challenges.",
      "Creating futuristic interfaces.",
    ],
    []
  );
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting && charIdx < current.length) {
          setCharIdx((prev) => prev + 1);
          return;
        }
        if (!deleting && charIdx === current.length) {
          setDeleting(true);
          return;
        }
        if (deleting && charIdx > 0) {
          setCharIdx((prev) => prev - 1);
          return;
        }
        setDeleting(false);
        setTextIdx((prev) => (prev + 1) % texts.length);
      },
      deleting ? 40 : 90
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts]);

  return (
    <p className="terminal-line text-cyan-300">
      {texts[textIdx].slice(0, charIdx)}
      <span className="animate-pulse">|</span>
    </p>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <motion.div
        className="section-heading-wrap"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="section-badge">SECTION</div>
        <div className="section-title-row">
          <h2 className="section-title">{title}</h2>
          <motion.span
            className="section-glow-line"
            initial={{ scaleX: 0, opacity: 0.2 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
          />
        </div>
        <motion.span
          className="section-divider"
          initial={{ width: 0, opacity: 0.2 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        />
      </motion.div>
      {children}
    </motion.section>
  );
}

function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "light") {
      setLight(true);
      document.documentElement.classList.add("light");
    }
  }, []);

  const onToggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    window.localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <button className="nav-btn" onClick={onToggle} aria-label="Toggle theme">
      {light ? "Dark" : "Light"}
    </button>
  );
}

export default function PortfolioPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 22 });

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        size: 2 + ((i * 3) % 6),
        duration: 12 + (i % 5) * 2,
        delay: i * 0.35,
      })),
    []
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050816] text-slate-100">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <div className="pointer-events-none fixed inset-0 z-0 cyber-grid" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-drift" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-layer bg-layer-cyan" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-layer bg-layer-purple" />
      <div className="pointer-events-none fixed inset-0 z-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="particle"
            style={{ left: p.left, width: p.size, height: p.size }}
            animate={{ y: ["100vh", "-10vh"], opacity: [0, 0.8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: p.duration,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <nav className="sticky top-0 z-40 border-b border-cyan-400/20 bg-[#050816]/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300">
            SD.dev
          </p>
          <div className="hidden items-center gap-5 md:flex">
            {sectionLinks.map((link) => (
              <Link key={link} href={`#${link}`} className="nav-link capitalize">
                {link}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
        <div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 pb-3 md:hidden">
          {sectionLinks.map((link) => (
            <Link key={link} href={`#${link}`} className="nav-pill capitalize">
              {link}
            </Link>
          ))}
        </div>
      </nav>

      <main className="relative z-10">
        <Section id="home" title="Hero">
          <div className="hero-layout glass-card relative overflow-hidden p-8 md:p-12">
            <motion.div
              className="absolute -right-16 -top-14 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl"
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8 }}
            />
            <motion.div
              className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-purple-500/10 blur-3xl"
              animate={{ y: [0, -14, 0], x: [0, 18, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 9 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="z-10"
            >
              <h1 className="text-4xl font-black leading-tight md:text-6xl">
                Hello, I&apos;m <span className="neon-text">Shivam Dubey</span>
              </h1>
              <p className="mt-4 text-base text-slate-200 md:text-xl">
                Chemical Engineering Student | Competitive Programmer | Technical
                Leader
              </p>
              <div className="mt-4">
                <TypingText />
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary micro-hover">
                  Contact Me
                </a>
                <a href="/resume.pdf" className="btn-secondary micro-hover">
                  Download Resume
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.key as keyof typeof iconMap];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="social-chip micro-hover"
                    >
                      <Icon />
                      {social.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              <CodeEditorCard />
            </motion.div>
          </div>
        </Section>

        <Section id="about" title="About Me">
          <div className="glass-card p-8">
            {aboutText.map((paragraph) => (
              <p key={paragraph} className="mb-4 text-slate-100/95 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid gap-5 md:grid-cols-2">
            {Object.entries(skills).map(([category, items]) => (
              <motion.article
                key={category}
                className="glass-card p-6"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
              >
                <h3 className="mb-4 text-xl font-semibold text-cyan-300">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="tag-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience / Leadership">
          <div className="relative ml-2 border-l border-cyan-500/40 pl-6">
            {experience.map((item) => (
              <article key={item.title} className="glass-card mb-6 p-5 last:mb-0">
                <div className="timeline-dot" />
                <p className="text-sm text-cyan-300">{item.period}</p>
                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-slate-200">{item.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <motion.article
                key={project.name}
                className="project-card"
                whileHover={{ y: -7 }}
              >
                <div className="project-header">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                  <span className="ml-3 text-xs text-slate-400">project.tsx</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-cyan-300">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-200">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="tag-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3">
                    <a href="#" className="btn-secondary micro-hover inline-flex items-center gap-2">
                      <FaGithub /> GitHub
                    </a>
                    <a href="#" className="btn-primary micro-hover inline-flex items-center gap-2">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="achievements" title="Achievements">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item) => (
              <article key={item.label} className="glass-card p-6 text-center">
                <FaCode className="mx-auto text-2xl text-cyan-300" />
                <p className="mt-4 text-2xl font-bold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-slate-200">{item.label}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
            <form className="glass-card space-y-4 p-6">
              <input className="input" placeholder="Name" />
              <input className="input" type="email" placeholder="Email" />
              <textarea className="input min-h-32 resize-y" placeholder="Message" />
              <button type="submit" className="btn-primary micro-hover w-full justify-center">
                Send Message
              </button>
            </form>
            <aside className="glass-card p-6">
              <h3 className="text-lg font-semibold text-cyan-300">Get in touch</h3>
              <p className="mt-3 text-slate-200">Email: shivam@example.com</p>
              <p className="mt-2 text-slate-200">LinkedIn: linkedin.com/in/</p>
              <p className="mt-2 text-slate-200">GitHub: github.com/</p>
              <p className="mt-2 text-slate-200">Codeforces: codeforces.com/</p>
            </aside>
          </div>
        </Section>
      </main>
    </div>
  );
}
