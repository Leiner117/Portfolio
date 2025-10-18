"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaUnity,
  FaGitAlt,
  FaAws,
  FaDocker,
} from "react-icons/fa";
import { TbBrandUnity, TbBrandPrisma } from "react-icons/tb";
import {
  SiCsharp,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiDjango,
  SiMongodb,
  SiFirebase,
  SiPandas,
  SiSnowflake,
  SiDatabricks,
  SiExpress,
  SiPostgresql,
  SiGraphql,
  SiVite,
  SiRedux,
  SiNumpy,
  SiTensorflow,
  SiFastapi,
  SiJupyter,
  SiApachespark,
  SiOpenai,
  SiGooglecloud,
  SiAzuredevops,
} from "react-icons/si";
import { PiFileSql } from "react-icons/pi";

type Props = {
  name: string;
  size?: number;
  className?: string;
  iconKey?: string;
};

const TechIcon: React.FC<Props> = ({ name, size = 16, className = "", iconKey }) => {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[._\-\s]+/g, " ")
      .trim();
  const normalizedName = normalize(name);
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);
  const iconColor = isDark ? "#ffffff" : "#000000";

  const commonProps = {
    size,
    className,
    style: { color: iconColor, fill: iconColor },
  };

  const iconMap: Record<string, React.ReactElement> = {
    // --- Frontend ---
    react: <FaReact {...commonProps} />,
    "next.js": <SiNextdotjs {...commonProps} />,
    next: <SiNextdotjs {...commonProps} />,
    typescript: <SiTypescript {...commonProps} />,
    javascript: <SiJavascript {...commonProps} />,
    tailwind: <SiTailwindcss {...commonProps} />,
    html: <SiHtml5 {...commonProps} />,
    css: <SiCss3 {...commonProps} />,
    vite: <SiVite {...commonProps} />,
    redux: <SiRedux {...commonProps} />,

    // --- Backend ---
    node: <FaNodeJs {...commonProps} />,
    express: <SiExpress {...commonProps} />,
    django: <SiDjango {...commonProps} />,
    "fast api": <SiFastapi {...commonProps} />,
    fastapi: <SiFastapi {...commonProps} />,
    prisma: <TbBrandPrisma {...commonProps} />,
    "c#": <SiCsharp {...commonProps} />,
    csharp: <SiCsharp {...commonProps} />,
    ".net": (
      <Image
        src="/logos/dotnet.svg"
        alt="dotnet"
        width={size}
        height={size}
        className={`${className} ${isDark ? "invert" : ""}`}
        style={{ width: size, height: size }}
      />
    ),
    unity: <FaUnity {...commonProps} />,
    "unity game services": <TbBrandUnity {...commonProps} />,
    ugs: <TbBrandUnity {...commonProps} />,
    graphql: <SiGraphql {...commonProps} />,

    // --- Database & Data Tools ---
    sql: <PiFileSql {...commonProps} />,
    postgresql: <SiPostgresql {...commonProps} />,
    pandas: <SiPandas {...commonProps} />,
    numpy: <SiNumpy {...commonProps} />,
    snowflake: <SiSnowflake {...commonProps} />,
    databricks: <SiDatabricks {...commonProps} />,
    pyspark: <SiApachespark {...commonProps} />,
    spark: <SiApachespark {...commonProps} />,
    "apache spark": <SiApachespark {...commonProps} />,
    mongo: <SiMongodb {...commonProps} />,
    mongodb: <SiMongodb {...commonProps} />,
    jupyter: <SiJupyter {...commonProps} />,
    tensorflow: <SiTensorflow {...commonProps} />,

    // --- Cloud & DevOps ---
    firebase: <SiFirebase {...commonProps} />,
    firestore: <SiFirebase {...commonProps} />,
    functions: <SiFirebase {...commonProps} />,
    aws: <FaAws {...commonProps} />,
    "google cloud": <SiGooglecloud {...commonProps} />,
    gcp: <SiGooglecloud {...commonProps} />,
    azure: <SiAzuredevops {...commonProps} />,
    docker: <FaDocker {...commonProps} />,

    // --- Tools ---
    git: <FaGitAlt {...commonProps} />,
    "open ai": <SiOpenai {...commonProps} />,
    openai: <SiOpenai {...commonProps} />,
    python: <FaPython {...commonProps} />,
  };

  // Try to match using normalized values to better support translated names
  // If an iconKey is provided (stable id/slug), try it first
  if (iconKey) {
    const ik = normalize(iconKey);
    const found = Object.keys(iconMap).find((k) => normalize(k) === ik || normalize(k).includes(ik));
    if (found) return iconMap[found];
  }

  const matchKey = Object.keys(iconMap).find((k) => {
    const nk = normalize(k);
    // direct include checks
    if (normalizedName.includes(nk) || nk.includes(normalizedName)) return true;
    // split into words and check any word equals key
    const nameWords = normalizedName.split(" ");
    const keyWords = nk.split(" ");
    if (nameWords.some((w) => keyWords.includes(w))) return true;
    return false;
  });
  if (matchKey) return iconMap[matchKey];

  // fallback
  // Fallback: show initials so translated names don't disappear
  const getInitials = (s: string) => {
    const parts = s.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        color: isDark ? "#fff" : "#000",
        borderRadius: "50%",
        fontSize: Math.max(10, Math.floor(size / 2.5)),
        fontWeight: 600,
      }}
      aria-label={name}
      title={name}
    >
      {getInitials(name)}
    </span>
  );
};

export default TechIcon;
