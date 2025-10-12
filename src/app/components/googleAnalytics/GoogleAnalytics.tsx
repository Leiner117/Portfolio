"use client";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-9CDEQ1NT0P";

export const GoogleAnalytics = () => {
  useEffect(() => {
    ReactGA.initialize(MEASUREMENT_ID);
  }, []);

  return null;
}
