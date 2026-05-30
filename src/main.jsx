import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, Brain, Radio, Moon, Search, Download, FileText, Mail, ExternalLink, Menu, X } from 'lucide-react';
import { articles } from '../data/articles.js';
import './styles.css';

const site = {
  title: 'Jurnal Studi Media Digital',
  short: 'JSMD',
  tagline: 'Kajian Komunikasi, Teknologi, Budaya Digital, dan Media Kontemporer',
  contact: 'editor.jsmd@example.com'
};

function useHashRoute() {
  const [hash, setHash] = React.useState(window.location.hash || '#/');
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const route = hash.replace(/^#\/?/, '') || '';
  return route;
}

function setArticleMeta(article) {
  const metas = document.querySelectorAll('meta[data-dynamic="citation"]');
  metas.forEach(m => m.remove());
  if (!article) return;
  const values = {
    citation_title: article.title,
    citation_author: article.authors,
    citation_publication_date: article.date,
    citation_journal_title: site.title,
    citation_volume: article.volume,
    citation_issue: article.issue,
    citation_firstpage: article.pages.split('-')[0],
    citation_pdf_url: `${window.location.origin}${article.pdf}`
  };
  Object.entries(values).forEach(([name, content]) => {
    const m = document.createElement('meta');
    m.setAttribute('name', name);
    m.setAttribute('content', content);
    m.setAttribute('data-dynamic', 'citation');
    document.head.appendChild(m);
  });
  document.title = `${article.title} | ${site.short}`;
}

function Header() {
  const [open, setOpen] = React.useState(false);
  const links = [
    ['#/', 'Home'], ['#/focus', 'Focus'], ['#/issue', 'Current Issue'], ['#/guidelines', 'Guidelines'], ['#/contact', 'Contact']
  ];
  return <header className="nav">
    <div className="container navInner">
      <a className="brand" href="#/" onClick={() => setOpen(false)}>
        <div className="logo">JS</div>
        <div><strong>{site.title}</strong><span>{site.short} · Digital Media Studies</span></div>
      </a>
      <nav className="desktopMenu">{links.map(([href,label]) => <a href={href} key={href}>{label}</a>)}</nav>
      <button className="mobileBtn" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={22}/> : <Menu size={22}/>}</button>
    </div>
    {open && <nav className="mobileMenu">{links.map(([href,label]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>}
  </header>;
}

function Home() {
  React.useEffect(() => { setArticleMeta(null); document.title = `${site.title} | ${site.short}`; }, []);
  return <>
    <section className="hero">
      <div className="container heroGrid">
        <div className="heroText">
          <div className="badge"><span/> Open Digital Journal · Vol. 1 No. 1</div>
          <h1><em>Jurnal Studi</em><br/>Media Digital</h1>
          <p>Ruang publikasi ilmiah independen untuk kajian media digital, komunikasi, artificial intelligence, dakwah digital, budaya populer, literasi digital, dan transformasi masyarakat dalam ekosistem teknologi kontemporer.</p>
          <div className="actions"><a className="btn primary" href="#/issue">Lihat Current Issue</a><a className="btn ghost" href="#/guidelines">Panduan Penulis</a></div>
        </div>
        <div className="coverWrap">
          <div className="orb" />
          <div className="cover">
            <div className="coverTop"><span>JSMD</span><span>ISSN: In Progress</span></div>
            <div><h2>Digital Media<br/>Studies</h2><p>{site.tagline}</p><div className="lines"><i/><i/><i/></div></div>
            <div className="miniGrid"><div><b>01</b><span>Volume Pertama</span></div><div><b>2026</b><span>Digital Edition</span></div></div>
          </div>
        </div>
      </div>
    </section>
    <Focus compact />
    <Issue compact />
  </>;
}

function Focus({compact=false}) {
  React.useEffect(() => { if(!compact) document.title = `Focus and Scope | ${site.short}`; }, [compact]);
  const cards = [
    [Radio, 'Komunikasi & Media Digital', 'Kajian media sosial, komunikasi digital, public relations, personal branding, produksi konten, dan strategi komunikasi di ruang digital.'],
    [Brain, 'Artificial Intelligence', 'Pemanfaatan AI, chatbot, generative content, otomasi media, etika AI, dan literasi kecerdasan buatan dalam komunikasi modern.'],
    [Moon, 'Dakwah Digital', 'Studi dakwah berbasis platform digital, media kreatif Islam, literasi dakwah, komunitas online, dan transformasi pesan keagamaan.'],
    [Search, 'Budaya & Literasi Digital', 'Kajian budaya populer, masyarakat digital, perilaku audiens, literasi media, dan perubahan sosial akibat teknologi.']
  ];
  return <section className="section">
    <div className="container">
      <div className="sectionHead"><h2>Focus & Scope</h2><p>JSMD menerima naskah konseptual, hasil riset, studi kasus, dan kajian kritis tentang perkembangan media digital dalam konteks sosial, budaya, komunikasi, teknologi, dan keagamaan.</p></div>
      <div className="cards">{cards.map(([Icon,title,body]) => <article className="card" key={title}><div className="icon"><Icon size={22}/></div><h3>{title}</h3><p>{body}</p></article>)}</div>
    </div>
  </section>;
}

function Issue({compact=false}) {
  React.useEffect(() => { if(!compact) document.title = `Current Issue | ${site.short}`; }, [compact]);
  return <section className="section">
    <div className="container">
      <div className="sectionHead"><h2>Current Issue</h2><p>Edisi perdana sebagai ruang awal publikasi kajian media digital, teknologi komunikasi, AI, dan dakwah digital.</p></div>
      <div className="issueGrid">
        <aside className="issuePanel"><div className="label">Vol. 1 No. 1 · Juni 2026</div><h3>Media Digital, AI, dan Transformasi Komunikasi</h3><p>Edisi ini memuat artikel tentang artificial intelligence, dakwah digital, komunikasi media sosial, personal branding, dan literasi digital.</p><a className="btn primary" href="/articles/full-issue-vol-1-no-1.pdf"><Download size={16}/> Download Full Issue</a></aside>
        <div className="articleList">{articles.map(a => <ArticleRow key={a.id} article={a} />)}</div>
      </div>
    </div>
  </section>;
}

function ArticleRow({article}) {
  return <article className="articleRow">
    <div className="num">{article.number}</div>
    <div><h4>{article.title}</h4><p>{article.authors} · {article.type}</p></div>
    <a className="pill" href={`#/article/${article.id}`}>Detail</a>
  </article>;
}

function Guidelines() {
  React.useEffect(() => { document.title = `Author Guidelines | ${site.short}`; }, []);
  const steps = [
    ['01','Struktur Artikel','Judul, abstrak, kata kunci, pendahuluan, metode, pembahasan, kesimpulan, dan daftar pustaka.'],
    ['02','Panjang Naskah','Disarankan 4.000 sampai 7.000 kata dengan bahasa Indonesia akademik yang jelas dan sistematis.'],
    ['03','Sitasi','Menggunakan APA 7th Edition dengan referensi jurnal, buku, prosiding, atau sumber ilmiah relevan.'],
    ['04','File PDF','Artikel final diunggah dalam PDF yang teksnya dapat disalin, bukan hasil scan gambar.']
  ];
  return <section className="section"><div className="container"><div className="sectionHead"><h2>Author Guidelines</h2><p>Format dasar naskah dibuat sederhana agar mudah dipublikasikan melalui GitHub Pages dan bisa dipindahkan ke OJS di masa depan.</p></div><div className="steps">{steps.map(s => <div className="step" key={s[0]}><b>{s[0]}</b><h3>{s[1]}</h3><p>{s[2]}</p></div>)}</div></div></section>;
}

function Contact() {
  React.useEffect(() => { document.title = `Contact | ${site.short}`; }, []);
  return <section className="section contact"><div className="container narrow"><div className="glass"><Mail size={34}/><h2>Contact</h2><p>Gunakan halaman ini sebagai kontak editorial sementara. Ganti email dan profil sesuai identitas yang ingin dipakai.</p><a className="btn primary" href={`mailto:${site.contact}`}>{site.contact}</a></div></div></section>;
}

function ArticlePage({id}) {
  const article = useMemo(() => articles.find(a => a.id === id), [id]);
  React.useEffect(() => { if(article) setArticleMeta(article); }, [article]);
  if (!article) return <section className="section"><div className="container"><h2>Artikel tidak ditemukan</h2><p className="muted">Cek kembali URL artikel.</p></div></section>;
  return <section className="section articlePage"><div className="container narrow">
    <a className="back" href="#/issue">← Kembali ke Current Issue</a>
    <article className="paper">
      <div className="paperMeta">Vol. {article.volume} No. {article.issue} · Juni 2026 · Hal. {article.pages}</div>
      <h1>{article.title}</h1>
      <p className="author">{article.authors}</p>
      <h3>Abstrak</h3><p>{article.abstract}</p>
      <h3>Kata Kunci</h3><p>{article.keywords}</p>
      <div className="paperActions"><a className="btn primary" href={article.pdf}><FileText size={16}/> Download PDF</a><a className="btn ghost" href={article.pdf} target="_blank" rel="noreferrer"><ExternalLink size={16}/> Buka PDF</a></div>
      <div className="scholarBox"><strong>Metadata Google Scholar</strong><p>Halaman ini menambahkan meta citation secara otomatis saat artikel dibuka. Untuk hasil terbaik, ganti PDF dummy dengan PDF artikel asli yang teksnya bisa disalin.</p></div>
    </article>
  </div></section>;
}

function App() {
  const route = useHashRoute();
  let page = <Home />;
  if (route === 'focus') page = <Focus />;
  if (route === 'issue') page = <Issue />;
  if (route === 'guidelines') page = <Guidelines />;
  if (route === 'contact') page = <Contact />;
  if (route.startsWith('article/')) page = <ArticlePage id={route.split('/')[1]} />;
  return <><Header />{page}<footer className="footer"><div className="container footerInner"><div><strong>{site.title}</strong><br/><span>Independent digital publication platform for media and communication studies.</span></div><div>{site.short} · 2026</div></div></footer></>;
}

createRoot(document.getElementById('root')).render(<App />);
