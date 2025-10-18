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
};

const TechIcon: React.FC<Props> = ({ name, size = 16, className = "" }) => {
  const key = name.toLowerCase().trim();
  const [isDark, setIsDark] = useState(false);

  // ✅ Detecta tu sistema de temas basado en [data-theme="dark"]
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    };

    checkTheme();

    // Observa cambios en el atributo data-theme del <html>
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // 🎨 Color dinámico según tema
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

  const matchKey = Object.keys(iconMap).find((k) => key.includes(k));
  if (matchKey) return iconMap[matchKey];

  // fallback
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        borderRadius: "50%",
      }}
    />
  );
};

export default TechIcon;
