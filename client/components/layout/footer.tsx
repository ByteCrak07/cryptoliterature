import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: FC = () => {
  const footerLinks = [
    {
      title: "Marketplace",
      menus: [
        { name: "All NFTs", link: "/all-nfts" },
        { name: "Solana NFTs", link: "/solana-nfts" },
        { name: "Collectibles", link: "/collectibles" },
        { name: "Domain Names", link: "/domains" },
      ],
    },
    {
      title: "My Account",
      menus: [
        { name: "Profile", link: "/all" },
        { name: "Favorites", link: "/all" },
        { name: "Watchlist", link: "/all" },
        { name: "My Collections", link: "/all" },
      ],
    },
    {
      title: "Resources",
      menus: [
        { name: "Help Center", link: "/all" },
        { name: "Platform Status", link: "/all" },
        { name: "Partners", link: "/all" },
        { name: "Gas-Free Marketplace", link: "/all" },
      ],
    },
    {
      title: "Company",
      menus: [
        { name: "About", link: "/all" },
        { name: "Careers", link: "/all" },
        { name: "Ventures", link: "/all" },
        { name: "Grants", link: "/all" },
      ],
    },
  ];

  return (
    <footer className="bg-lit-dark text-white py-10 md:py-14 px-7 md:px-10 lg:px-20 shadow">
      <div className="flex flex-col-reverse md:flex-row font-Poppins font-light justify-between items-start gap-x-0 md:gap-x-20 gap-y-10">
        <div className="flex flex-col flex-1 md:flex-2 max-w-xs">
          <Link href="/">
            <a>
              <Image
                src="/logo/logo-white.svg"
                alt="logo"
                height="32"
                width="197"
              />
            </a>
          </Link>
          <span className="mt-3 text-sm max-w-[292px] font-medium font-Poppins">
            The world&apos;s first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </span>
        </div>

        <div className="flex-1 md:flex-3 w-full flex flex-wrap gap-y-10">
          <style jsx>
            {`
              .title {
                font-family: Merriweather, serif;
                font-size: 1.125rem;
                line-height: 1.75rem;
                margin-bottom: 0.75rem;
              }

              .links {
                font-family: Poppins, sans-serif;
                font-size: 0.75rem;
                line-height: 1rem;
                font-weight: 500;
              }

              .links li {
                margin-bottom: 0.5rem;
              }

              .links li:hover {
                text-decoration: underline;
              }
            `}
          </style>

          {footerLinks.map((data, i) => (
            <div key={`section${i}`} className="min-w-[150px] flex-1">
              <h5 className="title">{data.title}</h5>
              <ul className="links">
                {data.menus.map((menu, j) => (
                  <li key={`menu${i}-${j}`}>
                    <Link href={menu.link}>
                      <a>{menu.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-10 border-0 border-b border-lit-gray" />

      <div className="flex flex-col-reverse md:flex-row gap-y-5 justify-between font-Poppins font-medium text-xs">
        <div>&copy; 2022 Cryptoliterature</div>
        <div className="flex gap-x-8">
          <Link href={"/privacy"}>
            <a className="hover:underline">Privacy Policy</a>
          </Link>
          <Link href={"/terms"}>
            <a className="hover:underline">Terms of Service</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

{
  /* <nav className="w-full pt-0 md:pt-2 md:w-auto">
<ul className="flex flex-col md:flex-row text-right">
  <li className="mx-4 my-1">
    <Link href="/story">
      <a className="hover:text-shadow">About</a>
    </Link>
  </li>
  <li className="mx-4 my-1">
    <Link href="/terms">
      <a className="hover:text-shadow">Terms&nbsp;and&nbsp;Services</a>
    </Link>
  </li>
  <li className="mx-4 my-1">
    <Link href="/privacy">
      <a className="hover:text-shadow">Privacy</a>
    </Link>
  </li>
  <li className="mx-4 my-1">
    <Link href="/help">
      <a className="hover:text-shadow">Help</a>
    </Link>
  </li>
</ul>
</nav> */
}
