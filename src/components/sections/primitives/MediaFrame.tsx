import React from "react";
import { classNames } from "../../ui/classNames";
import "./MediaFrame.css";

type MediaFrameProps =
  | {
      kind: "avatar";
      src: string;
      srcSet?: string;
      sizes?: string;
      alt?: string;
      className?: string;
      loading?: React.ImgHTMLAttributes<HTMLImageElement>["loading"];
      decoding?: React.ImgHTMLAttributes<HTMLImageElement>["decoding"];
    }
  | {
      kind: "image";
      src: string;
      srcSet?: string;
      sizes?: string;
      alt?: string;
      className?: string;
      loading?: React.ImgHTMLAttributes<HTMLImageElement>["loading"];
      decoding?: React.ImgHTMLAttributes<HTMLImageElement>["decoding"];
    };

export function MediaFrame(props: MediaFrameProps) {
  const loading = props.loading ?? "lazy";
  const decoding = props.decoding ?? "async";

  if (props.kind === "avatar") {
    const { src, srcSet, sizes, alt, className } = props;
    return (
      <div className={classNames(["section-media-frame", "section-media-frame--avatar", className])}>
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt ?? ""}
          className="section-media-frame__asset"
          loading={loading}
          decoding={decoding}
        />
      </div>
    );
  }

  const { src, srcSet, sizes, alt, className } = props;
  return (
    <div className={classNames(["section-media-frame", "section-media-frame--image", className])}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt ?? ""}
        className="section-media-frame__asset"
        loading={loading}
        decoding={decoding}
      />
    </div>
  );
}
