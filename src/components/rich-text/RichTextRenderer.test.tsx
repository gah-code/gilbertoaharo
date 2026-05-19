import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RichTextRenderer } from "./RichTextRenderer";

describe("RichTextRenderer", () => {
  it("downgrades body heading one nodes to h2", () => {
    const document = {
      nodeType: "document",
      content: [
        {
          nodeType: "heading-1",
          content: [
            {
              nodeType: "text",
              value: "Article body section",
            },
          ],
        },
      ],
    };

    render(<RichTextRenderer document={document} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Article body section" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 1, name: "Article body section" }),
    ).not.toBeInTheDocument();
  });

  it("uses new tabs only for external rich text hyperlinks", () => {
    const document = {
      nodeType: "document",
      content: [
        {
          nodeType: "paragraph",
          content: [
            {
              nodeType: "hyperlink",
              data: { uri: "https://example.com" },
              content: [
                {
                  nodeType: "text",
                  value: "External reference",
                },
              ],
            },
            {
              nodeType: "text",
              value: " and ",
            },
            {
              nodeType: "hyperlink",
              data: { uri: "/articles/typed-boundaries" },
              content: [
                {
                  nodeType: "text",
                  value: "internal article",
                },
              ],
            },
          ],
        },
      ],
    };

    render(<RichTextRenderer document={document} />);

    const external = screen.getByRole("link", { name: "External reference" });
    expect(external).toHaveAttribute("href", "https://example.com");
    expect(external).toHaveAttribute("target", "_blank");
    expect(external).toHaveAttribute("rel", "noreferrer noopener");

    const internal = screen.getByRole("link", { name: "internal article" });
    expect(internal).toHaveAttribute("href", "/articles/typed-boundaries");
    expect(internal).not.toHaveAttribute("target");
    expect(internal).not.toHaveAttribute("rel");
  });

  it("renders inline code marks as code elements", () => {
    const document = {
      nodeType: "document",
      content: [
        {
          nodeType: "paragraph",
          content: [
            {
              nodeType: "text",
              value: "npm run test",
              marks: [{ type: "code" }],
            },
          ],
        },
      ],
    };

    render(<RichTextRenderer document={document} />);

    expect(screen.getByText("npm run test").tagName).toBe("CODE");
  });

  it("applies intrinsic dimensions for embedded assets when image details are present", () => {
    const document = {
      nodeType: "document",
      content: [
        {
          nodeType: "embedded-asset-block",
          data: {
            target: {
              fields: {
                title: "Architecture Diagram",
                file: {
                  url: "//images.ctfassets.net/example/diagram.png",
                  details: {
                    image: {
                      width: 1600,
                      height: 900,
                    },
                  },
                },
              },
            },
          },
        },
      ],
    };

    render(<RichTextRenderer document={document} />);

    const image = screen.getByRole("img", { name: "Architecture Diagram" });
    expect(image).toHaveAttribute(
      "src",
      "https://images.ctfassets.net/example/diagram.png",
    );
    expect(image).toHaveAttribute("width", "1600");
    expect(image).toHaveAttribute("height", "900");
  });

  it("renders non-image embedded assets as links", () => {
    const document = {
      nodeType: "document",
      content: [
        {
          nodeType: "embedded-asset-block",
          data: {
            target: {
              fields: {
                title: "Downloadable Brief",
                description: "A supporting PDF resource.",
                file: {
                  url: "//assets.ctfassets.net/example/brief.pdf",
                  fileName: "brief.pdf",
                  contentType: "application/pdf",
                },
              },
            },
          },
        },
      ],
    };

    render(<RichTextRenderer document={document} />);

    const link = screen.getByRole("link", { name: "Downloadable Brief" });
    expect(link).toHaveAttribute(
      "href",
      "https://assets.ctfassets.net/example/brief.pdf",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
