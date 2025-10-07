"use client";
import { useCallback, useMemo, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type ContactFormTranslations = {
  email: string;
  github: string;
  linkedin: string;
  title?: string;
  description?: string;
  form?: {
    nameLabel?: string;
    emailLabel?: string;
    messageLabel?: string;
    send?: string;
    sending?: string;
    orMail?: string;
  };
  errors?: {
    fillAll?: string;
    email?: string;
  };
  thanksTitle?: string;
  thanksMessage?: string;
};

type HomeTranslations = {
  contact: ContactFormTranslations;
  hero?: unknown;
  sections?: unknown;
  experience?: unknown[];
  projects?: unknown[];
  skills?: unknown[];
};

export type ContactFormState = {
  name: string;
  email: string;
  message: string;
  loading: boolean;
  sent: boolean;
  error: string;
};

export type HomeViewModel = {
  t: HomeTranslations;
  contactState: ContactFormState;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setMessage: (value: string) => void;
  validateContactForm: () => boolean;
  submitContactForm: (event: React.FormEvent) => void;
  extractGithubUsername: (url?: string) => string;
  extractLinkedInLabel: (url?: string) => string;
};

export const useHomeViewModel = (): HomeViewModel => {
  const { t } = useLanguage();
  const contact = t.contact as ContactFormTranslations;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const contactState = useMemo(
    () => ({ name, email, message, loading, sent, error }),
    [name, email, message, loading, sent, error]
  );

  const validateContactForm = useCallback(() => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(contact?.errors?.fillAll || "Please fill all fields.");
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError(contact?.errors?.email || "Please enter a valid email.");
      return false;
    }
    setError("");
    return true;
  }, [name, email, message, contact]);

  const submitContactForm = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (!validateContactForm()) return;
      setLoading(true);
      const subject = encodeURIComponent(`Contact from ${name}`);
      const body = encodeURIComponent(message + "\n\nFrom: " + name + " <" + email + ">");
      setTimeout(() => {
        setLoading(false);
        setSent(true);
        window.location.href = `mailto:${contact?.email || ""}?subject=${subject}&body=${body}`;
      }, 700);
    },
    [name, email, message, contact, validateContactForm]
  );

  const extractGithubUsername = useCallback((url?: string) => {
    if (!url) return "github";
    try {
      const parts = new URL(url).pathname.split("/").filter(Boolean);
      return parts.length ? parts[parts.length - 1] : url;
    } catch {
      return url.replace(/https?:\/\//, "");
    }
  }, []);

  const extractLinkedInLabel = useCallback((url?: string) => {
    if (!url) return "LinkedIn";
    try {
      const parts = new URL(url).pathname.split("/").filter(Boolean);
      const last = parts.length ? parts[parts.length - 1] : url;
      const name = last.replace(/[-_]+/g, " ");
      return name.charAt(0).toUpperCase() + name.slice(1);
    } catch {
      return "LinkedIn";
    }
  }, []);

  return {
    t,
    contactState,
    setName,
    setEmail,
    setMessage,
    validateContactForm,
    submitContactForm,
    extractGithubUsername,
    extractLinkedInLabel,
  };
};

export default useHomeViewModel;
