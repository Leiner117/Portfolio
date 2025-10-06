import React from "react";

export default function Head() {
  const title = "Leiner Alvarado Rodriguez — Portfolio";
  const description =
    "Desarrollador Fullstack. Portafolio con proyectos, experiencia y habilidades.";
  const url = process.env.NEXT_PUBLIC_SITE_URL || "";
  const image = `${url || ""}/file.svg`;

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="google" content="notranslate" />
      <meta
        name="google-site-verification"
        content="vVnebu8-cSRPntnQm09sEPmjYo1g4azO6R4n6PCDmSk"
      />
      <link rel="icon" type="image/svg+xml" href="/file.svg?v=2" />
      <link rel="apple-touch-icon" sizes="180x180" href="/file.svg" />
      <link rel="mask-icon" href="/file.svg" color="#111827" />
      <meta name="theme-color" content="#FAFAFA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/svg+xml" />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
