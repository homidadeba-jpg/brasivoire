import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { Car } from '@phosphor-icons/react/dist/csr/Car';
import { HouseLine } from '@phosphor-icons/react/dist/csr/HouseLine';
import { Buildings } from '@phosphor-icons/react/dist/csr/Buildings';
import { Heart } from '@phosphor-icons/react/dist/csr/Heart';
import { GearSix } from '@phosphor-icons/react/dist/csr/GearSix';
import { Crane } from '@phosphor-icons/react/dist/csr/Crane';
import { ShieldCheck } from '@phosphor-icons/react/dist/csr/ShieldCheck';
import { ChatsCircle } from '@phosphor-icons/react/dist/csr/ChatsCircle';
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo';
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo';
import { MapPin } from '@phosphor-icons/react/dist/csr/MapPin';
import { List } from '@phosphor-icons/react/dist/csr/List';
import { X } from '@phosphor-icons/react/dist/csr/X';
import { Check } from '@phosphor-icons/react/dist/csr/Check';
import { Sun } from '@phosphor-icons/react/dist/csr/Sun';
import { Moon } from '@phosphor-icons/react/dist/csr/Moon';
import { LockKey } from '@phosphor-icons/react/dist/csr/LockKey';
import { CaretDown } from '@phosphor-icons/react/dist/csr/CaretDown';
import { company, insuranceServices, consortiumServices } from './company';
import Hero from './Hero';
import { cranePhoto } from './heroMedia';
import { editorialMedia } from './editorialMedia';
import { useSiteMotion } from './useSiteMotion';

const icons = { car: Car, house: HouseLine, buildings: Buildings, heart: Heart, gear: GearSix, crane: Crane };
type RequestType = 'seguro' | 'consorcio';
type Choice = { type: RequestType; service: string };

function Brand() {
  return <a className="brand" href="#inicio" aria-label="Brasivoire Corretora de Seguros, início"><img src="/brand/brasivoire-logo.png" alt="" width="64" height="64" /><span className="wordmark">brasivoire<span>corretora de seguros</span></span></a>;
}

function useOpeningFeedback() {
  const [opening, setOpening] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    const reset = () => { setOpening(false); clearTimeout(timer.current); };
    const visible = () => { if (document.visibilityState === 'visible') reset(); };
    window.addEventListener('focus', reset);
    window.addEventListener('pageshow', reset);
    document.addEventListener('visibilitychange', visible);
    return () => { clearTimeout(timer.current); window.removeEventListener('focus', reset); window.removeEventListener('pageshow', reset); document.removeEventListener('visibilitychange', visible); };
  }, []);
  return { opening, start: () => { setOpening(true); clearTimeout(timer.current); timer.current = setTimeout(() => setOpening(false), 6000); } };
}

function WhatsappLink({ children, phone, className = '' }: { children: ReactNode; phone: string; className?: string }) {
  const { opening, start } = useOpeningFeedback();
  return <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" onClick={start} className={`whatsapp-link ${className}`}>
    <span className={opening ? 'feedback-original hidden-label' : 'feedback-original'}>{children}</span>
    <span className="feedback-live" aria-live="polite">{opening && <><span className="spinner" />Abrindo WhatsApp…</>}</span>
  </a>;
}

function LeadForm({ choice }: { choice: Choice }) {
  const [type, setType] = useState<RequestType>(choice.type);
  const [service, setService] = useState(choice.service);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const { opening, start } = useOpeningFeedback();
  useEffect(() => { setType(choice.type); setService(choice.service); setPreview(''); setError(''); }, [choice]);
  const list = type === 'seguro' ? insuranceServices : consortiumServices;
  function changeType(next: RequestType) { setType(next); setService(''); setPreview(''); setError(''); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const phone = String(data.get('phone') ?? '').replace(/\D/g, '');
    if (name.length < 2) { setError('Informe seu nome para continuar.'); event.currentTarget.querySelector<HTMLInputElement>('#lead-name')?.focus(); return; }
    if (!/^[1-9]{2}9?\d{8}$/.test(phone)) { setError('Informe um WhatsApp válido com DDD.'); event.currentTarget.querySelector<HTMLInputElement>('#lead-phone')?.focus(); return; }
    const label = list.find(item => item.id === service)?.label;
    if (!label) { setError('Selecione o serviço de seu interesse.'); return; }
    const lines = ['Olá, Brasivoire!', `Gostaria de solicitar ${type === 'seguro' ? 'uma cotação de seguro' : 'uma simulação de consórcio'}.`, '', `Modalidade: ${label}`, `Nome: ${name}`, `WhatsApp: ${String(data.get('phone')).trim()}`];
    for (const [key, title] of [['city', 'Cidade/UF'], ['detail', type === 'consorcio' ? 'Objetivo e valor desejado' : 'Informações adicionais']]) {
      const value = String(data.get(key) ?? '').trim();
      if (value) lines.push(`${title}: ${value}`);
    }
    const message = lines.join('\n');
    setError('');
    if (!company.whatsapp) { setPreview(message); return; }
    start();
    window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }
  return <form onSubmit={submit} className="lead-form">
    <div className="form-switch" role="group" aria-label="Tipo de solicitação">
      <button type="button" aria-pressed={type === 'seguro'} onClick={() => changeType('seguro')}><ShieldCheck size={19} />Cotar um seguro</button>
      <button type="button" aria-pressed={type === 'consorcio'} onClick={() => changeType('consorcio')}><HouseLine size={19} />Simular consórcio</button>
    </div>
    <label htmlFor="lead-service">O que você tem em mente?</label>
    <div className="select-wrap"><select required id="lead-service" value={service} onChange={e => { setService(e.target.value); setPreview(''); }}><option value="" disabled>Selecione uma modalidade</option>{list.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select><CaretDown size={17} /></div>
    <div className="form-grid">
      <div><label htmlFor="lead-name">Seu nome</label><input id="lead-name" name="name" autoComplete="name" placeholder="Como podemos chamar você?" minLength={2} maxLength={100} required onChange={() => setPreview('')} /></div>
      <div><label htmlFor="lead-phone">WhatsApp com DDD</label><input id="lead-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(19) 99999-9999" maxLength={20} required onChange={() => setPreview('')} /></div>
    </div>
    <label htmlFor="lead-city">Cidade e estado <span className="optional">(opcional)</span></label>
    <input id="lead-city" name="city" autoComplete="address-level2" placeholder="Ex.: Campinas, SP" maxLength={100} onChange={() => setPreview('')} />
    <label htmlFor="lead-detail">{type === 'consorcio' ? 'Conte um pouco sobre seu objetivo' : 'Quer acrescentar alguma informação?'} <span className="optional">(opcional)</span></label>
    <textarea id="lead-detail" name="detail" rows={2} maxLength={1000} placeholder={type === 'consorcio' ? 'Ex.: imóvel de R$ 400 mil. Quero conhecer as opções.' : service === 'guindastes' ? 'Ex.: tipo de guindaste, modelo e cidade de operação.' : service === 'automovel' ? 'Ex.: modelo e ano do veículo, seguro novo ou renovação.' : 'Conte o que você gostaria de proteger.'} onChange={() => setPreview('')} />
    <p className="privacy-note"><LockKey size={15} />Os dados serão incluídos na mensagem para a Brasivoire. O envio é concluído por você no WhatsApp.</p>
    <button type="submit" className="button button-primary form-submit" aria-describedby="form-status"><WhatsappLogo size={20} /><span aria-live="polite">{opening ? 'Abrindo WhatsApp…' : company.whatsapp ? 'Continuar no WhatsApp' : 'Preparar minha mensagem'}</span>{opening ? <span className="spinner" /> : <ArrowUpRight size={19} />}</button>
    <div id="form-status" aria-live="polite">{error && <p className="form-error" role="alert">{error}</p>}{preview && <div className="message-preview"><strong>Sua mensagem está preparada.</strong><p>O canal oficial do WhatsApp será disponibilizado em breve. Nenhum dado foi enviado.</p><pre>{preview}</pre></div>}</div>
  </form>;
}

export default function App() {
  const site = useRef<HTMLDivElement>(null);
  useSiteMotion(site);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [choice, setChoice] = useState<Choice>({ type: 'seguro', service: '' });
  const privacy = useRef<HTMLDialogElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDark(mq.matches);
    const change = (event: MediaQueryListEvent) => setDark(event.matches);
    mq.addEventListener('change', change);
    return () => mq.removeEventListener('change', change);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark]);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuToggle.current?.focus(); } };
    document.addEventListener('keydown', escape);
    const resize = () => { if (window.innerWidth > 1023) setMenuOpen(false); };
    window.addEventListener('resize', resize);
    return () => { document.removeEventListener('keydown', escape); window.removeEventListener('resize', resize); };
  }, [menuOpen]);
  useEffect(() => { if (privacyOpen) privacy.current?.showModal(); else privacy.current?.close(); }, [privacyOpen]);
  function quote(type: RequestType, service = '') { setChoice({ type, service }); setMenuOpen(false); }
  const links = [['A Brasivoire', 'sobre'], ['Seguros', 'seguros'], ['Guindastes', 'guindastes'], ['Consórcios', 'consorcios']];
  return <div ref={site} className="site-root">
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Navegação principal" className="desktop-nav">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <div className="header-actions"><button className="icon-button theme-toggle" aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} onClick={() => setDark(!dark)}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button><a href="#cotacao" className="header-cta" onClick={() => quote('seguro')}>Vamos conversar<ArrowUpRight size={17} /></a><button ref={menuToggle} className="icon-button menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={25} /> : <List size={25} />}</button></div>
      </div>
      {menuOpen && <nav className="mobile-nav container" id="mobile-nav" aria-label="Navegação no celular">{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={19} /></a>)}<a href="#cotacao" onClick={() => quote('seguro')}>Solicitar cotação<ArrowUpRight size={19} /></a></nav>}
    </header>
    <main id="conteudo">
      <Hero onQuote={() => quote('seguro')} />
      <div className="container service-bar" aria-label="Soluções Brasivoire"><a href="#seguros"><ShieldCheck size={22} />Seguros para você e sua empresa<ArrowUpRight size={17} /></a><a href="#guindastes"><Crane size={23} />Especialização em guindastes<ArrowUpRight size={17} /></a><a href="#consorcios"><HouseLine size={23} />Consórcios para seus projetos<ArrowUpRight size={17} /></a></div>

      <section className="container about section about-visual" id="sobre" aria-labelledby="about-title">
        <div className="about-content"><span className="section-kicker">A BRASIVOIRE</span><h2 id="about-title">Seus planos.<br />Nossa atenção.</h2><p className="about-summary">Em Campinas, a Brasivoire reúne seguros e consórcios para sua vida, seu patrimônio e sua empresa, com especialização em guindastes.</p><span className="location"><MapPin size={17} />Campinas, São Paulo</span><a href="#cotacao" className="text-link" onClick={() => quote('seguro')}>Vamos falar sobre seus planos<ArrowUpRight size={19} /></a></div>
        <figure className="photo-frame about-editorial-photo"><img className="editorial-photo" src={editorialMedia.empresa} alt="Ambiente de trabalho contemporâneo com salas de vidro e luz natural" width="1100" height="734" loading="lazy" decoding="async" /></figure>
      </section>

      <section className="insurance-section section" id="seguros" aria-labelledby="insurance-title"><div className="container">
        <div className="section-heading"><h2 id="insurance-title">Proteção para<br /><span>o que importa.</span></h2></div>
        <div className="insurance-photo-grid">
          <a href="#cotacao" className="insurance-story" onClick={() => quote('seguro', 'automovel')} aria-label="Cotar seguro de automóvel"><div className="photo-frame automobile-photo"><img className="editorial-photo" src={editorialMedia.automovel} alt="Automóvel preto em uma estrada, fotografado de lado e por trás" width="1100" height="733" loading="lazy" decoding="async" /></div><div className="photo-caption"><h3>Seguro automóvel</h3><span>Solicitar cotação<ArrowUpRight size={20} /></span></div></a>
          <a href="#cotacao" className="insurance-story insurance-story-home" onClick={() => quote('seguro', 'residencial')} aria-label="Cotar seguro residencial"><div className="photo-frame residential-photo"><img className="editorial-photo" src={editorialMedia.residencial} alt="Casa contemporânea com jardim, piscina e grandes janelas" width="1100" height="734" loading="lazy" decoding="async" /></div><div className="photo-caption"><h3>Seguro residencial</h3><span>Solicitar cotação<ArrowUpRight size={20} /></span></div></a>
        </div>
        <div className="insurance-specialties">{insuranceServices.filter(service => service.id !== 'automovel' && service.id !== 'residencial').map(service => { const Icon = icons[service.icon]; return <a href="#cotacao" key={service.id} onClick={() => quote('seguro', service.id)}><Icon size={24} weight="light" /><span>{service.label}</span><ArrowUpRight size={19} /><span className="sr-only">Solicitar cotação</span></a>; })}</div>
      </div></section>

      <section className="container crane-section section" id="guindastes" aria-labelledby="crane-title"><div className="crane-photo"><img src={cranePhoto} alt="Guindaste móvel amarelo da fotografia fornecida pela Brasivoire" width="720" height="1280" loading="lazy" /></div><div className="crane-content"><span className="eyebrow">UMA ESPECIALIDADE BRASIVOIRE</span><h2 id="crane-title">Grandes operações.<br /><span>Atenção aos detalhes.</span></h2><p className="crane-intro">Seguro para guindastes, com a atenção que esse patrimônio merece.</p><p>A Brasivoire é especializada em seguros para guindastes. Conte sobre seu equipamento e sua operação para iniciar uma cotação com a corretora.</p><div className="crane-facts"><span><Check size={17} />Foco em guindastes</span><span><Check size={17} />Cotação para sua necessidade</span></div><a className="button button-primary" href="#cotacao" onClick={() => quote('seguro', 'guindastes')}>Conversar sobre guindastes<ArrowUpRight size={19} /></a><p className="fine-print">As condições e coberturas serão apresentadas na cotação.</p></div></section>

      <section className="consortium-section section" id="consorcios" aria-labelledby="consortium-title"><div className="container consortium-inner"><div className="consortium-copy"><h2 id="consortium-title">O próximo capítulo<br />começa com <span>um plano.</span></h2><p>Um imóvel, um automóvel, uma nova conquista. Conheça as opções de consórcio da Brasivoire e solicite uma simulação para o seu objetivo.</p><div className="consortium-options"><a href="#cotacao" onClick={() => quote('consorcio', 'imovel')}><HouseLine size={27} weight="light" /><span>Consórcio de imóveis</span><ArrowUpRight size={21} /></a><a href="#cotacao" onClick={() => quote('consorcio', 'auto')}><Car size={27} weight="light" /><span>Consórcio de automóveis</span><ArrowUpRight size={21} /></a></div><a href="#cotacao" className="text-link" onClick={() => quote('consorcio')}>Quero planejar minha conquista<ArrowUpRight size={19} /></a></div><div className="consortium-image"><img src="/images/consorcio.jpg" alt="Sala iluminada com móveis contemporâneos e detalhes naturais" width="1000" height="1100" loading="lazy" /></div></div></section>

      <section className="container differences section" aria-labelledby="difference-title"><div className="difference-intro"><h2 id="difference-title">O que importa<br /><span>tem a ver com você.</span></h2><a href="#cotacao" className="text-link" onClick={() => quote('seguro', 'vida')}>Conversar sobre seguro de vida<ArrowUpRight size={19} /></a></div><figure className="photo-frame family-photo"><img className="editorial-photo" src={editorialMedia.vida} alt="Família reunida de mãos dadas na praia ao pôr do sol" width="1000" height="667" loading="lazy" decoding="async" /></figure><div className="difference-grid"><article><ShieldCheck size={26} weight="light" /><h3>Uma corretora completa</h3><p>Seguros e consórcios para diferentes planos.</p></article><article><Crane size={26} weight="light" /><h3>Especialização em guindastes</h3><p>Atenção ao patrimônio da sua operação.</p></article><article><ChatsCircle size={26} weight="light" /><h3>Contato direto</h3><p>Sua conversa começa pelo WhatsApp.</p></article></div></section>

      <section className="quote-section section" id="cotacao" aria-labelledby="quote-title"><div className="container quote-inner"><div className="quote-copy"><span className="eyebrow">VAMOS CONVERSAR</span><h2 id="quote-title">O que você quer<br /><span>proteger ou conquistar?</span></h2><p>Conte um pouco sobre seus planos. Vamos preparar uma mensagem para você continuar a conversa com a Brasivoire pelo WhatsApp.</p><div className="quote-route"><span><Check size={16} />Escolha sua modalidade</span><span><Check size={16} />Informe seus dados de contato</span><span><WhatsappLogo size={18} />Continue a conversa no WhatsApp</span></div><div className="quote-location"><MapPin size={23} weight="light" /><div>Brasivoire Corretora de Seguros<span>Campinas, São Paulo</span></div></div></div><LeadForm choice={choice} /></div></section>
    </main>
    <footer className="container footer" id="contato"><div className="footer-main"><div className="footer-brand"><Brand /><p>Proteção para o presente.<br />Planos para o futuro.</p></div><div className="footer-column"><h3>Explore</h3><a href="#sobre">A Brasivoire</a><a href="#seguros">Seguros</a><a href="#guindastes">Guindastes</a><a href="#consorcios">Consórcios</a></div><div className="footer-column"><h3>Vamos conversar</h3><span>Campinas, São Paulo</span><a href="https://www.instagram.com/brasivoire/" target="_blank" rel="noopener noreferrer"><InstagramLogo size={16} />@brasivoire</a><a href="#cotacao" onClick={() => quote('seguro')}>Solicitar uma cotação<ArrowUpRight size={15} /></a><a href="#cotacao" onClick={() => quote('consorcio')}>Simular um consórcio<ArrowUpRight size={15} /></a>{company.whatsapp && <WhatsappLink phone={company.whatsapp}>(19) 99100-1577<ArrowUpRight size={15} /></WhatsappLink>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Brasivoire. Todos os direitos reservados.</span><button className="privacy-trigger" onClick={() => setPrivacyOpen(true)}>Privacidade</button><WhatsappLink phone={company.authorWhatsapp}>Desenvolvido por <strong>Jonas Jr.</strong><ArrowUpRight size={13} /></WhatsappLink></div><p className="photo-note">Fotografias ilustrativas.</p></footer>
    <dialog className="privacy-dialog" ref={privacy} onCancel={() => setPrivacyOpen(false)} onClick={e => { if (e.target === e.currentTarget) setPrivacyOpen(false); }} aria-labelledby="privacy-title"><div><button className="icon-button dialog-close" aria-label="Fechar informações de privacidade" onClick={() => setPrivacyOpen(false)}><X size={23} /></button><LockKey size={28} /><h2 id="privacy-title">Sobre seus dados</h2><p>As informações preenchidas no formulário são utilizadas no seu navegador para compor uma mensagem de solicitação de cotação ou simulação.</p><p>Este site não armazena os dados em banco de dados, CRM ou armazenamento local. Ao continuar, a mensagem será aberta no WhatsApp oficial da Brasivoire. Você poderá revisá-la e decidir se deseja enviá-la.</p><p>Ao continuar no WhatsApp, o uso dos seus dados nesse serviço segue as políticas do próprio WhatsApp. Não inclua dados sensíveis ou documentos no campo de informações adicionais.</p><button className="button button-primary" onClick={() => setPrivacyOpen(false)}>Entendi<Check size={19} /></button></div></dialog>
  </div>;
}




