"use client";
import React, { useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import VoyagerCanvas from "@/app/components/home/VoyagerCanvas";
import { useContactSectionViewModel } from "@/app/components/home/useContactSectionViewModel";

// ── Station card ──────────────────────────────────────────────────────────────

interface StationProps {
  stationId: string;
  network:   string;
  label:     string;
  protocol:  string;
  handle:    string;
  href:      string;
  locked:    boolean;
  onHover:   (rect: DOMRect) => void;
  onLeave:   () => void;
}

const Station = ({ stationId, network, label, protocol, handle, href, locked, onHover, onLeave }: StationProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) onHover(ref.current.getBoundingClientRect());
  };

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      className="group relative flex flex-col gap-2 p-5 transition-all duration-300"
      style={{
        border:     `1px solid ${locked ? "rgba(212,175,55,0.55)" : "var(--color-border)"}`,
        background: locked ? "rgba(212,175,55,0.04)" : "var(--color-bg-secondary)",
        boxShadow:  locked ? "0 0 20px rgba(212,175,55,0.08)" : "none",
        transition: "border-color 300ms, background 300ms, box-shadow 300ms",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-4 h-px group-hover:w-8 transition-all duration-300" style={{ background: "rgba(212,175,55,0.6)" }} />
      <span className="absolute top-0 left-0 w-px h-4 group-hover:h-8 transition-all duration-300" style={{ background: "rgba(212,175,55,0.6)" }} />
      <span className="absolute bottom-0 right-0 w-4 h-px group-hover:w-8 transition-all duration-300" style={{ background: "rgba(212,175,55,0.6)" }} />
      <span className="absolute bottom-0 right-0 w-px h-4 group-hover:h-8 transition-all duration-300" style={{ background: "rgba(212,175,55,0.6)" }} />

      {/* Station ID + status */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: "rgba(212,175,55,0.6)" }}>
          {stationId}
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: locked ? "rgba(212,175,55,0.9)" : "rgba(212,175,55,0.4)",
            boxShadow:       locked ? "0 0 8px rgba(212,175,55,0.7)" : "none",
          }}
        />
      </div>

      <div className="w-full h-px" style={{ background: "var(--color-border)" }} />

      {/* Network name — prominent */}
      <span
        className="font-mono text-xl font-bold tracking-[0.1em] transition-colors duration-300"
        style={{ color: locked ? "rgba(212,175,55,0.95)" : "var(--color-text)" }}
      >
        {network}
      </span>

      {/* Label */}
      <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "var(--color-text-secondary)" }}>
        {label}
      </span>

      {/* Protocol */}
      <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color: "rgba(212,175,55,0.5)" }}>
        {protocol}
      </span>

      <div className="w-full h-px mt-1" style={{ background: "var(--color-border)" }} />

      {/* Handle */}
      <span
        className="font-mono text-sm tracking-wide break-all transition-colors duration-300"
        style={{ color: locked ? "rgba(212,175,55,0.9)" : "var(--color-text-secondary)" }}
      >
        {handle}
      </span>

      {/* Connect CTA */}
      <span
        className="font-mono text-[10px] tracking-[0.2em] transition-all duration-300 mt-1"
        style={{
          color:   "rgba(212,175,55,0.8)",
          opacity: locked ? 1 : 0,
        }}
      >
        CONNECT →
      </span>
    </a>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────

const ContactSection = () => {
  const { t } = useLanguage();
  const vm = useContactSectionViewModel();

  const handleGhHover = (rect: DOMRect) => vm.handleHover("gh", rect);
  const handleLiHover = (rect: DOMRect) => vm.handleHover("li", rect);
  const handleMlHover = (rect: DOMRect) => vm.handleHover("ml", rect);

  return (
    <section
      ref={vm.sectionRef}
      id="contact"
      className="relative w-full py-24 scroll-mt-20 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <VoyagerCanvas targetPt={vm.beamTarget} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <span
            className="font-mono text-[11px] tracking-[0.25em] block mb-3"
            style={{ color: "var(--color-secondary)", opacity: 0.6 }}
          >
            &gt; VOYAGER TRANSMISSION
          </span>
          <h2
            className="text-3xl font-bold tracking-wide"
            style={{ color: "var(--color-primary)" }}
          >
            {t.sections.contact}
          </h2>
        </div>

        {/* Telemetry bar */}
        <div
          className="mb-12 flex flex-wrap items-center gap-6 px-4 py-3"
          style={{ border: "1px solid var(--color-border)", background: "var(--color-bg-secondary)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
            <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "var(--color-text)" }}>
              PROBE ACTIVE
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color: "var(--color-text-secondary)" }}>
            ORIGIN: COSTA RICA / 9.7489° N, 83.7534° W
          </span>
          <span className="font-mono text-[10px] tracking-[0.12em]" style={{ color: "var(--color-text-secondary)" }}>
            STATUS: AVAILABLE FOR MISSIONS
          </span>
        </div>

        {/* Receiving stations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Station
            stationId="STN-01"
            network="GITHUB"
            label="VERSION CONTROL"
            protocol="PROTO: HTTPS / GIT"
            handle={vm.ghHandle}
            href={vm.github}
            locked={vm.lockedId === "gh"}
            onHover={handleGhHover}
            onLeave={vm.handleLeave}
          />
          <Station
            stationId="STN-02"
            network="LINKEDIN"
            label="PROFESSIONAL NETWORK"
            protocol="PROTO: HTTPS / OAUTH"
            handle={vm.liHandle}
            href={vm.linkedin}
            locked={vm.lockedId === "li"}
            onHover={handleLiHover}
            onLeave={vm.handleLeave}
          />
          <Station
            stationId="STN-03"
            network="EMAIL"
            label="DIRECT SIGNAL"
            protocol="PROTO: SMTP / TLS"
            handle={vm.email}
            href={`mailto:${vm.email}`}
            locked={vm.lockedId === "ml"}
            onHover={handleMlHover}
            onLeave={vm.handleLeave}
          />
        </div>

        {/* Footer */}
        <p className="mt-8 font-mono text-[11px] leading-relaxed" style={{ color: "var(--color-text-secondary)", opacity: 0.4 }}>
          {`// TRANSMISSION RANGE: INTERPLANETARY · RESPONSE TIME: 24–48h · ENCRYPTION: OPEN CHANNEL`}
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
