"use client";
import React, { useCallback } from "react";
import useHomeViewModel from "@/app/components/home/useHomeViewModel";

const ContactSection = () => {
  const vm = useHomeViewModel();
  const { t, extractGithubUsername, extractLinkedInLabel } = vm;

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => vm.setName(e.target.value),
    [vm]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => vm.setEmail(e.target.value),
    [vm]
  );

  const handleMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => vm.setMessage(e.target.value),
    [vm]
  );

  return (
    <section id="contact" className="py-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-primary)]">
        {t.contact.title}
      </h2>
      <div className="bg-[var(--color-bg-secondary)] p-6 rounded-lg shadow-md border border-[var(--color-border)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4">
            <p className="text-[var(--color-text-secondary)] mb-4">
              {t.contact.description}
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${t.contact.email}`}
                  className="flex items-center text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M2 6.75A2.75 2.75 0 014.75 4h14.5A2.75 2.75 0 0122 6.75v10.5A2.75 2.75 0 0119.25 20H4.75A2.75 2.75 0 012 17.25V6.75zm2.53 1.03L12 12.06l7.47-4.28a.75.75 0 10-.74-1.3L12 10.21 4.27 6.2a.75.75 0 10-.74 1.3z" />
                  </svg>
                  <span className="font-medium">{t.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={t.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5a2.29 2.29 0 11-.01 0zM3 8.98h4v12H3v-12zm7.5 0h3.8v1.67h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.64 4.78 6.07v6.31h-4v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.69h-4v-12z" />
                  </svg>
                  <span className="font-medium">
                    {extractLinkedInLabel(t.contact.linkedin)}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={t.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .5C5.73.5.88 5.35.88 11.62c0 4.82 3.12 8.9 7.46 10.34.55.1.75-.24.75-.53 0-.26-.01-.96-.01-1.88-3.03.66-3.67-1.45-3.67-1.45-.5-1.28-1.22-1.62-1.22-1.62-.99-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.97 1.66 2.55 1.18 3.17.9.1-.7.38-1.18.69-1.45-2.42-.28-4.97-1.21-4.97-5.4 0-1.19.42-2.16 1.11-2.92-.11-.28-.48-1.4.11-2.92 0 0 .9-.29 2.95 1.1a10.2 10.2 0 012.69-.36c.91 0 1.82.12 2.69.36 2.04-1.4 2.95-1.1 2.95-1.1.59 1.52.22 2.64.11 2.92.69.76 1.11 1.73 1.11 2.92 0 4.2-2.56 5.11-4.99 5.39.39.34.73 1.02.73 2.06 0 1.49-.01 2.69-.01 3.06 0 .29.2.64.76.53 4.34-1.44 7.45-5.52 7.45-10.34C23.12 5.35 18.27.5 12 .5z" />
                  </svg>
                  <span className="font-medium">
                    {extractGithubUsername(t.contact.github)}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <form onSubmit={vm.submitContactForm} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">
                  {t.contact.form?.nameLabel || "Name"}
                </label>
                <input
                  value={vm.contactState.name}
                  onChange={handleNameChange}
                  className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">
                  {t.contact.form?.emailLabel || "Email"}
                </label>
                <input
                  value={vm.contactState.email}
                  onChange={handleEmailChange}
                  type="email"
                  className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)]">
                  {t.contact.form?.messageLabel || "Message"}
                </label>
                <textarea
                  value={vm.contactState.message}
                  onChange={handleMessageChange}
                  rows={5}
                  className="mt-1 block w-full rounded-md border border-[var(--color-border)] bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              {vm.contactState.error && (
                <p className="text-sm text-red-500">{vm.contactState.error}</p>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={vm.contactState.loading}
                  className="inline-flex items-center px-4 py-2 bg-[var(--color-primary)] text-[var(--color-bg)] rounded hover:bg-[var(--color-secondary)] transition-colors"
                >
                  {vm.contactState.loading
                    ? t.contact.form?.sending || "Sending..."
                    : t.contact.form?.send || "Send"}
                </button>
                <a
                  className="text-sm text-[var(--color-text-secondary)]"
                  href={`mailto:${t.contact.email}`}
                >
                  {t.contact.form?.orMail || "Or send an email"}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
