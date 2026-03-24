"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import enData from "@/app/data/en.json";

type Project = (typeof enData)["projects"][number];

const STATUS_COLORS: Record<string, string> = {
  active:   "#4ade80",
  complete: "#60a5fa",
};

export interface MissionCardViewModel {
  missionNumber: string;
  statusLabel: string;
  statusColor: string;
}

export const useMissionCardViewModel = (project: Project, index: number): MissionCardViewModel => {
  const { t } = useLanguage();

  const missionNumber = String(index + 1).padStart(3, "0");
  const statusKey = project.status ?? "complete";

  const statusLabels: Record<string, string> = {
    active:   t.missions.status.active,
    complete: t.missions.status.complete,
  };

  const statusLabel = statusLabels[statusKey] ?? statusLabels.complete;
  const statusColor = STATUS_COLORS[statusKey] ?? STATUS_COLORS.complete;

  return { missionNumber, statusLabel, statusColor };
};
