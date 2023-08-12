export type SiteConfig = {
  name: string;
  keyword: string;
  description: string;
  ogImage: string;
  links: {
    github: string;
    twitter: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};
