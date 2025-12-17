// src/components/SeoHead.tsx
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  keywords?: string;
  jsonLd?: Record<string, any>;
  noIndex?: boolean;
}

const SITE_CONFIG = {
  siteName: "내 프로젝트 이름",
  description: "이 프로젝트에 대한 기본 설명입니다.",
  siteUrl: "https://mysite.com",
  image: "https://mysite.com/default-og-image.png",
  twitterUsername: "@my_twitter_handle",
};

const SeoHead = ({
  title,
  description,
  image,
  url,
  type = "website",
  keywords,
  jsonLd,
  noIndex = false,
}: SeoHeadProps) => {
  const location = useLocation();

  const finalUrl = url || `${SITE_CONFIG.siteUrl}${location.pathname}`;

  const finalTitle = title
    ? `${title} | ${SITE_CONFIG.siteName}`
    : SITE_CONFIG.siteName;

  const finalDescription = description || SITE_CONFIG.description;
  const finalImage = image || SITE_CONFIG.image;

  return (
    <Helmet prioritizeSeoTags defer={false} key={finalUrl}>
      <title>{finalTitle}</title>

      {/* Basic Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical */}
      <link rel="canonical" href={finalUrl} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph - 조건부 렌더링으로 명확하게 */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={SITE_CONFIG.twitterUsername} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          // Avoid escaping so search engines can parse JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Helmet>
  );
};

export default SeoHead;
