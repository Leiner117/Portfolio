"use client";
import { useLanguage } from "./context/LanguageContext";

const Home = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-primary)] mb-6">
          {t.hero.name}
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
          {t.hero.title}
        </p>
      </section>
      <section id="projects" className="py-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 text-[var(--color-primary)]">{t.sections.projects}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.map((project) => (
            <div key={project.id} className="bg-[var(--color-bg-secondary)] p-6 rounded-lg shadow-md border border-[var(--color-border)] hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">{project.title}</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-[var(--color-primary)] text-white px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a href={project.link} className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
                  View
                </a>
                <a href={project.github} className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="experience" className="py-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 text-[var(--color-primary)]">{t.sections.experience}</h2>
        <div className="space-y-6">
          {t.experience.map((exp) => (
            <div key={exp.id} className="bg-[var(--color-bg-secondary)] p-6 rounded-lg shadow-md border border-[var(--color-border)]">
              <h3 className="text-xl font-bold mb-2 text-[var(--color-text)]">{exp.position}</h3>
              <p className="text-[var(--color-text-secondary)] mb-2">
                {exp.company} • {exp.period}
              </p>
              <p className="text-[var(--color-text)] mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-[var(--color-secondary)] text-white px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="skills" className="py-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 text-[var(--color-primary)]">{t.sections.skills}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {t.skills.map((skill) => (
            <div 
              key={skill.id} 
              className="bg-[var(--color-bg-secondary)] p-4 rounded-lg shadow-md text-center border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
            >
              <p className="font-medium text-[var(--color-text)]">{skill.name}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">{skill.category}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="contact" className="py-16 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-8 text-[var(--color-primary)]">{t.contact.title}</h2>
        <div className="bg-[var(--color-bg-secondary)] p-6 rounded-lg shadow-md max-w-2xl mx-auto border border-[var(--color-border)]">
          <p className="text-center mb-6 text-[var(--color-text)]">
            {t.contact.description}
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-medium">
              {t.contact.email}
            </a>
            <a href="#" className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-medium">
              {t.contact.linkedin}
            </a>
            <a href="#" className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-medium">
              {t.contact.github}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;