import { FC } from "react";
import Head from "next/head";

interface LayoutProps {
  title: string;
  description: string;
  path: string | null;
  blog?: boolean;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  published_time?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  author?: string;
  authorImg?: string;
}

const Seo: FC<LayoutProps> = ({
  title,
  description,
  path,
  blog,
  og_title,
  og_description,
  og_image,
  published_time,
  twitter_title,
  twitter_description,
  twitter_image,
  author,
  authorImg,
}) => {
  const siteUrl = "https://cryptoliterature.in";
  const currentUrl = siteUrl + path;
  const schemaOrgJsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        publisher: {
          "@type": "Organization",
          name: "Cryptoliterature",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/icons/android-chrome-192x192.png`,
          },
        },
        headline: title,
        url: currentUrl,
        description: description,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": siteUrl,
        },
        author: {
          "@type": "Person",
          name: author,
          image: {
            "@type": "ImageObject",
            url: authorImg,
          },
        },
        datePublished: published_time,
        image: {
          "@type": "ImageObject",
          url: `${og_image ? og_image : twitter_image ? twitter_image : ""}`,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        publisher: {
          "@type": "Organization",
          name: "Cryptoliterature",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/icons/android-chrome-192x192.png`,
          },
        },
        headline: title,
        url: currentUrl,
        description: description,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": siteUrl,
        },
      };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Crypto, Cryptocurrency, Literature, Literature Marketplace, Blockchain, NFT, NFTs, ETH, Ether, Ethereum"
        />

        {path ? (
          <>
            <link rel="canonical" href={currentUrl} />

            {/* Open graph tags */}
            <meta property="og:type" content={blog ? "article" : "website"} />

            <meta property="og:site_name" content="Cryptoliterature" />

            <meta property="og:title" content={og_title ? og_title : title} />

            <meta
              property="og:description"
              content={og_description ? og_description : description}
            />

            <meta property="og:url" content={currentUrl} />

            {og_image ? <meta property="og:image" content={og_image} /> : <></>}

            {published_time ? (
              <meta
                property="article:published_time"
                content={published_time}
              />
            ) : (
              <></>
            )}

            {/* <meta property="article:publisher" content="https://www.facebook.com/ghost"/> */}

            {/* twitter tags */}
            <meta name="twitter:card" content="summary_large_image" />

            <meta
              name="twitter:title"
              content={twitter_title ? twitter_title : title}
            />

            <meta
              name="twitter:description"
              content={twitter_description ? twitter_description : description}
            />

            <meta name="twitter:url" content={currentUrl} />

            {twitter_image ? (
              <meta name="twitter:image" content={twitter_image} />
            ) : (
              <></>
            )}

            {blog ? (
              <>
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content={author} />
                {/* <meta name="twitter:site" content="@ghost" /> */}
              </>
            ) : (
              <></>
            )}

            {/* Schema.org */}
            <script type="application/ld+json">
              {JSON.stringify(schemaOrgJsonLd)}
            </script>
          </>
        ) : (
          <></>
        )}
      </Head>
    </>
  );
};

export default Seo;
