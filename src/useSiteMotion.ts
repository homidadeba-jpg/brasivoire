import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { RefObject } from 'react';

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useSiteMotion(scope: RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    let active = true;
    const media = gsap.matchMedia(root);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let running = true;
      const entrance = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 1.15 } });
      entrance.from('.hero-category', { y: 12, autoAlpha: 0, duration: .7 }, 0)
        .from('.hero-title-entry', { xPercent: 12, yPercent: 48, autoAlpha: 0 }, .1)
        .from('.hero-description-entry', { xPercent: -24, y: 30, autoAlpha: 0, duration: 1.1 }, .36)
        .from('.hero-bottom-entry', { y: 15, autoAlpha: 0, duration: .85 }, .65)
        .from('.hero-cta-entry', { y: 20, autoAlpha: 0, duration: .85 }, .75);

      // A imagem de fundo e o primeiro plano nunca mudam de enquadramento entre si.
      // A entrada e o scroll controlam camadas diferentes de texto.
      gsap.to('.hero-title-depth', {
        y: -24, ease: 'none',
        scrollTrigger: { trigger: '.crane-hero', start: 'top top', end: 'bottom top', scrub: .6 },
      });
      gsap.to('.hero-description-depth', {
        y: -14, ease: 'none',
        scrollTrigger: { trigger: '.crane-hero', start: 'top top', end: 'bottom top', scrub: .6 },
      });

      const selectors = '.about-content h2, .about-summary, .section-heading, .insurance-story, .insurance-specialties, .crane-photo, .crane-content, .consortium-copy, .consortium-image, .difference-intro, .difference-grid article, .quote-copy, .lead-form, .footer-main';
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selectors)).forEach(element => {
        gsap.from(element, {
          y: 26, ease: 'none',
          scrollTrigger: { trigger: element, start: 'clamp(top 98%)', end: 'clamp(top 67%)', scrub: .55, invalidateOnRefresh: true },
        });
      });

      // O quadro mantém o espaço reservado; só os pixels da foto se movem.
      // A rolagem devolve a foto ao enquadramento original sem reiniciar opacidade.
      root.querySelectorAll<HTMLElement>('.photo-frame').forEach(frame => {
        const image = frame.querySelector<HTMLImageElement>('.editorial-photo');
        if (!image) return;
        gsap.fromTo(image, { scale: 1.09, yPercent: 2 }, {
          scale: 1, yPercent: 0, ease: 'none',
          scrollTrigger: { trigger: frame, start: 'clamp(top 98%)', end: 'clamp(top 35%)', scrub: .7, invalidateOnRefresh: true },
        });
      });

      const photograph = root.querySelector<HTMLImageElement>('.hero-photograph');
      Promise.all([
        document.fonts.ready,
        photograph?.decode().catch(() => undefined),
      ]).then(() => {
        if (!active || !running) return;
        entrance.play();
        ScrollTrigger.refresh();
      });
      return () => { running = false; entrance.kill(); };
    });
    return () => { active = false; media.revert(); };
  }, { scope });
}
