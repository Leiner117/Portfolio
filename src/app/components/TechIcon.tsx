"use client";
import React from "react";
import Image from "next/image";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaUnity,
  FaSnowflake,
  FaGitAlt,
} from "react-icons/fa";
import { TbBrandUnity, TbBrandDatabricks } from "react-icons/tb";
import { BsFiletypeSql } from "react-icons/bs";
import {
  SiCsharp,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiDjango,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiPandas,
} from "react-icons/si";

type Props = {
  name: string;
  size?: number;
  className?: string;
};

const TechIcon: React.FC<Props> = ({ name, size = 16, className = "" }) => {
  const key = name.toLowerCase();
  switch (true) {
    case key.includes("react"):
      return <FaReact size={size} className={className} />;
    case key.includes("typescript") || key === "ts":
      return <SiTypescript size={size} className={className} />;
    case key.includes("next"):
      return <SiNextdotjs size={size} className={className} />;
    case key.includes("tailwind"):
      return <SiTailwindcss size={size} className={className} />;
    case key.includes("javascript") || key === "js":
      return <SiJavascript size={size} className={className} />;
    case key.includes("html"):
      return <SiHtml5 size={size} className={className} />;
    case key.includes("css"):
      return <SiCss3 size={size} className={className} />;
    case key.includes("node"):
      return <FaNodeJs size={size} className={className} />;
    case key.includes("python"):
      return <FaPython size={size} className={className} />;
    case key === "c#" || key === "csharp" || key.includes("c#"):
      return <SiCsharp size={size} className={className} />;
    case key.includes("unity"):
      return <FaUnity size={size} className={className} />;
    case key.includes("unity game services") || key.includes("ugs"):
      return <TbBrandUnity size={size} className={className} />;
    case key.includes("firebase") ||
      key.includes("firestore") ||
      key.includes("functions"):
      return <SiFirebase size={size} className={className} />;
    case key.includes("django"):
      return <SiDjango size={size} className={className} />;
    case key.includes("postgres") ||
      key.includes("postgresql") ||
      key.includes("sql"):
      return <SiPostgresql size={size} className={className} />;
    case key.includes("mongo"):
      return <SiMongodb size={size} className={className} />;
    case key.includes("snowflake"):
      return <FaSnowflake size={size} className={className} />;
    case key.includes("databricks"):
      return <TbBrandDatabricks size={size} className={className} />;
    case key.includes("pandas"):
      return <SiPandas size={size} className={className} />;
    case key.includes("sql"):
      return <BsFiletypeSql size={size} className={className} />;
    case key.includes("git"):
      return <FaGitAlt size={size} className={className} />;
    case key.includes(".net") || key.includes("dotnet"):
      return (
        <Image
          src="/logos/dotnet.svg"
          alt="dotnet"
          width={size}
          height={size}
          className={className}
          style={{ width: size, height: size }}
        />
      );
    default:
      return (
        <span
          className={className}
          style={{ display: "inline-block", width: size, height: size }}
        />
      );
  }
};

export default TechIcon;
