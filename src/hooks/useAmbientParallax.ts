import { useEffect } from "react";

export function useAmbientParallax() {
  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      document.querySelectorAll<HTMLElement>(".stars-micro").forEach((el) => {
        el.style.setProperty("--parallax-x", `${x * 6}px`);
        el.style.setProperty("--parallax-y", `${y * 6}px`);
      });

      document.querySelectorAll<HTMLElement>(".stars-small").forEach((el) => {
        el.style.setProperty("--parallax-x", `${x * 14}px`);
        el.style.setProperty("--parallax-y", `${y * 14}px`);
      });

      document.querySelectorAll<HTMLElement>(".stars-medium").forEach((el) => {
        el.style.setProperty("--parallax-x", `${x * 22}px`);
        el.style.setProperty("--parallax-y", `${y * 22}px`);
      });
    };

    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll-shift", `${window.scrollY * 0.02}px`);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
