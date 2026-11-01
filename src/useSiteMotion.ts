import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { RefObject } from 'react';
import { craneMask } from './heroMedia';

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useSiteMotion(scope: RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    let active = true;
    let entranceFinished = false;
    const media = gsap.matchMedia(root);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let running = true;
      const hero = root.querySelector<HTMLElement>('.crane-hero')!;
      const photograph = hero.querySelector<HTMLImageElement>('.hero-photograph')!;
      const maskImage = new Image();
      maskImage.src = craneMask;
      const title = hero.querySelector<HTMLElement>('.hero-title-entry')!;
      const description = hero.querySelector<HTMLElement>('.hero-description-entry')!;
      const originalWidth = hero.clientWidth;

      // Projeta coordenadas da fotografia original no mesmo object-fit usado
      // tanto pelo fundo quanto pela silhueta. Os textos começam atrás do
      // trecho superior da lança, mantendo opacidade: a oclusão é feita pelo
      // guindaste, com um percurso curto até a composição final.
      const photoBox = photograph.getBoundingClientRect();
      const scale = Math.max(photoBox.width / 720, photoBox.height / 1280);
      const photoX = photoBox.left + (photoBox.width - 720 * scale) / 2;
      const photoY = photoBox.top + (photoBox.height - 1280 * scale) / 2;
      const titleBox = title.getBoundingClientRect();
      const descriptionBox = description.getBoundingClientRect();
      const desktop = window.matchMedia('(min-width: 768px)').matches;
      const entrance = entranceFinished ? null : gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          if (!active || !running) return;
          entranceFinished = true;
          hero.dataset.motionState = 'complete';
        },
      });
      hero.dataset.motionState = entranceFinished ? 'complete' : 'preparing';
      if (entrance) {
        entrance.from('.hero-category', { y: 10, autoAlpha: 0, duration: .7, ease: 'power2.out' }, 0)
          .fromTo(title, {
            x: photoX + 165 * scale - titleBox.left,
            y: photoY + (desktop ? 390 : 300) * scale - titleBox.top,
            scale: .97,
            opacity: 1,
            transformOrigin: '0% 0%',
          }, { x: 0, y: 0, scale: 1, duration: 1.05, ease: 'power3.out' }, .12)
          .fromTo(title, { opacity: 0 }, { opacity: 1, duration: .2, ease: 'none' }, .12)
          .fromTo(description, {
            x: photoX + 290 * scale - descriptionBox.left,
            y: photoY + 470 * scale - descriptionBox.top,
            scale: .98,
            opacity: 1,
            transformOrigin: '0% 0%',
          }, { x: 0, y: 0, scale: 1, duration: .85, ease: 'power3.out' }, .55)
          .fromTo(description, { opacity: 0 }, { opacity: 1, duration: .2, ease: 'none' }, .55)
          .from('.hero-bottom-entry', { y: 12, autoAlpha: 0, duration: .45, ease: 'power2.out' }, 1)
          .from('.hero-cta-entry', { y: 14, autoAlpha: 0, duration: .5, ease: 'power2.out' }, 1.1);
      }

      // Uma mudança de orientação conclui a entrada em vez de deslocar os
      // textos contra uma máscara de outra largura. A cena não reinicia.
      const finishOnResize = () => {
        if (hero.clientWidth !== originalWidth) entrance?.progress(1);
      };
      window.addEventListener('resize', finishOnResize);
      // Navegadores internos podem suspender a animação ao trocar de aplicativo.
      // Ao retornar, entrega a composição completa sem deixar texto pela metade.
      const finishOnReturn = (event: Event) => {
        if (event.type === 'pageshow' && !(event as PageTransitionEvent).persisted) return;
        if (document.visibilityState === 'visible' && hero.dataset.motionState === 'entering') entrance?.progress(1);
      };
      document.addEventListener('visibilitychange', finishOnReturn);
      window.addEventListener('pageshow', finishOnReturn);

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

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '#guindastes', start: 'clamp(top 95%)', end: 'clamp(top 35%)', scrub: .65 },
      }).from('.crane-heading', { y: 22 }, 0)
        .from('.crane-content', { y: 18 }, 0);

      const selectors = '.about-content h2, .about-summary, .section-heading, .insurance-story, .insurance-specialties, .consortium-copy, .consortium-gallery, .quote-copy, .lead-form, .footer-main';
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selectors)).forEach(element => {
        gsap.from(element, {
          y: 18, ease: 'none',
          scrollTrigger: { trigger: element, start: 'clamp(top 98%)', end: 'clamp(top 67%)', scrub: .55, invalidateOnRefresh: true },
        });
      });

      // O quadro mantém o espaço reservado; só os pixels da foto se movem.
      // A rolagem devolve a foto ao enquadramento original sem reiniciar opacidade.
      root.querySelectorAll<HTMLElement>('.photo-frame').forEach(frame => {
        const image = frame.querySelector<HTMLImageElement>('.editorial-photo');
        if (!image) return;
        const preserveSubject = image.classList.contains('subject-photo');
        gsap.fromTo(image, { scale: preserveSubject ? 1.025 : 1.09, yPercent: preserveSubject ? 0 : 2 }, {
          scale: 1, yPercent: 0, ease: 'none',
          scrollTrigger: { trigger: frame, start: 'clamp(top 98%)', end: 'clamp(top 35%)', scrub: .7, invalidateOnRefresh: true },
        });
      });

      Promise.all([
        document.fonts.ready,
        photograph.decode().catch(() => undefined),
        maskImage.decode().then(() => true, () => false),
      ]).then(([, , maskReady]) => {
        if (!active || !running) return;
        if (entrance && !entranceFinished) {
          if (maskReady) {
            hero.dataset.motionState = 'entering';
            entrance.play();
          } else entrance.progress(1);
        }
        ScrollTrigger.refresh();
      });
      return () => {
        running = false;
        entranceFinished = true;
        window.removeEventListener('resize', finishOnResize);
        document.removeEventListener('visibilitychange', finishOnReturn);
        window.removeEventListener('pageshow', finishOnReturn);
        entrance?.kill();
        maskImage.src = '';
        hero.dataset.motionState = 'static';
      };
    });
    return () => { active = false; media.revert(); };
  }, { scope });
}
