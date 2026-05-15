import { describe, expect, it } from "vitest";
import { mapArticlePage, mapLandingPage, mapNavigationMenu } from "./adapters";
import type {
  Article,
  EntryTypeId,
  FooterLink,
  NavLink,
  NavigationMenu,
  PagePersonalLanding,
  SectionFooter,
  SectionHero,
} from "./types";

const makeSys = <T extends EntryTypeId>(id: string, type: T) => ({
  id,
  contentType: { sys: { id: type } },
});

function makeNavLink(
  id: string,
  label: string,
  href: string,
  order: number,
): NavLink {
  return {
    sys: makeSys(id, "navLink"),
    fields: {
      label,
      href,
      order,
    },
  };
}

function makeNavigationMenu(links: NavLink[]): NavigationMenu {
  const ctaLink = makeNavLink("nav-contact", "Contact", "mailto:hello@example.com", 99);

  return {
    sys: makeSys("nav-main", "navigationMenu"),
    fields: {
      internalName: "Main Navigation",
      brandLabel: "Gilberto Haro",
      brandHref: "#top",
      links,
      ctaLink: {
        ...ctaLink,
        fields: {
          ...ctaLink.fields,
          isCta: true,
        },
      },
      mobileBreakpointPx: 960,
    },
  };
}

const heroSection: SectionHero = {
  sys: makeSys("hero", "sectionHero"),
  fields: {
    internalName: "Hero",
    anchorId: "top",
    title: "Hero Title",
  },
};

function makeFooterLink(
  id: string,
  label: string,
  href: string,
  overrides: Partial<FooterLink["fields"]> = {},
): FooterLink {
  return {
    sys: makeSys(id, "footerLink"),
    fields: {
      label,
      href,
      kind: "nav",
      ...overrides,
    },
  };
}

function makeFooterSection(links: FooterLink[]): SectionFooter {
  return {
    sys: makeSys("footer", "sectionFooter"),
    fields: {
      internalName: "Footer",
      brandTitle: "Gilberto Haro",
      navigationGroups: [
        {
          sys: makeSys("footer-group-site", "footerLinkGroup"),
          fields: {
            label: "Site",
            links,
          },
        },
      ],
      socialLinks: [],
    },
  };
}

function makeLandingPage(sections: PagePersonalLanding["fields"]["sections"]): PagePersonalLanding {
  return {
    sys: makeSys("page-landing", "pagePersonalLanding"),
    fields: {
      internalName: "Landing",
      slug: "home",
      metaTitle: "Home",
      sections,
    },
  };
}

describe("contentful adapters", () => {
  it("maps only navigation links provided by Contentful", () => {
    const menu = makeNavigationMenu([
      makeNavLink("nav-about", "About", "#top", 1),
      makeNavLink("nav-projects", "Projects", "#projects", 2),
      makeNavLink("nav-skills", "Skills", "#skills", 3),
    ]);

    const mapped = mapNavigationMenu(menu);

    expect(mapped.links.map((link) => link.label)).toEqual([
      "About",
      "Projects",
      "Skills",
    ]);
  });

  it("does not rewrite an existing Articles nav entry", () => {
    const menu = makeNavigationMenu([
      makeNavLink("nav-about", "About", "#top", 1),
      makeNavLink("nav-articles", "Articles", "/writing", 2),
      makeNavLink("nav-projects", "Projects", "#projects", 3),
    ]);

    const mapped = mapNavigationMenu(menu);
    const articleLinks = mapped.links.filter((link) => link.label === "Articles");

    expect(articleLinks).toHaveLength(1);
    expect(articleLinks[0]?.href).toBe("/writing");
  });

  it("maps footer links from landing sections without injecting Articles", () => {
    const page = makeLandingPage([
      heroSection,
      makeFooterSection([
        makeFooterLink("footer-about", "About", "#top"),
        makeFooterLink("footer-projects", "Projects", "#projects"),
      ]),
    ]);

    const mapped = mapLandingPage(page);
    const siteLinks =
      mapped.footer?.fields.navigationGroups?.[0]?.fields.links ?? [];
    const articles = siteLinks.find((link) => link.fields.label === "Articles");

    expect(articles).toBeUndefined();
  });

  it("maps fallback footer values as-is when landing page has no footer section", () => {
    const pageWithoutFooter = makeLandingPage([heroSection]);
    const fallbackFooter = makeFooterSection([
      makeFooterLink("footer-articles", "Articles", "/writing", {
        kind: "cta",
        iconKey: "none",
        variant: "secondary",
        openInNewTab: true,
      }),
    ]);

    const mapped = mapLandingPage(pageWithoutFooter, fallbackFooter);
    const links = mapped.footer?.fields.navigationGroups?.[0]?.fields.links ?? [];
    const articles = links.filter((link) => link.fields.label === "Articles");

    expect(articles).toHaveLength(1);
    expect(articles[0]?.fields.href).toBe("/writing");
    expect(articles[0]?.fields.kind).toBe("cta");
    expect(articles[0]?.fields.iconKey).toBe("none");
    expect(articles[0]?.fields.variant).toBe("secondary");
    expect(articles[0]?.fields.openInNewTab).toBe(true);
  });

  it("maps article canonical fallbacks to the production absolute URL", () => {
    const article: Article = {
      sys: makeSys("article-canonical", "article"),
      fields: {
        internalName: "Canonical Article",
        slug: "canonical-article",
        title: "Canonical Article",
        body: { nodeType: "document", content: [] },
      },
    };

    const mapped = mapArticlePage(article);

    expect(mapped.seo.canonicalUrl).toBe(
      "https://gilbertaharo.com/articles/canonical-article",
    );
  });

  it("maps relative article canonical overrides to absolute URLs", () => {
    const article: Article = {
      sys: makeSys("article-canonical-override", "article"),
      fields: {
        internalName: "Canonical Override Article",
        slug: "canonical-override-article",
        title: "Canonical Override Article",
        body: { nodeType: "document", content: [] },
        canonicalUrl: "/articles/custom-canonical",
      },
    };

    const mapped = mapArticlePage(article);

    expect(mapped.seo.canonicalUrl).toBe(
      "https://gilbertaharo.com/articles/custom-canonical",
    );
  });
});
