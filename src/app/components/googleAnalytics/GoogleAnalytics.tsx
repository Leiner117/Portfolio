"use client";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const MEASUREMENT_ID = "GTM-TC9BX8RN";

export const GoogleAnalytics = () => {
  useEffect(() => {
    ReactGA.initialize(MEASUREMENT_ID);
  }, []);

  return null;
}
