import { FC, useEffect, useState } from "react";
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
}) => {
  const currentUrl = process.env.SITE_URL + path;

  return (
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
            <meta property="article:published_time" content={published_time} />
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

          {/* schema.org */}
          <script type="application/ld+json">
            {`
              {
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "publisher": {
                      "@type": "Organization",
                      "name": "Jaba",
                      "url": "http://localhost:2368/",
                      "logo": {
                          "@type": "ImageObject",
                          "url": "http://localhost:2368/content/images/2021/10/logo.png"
                      }
                  },
                  "author": {
                      "@type": "Person",
                      "name": "Abu",
                      "image": {
                          "@type": "ImageObject",
                          "url": "http://localhost:2368/content/images/2021/10/58821810.jpg",
                          "width": 460,
                          "height": 460
                      },
                      "url": "http://localhost:2368/author/abu/",
                      "sameAs": []
                  },
                  "headline": "Addressing the Dark Side of the Crypto World",
                  "url": "http://localhost:2368/addressing-the-dark-side-of-the-crypto-world/",
                  "datePublished": "2021-10-15T14:39:50.000Z",
                  "dateModified": "2021-10-16T20:52:06.000Z",
                  "image": {
                      "@type": "ImageObject",
                      "url": "http://localhost:2368/content/images/2021/10/Rectangle-1852.png",
                      "width": 591,
                      "height": 311
                  },
                  "description": "The same reason crypto-assets—or what some people call crypto-currencies—are so appealing is also what makes them dangerous. These digital offerings are typically built in a decentralized way and without the typically built in a decentralized way and without the typically built in",
                  "mainEntityOfPage": {
                      "@type": "WebPage",
                      "@id": "http://localhost:2368/"
                  }
              }
            `}
          </script>
        </>
      ) : (
        <></>
      )}
    </Head>
  );
};

export default Seo;
