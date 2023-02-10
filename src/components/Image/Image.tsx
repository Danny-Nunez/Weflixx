import CheckInView from "modules/CheckInView";
import { FC, HTMLProps, useEffect, useRef, useState } from "react";

interface ImageProps {
  src: string;
  opacity?: number;
}

const Image: FC<HTMLProps<HTMLImageElement> & ImageProps> = ({
  src,
  alt = "",
  crossOrigin: _,
  opacity = 1,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [realSrc, setRealSrc] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const handler = () => {
      setLoaded(true);
    };
    const current = imageRef.current;
    current?.addEventListener("load", handler);
    return () => current?.removeEventListener("load", handler);
  }, [src]);
  return (
    <CheckInView onInView={() => setRealSrc(src)}>
      <picture>
        <img
          ref={imageRef}
          style={{ opacity: loaded ? 1 : 0 }}
          src={realSrc}
          alt={alt}
          {...props}
        />
      </picture>
    </CheckInView>
  );
};

export default Image;
