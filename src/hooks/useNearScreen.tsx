import { useState, useEffect, useRef } from "react";

type useNearScreenParams = {
  distance: string;
  externalRef?: React.MutableRefObject<Element | undefined> | null;
  once: boolean;
};

export default function useNearScreen({
  distance = "100px",
  externalRef,
  once = true,
}: useNearScreenParams) {
  const [isNearScreen, setNearScreen] = useState(false);
  const fromRef = useRef<Element>();

  useEffect(() => {
    let observer: IntersectionObserver;
    const element: Element | undefined = externalRef
      ? externalRef.current
      : fromRef.current;

    const onChange = (entries: any[], observer: IntersectionObserver) => {
      const _element = entries[0];
      if (_element.isIntersecting) {
        setNearScreen(true);
        once && observer.disconnect();
      } else {
        !once && setNearScreen(false);
      }
    };

    observer = new IntersectionObserver(onChange, {
      rootMargin: distance,
    });
    observer && observer.observe(element!);
  });
  return { isNearScreen, fromRef };
}
