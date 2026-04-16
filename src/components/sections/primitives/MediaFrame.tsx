import React from "react";
import { classNames } from "../../ui/classNames";
import "./MediaFrame.css";

type MediaFrameProps =
  | {
      kind: "avatar";
      src: string;
      alt?: string;
    }
  | {
      kind: "image";
      src: string;
      alt?: string;
    };

export function MediaFrame(props: MediaFrameProps) {
  if (props.kind === "avatar") {
    const { src, alt } = props;
    return (
      <div className="section-media-frame section-media-frame--avatar">
        <img
          src={src}
          alt={alt ?? ""}
          className="section-media-frame__asset"
        />
      </div>
    );
  }

  const { src, alt } = props;
  return (
    <div className={classNames(["section-media-frame", "section-media-frame--image"])}>
      <img
        src={src}
        alt={alt ?? ""}
        className="section-media-frame__asset"
      />
    </div>
  );
}
