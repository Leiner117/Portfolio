"use client";
import { useEffect, useState } from "react";
import useTyping from "@/app/hooks/useTyping";
import { useLanguage } from "@/app/context/LanguageContext";

export interface HeroViewModel {
  nameDisplay: string;
  titleDisplay: string;
  showControls: boolean;
  nameTypingFinished: boolean;
  titleTypingFinished: boolean;
  viewProjectsLabel: string;
  contactLabel: string;
}

export const useHeroViewModel = (): HeroViewModel => {
  const { t } = useLanguage();
  const [startTitle, setStartTitle] = useState(false);

  const nameTyping = useTyping(t.hero.name || "", 60, true);
  const titleTyping = useTyping(t.hero.title || "", 40, startTitle);

  useEffect(() => {
    if (nameTyping.finished) setStartTitle(true);
  }, [nameTyping.finished]);

  return {
    nameDisplay: nameTyping.display,
    titleDisplay: titleTyping.display,
    showControls: titleTyping.finished,
    nameTypingFinished: nameTyping.finished,
    titleTypingFinished: titleTyping.finished,
    viewProjectsLabel: t.hero.buttons.viewProjects,
    contactLabel: t.hero.buttons.contact,
  };
};

export default useHeroViewModel;
