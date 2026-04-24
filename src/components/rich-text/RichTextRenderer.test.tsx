import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RichTextRenderer } from "./RichTextRenderer";

describe("RichTextRenderer", () => {
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
});
