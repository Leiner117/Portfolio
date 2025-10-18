"use client";
import React from "react";
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

  const iconMap: Record<string, React.ReactElement> = {
    // --- Frontend ---
    react: <FaReact size={size} className={className} />,
    "next.js": <SiNextdotjs size={size} className={className} />,
    next: <SiNextdotjs size={size} className={className} />,
    typescript: <SiTypescript size={size} className={className} />,
    javascript: <SiJavascript size={size} className={className} />,
    tailwind: <SiTailwindcss size={size} className={className} />,
    html: <SiHtml5 size={size} className={className} />,
    css: <SiCss3 size={size} className={className} />,
    vite: <SiVite size={size} className={className} />,
    redux: <SiRedux size={size} className={className} />,

    // --- Backend ---
    node: <FaNodeJs size={size} className={className} />,
    express: <SiExpress size={size} className={className} />,
    django: <SiDjango size={size} className={className} />,
    "fast api": <SiFastapi size={size} className={className} />,
    fastapi: <SiFastapi size={size} className={className} />,
    prisma: <TbBrandPrisma size={size} className={className} />,
    "c#": <SiCsharp size={size} className={className} />,
    csharp: <SiCsharp size={size} className={className} />,
    ".net": (
      <Image
        src="/logos/dotnet.svg"
        alt="dotnet"
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size }}
      />
    ),
    unity: <FaUnity size={size} className={className} />,
    "unity game services": <TbBrandUnity size={size} className={className} />,
    ugs: <TbBrandUnity size={size} className={className} />,
    graphql: <SiGraphql size={size} className={className} />,

    // --- Database & Data Tools ---
    sql: <PiFileSql size={size} className={className} />,
    postgresql: <SiPostgresql size={size} className={className} />,
    pandas: <SiPandas size={size} className={className} />,
    numpy: <SiNumpy size={size} className={className} />,
    snowflake: <SiSnowflake size={size} className={className} />,
    databricks: <SiDatabricks size={size} className={className} />,
    mongo: <SiMongodb size={size} className={className} />,
    mongodb: <SiMongodb size={size} className={className} />,
    jupyter: <SiJupyter size={size} className={className} />,
    tensorflow: <SiTensorflow size={size} className={className} />,

    // --- Cloud & DevOps ---
    firebase: <SiFirebase size={size} className={className} />,
    firestore: <SiFirebase size={size} className={className} />,
    functions: <SiFirebase size={size} className={className} />,
    aws: <FaAws size={size} className={className} />,
    "google cloud": <SiGooglecloud size={size} className={className} />,
    gcp: <SiGooglecloud size={size} className={className} />,
    azure: <SiAzuredevops size={size} className={className} />,
    docker: <FaDocker size={size} className={className} />,

    // --- Tools ---
    git: <FaGitAlt size={size} className={className} />,
    "open ai": <SiOpenai size={size} className={className} />,
    openai: <SiOpenai size={size} className={className} />,
    python: <FaPython size={size} className={className} />,
  };

  // Buscar coincidencias parciales
  const matchKey = Object.keys(iconMap).find((k) => key.includes(k));

  if (matchKey) return iconMap[matchKey];

  // Fallback
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
      }}
    />
  );
};

export default TechIcon;
