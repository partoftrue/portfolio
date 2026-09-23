import { useState } from "react";
import { ArrowUpRight, Github, Mail, Moon, Sun } from "lucide-react";

const projects = [
  {
    name: "Itunda",
    type: "Rwanda Super App · Product + Engineering",
    description:
      "A Rwanda-first financial super-app prototype exploring money movement, identity and consent, ledger and wallet, payments routing, merchant tools, credit, investments, insurance, rewards, and operations. The repo includes native Android/iOS shells, a Kotlin + Spring Boot backend, independently deployable bounded-context services, web/BFF surfaces, infrastructure, and the Saronite mini-app SDK.",
    stack: "Kotlin · Spring Boot · MySQL · Android · iOS · Kafka · Kubernetes · REST",
    link: "https://github.com/itunda-rw/itunda",
  },
  {
    name: "ItundaFace",
    type: "Open Source · Design System",
    description:
      "An independently authored expressive glyph system for Itunda, with canonical SVG assets, React family APIs, flat and 3D variants, accessibility rules, optical-size QA, and Rwanda-native product vocabulary. Released under MIT and currently at v2.2.4.",
    stack: "TypeScript · React · SVG · Design Tokens · Accessibility · Visual QA",
    link: "https://github.com/itunda-rw/itundaface",
  },
  {
    name: "Iris",
    type: "Mobile Product",
    description:
      "A personal secretary and work-management app exploring schedules, records, tasks, notifications, and everyday organization across mobile platforms.",
    stack: "Flutter · Dart · Riverpod · Firebase",
    link: "https://github.com/partoftrue/iris",
  },
  {
    name: "WebtoonDabom",
    type: "University Project",
    description:
      "A webtoon community experience built during university, including user authentication and mobile-first community flows.",
    stack: "React Native · Firebase · JavaScript",
    link: "https://github.com/partoftrue",
  },
];

const skills = [
  "Kotlin",
  "Flutter",
  "Dart",
  "React Native",
  "TypeScript",
  "Go",
  "Spring Boot",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "GitHub Actions",
  "AI-assisted development",
];

const highlights = [
  ["Product thinking", "From user flows and UI systems to backend boundaries and deployment."],
  ["Mobile development", "Native Android/iOS direction plus Flutter and React Native experience."],
  ["System thinking", "Bounded contexts, APIs, infrastructure, design systems, and developer tooling."],
  ["Cross-cultural communication", "Rwanda roots, 7+ years living in Korea, fluent English and Korean."],
];

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "site dark" : "site"}>
      <header className="nav">
        <a className="brand" href="#">ER<span>.</span></a>
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className="icon-button"
          aria-label="Toggle theme"
          onClick={() => setDark(!dark)}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">SOFTWARE DEVELOPER · MOBILE · PRODUCT</div>
          <h1>
            Building simple products
            <br />
            <em>for real people.</em>
          </h1>
          <p className="hero-copy">
            I’m Eric, a software developer from Rwanda living in Korea. I build
            mobile and web products while learning across product design,
            system architecture, open source, and AI-assisted development.
          </p>
          <div className="actions">
            <a className="button primary" href="#work">
              View my work <ArrowUpRight size={17} />
            </a>
            <a className="button secondary" href="mailto:partoftrue@gmail.com">
              Get in touch
            </a>
          </div>
          <div className="hero-meta">
            <span>Based in Korea</span>
            <span>·</span>
            <span>English + Korean</span>
            <span>·</span>
            <span>Open to opportunities</span>
          </div>
        </section>

        <section id="work" className="section">
          <div className="section-head">
            <div>
              <span className="label">01</span>
              <h2>Selected work</h2>
            </div>
            <span className="section-note">Products, systems, and open-source work</span>
          </div>
          <div className="projects">
            {projects.map((p, i) => (
              <article className="project" key={p.name}>
                <div className="project-index">0{i + 1}</div>
                <div className="project-body">
                  <div className="project-top">
                    <span>{p.type}</span>
                    <a href={p.link} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}>
                      <ArrowUpRight size={20} />
                    </a>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="stack">{p.stack}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-head">
            <div>
              <span className="label">02</span>
              <h2>How I work</h2>
            </div>
          </div>

          <div className="about-grid">
            <p className="about-lead">
              I care about the whole product: the person using it, the interface
              they see, and the system underneath it.
            </p>
            <div>
              <p>
                I studied Software at Baekseok University and have spent years
                living, studying, and working in Korea. My development work has
                grown from mobile applications into product architecture,
                backend services, infrastructure, design systems, and open-source
                tooling.
              </p>
              <p>
                Outside development, I have taught English for 7+ years and
                worked in customer-facing roles for 2+ years. That experience
                helps me communicate clearly, understand different users, and
                stay practical when turning ideas into software.
              </p>
            </div>
          </div>

          <div className="skills">
            {skills.map((s) => <span key={s}>{s}</span>)}
          </div>

          <div className="highlights">
            {highlights.map(([title, text]) => (
              <div className="highlight" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <span className="label">03</span>
          <h2>Let’s build something useful.</h2>
          <p>Interested in software, mobile products, startups, open source, or global teams.</p>
          <div className="contact-links">
            <a href="mailto:partoftrue@gmail.com"><Mail size={18} /> partoftrue@gmail.com</a>
            <a href="https://github.com/partoftrue" target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub
            </a>
            <a href="https://partoftrue.com" target="_blank" rel="noreferrer">
              partoftrue.com <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 TUYIZERE ERIC</span>
        <span>Built with React · Vite · Vercel</span>
      </footer>
    </div>
  );
}
