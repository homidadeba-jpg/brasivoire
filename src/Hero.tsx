
import { cranePhoto } from './heroMedia';

export default function Hero({ onQuote }: { onQuote: () => void }) {
  return <section className="crane-hero" id="inicio" aria-labelledby="hero-title" data-motion-state="static">
    <img className="hero-photograph" src={cranePhoto} alt="Guindaste móvel amarelo com lança elevada, preservado na fotografia original enviada pela Brasivoire" width="720" height="1280" fetchPriority="high" />
    <div className="hero-feather" aria-hidden="true" />
    <div className="hero-bottom-shade" aria-hidden="true" />
    <div className="hero-category hero-entry"><span>SEGUROS</span><span className="hero-category-dot" aria-hidden="true">•</span><span>CONSÓRCIOS</span></div>
    <div className="hero-title-depth"><h1 id="hero-title" className="hero-title-entry"><span className="hero-line">Proteção completa</span><span className="hero-line">para o seu patrimônio</span><span className="hero-line hero-highlight">e suas operações.</span></h1></div>
    <div className="hero-description-depth"><p className="hero-reference-description hero-description-entry">Especialização em seguros para guindastes. Consórcios para imóveis e automóveis.</p></div>
    <img className="hero-photograph hero-foreground" src={cranePhoto} alt="" aria-hidden="true" width="720" height="1280" fetchPriority="high" />
    <div className="hero-auxiliary hero-bottom-entry" aria-label="Mais segurança, mais planejamento, mais resultados"><span>Mais<br /><strong>segurança</strong></span><span>Mais<br /><strong>planejamento</strong></span><span>Mais<br /><strong>resultados</strong></span></div>
    <div className="hero-cta-position"><div className="hero-cta-entry"><a className="hero-quote-button" href="#cotacao" onClick={onQuote}>Solicitar Cotação</a></div></div>
  </section>;
}

