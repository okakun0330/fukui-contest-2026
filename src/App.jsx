import { useEffect, useRef, useState } from 'react'
import './App.css'

// ── Scroll reveal hook ──────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ── Scroll progress ─────────────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setProgress(scrollTop / (scrollHeight - clientHeight))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

// ── Photo URLs (Unsplash free license) ──────────────────────────
const PHOTOS = {
  hero:    'https://images.unsplash.com/photo-1567777404619-e7c1e49cba9f?w=1920&q=85&fit=crop',
  about:   'https://images.unsplash.com/photo-1656383119224-d527ba2bb5e7?w=1200&q=80&fit=crop',
  cta:     'https://images.unsplash.com/photo-1732209988932-c01207dfbd45?w=1920&q=85&fit=crop',
}

// ────────────────────────────────────────────────────────────────
export default function App() {
  useReveal()
  const progress = useScrollProgress()
  const [scrolled, setScrolled] = useState(false)

  const [form, setForm] = useState({ name: '', age: '', ig: '', contact: '', comment: '', photo: null })
  const [preview, setPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm((p) => ({ ...p, photo: file }))
    setPreview(URL.createObjectURL(file))
  }
  // TODO: replace with actual form endpoint (Google Forms / external API)
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="root">
      {/* ── Progress bar ── */}
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />

      {/* ── Header ── */}
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          <span className="header__logo">FUKUI CONTEST</span>
          <nav className="header__nav">
            <a href="#about">About</a>
            <a href="#schedule">Schedule</a>
            <a href="#tickets">Tickets</a>
          </nav>
          <button className="btn-entry-pill" onClick={() => goTo('entry')}>Entry →</button>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero__bg" style={{ backgroundImage: `url(${PHOTOS.hero})` }} />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__eyebrow">FUKUI PREFECTURE · 2026</p>
          <h1 className="hero__title">
            <span className="hero__title-line hero__title-line--1">Miss</span>
            <span className="hero__title-line hero__title-line--2">&amp;</span>
            <span className="hero__title-line hero__title-line--3">Mister</span>
          </h1>
          <p className="hero__catch">福井で一番、かっこいい・可愛いを決める。</p>
          <div className="hero__meta">
            <span>2026.12</span>
            <span className="sep" />
            <span>サンドーム福井</span>
            <span className="sep" />
            <span>16–22歳</span>
          </div>
          <div className="hero__cta">
            <button className="btn-hero-primary" onClick={() => goTo('entry')}>無料でエントリーする</button>
            <button className="btn-hero-ghost" onClick={() => goTo('tickets')}>観覧チケット</button>
          </div>
        </div>
        <div className="hero__scroll">
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATEMENT
      ══════════════════════════════════════════ */}
      <section className="statement">
        <div className="container">
          <p className="statement__text" data-reveal>
            人生を変えるステージが、<br />
            ここ福井にある。
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" className="about">
        <div className="about__photo-col">
          <div
            className="about__photo"
            style={{ backgroundImage: `url(${PHOTOS.about})` }}
            data-reveal
          />
        </div>
        <div className="about__text-col">
          <p className="label" data-reveal data-delay="0">ABOUT</p>
          <h2 className="about__heading" data-reveal data-delay="1">
            見た目だけじゃない。<br />あなたの全部が、評価される。
          </h2>
          <p className="about__body" data-reveal data-delay="2">
            福井県内最大級のビジュアルコンテスト。
            個性・表現力・人としての魅力を総合審査。
            ウォーキング、自己PR、パフォーマンス、そして最終のドレス/スーツ審査まで、
            あなたの全てをステージで輝かせてください。
          </p>
          <div className="about__stats" data-reveal data-delay="3">
            <div className="about__stat">
              <span className="about__stat-num">6</span>
              <span className="about__stat-label">審査カテゴリー</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">8h</span>
              <span className="about__stat-label">フルデイイベント</span>
            </div>
            <div className="about__stat">
              <span className="about__stat-num">無料</span>
              <span className="about__stat-label">エントリー費用</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. TARGET
      ══════════════════════════════════════════ */}
      <section className="target">
        <div className="container">
          <p className="label label--light" data-reveal>FOR YOU</p>
          <h2 className="target__heading" data-reveal data-delay="1">こんな人へ</h2>
          <ul className="target__list">
            {[
              ['01', '自分の魅力を試してみたい'],
              ['02', 'モデル・芸能に興味がある'],
              ['03', 'SNSで影響力を持ちたい'],
              ['04', '何かに本気で挑戦したい'],
              ['05', '人生を変えるきっかけが欲しい'],
            ].map(([num, text], i) => (
              <li key={num} className="target__item" data-reveal data-delay={i}>
                <span className="target__num">{num}</span>
                <span className="target__text">{text}</span>
                <span className="target__arrow">→</span>
              </li>
            ))}
          </ul>
          <div style={{ textAlign: 'center', marginTop: 56 }} data-reveal>
            <button className="btn-white" onClick={() => goTo('entry')}>無料でエントリーする</button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. SCHEDULE
      ══════════════════════════════════════════ */}
      <section id="schedule" className="schedule">
        <div className="container">
          <p className="label" data-reveal>TIMETABLE</p>
          <h2 className="schedule__heading" data-reveal data-delay="1">当日の流れ</h2>
          <div className="schedule__track">
            {[
              ['11:00', '開場・オープニング', '幕が上がる'],
              ['12:00', 'ウォーキング審査', '一次審査'],
              ['13:30', '自己PRステージ', '個性を魅せろ'],
              ['15:00', 'パフォーマンス審査', '才能を解き放て'],
              ['17:00', 'ドレス・スーツ審査', '最終審査'],
              ['18:30', '結果発表・表彰', 'フィナーレ'],
              ['19:00', '終了', ''],
            ].map(([time, title, sub], i) => (
              <div key={time} className="schedule__item" data-reveal data-delay={i % 4}>
                <span className="schedule__time">{time}</span>
                <span className="schedule__dot" />
                <div className="schedule__info">
                  <span className="schedule__title">{title}</span>
                  {sub && <span className="schedule__sub">{sub}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. OVERVIEW
      ══════════════════════════════════════════ */}
      <section className="overview">
        <div className="container">
          <p className="label" data-reveal>OVERVIEW</p>
          <h2 className="overview__heading" data-reveal data-delay="1">開催概要</h2>
          <div className="overview__grid">
            {[
              { label: 'DATE', value: '2026年12月某日', sub: '11:00 – 19:00' },
              { label: 'VENUE', value: 'サンドーム福井', sub: '福井県越前市' },
              { label: 'AGE', value: '16 – 22歳', sub: '男女問わず' },
              { label: 'ENTRY', value: '無料', sub: 'Entry Free' },
            ].map(({ label, value, sub }, i) => (
              <div key={label} className="overview__card" data-reveal data-delay={i}>
                <span className="overview__card-label">{label}</span>
                <span className="overview__card-value">{value}</span>
                {sub && <span className="overview__card-sub">{sub}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. ENTRY FORM
      ══════════════════════════════════════════ */}
      <section id="entry" className="form-section">
        <div className="form-section__inner">
          <div className="form-section__left">
            <p className="label label--light" data-reveal>ENTRY</p>
            <h2 className="form-section__heading" data-reveal data-delay="1">
              エントリーは<br />無料です。
            </h2>
            <p className="form-section__sub" data-reveal data-delay="2">
              まずは応募してみてください。<br />
              あなたの挑戦を、審査員が待っています。
            </p>
          </div>
          <div className="form-section__right" data-reveal>
            {submitted ? (
              <div className="form-success">
                <p className="form-success__check">✓</p>
                <p className="form-success__title">エントリーを受け付けました</p>
                <p className="form-success__body">確認のご連絡をお送りします。</p>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form__row">
                  <div className="form__field">
                    <label>お名前 <span>*</span></label>
                    <input name="name" type="text" placeholder="山田 花子" required value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form__field">
                    <label>年齢 <span>*</span></label>
                    <input name="age" type="number" placeholder="20" min="16" max="22" required value={form.age} onChange={handleChange} />
                  </div>
                </div>
                <div className="form__field">
                  <label>Instagram ID</label>
                  <div className="form__prefix-wrap">
                    <span>@</span>
                    <input name="ig" type="text" placeholder="your_id" value={form.ig} onChange={handleChange} />
                  </div>
                </div>
                <div className="form__field">
                  <label>電話番号 または メールアドレス <span>*</span></label>
                  <input name="contact" type="text" placeholder="09012345678 / example@email.com" required value={form.contact} onChange={handleChange} />
                </div>
                <div className="form__field">
                  <label>顔写真</label>
                  <label className="form__upload" htmlFor="photo-upload">
                    {preview
                      ? <img src={preview} alt="preview" className="form__photo-preview" />
                      : <div className="form__upload-placeholder"><span>+</span><span>写真を選択</span></div>
                    }
                    <input id="photo-upload" type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
                  </label>
                </div>
                <div className="form__field">
                  <label>一言コメント</label>
                  <textarea name="comment" rows={3} placeholder="意気込みや自己アピールをどうぞ" value={form.comment} onChange={handleChange} />
                </div>
                <button type="submit" className="btn-submit">無料でエントリーする →</button>
                <p className="form__privacy">送信することでプライバシーポリシーへの同意とみなします</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. TICKETS
      ══════════════════════════════════════════ */}
      <section id="tickets" className="tickets">
        <div className="container">
          <p className="label" data-reveal>TICKETS</p>
          <h2 className="tickets__heading" data-reveal data-delay="1">観覧チケット</h2>
          <div className="tickets__grid">
            <div className="ticket-card" data-reveal data-delay="0">
              <p className="ticket-card__tier">General</p>
              <p className="ticket-card__name">一般席</p>
              <p className="ticket-card__price">¥<strong>500</strong></p>
              <ul>
                <li>全審査の観覧</li>
                <li>会場内自由席</li>
                <li>当日券あり</li>
              </ul>
              <button className="btn-ticket">購入する</button>
            </div>

            <div className="ticket-card ticket-card--vip" data-reveal data-delay="1">
              <p className="ticket-card__tier">VIP</p>
              <p className="ticket-card__name">VIP席</p>
              <p className="ticket-card__price">¥<strong>5,000</strong></p>
              <ul>
                <li>全審査の観覧</li>
                <li>前方指定席</li>
                <li>公式プログラム付き</li>
              </ul>
              <button className="btn-ticket btn-ticket--vip">購入する</button>
            </div>

            <div className="ticket-card ticket-card--vvip" data-reveal data-delay="2">
              <span className="ticket-card__badge">EXCLUSIVE</span>
              <p className="ticket-card__tier">VVIP</p>
              <p className="ticket-card__name">VVIPシート</p>
              <p className="ticket-card__price">¥<strong>100,000</strong></p>
              <ul>
                <li>最前列プレミアム指定席</li>
                <li>バックステージ見学</li>
                <li>出場者との撮影会</li>
                <li>限定ギフトノベルティ</li>
                <li>アフターパーティーご招待</li>
              </ul>
              <button className="btn-ticket btn-ticket--vvip">購入する</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA (photo bg)
      ══════════════════════════════════════════ */}
      <section className="final-cta">
        <div className="final-cta__bg" style={{ backgroundImage: `url(${PHOTOS.cta})` }} />
        <div className="final-cta__overlay" />
        <div className="container final-cta__content">
          <p className="final-cta__eyebrow" data-reveal>YOUR STAGE IS HERE</p>
          <h2 className="final-cta__heading" data-reveal data-delay="1">
            あなたの挑戦を、<br />待っています。
          </h2>
          <button className="btn-hero-primary" data-reveal data-delay="2" onClick={() => goTo('entry')}>
            今すぐエントリーする
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. ORGANIZER
      ══════════════════════════════════════════ */}
      <section className="organizer">
        <div className="container">
          <p className="label" data-reveal>ORGANIZER</p>
          <div className="organizer__content" data-reveal data-delay="1">
            <p className="organizer__name">株式会社 film倶楽部</p>
            <p className="organizer__desc">
              福井から新しいスターを生み出すことを目的に、エンターテインメントイベントを企画・運営。
              地域に根ざしながら、若者が本気で輝ける舞台を作り続けます。
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer__inner">
          <span className="footer__brand">FUKUI CONTEST 2026</span>
          <span className="footer__copy">© 2026 株式会社film倶楽部</span>
        </div>
      </footer>
    </div>
  )
}
