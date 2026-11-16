"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  Barcode,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CreditCard,
  Leaf,
  LockKeyhole,
  MapPin,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Truck,
  X,
  ZoomIn,
} from "lucide-react"
import {
  BEFORE_AFTER_IMAGES,
  benefits,
  COMPARE_IMAGE,
  CONTATO,
  DR_CICERO_IMAGE,
  faqs,
  FIFTH_THUMB_IMAGE,
  FOURTH_THUMB_IMAGE,
  GOOGLE_LOGO_IMAGE,
  GOOGLE_RATING_SUMMARY,
  GOOGLE_REVIEWS,
  type GoogleReview,
  GUARANTEE_BF_IMAGE,
  GUARANTEE_CUSTOMER_IMAGE,
  HERO_FIRST_IMAGE,
  HERO_REVIEWS,
  HYDRATION_IMAGE,
  ingredients,
  keywords,
  kits,
  liquidFlowSteps,
  QUIZ_RESULT_IMAGE,
  quizQuestions,
  ritualSteps,
  SECOND_THUMB_IMAGE,
  STICKY_PRODUCT_IMAGE,
  THIRD_THUMB_IMAGE,
  trustAttributes,
  trustPillars,
} from "@/lib/linfaflow-data"

const scrollToOffers = () =>
  document.getElementById("escolha-seu-kit")?.scrollIntoView({ behavior: "smooth", block: "start" })

const scrollToQuiz = () =>
  document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth", block: "start" })

const scrollToCause = () =>
  document.getElementById("causa-real")?.scrollIntoView({ behavior: "smooth", block: "start" })

function Header() {
  return (
    <div className="sticky-top-shell">
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="LinfaFlow, início">
          <img
            src="/images/linfaflow-logo-white.png"
            alt="LinfaFlow"
            className="wordmark-logo"
          />
        </a>
        <div className="header-trust">
          <span>
            <LockKeyhole size={14} /> Compra segura
          </span>
          <i />
          <span>Frete grátis</span>
          <i />
          <span>Garantia 90 dias</span>
        </div>
        <a className="header-buy" href="#escolha-seu-kit">
          Escolher meu kit <ArrowRight size={15} />
        </a>
      </header>

      <div className="black-friday-bar" role="region" aria-label="Oferta Black Friday">
        <div className="black-friday-inner">
          <span className="black-friday-tag">BLACK FRIDAY</span>
          <span className="black-friday-text">
            50% OFF + FRETE GRÁTIS + GARANTIA DE 90 DIAS
          </span>
        </div>
      </div>
    </div>
  )
}

function KeywordMarquee() {
  return (
    <div className="marquee" aria-label={keywords.join(" • ")}>
      <div className="marquee-track" aria-hidden="true">
        {[...keywords, ...keywords].map((word, i) => (
          <span key={`${word}-${i}`}>
            {word}
            <b>•</b>
          </span>
        ))}
      </div>
    </div>
  )
}

function GoogleStars({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <span className="google-stars" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: count }).map((_, idx) => (
        <Star key={idx} size={size} fill="currentColor" strokeWidth={1.5} />
      ))}
    </span>
  )
}

type LightboxImage = { src: string; alt: string }

function GoogleReviewCard({
  review,
  onOpenImage,
}: {
  review: GoogleReview
  onOpenImage: (img: LightboxImage) => void
}) {
  const reviewPhotos: LightboxImage[] = [
    ...(review.photo
      ? [{ src: review.photo, alt: `Foto do LinfaFlow enviada por ${review.nome}` }]
      : []),
    ...(review.deliveryPhoto
      ? [{ src: review.deliveryPhoto, alt: `Foto do produto entregue para ${review.nome}` }]
      : []),
    ...(review.extraPhoto
      ? [{ src: review.extraPhoto, alt: `Antes e depois com LinfaFlow - ${review.nome}` }]
      : []),
  ]

  return (
    <article className="google-review-card">
      <div className="google-review-top">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={`Foto de perfil de ${review.nome}`}
            className="google-avatar-img"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="google-avatar" style={{ backgroundColor: review.cor }}>
            {review.inicial}
          </span>
        )}
        <div className="google-author-meta">
          <b>{review.nome}</b>
          <span>{review.tempo}</span>
        </div>
        <img
          src={GOOGLE_LOGO_IMAGE}
          alt="Google"
          className="google-logo-img"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <GoogleStars count={review.estrelas} size={14} />
      {review.texto && (
        <p className="google-review-text">&ldquo;{review.texto}&rdquo;</p>
      )}
      {reviewPhotos.length > 0 && (
        <div className="google-review-photos">
          {reviewPhotos.map((img, idx) => (
            <button
              key={`${review.nome}-photo-${idx}`}
              type="button"
              className="google-review-photo"
              onClick={() => onOpenImage(img)}
              aria-label={`Ampliar ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <span className="review-photo-zoom-hint" aria-hidden="true">
                <ZoomIn size={13} />
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="google-verified-foot">
        <img
          src={GOOGLE_LOGO_IMAGE}
          alt=""
          className="google-logo-img sm"
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <span>Avaliação verificada pelo Google</span>
      </div>
    </article>
  )
}

function Hero({ onOpenImage }: { onOpenImage: (img: LightboxImage) => void }) {
  const [active, setActive] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [reviewTouchX, setReviewTouchX] = useState<number | null>(null)

  const heroReviews = HERO_REVIEWS

  const slides = [
    {
      src: HERO_FIRST_IMAGE,
      alt: "LinfaFlow: leveza e bem-estar nos detalhes",
      fit: "cover",
      showCaption: true,
    },
    {
      src: SECOND_THUMB_IMAGE,
      alt: "Infográfico sobre a fórmula LinfaFlow e os resultados contra o inchaço",
      fit: "cover",
      showCaption: true,
    },
    {
      src: THIRD_THUMB_IMAGE,
      alt: "Pesquisa com clientes de todo o Brasil: 96,2% menos inchaço, 90% rosto menos inchado e 96% pernas mais leves",
      fit: "cover",
      showCaption: false,
    },
    {
      src: FOURTH_THUMB_IMAGE,
      alt: "Fórmula concentrada e resultados LinfaFlow",
      fit: "cover",
      showCaption: false,
    },
    {
      src: FIFTH_THUMB_IMAGE,
      alt: "Detalhes do pote e fórmula LinfaFlow",
      fit: "cover",
      showCaption: false,
    },
  ]

  const prevSlide = () => setActive((prev) => (prev - 1 + slides.length) % slides.length)
  const nextSlide = () => setActive((prev) => (prev + 1) % slides.length)

  const prevReview = () => setReviewIndex((prev) => Math.max(0, prev - 1))
  const nextReview = () =>
    setReviewIndex((prev) => Math.min(heroReviews.length - 1, prev + 1))

  return (
    <section className="hero section-wrap" id="inicio">
      <div className="gallery">
        <div
          className="hero-image"
          onTouchStart={(e) => setTouchStartX(e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return
            const endX = e.changedTouches[0]?.clientX ?? touchStartX
            const diff = touchStartX - endX
            if (Math.abs(diff) > 40) {
              if (diff > 0) nextSlide()
              else prevSlide()
            }
            setTouchStartX(null)
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`hero-slide ${active === i ? "is-active" : ""}`}
              aria-hidden={active !== i}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className={slide.fit}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          <button
            type="button"
            className="hero-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation()
              prevSlide()
            }}
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            className="hero-nav-btn next"
            onClick={(e) => {
              e.stopPropagation()
              nextSlide()
            }}
            aria-label="Próxima imagem"
          >
            <ChevronRight size={22} />
          </button>
          {slides[active]?.showCaption && (
            <span className="image-caption">
              <Leaf size={14} /> Fórmula concentrada · 150 g
            </span>
          )}
          <span className="image-counter" aria-live="polite">
            {active + 1} / {slides.length}
          </span>
        </div>
        <div className="thumbnails" aria-label="Galeria do produto">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              className={`thumb ${slide.fit === "contain" ? "is-contain" : ""} ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1}`}
              aria-pressed={active === i}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="hero-copy">
        <p className="eyebrow">LINFAFLOW® · DRENAGEM LINFÁTICA DIÁRIA</p>
        <div className="hero-rating-bar">
          <GoogleStars count={5} size={15} />
          <span>
            <strong>{GOOGLE_RATING_SUMMARY.nota}</strong> · {GOOGLE_RATING_SUMMARY.total} avaliações no Google
          </span>
        </div>

        <h1>Barriga desinchada, rosto definido e pernas leves em 14 dias.</h1>

        <p className="hero-sub">
          <strong>4 extratos vegetais concentrados</strong> que{" "}
          <strong>ativam a drenagem linfática</strong> e{" "}
          <strong>eliminam líquidos retidos</strong> com resultados em 14 dias. Em{" "}
          <strong>pó solúvel</strong>, incentiva você a beber mais água para{" "}
          <strong>manter a leveza todos os dias</strong>.
        </p>

        <ul className="benefit-list">
          {benefits.map((benefit) => (
            <li key={benefit}>
              <Check size={18} className="benefit-check" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <button type="button" className="button button-primary hero-cta" onClick={scrollToQuiz}>
          <span>LinfaFlow é indicado para você? Fazer teste</span>
          <ArrowRight size={18} className="btn-arrow-right" />
        </button>
        <p className="hero-cta-note">Teste gratuito · resultado em menos de 30 segundos</p>

        <div className="hero-google-reviews">
          <div className="hero-reviews-header">
            <div className="google-brand-cluster">
              <img
                src={GOOGLE_LOGO_IMAGE}
                alt=""
                className="google-logo-img"
                aria-hidden="true"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <strong className="hero-reviews-title">
                Avaliações verificadas pelo Google
              </strong>
            </div>
            <span className="hero-review-count" aria-live="polite">
              {reviewIndex + 1} / {heroReviews.length}
            </span>
          </div>

          <div className="hero-review-carousel-wrap">
            {reviewIndex > 0 && (
              <button
                type="button"
                className="hero-review-inner-arrow prev"
                onClick={prevReview}
                aria-label="Avaliação anterior"
              >
                <ChevronLeft size={16} />
              </button>
            )}

            <div
              className="hero-review-viewport"
              onTouchStart={(e) => setReviewTouchX(e.touches[0]?.clientX ?? null)}
              onTouchEnd={(e) => {
                if (reviewTouchX === null) return
                const endX = e.changedTouches[0]?.clientX ?? reviewTouchX
                const diff = reviewTouchX - endX
                if (Math.abs(diff) > 36) {
                  if (diff > 0) nextReview()
                  else prevReview()
                }
                setReviewTouchX(null)
              }}
            >
              <div
                className="hero-review-track"
                style={{
                  transform: reviewIndex === 0 ? "translateX(0%)" : `translateX(-${reviewIndex * 100}%)`,
                }}
              >
                {heroReviews.map((review) => (
                  <div className="hero-review-slide" key={review.nome}>
                    <GoogleReviewCard review={review} onOpenImage={onOpenImage} />
                  </div>
                ))}
              </div>
            </div>

            {reviewIndex < heroReviews.length - 1 && (
              <button
                type="button"
                className="hero-review-inner-arrow next"
                onClick={nextReview}
                aria-label="Próxima avaliação"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="hero-faqs">
          <p className="hero-faqs-title">Dúvidas rápidas sobre o LinfaFlow</p>
          <div className="hero-faq-list">
            {faqs.slice(0, 5).map((item) => (
              <details className="hero-faq-item" key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <span className="hero-faq-icon" aria-hidden="true">
                    <ChevronDown size={15} />
                  </span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function QuizSection({
  answers,
  setAnswers,
}: {
  answers: boolean[]
  setAnswers: (answers: boolean[]) => void
}) {
  const [step, setStep] = useState(0)
  const [result, setResult] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [resultProgress, setResultProgress] = useState(0)
  const [selected, setSelected] = useState<boolean | null>(null)
  const quizCardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isCalculating) return
    const durationMs = 3500
    const start = Date.now()
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - start
      const next = Math.min(Math.round((elapsed / durationMs) * 100), 100)
      setResultProgress(next)
      if (elapsed >= durationMs) {
        window.clearInterval(interval)
        setIsCalculating(false)
        setResult(true)
      }
    }, 50)
    return () => window.clearInterval(interval)
  }, [isCalculating])

  useEffect(() => {
    if (!result) return
    const frame = requestAnimationFrame(() => {
      const card = quizCardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const targetY = window.scrollY + rect.top - 108
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" })
    })
    return () => cancelAnimationFrame(frame)
  }, [result])

  useEffect(() => {
    const nextQuestion = quizQuestions[step + 1]
    if (!nextQuestion) return
    const preloader = new window.Image()
    preloader.referrerPolicy = "no-referrer"
    preloader.src = nextQuestion.image
  }, [step])

  const totalQuestions = quizQuestions.length
  const question = quizQuestions[step]
  const yesItems = quizQuestions.filter((_, i) => answers[i] === true)
  const yesCount = yesItems.length
  const progressPct = Math.round(((step + 1) / totalQuestions) * 100)

  const restart = () => {
    setStep(0)
    setAnswers([])
    setResult(false)
    setIsCalculating(false)
    setResultProgress(0)
    setSelected(null)
  }

  const answer = (value: boolean) => {
    if (selected !== null) return
    setSelected(value)
    window.setTimeout(() => {
      const next = [...answers.slice(0, step), value]
      setAnswers(next)
      setSelected(null)
      if (step === totalQuestions - 1) {
        setResultProgress(0)
        setIsCalculating(true)
      } else {
        setStep(step + 1)
      }
    }, 300)
  }

  const calculatingStage =
    resultProgress < 35
      ? "Mapeando os sinais selecionados..."
      : resultProgress < 75
        ? "Cruzando seu perfil com os 4 extratos..."
        : "Finalizando sua recomendação personalizada..."

  return (
    <section className="quiz-section" id="quiz">
      <div className="quiz-backdrop">
        <div className="quiz-orb orb-one" />
        <div className="quiz-orb orb-two" />
      </div>

      <div className="quiz-intro">
        <p className="eyebrow eyebrow-gold">TESTE RÁPIDO · MENOS DE 30 SEGUNDOS</p>
        <h2>
          Faça o teste abaixo e
          <br />
          descubra se o{" "}
          <span className="quiz-highlight">
            LinfaFlow
            <br />é indicado para você
          </span>
        </h2>
      </div>

      <div ref={quizCardRef} className={`quiz-card ${result ? "is-result" : ""}`}>
        {!result ? (
          isCalculating ? (
            <div className="quiz-calculating" aria-live="polite" aria-busy="true">
              <p className="result-label">ANALISANDO SUAS RESPOSTAS</p>
              <h3>Montando sua recomendação</h3>
              <p className="calculating-stage-text">{calculatingStage}</p>
              <div
                className="calculation-track"
                role="progressbar"
                aria-label="Calculando o resultado"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={resultProgress}
              >
                <span style={{ width: `${resultProgress}%` }} />
              </div>
              <strong className="calculation-percent">{resultProgress}%</strong>
            </div>
          ) : (
            <>
              <div className="quiz-question-wrap" key={step}>
                <div className="question-art">
                  <Image
                    src={question.image}
                    alt={question.imageAlt}
                    fill
                    sizes="(max-width: 600px) 92vw, 480px"
                    className="cover"
                    referrerPolicy="no-referrer"
                  />
                  <span>{question.short}</span>
                </div>
                <h3>{question.question}</h3>
                <div className="answer-row">
                  <button
                    type="button"
                    className={`answer-btn yes ${selected === true ? "chosen" : ""}`}
                    onClick={() => answer(true)}
                  >
                    <Check size={20} /> Sim
                  </button>
                  <button
                    type="button"
                    className={`answer-btn no ${selected === false ? "chosen" : ""}`}
                    onClick={() => answer(false)}
                  >
                    <X size={19} /> Não
                  </button>
                </div>
              </div>

              <div className="quiz-bottom-progress">
                <div className="quiz-topline">
                  <span>PERGUNTA {step + 1} DE {totalQuestions}</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="quiz-progress">
                  <span style={{ width: `${progressPct}%` }} />
                </div>
                <div className="quiz-dots" aria-label={`${step} perguntas respondidas`}>
                  {quizQuestions.map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < answers.length
                          ? answers[i]
                            ? "dot yes-dot"
                            : "dot no-dot"
                          : i === step
                            ? "dot current-dot"
                            : "dot"
                      }
                    />
                  ))}
                </div>
              </div>

              {step > 0 && (
                <button
                  type="button"
                  className="back-question"
                  onClick={() => {
                    setStep(step - 1)
                    setAnswers(answers.slice(0, -1))
                  }}
                >
                  <ChevronLeft size={16} /> Voltar pergunta
                </button>
              )}
            </>
          )
        ) : (
          <div className="quiz-result">
            <span className="result-verified-pill">
              <CircleCheck size={14} /> ANÁLISE CONCLUÍDA · 100% INDICADO
            </span>

            <h3>
              Você faz parte do grupo em que o{" "}
              <span className="result-headline-highlight">LinfaFlow é 100% indicado.</span>
            </h3>

            <div className="quiz-result-showcase">
              <div className="quiz-result-mini-img">
                <img
                  src={QUIZ_RESULT_IMAGE}
                  alt="Dr. Cícero - Recomendação clínica LinfaFlow"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="quiz-result-copy">
                <span className="quiz-dr-tag">
                  <Stethoscope size={13} /> Dr. Cícero · Recomendação Clínica
                </span>
                <p className="result-focus-text">
                  {yesCount === 0 ? (
                    <>
                      &ldquo;Mesmo sem sinais intensos agora, recomendo os <strong>4 extratos de drenagem natural</strong> para prevenir retenção oculta. <strong>100% dos resultados aparecem em 14 dias, depois faça a manutenção</strong> — com <strong>90 dias de garantia total</strong>.&rdquo;
                    </>
                  ) : yesCount === 1 ? (
                    <>
                      &ldquo;Pelo seu sinal de <strong>{yesItems[0].short.toLowerCase()}</strong>, recomendo os <strong>4 extratos de drenagem natural</strong> do LinfaFlow para destravar o líquido parado. <strong>100% dos resultados aparecem em 14 dias, depois faça a manutenção</strong> — com <strong>90 dias de garantia total</strong>.&rdquo;
                    </>
                  ) : yesCount === 2 ? (
                    <>
                      &ldquo;Seus sinais de <strong>{yesItems[0].short.toLowerCase()}</strong> e <strong>{yesItems[1].short.toLowerCase()}</strong> pedem drenagem imediata. Com <strong>4 extratos de drenagem natural</strong>, <strong>100% dos resultados aparecem em 14 dias, depois faça a manutenção</strong> — com <strong>90 dias de garantia total</strong>.&rdquo;
                    </>
                  ) : (
                    <>
                      &ldquo;Com <strong>{yesCount} sinais ativos</strong> ({yesItems.slice(0, 2).map((x) => x.short.toLowerCase()).join(", ")} e mais), recomendo os <strong>4 extratos de drenagem natural</strong> do LinfaFlow. <strong>100% dos resultados aparecem em 14 dias, depois faça a manutenção</strong> — com <strong>90 dias de garantia total</strong>.&rdquo;
                    </>
                  )}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="button button-primary quiz-cta-pulse"
              onClick={scrollToOffers}
            >
              <span className="sticky-bf-ribbon">Black Friday</span>
              <span>VER KIT RECOMENDADO</span>
              <ArrowRight size={18} className="btn-arrow-right" />
            </button>
            <button
              type="button"
              className="quiz-learn-more-btn"
              onClick={scrollToCause}
            >
              <span>Saber mais sobre o LinfaFlow</span>
              <ChevronDown size={15} />
            </button>
            <button type="button" className="reset-quiz" onClick={restart}>
              ↻ Refazer o teste
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function LiquidFlowSection() {
  return (
    <section className="liquid-section" id="causa-real">
      <div className="section-wrap">
        <div className="section-heading centered">
          <p className="eyebrow">ENTENDA A CAUSA REAL</p>
          <h2>Não é gordura. É líquido parado.</h2>
          <p>
            O sangue tem o coração para bombear. O líquido entre os tecidos não tem bomba nenhuma: ele só circula quando o corpo é estimulado.
          </p>
        </div>

        <div className="liquid-grid">
          {liquidFlowSteps.map((item) => (
            <article className="liquid-card" key={item.step}>
              <div className="liquid-card-img">
                <img src={item.image} alt={item.imageAlt} loading="lazy" referrerPolicy="no-referrer" />
                <span className="liquid-step-num">{item.step}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function RitualSection() {
  return (
    <section className="ritual-section">
      <div className="section-wrap">
        <div className="section-heading centered">
          <p className="eyebrow">UM HÁBITO SIMPLES</p>
          <h2>O ritual de 30 segundos</h2>
          <p>
            Uma rotina prática para entregar barriga desinchada, rosto definido e pernas leves em 14 dias — e continuar utilizando diariamente para manter os resultados.
          </p>
        </div>

        <div className="ritual-grid">
          {ritualSteps.map((item, i) => (
            <article className="ritual-card" key={item.title}>
              <div className="ritual-image">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 760px) 92vw, 360px"
                  className="cover"
                  referrerPolicy="no-referrer"
                />
                <span>0{i + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="hydration-callout">
          <h3 className="hydration-title">Por que o LinfaFlow é em pó?</h3>
          <div className="hydration-gif-box">
            <img
              src={HYDRATION_IMAGE}
              alt="Animação informativa mostrando a água com LinfaFlow limpando o organismo e ativando a drenagem linfática"
              className="hydration-gif-img"
              loading="lazy"
            />
          </div>
          <div className="hydration-copy">
            <p>
              Além de garantir absorção mais rápida dos 4 extratos vegetais, preparar em 200 ml de água{" "}
              <strong>faz você beber mais água todos os dias</strong> — e a hidratação constante é indispensável para destravar o sistema linfático e eliminar o líquido retido.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BeforeAfterSection({ onOpenImage }: { onOpenImage: (img: LightboxImage) => void }) {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="before-after-section" id="antes-e-depois">
      <div className="section-wrap">
        <div className="section-heading centered">
          <p className="eyebrow">RESULTADOS REAIS · ANTES E DEPOIS</p>
          <h2>Veja a diferença no espelho em 14 dias.</h2>
          <p>
            Transformações reais de clientes que ativaram a drenagem linfática diária com o LinfaFlow.
          </p>
        </div>
      </div>

      <div
        className="before-after-marquee"
        aria-label="Carrossel automático de antes e depois"
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setIsPaused(true)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setIsPaused(false)
        }}
      >
        <div
          className="before-after-track"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {[0, 1].map((dup) => (
            <div className="before-after-set" key={dup} aria-hidden={dup === 1}>
              {BEFORE_AFTER_IMAGES.map((item, idx) => (
                <button
                  key={`${dup}-${idx}`}
                  type="button"
                  className="before-after-card"
                  onClick={() => {
                    setIsPaused(false)
                    onOpenImage(item)
                  }}
                  aria-label={`Ampliar ${item.alt}`}
                  tabIndex={dup === 1 ? -1 : 0}
                >
                  <img
                    src={item.src}
                    alt={dup === 1 ? "" : item.alt}
                    width={720}
                    height={720}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="before-after-zoom-badge" aria-hidden="true">
                    <ZoomIn size={14} />
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GoogleReviewsSection({ onOpenImage }: { onOpenImage: (img: LightboxImage) => void }) {
  const [visibleCount, setVisibleCount] = useState(3)
  const visibleReviews = GOOGLE_REVIEWS.slice(0, visibleCount)
  const remaining = GOOGLE_REVIEWS.length - visibleCount

  return (
    <section className="google-section" id="avaliacoes">
      <div className="section-wrap">
        <div className="section-heading centered">
          <p className="eyebrow">CLIENTES REAIS NO GOOGLE</p>
          <h2>Avaliações verificadas no Google</h2>
          <p>Veja o que quem seguiu o protocolo relata sobre barriga desinchada, rosto definido e pernas leves em 14 dias.</p>
        </div>

        <div className="google-summary-bar">
          <div className="google-brand-cluster">
            <img
              src={GOOGLE_LOGO_IMAGE}
              alt="Google"
              className="google-logo-img lg"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="google-brand-title">
              <strong>Avaliações do Google</strong>
              <span>Baseado em {GOOGLE_RATING_SUMMARY.total} avaliações verificadas</span>
            </div>
          </div>
          <div className="google-score-cluster">
            <span className="google-score-num">{GOOGLE_RATING_SUMMARY.nota}</span>
            <div>
              <GoogleStars count={5} size={17} />
              <div style={{ fontSize: 12, color: "#4b5563", fontWeight: 600 }}>Excelente</div>
            </div>
          </div>
        </div>

        <div className="google-reviews-grid">
          {visibleReviews.map((review) => (
            <GoogleReviewCard key={review.nome} review={review} onOpenImage={onOpenImage} />
          ))}
        </div>

        <div className="google-more-wrap">
          {remaining > 0 ? (
            <button
              type="button"
              className="google-more-btn"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 3, GOOGLE_REVIEWS.length))}
            >
              Ver mais
              <ChevronDown size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="google-more-btn"
              onClick={() => setVisibleCount(3)}
            >
              Mostrar menos
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

const TIMEZONE_TO_BR_CITY: Record<string, string> = {
  "America/Sao_Paulo": "São Paulo - SP",
  "America/Bahia": "Salvador - BA",
  "America/Fortaleza": "Fortaleza - CE",
  "America/Recife": "Recife - PE",
  "America/Maceio": "Maceió - AL",
  "America/Belem": "Belém - PA",
  "America/Manaus": "Manaus - AM",
  "America/Cuiaba": "Cuiabá - MT",
  "America/Campo_Grande": "Campo Grande - MS",
  "America/Porto_Velho": "Porto Velho - RO",
  "America/Boa_Vista": "Boa Vista - RR",
  "America/Rio_Branco": "Rio Branco - AC",
  "America/Araguaina": "Palmas - TO",
}

function TrustSection() {
  const icons = [ShieldCheck, Leaf, CircleCheck, Sparkles]
  const [doctorCity, setDoctorCity] = useState("São Paulo - SP")

  useEffect(() => {
    let active = true
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (tz && TIMEZONE_TO_BR_CITY[tz]) {
        setDoctorCity(TIMEZONE_TO_BR_CITY[tz])
      }
    } catch {
      // keep default São Paulo - SP
    }

    fetch("/api/geo")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { city?: string } | null) => {
        if (active && data?.city && data.city !== "São Paulo - SP") {
          setDoctorCity(data.city)
        }
      })
      .catch(() => {
        // keep timezone / default city silently
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="trust-section">
      <div className="section-wrap">
        <div className="section-heading centered">
          <p className="eyebrow eyebrow-gold">QUALIDADE COMPROVADA</p>
          <h2>Por que confiar no LinfaFlow?</h2>
        </div>

        <article className="trust-doctor-card">
          <div className="trust-doctor-media">
            <img
              src={DR_CICERO_IMAGE}
              alt={`Dr. Cícero em ${doctorCity} recomendando o LinfaFlow`}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="trust-doctor-body">
            <div className="trust-doctor-badge">
              <Stethoscope size={15} />
              <span>Recomendação Clínica ·</span>
              <MapPin size={14} />
              <strong>Dr. Cícero, {doctorCity}</strong>
            </div>
            <h3>
              “O acúmulo de líquido entre os tecidos exige estímulo linfático e hidratação ativa — é por isso que recomendo o LinfaFlow.”
            </h3>
            <p className="trust-doctor-text">
              A retenção não cede só com dieta: exige estímulo linfático e hidratação ativa. A fórmula em pó do <strong>LinfaFlow</strong> une <strong>Chá Verde, Chá Branco, Hibisco e Gengibre</strong> em alta concentração de catequinas e polifenóis. Diluída em 200 ml de água, potencializa a absorção e drena líquidos sem desidratar — reduzindo o inchaço já em <strong>14 dias</strong>.
            </p>
            <div className="trust-doctor-chips">
              <span>
                <Check size={14} /> Alta biodisponibilidade em meio aquoso
              </span>
              <span>
                <Check size={14} /> 4 extratos vegetais padronizados
              </span>
              <span>
                <Check size={14} /> Drenagem natural sem desidratar
              </span>
            </div>
          </div>
        </article>

        <div className="trust-grid">
          {trustPillars.map((pillar, i) => {
            const Icon = icons[i]
            return (
              <article key={pillar.title}>
                <span className="trust-icon">
                  <Icon size={18} />
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            )
          })}
        </div>

        <div className="trust-attributes">
          {trustAttributes.map((attr) => (
            <div className="trust-attr-item" key={attr.label}>
              <img
                src={attr.image}
                alt={attr.label}
                className="trust-attr-img"
                loading="lazy"
              />
              <span>{attr.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IngredientsSection() {
  return (
    <section className="ingredients-section" id="composicao">
      <div className="section-wrap">
        <div className="section-heading centered">
          <p className="eyebrow">A FÓRMULA DO LINFAFLOW</p>
          <h2>4 extratos vegetais com papéis complementares contra o inchaço.</h2>
          <p>
            Cada ingrediente cumpre um papel específico — do <strong>metabolismo ativo</strong> à drenagem natural — agindo juntos para entregar <strong>barriga mais leve, rosto definido e pernas descansadas em 14 dias</strong>.
          </p>
        </div>

        <div className="ingredients-cards-grid">
          {ingredients.map((item) => (
            <article className="ingredient-card" key={item.name}>
              <div className="ingredient-card-img">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 180px"
                />
              </div>
              <div className="ingredient-card-body">
                <h3>{item.name}</h3>
                <div className="ingredient-focus">{item.focus}</div>
                <p>
                  {item.parts.map((part, idx) =>
                    part.bold ? <strong key={idx}>{part.text}</strong> : <span key={idx}>{part.text}</span>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CompareSection() {
  return (
    <section className="compare-section" id="comparativo">
      <div className="section-wrap">
        <div className="section-heading centered">
          <p className="eyebrow">COMPARATIVO</p>
          <h2>LinfaFlow x Outros</h2>
          <p>Comparativo LinfaFlow versus outras opções do mercado</p>
        </div>

        <div className="compare-image-wrap">
          <img
            src={COMPARE_IMAGE}
            alt="Comparativo LinfaFlow versus líquidos, gotas, cápsulas e comprimidos"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  )
}

function Guarantee90Section() {
  return (
    <section className="guarantee-90-section" id="garantia-90-dias">
      <div className="section-wrap">
        <div className="guarantee-90-card">
          <div className="guarantee-90-media">
            <img
              src={GUARANTEE_BF_IMAGE}
              alt="LinfaFlow Black Friday 50% OFF com 90 dias de garantia"
              loading="lazy"
            />
          </div>
          <div className="guarantee-90-copy">
            <p className="eyebrow eyebrow-gold">
              <ShieldCheck size={15} /> Garantia de 90 dias
            </p>
            <h2>90 dias ou seu dinheiro de volta</h2>
            <p className="guarantee-90-text">
              Use por 90 dias. Se não ficar satisfeito com os resultados, é só pedir o reembolso. Devolvemos 100% do valor pago.
            </p>
            <button type="button" className="button button-primary guarantee-90-cta" onClick={scrollToOffers}>
              <span className="sticky-bf-ribbon">Black Friday</span>
              <span>VER KIT RECOMENDADO</span>
              <ArrowRight size={17} className="btn-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Price({ value }: { value: string }) {
  const [whole, cents] = value.split(",")
  return (
    <div className="price">
      <span>R$</span>
      <strong>
        {whole}
        <sup>,{cents}</sup>
      </strong>
    </div>
  )
}

function PaymentSeals({ anchorId }: { anchorId?: string }) {
  return (
    <div className="payment-seals-block">
      <div className="secure-row" id={anchorId}>
        <LockKeyhole size={16} />
        <span>Pagamento 100% seguro · Cartões, PIX e Boleto</span>
      </div>
      <div className="payment-seals-row" aria-label="Formas de pagamento aceitas">
        <span className="pay-seal pix">
          <QrCode size={15} /> PIX
        </span>
        <span className="pay-seal visa">
          <CreditCard size={14} /> VISA
        </span>
        <span className="pay-seal mastercard">
          <span className="mc-dots" aria-hidden="true">
            <i />
            <i />
          </span>
          mastercard
        </span>
        <span className="pay-seal elo">
          <CreditCard size={14} /> ELO
        </span>
        <span className="pay-seal boleto">
          <Barcode size={16} /> BOLETO
        </span>
      </div>
    </div>
  )
}

const warmedCheckoutUrls = new Set<string>()
function warmupCheckout(url: string) {
  if (typeof document === "undefined" || warmedCheckoutUrls.has(url)) return
  warmedCheckoutUrls.add(url)
  const link = document.createElement("link")
  link.rel = "prefetch"
  link.href = url
  document.head.appendChild(link)
}

function OffersSection({ final = false }: { final?: boolean }) {
  return (
    <section className="offers-section" id={final ? "offer2" : "offers"}>
      <div className="section-wrap">
        <div
          id={!final ? "escolha-seu-kit" : undefined}
          className="section-heading centered offers-heading-target"
        >
          <p className="eyebrow">ESCOLHA SEU KIT</p>
          <h2>
            {final
              ? "Comece hoje a conquistar barriga desinchada, rosto definido e pernas leves em 14 dias."
              : "Escolha seu kit e elimine a retenção."}
          </h2>
          <p>
            Os primeiros resultados surgem em 14 dias e continuar utilizando garante a manutenção contínua · Frete grátis para todo o Brasil · Garantia de 90 dias.
          </p>
        </div>

        <div className="offer-grid">
          {kits.map((kit) => (
            <a
              key={kit.id}
              className={`offer-card kit-${kit.id} ${kit.recommended ? "recommended" : ""}`}
              href={kit.checkoutUrl}
              onMouseEnter={() => warmupCheckout(kit.checkoutUrl)}
              onTouchStart={() => warmupCheckout(kit.checkoutUrl)}
              onFocus={() => warmupCheckout(kit.checkoutUrl)}
              onClick={(event) => {
                if (window.location.search) {
                  event.preventDefault()
                  const target = new URL(event.currentTarget.href)
                  new URLSearchParams(window.location.search).forEach((value, key) => {
                    if (!target.searchParams.has(key)) target.searchParams.set(key, value)
                  })
                  window.location.assign(target.toString())
                }
              }}
            >
              <div className="offer-bf-ribbon">
                <span className="offer-bf-badge">BLACK FRIDAY</span>
                <span className="offer-bf-rest">50% OFF + FRETE GRÁTIS + GARANTIA DE 90 DIAS</span>
              </div>

              {kit.recommended && (
                <div className="offer-rec-ribbon">
                  TRATAMENTO RECOMENDADO
                </div>
              )}

              <span className={`offer-tag ${kit.recommended ? "tag-green" : ""}`}>
                {kit.recommended && <Star size={12} fill="currentColor" />}
                {kit.label}
              </span>

              <div className="offer-title">
                <h3>{kit.name}</h3>
                <p>{kit.subtitle}</p>
              </div>

              <div className={`offer-product size-${kit.id}`}>
                <img
                  src={kit.image}
                  alt={`Kit LinfaFlow - ${kit.name}`}
                  loading="lazy"
                />
              </div>

              <p className="per-pot">Por pote</p>
              <Price value={kit.unit} />
              <p className="total-price">
                Total <strong>R$ {kit.total}</strong>
              </p>
              {kit.save && <p className="save-line">{kit.save}</p>}
              <p className="installments">
                ou {kit.installments} · {kit.daily}
              </p>

              <p className="offer-trust">
                <Truck size={15} /> Frete grátis <span>·</span> <ShieldCheck size={15} /> 90 dias
              </p>

              <span className="button button-primary offer-button">
                <span className="sticky-bf-ribbon">Black Friday</span>
                <span>COMPRAR AGORA</span>
                <ArrowRight size={16} className="btn-arrow-right" />
              </span>
            </a>
          ))}
        </div>

        <PaymentSeals anchorId={!final ? "checkout-info" : undefined} />
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="faq-section" id="faq">
      <div className="section-wrap">
        <div className="faq-guarantee" id="garantia">
          <div className="faq-product">
            <img
              src={GUARANTEE_CUSTOMER_IMAGE}
              alt="Cliente segurando o pote LinfaFlow com garantia incondicional de 90 dias"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="faq-guarantee-body">
            <p className="eyebrow">GARANTIA INCONDICIONAL DE 90 DIAS</p>
            <h2>Use por 90 dias ou receba 100% do valor de volta.</h2>
            <p className="guarantee-lead">
              Você tem 90 dias corridos a partir da entrega para experimentar o LinfaFlow na sua rotina. Se não ficar satisfeito com os resultados, basta solicitar o reembolso integral pelos nossos canais oficiais de atendimento:
            </p>
            <div className="guarantee-contact-box">
              <span className="guarantee-contact-item">
                <strong>Telefone / WhatsApp:</strong> {CONTATO.telefone}
              </span>
              <span className="guarantee-contact-item">
                <strong>E-mail:</strong> {CONTATO.email}
              </span>
            </div>
            <button type="button" className="button button-light" onClick={scrollToOffers}>
              <span className="sticky-bf-ribbon">Black Friday</span>
              <span>VER KIT RECOMENDADO</span>
              <ArrowRight size={16} className="btn-arrow-right" />
            </button>
          </div>
        </div>

        <div className="faq-content">
          <div className="section-heading centered">
            <p className="eyebrow eyebrow-gold">DÚVIDAS FREQUENTES</p>
            <h2>Respostas diretas sobre o LinfaFlow.</h2>
          </div>
          {faqs.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>
                {item.question}
                <span>+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-grid">
        <div className="footer-brand">
          <a className="wordmark" href="#inicio" aria-label="LinfaFlow, início">
            <img
              src="/images/linfaflow-logo-white.png"
              alt="LinfaFlow"
              className="wordmark-logo footer-logo"
            />
          </a>
          <p>4 extratos vegetais para ativar a drenagem linfática e eliminar o líquido retido todos os dias.</p>
        </div>
        <div>
          <h3>FALE CONOSCO</h3>
          <p>{CONTATO.telefone || "Atendimento ao cliente"}</p>
          <p>{CONTATO.email || "Suporte oficial LinfaFlow"}</p>
          <p>{CONTATO.horario}</p>
        </div>
        <div>
          <h3>MENU</h3>
          <a href="#inicio">Início</a>
          <a href="#quiz">Quiz do inchaço</a>
          <a href="#composicao">Composição</a>
          <a href="#escolha-seu-kit">Escolher meu kit</a>
        </div>
        <div>
          <h3>POLÍTICAS</h3>
          <a href="#garantia">Garantia 90 dias</a>
          <a href="#faq">Dúvidas frequentes</a>
          <a href="#avaliacoes">Avaliações Google</a>
        </div>
      </div>

      <div className="footer-bottom section-wrap">
        <PaymentSeals />
        <p>
          © 2026 {CONTATO.razaoSocial || "LinfaFlow"}
          {CONTATO.cnpj ? ` · CNPJ ${CONTATO.cnpj}` : ""}. Suplemento alimentar regularizado conforme normas vigentes.
        </p>
        <div className="footer-compliance">
          <p>
            Este produto não é um medicamento e não tem a finalidade de diagnosticar, tratar, curar ou prevenir qualquer doença. Suplemento alimentar dispensado de registro sanitário conforme Resolução RDC nº 240/2018 da ANVISA.
          </p>
          <p>
            Este site não substitui o aconselhamento ou consulta com um profissional de saúde habilitado. Os resultados variam de acordo com o organismo, a alimentação e os hábitos de cada pessoa. Gestantes, lactantes, crianças e pessoas em tratamento médico devem consultar um médico ou nutricionista antes do consumo.
          </p>
          <p>
            Este site não é afiliado ao Facebook, Instagram (Meta Platforms, Inc.) ou Google. Após sair dessas plataformas, a responsabilidade pelo conteúdo e pela oferta apresentada é exclusiva deste site.
          </p>
        </div>
      </div>
    </footer>
  )
}

function StickyOfferCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const quiz = document.getElementById("quiz")?.getBoundingClientRect()
        const offer = document.getElementById("offers")?.getBoundingClientRect()
        const offer2 = document.getElementById("offer2")?.getBoundingClientRect()
        const inQuiz = !!quiz && quiz.top < window.innerHeight && quiz.bottom > 0
        const inOffers = [offer, offer2].some(
          (rect) => !!rect && rect.top < window.innerHeight && rect.bottom > 0
        )
        setVisible(window.scrollY > 680 && !inQuiz && !inOffers)
      })
    }
    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => {
      window.removeEventListener("scroll", update)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`}>
      <button type="button" className="button button-primary sticky-cta-btn" onClick={scrollToOffers}>
        <span className="sticky-bf-ribbon">Black Friday</span>
        <img
          src={STICKY_PRODUCT_IMAGE}
          alt="Pote LinfaFlow"
          className="sticky-product-thumb"
        />
        <span className="sticky-cta-label">VER KIT RECOMENDADO</span>
        <ArrowRight size={17} className="btn-arrow-right" />
      </button>
    </div>
  )
}

function ImageLightboxModal({
  image,
  onClose,
}: {
  image: LightboxImage | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!image) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      className="image-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <div className="image-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="image-lightbox-close"
          onClick={onClose}
          aria-label="Fechar imagem"
        >
          <X size={22} />
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="image-lightbox-img"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [answers, setAnswers] = useState<boolean[]>([])
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null)

  return (
    <>
      <Header />
      <KeywordMarquee />
      <main>
        <Hero onOpenImage={setLightboxImage} />
        <QuizSection answers={answers} setAnswers={setAnswers} />
        <LiquidFlowSection />
        <RitualSection />
        <GoogleReviewsSection onOpenImage={setLightboxImage} />
        <BeforeAfterSection onOpenImage={setLightboxImage} />
        <TrustSection />
        <IngredientsSection />
        <CompareSection />
        <Guarantee90Section />
        <OffersSection />
        <FaqSection />
        <OffersSection final />
        <section className="ps-section">
          <p>
            <strong>P.S.:</strong> Se você chegou até aqui, sabe que esse volume na barriga, no rosto e nas pernas é líquido parado pedindo drenagem. Você tem <strong>90 dias de garantia</strong> para testar o LinfaFlow, conquistar barriga desinchada, rosto definido e pernas leves em 14 dias — e <strong>continuar tomando todos os dias para manter os resultados</strong>. <strong>O risco é todo nosso.</strong>
          </p>
        </section>
      </main>
      <Footer />
      <StickyOfferCta />
      <ImageLightboxModal image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  )
}
