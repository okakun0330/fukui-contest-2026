import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    instagramId: '',
    contact: '',
    comment: '',
    photo: null,
  })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }))
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  // TODO: 実際の送信処理はここで外部フォーム（Google Forms等）に接続する
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('送信データ:', formData)
    setSubmitted(true)
  }

  const scrollToEntry = () => {
    document.getElementById('entry-form').scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTicket = () => {
    document.getElementById('tickets').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="lp-root">
      {/* ─── Nav ─── */}
      <header className="lp-header">
        <div className="container lp-header-inner">
          <span className="lp-logo">FUKUI CONTEST 2026</span>
          <nav className="lp-nav">
            <a href="#about">About</a>
            <a href="#schedule">Schedule</a>
            <a href="#tickets">Tickets</a>
            <button className="btn-entry-sm" onClick={scrollToEntry}>Entry</button>
          </nav>
        </div>
      </header>

      {/* ─── 1. Hero ─── */}
      <section className="hero-section">
        <div className="hero-bg-decor" aria-hidden="true">
          <span className="decor-circle decor-circle-1" />
          <span className="decor-circle decor-circle-2" />
          <span className="decor-line decor-line-h" />
          <span className="decor-line decor-line-v" />
        </div>
        <div className="container hero-content">
          <p className="hero-label">FUKUI PREFECTURE</p>
          <h1 className="hero-title">
            <span className="hero-title-en">Miss · Mister</span>
            <span className="hero-title-jp">福井県版コンテスト</span>
            <span className="hero-title-year">2026</span>
          </h1>
          <p className="hero-catch">福井で一番、かっこいい・可愛いを決める。</p>
          <p className="hero-sub">人生を変えるステージが、ここ福井にある。</p>
          <div className="hero-meta">
            <span>2026年12月某日</span>
            <span className="meta-sep">|</span>
            <span>サンドーム福井</span>
            <span className="meta-sep">|</span>
            <span>11:00〜19:00</span>
          </div>
          <div className="hero-cta">
            <button className="btn-primary" onClick={scrollToEntry}>
              エントリーする
            </button>
            <button className="btn-secondary" onClick={scrollToTicket}>
              観覧チケットを見る
            </button>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>scroll</span>
          <span className="scroll-line" />
        </div>
      </section>

      {/* ─── 2. About ─── */}
      <section id="about" className="section about-section">
        <div className="container">
          <p className="section-label">ABOUT</p>
          <h2 className="section-title">このイベントについて</h2>
          <div className="about-grid">
            <div className="about-text">
              <p className="about-lead">
                福井で一番の「かっこいい」「可愛い」を決める、<br />
                県内最大級のビジュアルコンテスト。
              </p>
              <p className="about-body">
                見た目だけではなく、個性・表現力・人としての魅力を総合的に評価します。
                審査員の前でウォーキングを披露し、自己PRステージ、パフォーマンス審査を経て、
                最終的にドレス・スーツ姿でフィナーレへ。
                あなたの全てが、ステージで輝く瞬間に変わります。
              </p>
              <p className="about-body">
                このコンテストは、単なる「顔の良さ」を競う場ではありません。
                あなたの個性、生き方、表現——その全てが評価される舞台です。
              </p>
            </div>
            <div className="about-cards">
              <div className="about-card">
                <span className="about-card-num">01</span>
                <p>個性と表現力を評価</p>
              </div>
              <div className="about-card">
                <span className="about-card-num">02</span>
                <p>プロの審査員が審査</p>
              </div>
              <div className="about-card">
                <span className="about-card-num">03</span>
                <p>入賞者には特典あり</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Target ─── */}
      <section className="section target-section">
        <div className="container">
          <p className="section-label">FOR YOU</p>
          <h2 className="section-title">こんな人におすすめ</h2>
          <div className="target-grid">
            {[
              { icon: '✦', text: '自分の魅力を試してみたい人' },
              { icon: '✦', text: 'モデル・芸能に興味がある人' },
              { icon: '✦', text: 'SNSで影響力を持ちたい人' },
              { icon: '✦', text: '何かに本気で挑戦してみたい人' },
              { icon: '✦', text: '人生を変えるきっかけが欲しい人' },
            ].map((item, i) => (
              <div key={i} className="target-item">
                <span className="target-icon">{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="target-cta">
            <button className="btn-primary" onClick={scrollToEntry}>
              無料でエントリーする
            </button>
          </div>
        </div>
      </section>

      {/* ─── 4. Schedule ─── */}
      <section id="schedule" className="section schedule-section">
        <div className="container">
          <p className="section-label">TIMETABLE</p>
          <h2 className="section-title">イベント内容</h2>
          <div className="schedule-list">
            {[
              { time: '11:00', label: '開場・オープニング' },
              { time: '12:00', label: '一次審査：ウォーキング審査' },
              { time: '13:30', label: '自己PRステージ' },
              { time: '15:00', label: 'パフォーマンス審査' },
              { time: '17:00', label: '最終審査：ドレス・スーツ' },
              { time: '18:30', label: '結果発表・表彰' },
              { time: '19:00', label: '終了' },
            ].map((item, i) => (
              <div key={i} className="schedule-item">
                <span className="schedule-time">{item.time}</span>
                <span className="schedule-dot" />
                <span className="schedule-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Overview ─── */}
      <section className="section overview-section">
        <div className="container">
          <p className="section-label">OVERVIEW</p>
          <h2 className="section-title">開催概要</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <p className="overview-card-label">日時</p>
              <p className="overview-card-value">2026年12月某日<br />11:00〜19:00</p>
            </div>
            <div className="overview-card">
              <p className="overview-card-label">会場</p>
              <p className="overview-card-value">サンドーム福井</p>
            </div>
            <div className="overview-card">
              <p className="overview-card-label">対象年齢</p>
              <p className="overview-card-value">16歳〜22歳</p>
            </div>
            <div className="overview-card">
              <p className="overview-card-label">エントリー費</p>
              <p className="overview-card-value overview-free">無料</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Entry Form ─── */}
      <section id="entry-form" className="section form-section">
        <div className="container">
          <p className="section-label">ENTRY</p>
          <h2 className="section-title">エントリーフォーム</h2>
          <p className="form-note">エントリーは無料です。まずはお気軽にご応募ください。</p>

          {submitted ? (
            <div className="form-success">
              <p className="form-success-icon">✓</p>
              <p className="form-success-title">エントリーを受け付けました</p>
              <p className="form-success-sub">確認のご連絡をお送りします。しばらくお待ちください。</p>
            </div>
          ) : (
            <form className="entry-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">お名前 <span className="required">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="山田 花子"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="age">年齢 <span className="required">*</span></label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="20"
                    min="16"
                    max="22"
                    required
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="instagramId">Instagram ID</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">@</span>
                  <input
                    id="instagramId"
                    name="instagramId"
                    type="text"
                    placeholder="your_instagram"
                    value={formData.instagramId}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact">電話番号またはメールアドレス <span className="required">*</span></label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder="09012345678 または example@email.com"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label>顔写真のアップロード</label>
                <label className="photo-upload-area" htmlFor="photo-input">
                  {photoPreview ? (
                    <img src={photoPreview} alt="プレビュー" className="photo-preview" />
                  ) : (
                    <div className="photo-upload-placeholder">
                      <span className="upload-icon">+</span>
                      <span>写真を選択する</span>
                      <span className="upload-hint">JPG / PNG / HEIC</span>
                    </div>
                  )}
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <div className="form-field">
                <label htmlFor="comment">一言コメント</label>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="エントリーへの意気込みや自己アピールをお書きください"
                  rows={4}
                  value={formData.comment}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn-submit">
                無料でエントリーする
              </button>
              <p className="form-privacy">送信することで、プライバシーポリシーへの同意とみなします。</p>
            </form>
          )}
        </div>
      </section>

      {/* ─── 7. Tickets ─── */}
      <section id="tickets" className="section ticket-section">
        <div className="container">
          <p className="section-label">TICKETS</p>
          <h2 className="section-title">観覧チケット</h2>
          <div className="ticket-grid">
            <div className="ticket-card">
              <p className="ticket-tier">General</p>
              <p className="ticket-name-jp">一般席</p>
              <p className="ticket-price"><span>¥</span>500</p>
              <ul className="ticket-features">
                <li>全審査の観覧</li>
                <li>会場内自由席</li>
                <li>当日券あり</li>
              </ul>
              <button className="btn-ticket">チケットを購入</button>
            </div>

            <div className="ticket-card ticket-vip">
              <p className="ticket-tier">VIP</p>
              <p className="ticket-name-jp">VIP席</p>
              <p className="ticket-price"><span>¥</span>5,000</p>
              <ul className="ticket-features">
                <li>全審査の観覧</li>
                <li>前方指定席</li>
                <li>公式プログラム付き</li>
              </ul>
              <button className="btn-ticket btn-ticket-vip">チケットを購入</button>
            </div>

            <div className="ticket-card ticket-vvip">
              <div className="vvip-badge">EXCLUSIVE</div>
              <p className="ticket-tier">VVIP</p>
              <p className="ticket-name-jp">VVIPシート</p>
              <p className="ticket-price"><span>¥</span>100,000</p>
              <ul className="ticket-features">
                <li>最前列プレミアム指定席</li>
                <li>バックステージ見学</li>
                <li>出場者との撮影会</li>
                <li>限定ギフトノベルティ</li>
                <li>アフターパーティーご招待</li>
              </ul>
              <button className="btn-ticket btn-ticket-vvip">チケットを購入</button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. Organizer ─── */}
      <section className="section organizer-section">
        <div className="container">
          <p className="section-label">ORGANIZER</p>
          <h2 className="section-title">主催</h2>
          <div className="organizer-content">
            <p className="organizer-name">株式会社 film倶楽部</p>
            <p className="organizer-desc">
              福井から新しいスターを生み出すことを目的に、エンターテインメントイベントを企画・運営しています。
              地域に根ざしながら、若者が本気で輝ける舞台を作り続けます。
            </p>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="section final-cta-section">
        <div className="container final-cta-inner">
          <p className="final-cta-sub">エントリーは無料。チャンスはここにある。</p>
          <h2 className="final-cta-title">あなたの挑戦を、待っています。</h2>
          <button className="btn-primary btn-large" onClick={scrollToEntry}>
            今すぐエントリーする
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="lp-footer">
        <div className="container footer-inner">
          <p className="footer-brand">FUKUI CONTEST 2026</p>
          <p className="footer-copy">© 2026 株式会社film倶楽部. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
