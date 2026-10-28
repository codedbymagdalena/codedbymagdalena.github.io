import { type FormEvent, useEffect, useState } from "react"

// Free key from web3forms.com (sent to your email). Safe to be public.
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"

const slides = [
  {
    label: "PORTRAIT_001.JPG",
    title: "Hi, I’m Magda.",
    copy: "CS student, designer & builder",
    image: "/assets/camera-portrait.webp",
    position: "center",
  },
  {
    label: "PROJECT_002.JPG",
    title: "Building for people.",
    copy: "Web · Games · Healthcare AI",
    image: "/assets/camera-voting.webp",
    position: "center 60%",
  },
  {
    label: "PROCESS_003.JPG",
    title: "Curious by default.",
    copy: "Researching, prototyping, iterating",
    image: "/assets/camera-coding.webp",
    position: "center 55%",
  },
]

const projects = [
  {
    n: "01",
    title: "BurnoutWatch",
    type: "AI-Powered Healthcare Concept · Hackathon",
    status: "Featured",
    copy: "Designed and developed frontend experiences for a healthcare application concept focused on monitoring burnout through shift patterns, overtime, and recovery trends. Collaborated with a three-person international team during a 36-hour AI hackathon.",
    role: "Frontend Development · Team Collaboration",
    tools: "UI/UX Design · Healthcare Tech · Team Collaboration",
    image: "/assets/burnoutwatch-login.webp",
    pos: "center",
    fit: "contain",
    categories: ["UI/UX Design"],
  },
  {
    n: "02",
    title: "Freelance Web Design & Development",
    type: "Client Websites · Personal & Small Business Projects",
    status: "Featured",
    copy: "Created Figma wireframes and developed websites for small businesses, portfolios, and local shops, translating individual needs into responsive, user-focused web experiences.",
    role: "Designer & Developer",
    tools: "UI/UX Design · Web Development · Client Collaboration",
    image: "/assets/personal-portfolio.png",
    pos: "center",
    fit: "contain",
    categories: ["UI/UX Design", "Web Development"],
  },
  {
    n: "03",
    title: "Claws of Fate",
    type: "Team-Based Fantasy Roguelike Game",
    status: "Featured",
    copy: "Collaborated on a fantasy roguelike game, implementing gameplay systems and pixel-art assets while coordinating tasks, sharing progress, and managing code changes through team development tools.",
    role: "Game Developer · Team Contributor",
    tools: "Game Development · Team Collaboration · Project Coordination",
    image: "/assets/clash-of-fate.png",
    pos: "center",
    fit: "cover",
    categories: ["Game Development", "Project Coordination"],
  },
  {
    n: "04",
    title: "SHPE TXST Website",
    type: "Chapter Website · Frontend Styling & UI Improvements",
    status: "In Progress",
    copy: "Contributing frontend CSS improvements to the SHPE Texas State chapter website, with a focus on layout, visual consistency, and user experience for chapter members and prospective members.",
    role: "Frontend Styling · UI Improvements",
    tools: "UI/UX Design · Web Development · Community",
    image: "/assets/shpe-txst-website.webp",
    pos: "center",
    fit: "cover",
    categories: ["UI/UX Design", "Web Development"],
  },
  {
    n: "05",
    title: "Sepsis Prediction Using LSTM",
    type: "Machine Learning · Healthcare Data",
    status: "Supporting",
    copy: "Developed and evaluated an LSTM model using de-identified ICU data to explore sepsis prediction, documenting model performance and findings in a research report.",
    role: "Machine Learning Research & Modeling",
    tools: "Data & AI · Healthcare Tech",
    image: "/assets/sepsis-prediction.png",
    pos: "center",
    fit: "contain",
    categories: ["Data & AI"],
  },
]

const filters = [
  "All",
  "UI/UX Design",
  "Web Development",
  "Game Development",
  "Data & AI",
  "Project Coordination",
] as const

const interests = [
  {
    icon: "01",
    visual: "F1",
    image: "/assets/family.webp",
    title: "Friends & Family",
    copy: "My biggest supporters and favorite people to spend time with, whether we're going on walks, having family gatherings, or visiting pumpkin patches together.",
  },
  {
    icon: "02",
    visual: "BRICKS",
    image: "/assets/interest-lego.webp",
    title: "LEGO",
    copy: "I love building things piece by piece, and even when a build gets long, the feeling of accomplishment when I finally see the finished result makes it all worth it.",
  },
  {
    icon: "03",
    visual: "MADE BY HAND",
    image: "/assets/interest-crafting.webp",
    title: "Crafting",
    copy: "Crafting helps me relax, clear my mind, and let my creativity run free, especially when I'm making something special for the people I love.",
  },
  {
    icon: "04",
    visual: "PRESS START",
    image: "/assets/interest-formula1.webp",
    title: "Formula 1",
    copy: "I love the mix of data, statistics, and strategy behind every race, the thrill of a good overtake, seeing races in person, and connecting with others who share my passion.",
  },
  {
    icon: "05",
    visual: "WATCH LIST",
    image: "/assets/interest-coffee.webp",
    title: "Coffee Shops",
    copy: "You'll often find me studying or getting work done at a coffee shop, enjoying a good drink and a cozy change of scenery.",
  },
  {
    icon: "06",
    visual: "EDIT MODE",
    image: "/assets/interest-concerts.webp",
    title: "Concerts",
    copy: "I love how music brings strangers together, and I'll listen to just about anything, from K-pop, R&B, pop, and rock to cumbias, norteñas, huapangos, corridos, and Mexican rock.",
  },
  {
    icon: "07",
    visual: "SNOWY.JPG",
    image: "/assets/interest-animals.webp",
    title: "Animals",
    copy: "I can't see a cute animal without immediately going \"AWW so cute!\" and trying to pet it if I get the chance.",
  },
  {
    icon: "08",
    visual: "KIWI + TWEETY",
    image: "/assets/interest-food.webp",
    title: "Food",
    copy: "I love trying new foods, but one of my all-time favorites is the spicy tofu dumpling soup from a local spot in Houston, Texas.",
  },
]

function Camera() {
  const [slide, setSlide] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [flash, setFlash] = useState(false)
  const move = (by: number) =>
    setSlide((slide + by + slides.length) % slides.length)
  const snap = () => {
    setFlash(true)
    setTimeout(() => setFlash(false), 350)
  }
  const current = slides[slide]
  return (
    <div className="camera-wrap" aria-label="Interactive digital camera">
      <div className="camera-top">
        <span>SONY</span>
        <button onClick={snap} className="shutter" aria-label="Take photo">
          <i />
        </button>
        <span>7.2 MEGA PIXELS</span>
      </div>
      <div className="camera">
        <div className="screen">
          <div
            className={`screen-image ${zoom ? "zoomed" : ""}`}
            style={{
              backgroundImage: `url(${current.image})`,
              backgroundPosition: current.position,
            }}
          />
          <div className="screen-ui top">
            <span>AUTO</span>
            <span>▮▮▮ 82%</span>
          </div>
          <div className="screen-copy">
            <span>{current.label}</span>
            <strong>{current.title}</strong>
            <small>{current.copy}</small>
          </div>
          <div className="screen-ui bottom">
            <span>
              {slide + 1}/{slides.length}
            </span>
            <span>2026</span>
          </div>
          <div className={flash ? "flash active" : "flash"} />
        </div>
        <div className="controls">
          <div className="zoom">
            <button onClick={() => setZoom(false)} aria-label="Zoom out">
              W
            </button>
            <button onClick={() => setZoom(true)} aria-label="Zoom in">
              T
            </button>
          </div>
          <div className="dial">
            <span>AUTO</span>
          </div>
          <div className="pad">
            <button onClick={() => move(-1)} aria-label="Previous photo">
              ‹
            </button>
            <button onClick={snap} aria-label="Select">
              OK
            </button>
            <button onClick={() => move(1)} aria-label="Next photo">
              ›
            </button>
          </div>
          <span className="hint">use arrows to explore</span>
        </div>
      </div>
    </div>
  )
}

function Terminal({ close }: { close: () => void }) {
  const [state, setState] = useState<"game" | "success" | "profile">("game")
  const [answer, setAnswer] = useState("")
  const [wrong, setWrong] = useState(false)
  const [hint, setHint] = useState(false)
  const [page, setPage] = useState(0)
  const [openInterest, setOpenInterest] = useState<number | null>(null)
  const [bagItem, setBagItem] =
    useState<
      "headphones" | "lip" | "hoops" | "sanitizer" | "film" | null
    >(null)
  const check = () =>
    answer.replace(/\s/g, "").toLowerCase() === "unlock_profile()"
      ? setState("success")
      : setWrong(true)
  useEffect(() => {
    if (state !== "success") return
    const timer = window.setTimeout(() => setState("profile"), 1700)
    return () => window.clearTimeout(timer)
  }, [state])

  if (state === "profile")
    return (
      <div
        className="personal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
      >
        <article className="personal-profile">
          <header className="profile-bar">
            <div>
              <span className="status-dot" /> PERSONAL_PROFILE / ACCESS GRANTED
            </div>
            <button onClick={close} aria-label="Close personal profile">
              ×
            </button>
          </header>
          <div className="profile-scroll">
            <section className="journal">
              <p className="journal-label">A page from my journal</p>
              <h2 id="profile-title" style={{ fontFamily: "'Fugaz One', sans-serif" }}>
                The person behind the work.
              </h2>
              <div className="journal-paper">
                <span className="page-number">PAGE 0{page + 1} / 03</span>
                {page === 0 && (
                  <>
                    <h3>Where my story begins</h3>
                    <p>
                      Growing up, I learned that life doesn&apos;t always go as
                      planned. Losing my mom when I was seven was one of the
                      hardest experiences of my childhood, and it shaped the way
                      I see the world.
                    </p>
                    <p>
                      It taught me how much the people around us matter and how
                      important it is to appreciate the time we have with them.
                    </p>
                  </>
                )}
                {page === 1 && (
                  <>
                    <h3>Learning to keep going</h3>
                    <p>
                      Growing up in a Mexican-American household, Spanish was
                      the language we spoke at home, and I learned English at
                      school. From a young age, I helped my dad by translating
                      at doctor&apos;s appointments and reading mail. These
                      experiences taught me responsibility and the importance
                      of being there for my family.
                    </p>
                    <p>
                      As a first-generation college student, I&apos;ve had to
                      navigate new experiences and figure things out along the
                      way. My dad&apos;s support has taught me to persevere and
                      keep moving forward, even when the path isn&apos;t clear.
                    </p>
                  </>
                )}
                {page === 2 && (
                  <>
                    <h3>What I carry forward</h3>
                    <p>
                      Sometimes, I look at where I am today and realize that even
                      the version of me from a year ago wouldn&apos;t believe
                      everything I&apos;ve experienced, the opportunities
                      I&apos;ve pursued, or how much I&apos;ve grown.
                    </p>
                    <p>
                      I&apos;m still figuring things out, learning as I go, and
                      discovering what I&apos;m capable of. I want to keep
                      growing, create things I&apos;m proud of, and make the most
                      of the opportunities and relationships that come my way.
                    </p>
                  </>
                )}
                <div className="page-controls">
                  <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                  >
                    ← Previous page
                  </button>
                  <div aria-label={`Page ${page + 1} of 3`}>
                    {[0, 1, 2].map((n) => (
                      <span key={n} className={n === page ? "active" : ""} />
                    ))}
                  </div>
                  <button
                    onClick={() => setPage(Math.min(2, page + 1))}
                    disabled={page === 2}
                  >
                    Next page →
                  </button>
                </div>
              </div>
            </section>
            <section className="interest-section">
              <div className="interest-heading">
                <div>
                  <p className="profile-system-label">
                    DIRECTORY / THINGS_I_LOVE
                  </p>
                  <h3>A few files about me</h3>
                </div>
                <p style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Open a folder to see a little more of who I am today.
                </p>
              </div>
              <div className="interest-grid">
                {interests.map((interest, index) => {
                  const isOpen = openInterest === index
                  return (
                    <button
                      key={interest.title}
                      className={`interest-card ${isOpen ? "open" : ""}`}
                      onClick={() => setOpenInterest(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="folder-tab">{interest.icon}</span>
                      <span
                        className="interest-photo"
                        aria-hidden="true"
                        style={
                          interest.image
                            ? {
                                backgroundImage: `url(${interest.image})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }
                            : undefined
                        }
                      >
                        {!interest.image && <span>{interest.visual}</span>}
                      </span>
                      <span className="folder-title">
                        {interest.title}
                        <b>{isOpen ? "−" : "+"}</b>
                      </span>
                      {isOpen && (
                        <span className="folder-copy">{interest.copy}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </section>
            <section className="bag-section">
              <div className="bag-heading">
                <div>
                  <p className="profile-system-label">
                    POCKET_SCAN / 05 ITEMS FOUND
                  </p>
                  <h3>What&apos;s in My Bag?</h3>
                </div>
                <p>Tap an item to take a closer look.</p>
              </div>
              <div className="bag-items">
                <button onClick={() => setBagItem("headphones")}>
                  <span className="bag-icon bag-photo" aria-hidden="true">
                    <img
                      src="/assets/bag-wired-headphones.webp"
                      alt=""
                    />
                  </span>
                  <span>
                    <strong className="bag-item-title">Wired Headphones</strong>
                    <small
                      style={{ fontFamily: "'Madimi One', sans-serif" }}
                    >
                      A study-session essential
                    </small>
                  </span>
                  <b>OPEN +</b>
                </button>
                <button onClick={() => setBagItem("lip")}>
                  <span
                    className="bag-icon bag-photo bag-photo-stack"
                    aria-hidden="true"
                  >
                    <img src="/assets/bag-black-honey.webp" alt="" />
                    <img src="/assets/bag-honey-talks.webp" alt="" />
                  </span>
                  <span>
                    <strong className="bag-item-title">Lip Combo</strong>
                    <small
                      style={{ fontFamily: "'Madimi One', sans-serif" }}
                    >
                      Honey Talks + 02 Black Honey
                    </small>
                  </span>
                  <b>OPEN +</b>
                </button>
                <button onClick={() => setBagItem("hoops")}>
                  <span className="bag-icon bag-hoops-icon" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                  <span>
                    <strong className="bag-item-title">Hoop Earrings</strong>
                    <small
                      style={{ fontFamily: "'Madimi One', sans-serif" }}
                    >
                      An everyday jewelry favorite
                    </small>
                  </span>
                  <b>OPEN +</b>
                </button>
                <button onClick={() => setBagItem("film")}>
                  <span className="bag-icon" aria-hidden="true">
                    📸
                  </span>
                  <span>
                    <strong className="bag-item-title">Digital Camera</strong>
                    <small
                      style={{ fontFamily: "'Madimi One', sans-serif" }}
                    >
                      Little moments, saved
                    </small>
                  </span>
                  <b>OPEN +</b>
                </button>
              </div>
              <p className="bag-note">packed with care ♡</p>
            </section>
            <div className="profile-exit">
              <p>Thanks for getting to know me beyond the résumé.</p>
              <button className="primary" onClick={close}>
                Return to main portfolio
              </button>
            </div>
          </div>
          {bagItem === "headphones" && (
            <div
              className="mp3-widget"
              role="dialog"
              aria-label="Retro MP3 player"
            >
              <div className="widget-bar">
                <span>MP3_PLAYER.EXE</span>
                <button
                  onClick={() => setBagItem(null)}
                  aria-label="Close MP3 player"
                >
                  ×
                </button>
              </div>
              <img
                className="headphones-photo"
                src="/assets/bag-wired-headphones.webp"
                alt="White wired headphones"
              />
              <div className="mp3-screen">
                <span>TRACK 01</span>
                <strong>Now Playing: Study Beats.</strong>
                <div className="equalizer" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="mp3-controls" aria-hidden="true">
                <span>◀</span>
                <span>▶</span>
                <span>▶▶</span>
              </div>
            </div>
          )}
          {bagItem === "lip" && (
            <div
              className="bag-popover lip-popover"
              role="dialog"
              aria-label="Favorite lip combo"
            >
              <button
                className="bag-close"
                onClick={() => setBagItem(null)}
                aria-label="Close lip combo pop-up"
              >
                ×
              </button>
              <p className="profile-system-label">
                LIP_COMBO / CURRENT FAVORITES
              </p>
              <div className="lip-products">
                <div>
                  <img
                    src="/assets/bag-honey-talks.webp"
                    alt="Honey Talks e.l.f. lip gloss"
                  />
                  <small>e.l.f. Gloss</small>
                  <strong>Honey Talks</strong>
                </div>
                <div>
                  <img
                    src="/assets/bag-black-honey.webp"
                    alt="Clinique Black Honey lip liner"
                  />
                  <small>Clinique Lip Liner</small>
                  <strong>02 Black Honey</strong>
                </div>
              </div>
            </div>
          )}
          {bagItem === "hoops" && (
            <div
              className="bag-popover hoops-popover"
              role="dialog"
              aria-label="Hoop earrings jewelry card"
            >
              <button
                className="bag-close"
                onClick={() => setBagItem(null)}
                aria-label="Close hoop earrings pop-up"
              >
                ×
              </button>
              <div className="jewelry-card">
                <span className="jewelry-hole" aria-hidden="true" />
                <p>EVERYDAY FAVORITES</p>
                <div className="hoop-pair" aria-hidden="true">
                  <i />
                  <i />
                </div>
                <strong>Hoop Earrings</strong>
                <small>simple · classic · goes with everything</small>
              </div>
            </div>
          )}
          {bagItem === "sanitizer" && (
            <div
              className="bag-popover sanitizer-popover"
              role="dialog"
              aria-label="Occasional hand sanitizer"
            >
              <button
                className="bag-close"
                onClick={() => setBagItem(null)}
                aria-label="Close hand sanitizer pop-up"
              >
                ×
              </button>
              <p className="profile-system-label">
                OCCASIONAL_ITEM / POCKET CHECK
              </p>
              <div className="sanitizer-bottle" aria-hidden="true">
                <i />
                <span>CLEAN</span>
              </div>
              <strong>Hand Sanitizer</strong>
              <p className="remember-note">when I remember</p>
            </div>
          )}
          {bagItem === "film" && (
            <div
              className="bag-popover film-popover"
              role="dialog"
              aria-label="Personal photo film strip"
            >
              <button
                className="bag-close"
                onClick={() => setBagItem(null)}
                aria-label="Close film strip"
              >
                ×
              </button>
              <div className="film-title">
                <p className="profile-system-label">FILM_ROLL_01 / DEVELOPED</p>
                <strong>moments &amp; moodboards</strong>
              </div>
              <div className="film-strip">
                <div>
                  <img
                    src="/assets/film-roll-1.webp"
                    alt="Manicure against city lights at dusk"
                  />
                </div>
                <div>
                  <img
                    src="/assets/film-roll-2.webp"
                    alt="Self-portrait reflected in a digital camera screen"
                  />
                </div>
                <div>
                  <img
                    src="/assets/film-roll-3.webp"
                    alt="Snowy city viewed from an airplane window"
                  />
                </div>
                <div>
                  <img
                    src="/assets/film-roll-4.webp"
                    alt="Black and tan dog holding a blue ball"
                  />
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    )

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
    >
      <div className="terminal">
        <div className="terminal-bar">
          <span>system_debug.exe</span>
          <button onClick={close} aria-label="Close terminal">
            ×
          </button>
        </div>
        {state === "game" && (
          <div className="terminal-body">
            <span className="error-code">404_CORE_LOCKED</span>
            <h2 id="terminal-title">
              ACCESS RESTRICTED: Personal profile not found.
            </h2>
            <p>
              Oops! My personal profile has been locked away. Can you help
              restore access?
            </p>
            <p className="mission">
              Your mission: copy the command below into the input box and click
              Run Command. No coding experience needed!
            </p>
            <button
              className="code-line"
              onClick={() => {
                setAnswer("unlock_profile()")
                setWrong(false)
              }}
              aria-label="Copy unlock profile command"
            >
              unlock_profile() <span>click to copy</span>
            </button>
            <label htmlFor="answer">Command input</label>
            <div className="command">
              <span>&gt;</span>
              <input
                id="answer"
                autoFocus
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value)
                  setWrong(false)
                }}
                onKeyDown={(e) => e.key === "Enter" && check()}
                placeholder="Type the command here..."
                autoComplete="off"
              />
            </div>
            {wrong && (
              <p className="wrong" role="alert">
                That command didn’t unlock it—but you’re close! Copy the pink
                command exactly, then try again.
              </p>
            )}
            {hint && (
              <p className="hint-copy">
                Hint: click the pink <strong>unlock_profile()</strong> command
                above to place it in the box for you.
              </p>
            )}
            <div className="terminal-actions">
              <button className="term-primary" onClick={check}>
                Run Command
              </button>
              <button className="term-secondary" onClick={() => setHint(!hint)}>
                Show Hint
              </button>
            </div>
            <button className="term-link" onClick={() => setState("profile")}>
              Skip this challenge
            </button>
          </div>
        )}
        {state === "success" && (
          <div className="terminal-body centered">
            <div className="success-mark">✓</div>
            <p className="green">PROFILE RESTORED</p>
            <h2 id="terminal-title">ACCESS GRANTED! 🎉</h2>
            <p>Personal profile unlocked.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [terminal, setTerminal] = useState(false)
  const [project, setProject] = useState<typeof projects[0] | null>(null)
  const [emailOpen, setEmailOpen] = useState(false)
  const [filter, setFilter] = useState<typeof filters[number]>("All")
  const [secret, setSecret] = useState<"star" | "note" | null>(null)
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [contactStatus, setContactStatus] =
    useState<"idle" | "sending" | "error" | "success">("idle")
  useEffect(() => {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    )
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    document.body.style.overflow =
      terminal || project || emailOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [terminal, project, emailOpen])
  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter((item) => item.categories.includes(filter))
  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
    const isComplete = Object.values(contact).every((value) => value.trim())
    if (!isComplete || !emailIsValid) {
      setContactStatus("error")
      return
    }
    setContactStatus("sending")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          message: contact.message,
        }),
      })
      const result = await res.json()
      if (result.success) {
        setContactStatus("success")
        setContact({ name: "", email: "", subject: "", message: "" })
      } else {
        setContactStatus("error")
      }
    } catch {
      setContactStatus("error")
    }
  }
  return (
    <main>
      <nav aria-label="Primary navigation">
        <a className="brand" href="#home">
          MAGDA<span>.JPG</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <button onClick={() => setTerminal(true)}>404?</button>
          <a className="contact-link" href="#contact">
            Contact
          </a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="eyebrow">MAGDALENA MATA · CREATIVE DEVELOPER</div>
        <div className="hero-grid">
          <div>
            <p className="hello">Welcome to</p>
            <h1>
              Magda’s digital
              <br />
              <em>memory card.</em>
            </h1>
            <p className="lede" style={{ fontFamily: "'Tauri', sans-serif" }}>
              I love bringing ideas to life through code, design, and
              interactive experiences. This is where my projects, creativity,
              and a little bit of me come together.
            </p>
            <div className="hero-actions">
              <a className="primary" href="#work">
                View selected work
              </a>
              <a href="#about">Meet Magda ↓</a>
            </div>
          </div>
          <Camera />
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>
              UI/UX DESIGN ✦ PROJECT MANAGEMENT ✦ CREATIVE TECHNOLOGY ✦ DATA +
              AI ✦
            </span>
            <span>
              UI/UX DESIGN ✦ PROJECT MANAGEMENT ✦ CREATIVE TECHNOLOGY ✦ DATA +
              AI ✦
            </span>
            <span>
              UI/UX DESIGN ✦ PROJECT MANAGEMENT ✦ CREATIVE TECHNOLOGY ✦ DATA +
              AI ✦
            </span>
            <span>
              UI/UX DESIGN ✦ PROJECT MANAGEMENT ✦ CREATIVE TECHNOLOGY ✦ DATA +
              AI ✦
            </span>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="section-tag">01 / ABOUT ME</div>
        <button
          className="note-sticker"
          onClick={() => setSecret(secret === "note" ? null : "note")}
          aria-expanded={secret === "note"}
        >
          open note
        </button>
        {secret === "note" && (
          <div className="scrap-note" role="status">
            <button onClick={() => setSecret(null)} aria-label="Close note">
              ×
            </button>
            <strong>tiny fact:</strong>
            I’m fascinated by the strategy and engineering behind Formula 1.
          </div>
        )}
        <div className="about-grid">
          <div className="polaroid">
            <div className="portrait" />
            <span>magda, in her element ‹3</span>
          </div>
          <div className="about-copy">
            <h2>
              Equal parts logic
              <br />& <em>imagination.</em>
            </h2>
            <p style={{ fontFamily: "'Manrope', sans-serif" }}>
              I’m Magdalena Mata, but you can call me Magda. I’m a Computer
              Science student at <strong>Texas State University</strong>,
              concentrating in Computer Engineering with a minor in Data
              Analytics.
            </p>
            <p style={{ fontFamily: "'Manrope', sans-serif" }}>
              I’m naturally curious and enjoy figuring out how things work,
              exploring new ideas, and finding ways to make them useful. Whether
              I’m working independently or with a team, I value thoughtful
              problem-solving, clear communication, and learning along the way.
            </p>
            <div className="chips">
              <span>UI/UX</span>
              <span>React</span>
              <span>Figma</span>
              <span>Data</span>
              <span>Agile</span>
            </div>
          </div>
          <aside>
            <span className="aside-label">CURRENT STATUS</span>
            <strong>
              Open to 2026-2027
              <br />
              internships
            </strong>
            <i />
            <span className="aside-label">BASED IN</span>
            <p>San Marcos, TX</p>
          </aside>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-tag">02 / SELECTED WORK</div>
        <div className="work-head">
          <h2>
            Case studies &<br />
            <em>experiments.</em>
          </h2>
          <p style={{ fontFamily: "'Manrope', sans-serif" }}>
            A mix of systems thinking, pixel pushing, and problem solving.
          </p>
        </div>
        <div className="filter-wrap">
          <span>FILTER THE PHOTO BOX</span>
          <div className="project-filters" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="scrapbook-shell">
          <span className="tape tape-one" aria-hidden="true" />
          <span className="doodle-heart" aria-hidden="true">
            ♡
          </span>
          <button
            className="secret-star"
            onClick={() => setSecret(secret === "star" ? null : "star")}
            aria-label="A tiny pink star"
            aria-expanded={secret === "star"}
          >
            ★
          </button>
          {secret === "star" && (
            <div className="secret-message" role="status">
              you found me! ★
            </div>
          )}
          <div className="project-grid" aria-live="polite">
            {visibleProjects.map((p, index) => (
              <button
                className={`project-card project-card-${index + 1} ${
                  p.status === "Supporting" ? "project-card-supporting" : ""
                }`}
                key={p.n}
                onClick={() => setProject(p)}
              >
                <span className="photo-tape" aria-hidden="true" />
                <div
                  className="project-image"
                  style={{
                    backgroundImage: `url(${p.image})`,
                    backgroundPosition: p.pos,
                    backgroundSize: p.fit,
                    backgroundColor:
                      p.fit === "contain" ? "var(--paper)" : undefined,
                  }}
                >
                  <span>{p.n}</span>
                </div>
                <div className="project-info">
                  <small>
                    {p.status} · {p.type}
                  </small>
                  <h3>{p.title}</h3>
                  <p>{p.copy}</p>
                  <div>
                    <span>{p.role}</span>
                    <b>↗</b>
                  </div>
                </div>
              </button>
            ))}
            {visibleProjects.length === 0 && (
              <div className="empty-album">
                <span>EMPTY POCKET / FOR NOW</span>
                <strong>No scrapbook pages in this category yet.</strong>
                <p>I’ll add personal photographs here when they’re ready.</p>
              </div>
            )}
          </div>
          <p className="gallery-caption">
            click a photo to open the full story ↗
          </p>
        </div>
      </section>

      <button
        className="glitch-trigger"
        onClick={() => setTerminal(true)}
        aria-label="Inspect the hidden 404 system"
      >
        <span>!</span>
        <div>
          <strong style={{ fontFamily: "'Prata', serif" }}>
            Something looks off...
          </strong>
          <small style={{ fontFamily: "'Manrope', sans-serif" }}>
            Click to inspect system
          </small>
        </div>
        <b>404_CORE_LOCKED</b>
      </button>

      <section className="contact" id="contact">
        <div className="contact-layout">
          <div className="contact-intro">
            <span className="section-tag">03 / SAY HELLO</span>
            <p>Have a thoughtful idea?</p>
            <h2>
              Let’s make
              <br />
              <em>something good.</em>
            </h2>
            <div className="contact-actions">
              <button type="button" onClick={() => setEmailOpen(true)}>
                Email me ↗
              </button>
              <a
                href="https://www.linkedin.com/in/magdalena-mata"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={submitContact} noValidate>
            <span className="form-tape" aria-hidden="true" />
            <p className="form-label">NEW_MESSAGE.TXT</p>
            <div className="form-row">
              <label>
                Name
                <input
                  value={contact.name}
                  onChange={(e) => {
                    setContact({ ...contact, name: e.target.value })
                    setContactStatus("idle")
                  }}
                  autoComplete="name"
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => {
                    setContact({ ...contact, email: e.target.value })
                    setContactStatus("idle")
                  }}
                  autoComplete="email"
                  required
                />
              </label>
            </div>
            <label>
              Subject
              <input
                value={contact.subject}
                onChange={(e) => {
                  setContact({ ...contact, subject: e.target.value })
                  setContactStatus("idle")
                }}
                required
              />
            </label>
            <label>
              Message
              <textarea
                value={contact.message}
                onChange={(e) => {
                  setContact({ ...contact, message: e.target.value })
                  setContactStatus("idle")
                }}
                rows={5}
                required
              />
            </label>
            {contactStatus === "error" && (
              <p className="form-feedback error" role="alert">
                Please complete every field with a valid email, then try again.
              </p>
            )}
            {contactStatus === "success" && (
              <p className="form-feedback success" role="status">
                Thanks! Your message was sent.
              </p>
            )}
            <button className="send-button" type="submit" disabled={contactStatus === "sending"}>
              {contactStatus === "sending" ? "Sending..." : "Send Message ↗"}
            </button>
          </form>
        </div>
        <footer>
          <span>Designed & coded with care by Magdalena Mata</span>
          <a href="#home">Back to top ↑</a>
        </footer>
      </section>

      {terminal && <Terminal close={() => setTerminal(false)} />}
      {emailOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="email-dialog-title"
          onClick={() => setEmailOpen(false)}
        >
          <div className="email-popover" onClick={(event) => event.stopPropagation()}>
            <button
              className="case-close"
              type="button"
              onClick={() => setEmailOpen(false)}
              aria-label="Close email popup"
            >
              ×
            </button>
            <p className="section-tag">EMAIL_CONTACT.TXT</p>
            <h2 id="email-dialog-title">Let&apos;s connect.</h2>
            <a href="mailto:codedbymagda@gmail.com">
              codedbymagda@gmail.com
            </a>
          </div>
        </div>
      )}
      {project && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="case-modal">
            <button
              className="case-close"
              onClick={() => setProject(null)}
              aria-label="Close case study"
            >
              ×
            </button>
            <span>
              {project.status} · {project.type}
            </span>
            <h2>{project.title}</h2>
            <p className="case-lede">{project.copy}</p>
            <div
              className="case-visual"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundPosition: project.pos,
                backgroundSize: project.fit,
                backgroundColor:
                  project.fit === "contain" ? "var(--paper)" : undefined,
              }}
            />
            <div className="case-details">
              <div>
                <small>MY ROLE</small>
                <p>{project.role}</p>
              </div>
              <div>
                <small>PROJECT AREAS</small>
                <p>{project.tools}</p>
              </div>
              <div>
                <small>STATUS</small>
                <p>{project.status}</p>
              </div>
            </div>
            {project.title === "BurnoutWatch" && (
              <div className="case-story">
                <section>
                  <p className="case-story-label">PROJECT OVERVIEW</p>
                  <h3>BurnoutWatch — AI Healthcare Hackathon</h3>
                  <p>
                    BurnoutWatch is a healthcare application concept focused on
                    monitoring potential burnout through shift patterns,
                    overtime, and recovery trends. Developed during a 36-hour AI
                    hackathon, the project explored how technology could help
                    make burnout-related patterns more visible to healthcare
                    professionals.
                  </p>
                  <dl className="case-facts">
                    <div>
                      <dt>My Role</dt>
                      <dd>Frontend Developer</dd>
                    </div>
                    <div>
                      <dt>Team</dt>
                      <dd>Two active contributors across Texas and Nepal</dd>
                    </div>
                    <div>
                      <dt>Duration</dt>
                      <dd>36 hours</dd>
                    </div>
                  </dl>
                </section>

                <section>
                  <h3>The Challenge</h3>
                  <p style={{ marginInline: 0, textAlign: "left" }}>
                    Our original three-person team became a two-person team when
                    one teammate dropped out at the last minute and ultimately
                    did not contribute. With a 36-hour deadline, we had to
                    adjust our workload, reprioritize features, and find a way
                    to keep development moving.
                  </p>
                  <p style={{ marginInline: 0, textAlign: "left" }}>
                    We also worked across a significant time-zone difference
                    between Texas and Nepal. Coordinating our schedules
                    sometimes meant working with very little sleep. To maintain
                    progress, we planned tasks around each other&apos;s
                    availability, identified what needed to be completed next,
                    and left work or clear next steps for the other person to
                    pick up when they woke up.
                  </p>
                </section>

                <section>
                  <h3>My Contributions</h3>
                  <ul>
                    <li>
                      Built five interactive frontend screens supporting the
                      application&apos;s core workflows.
                    </li>
                    <li>
                      Implemented interface experiences for check-ins and status
                      tracking.
                    </li>
                    <li>
                      Contributed to the camera-based stress detection
                      interface.
                    </li>
                    <li>
                      Adapted priorities and responsibilities with my teammate
                      after our team lost a contributor.
                    </li>
                    <li>
                      Coordinated work asynchronously across Texas and Nepal,
                      planning tasks around overlapping availability and
                      handoffs between work sessions.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3>Designing for Different Healthcare Roles</h3>
                  <p>
                    We considered the perspectives of different people involved
                    in healthcare, including nurses and managers. Rather than
                    treating every user as having the same needs, we explored
                    how their responsibilities and interactions with
                    burnout-related information could differ.
                  </p>
                  <p>
                    This helped shape our thinking around the
                    application&apos;s workflows and how information could be
                    presented to different users.
                  </p>
                </section>

                <section>
                  <h3>Outcome</h3>
                  <p>
                    Although we did not win the hackathon, our project received
                    a mention. Our two-person team continued working through the
                    unexpected staffing change, time-zone constraints, and tight
                    deadline to deliver our project.
                  </p>
                </section>

                <section>
                  <h3>What I Learned</h3>
                  <p>
                    This experience strengthened my ability to adapt to changing
                    project constraints, coordinate work asynchronously,
                    communicate across time zones, and prioritize essential
                    features under pressure. It also reinforced the importance
                    of considering different stakeholders when designing
                    technology for complex environments like healthcare.
                  </p>
                </section>
              </div>
            )}
            {project.title === "Freelance Web Design & Development" && (
              <div className="case-story">
                <section>
                  <p className="case-story-label">PROJECT OVERVIEW</p>
                  <h3>Freelance Web Design &amp; Development</h3>
                  <p>
                    Since August 2023, I&apos;ve designed and developed five or
                    more websites for small businesses, portfolios, and local
                    shops. My work combines Figma wireframing with custom
                    frontend development using HTML, CSS, and JavaScript.
                  </p>
                  <p>
                    Each project is tailored to the client&apos;s preferences,
                    goals, and desired visual style. Rather than settling on an
                    initial design, I work back and forth with clients to
                    understand their feedback, refine design choices, and move
                    toward a result that reflects their vision.
                  </p>
                  <dl className="case-facts">
                    <div>
                      <dt>My Role</dt>
                      <dd>Freelance Web Designer &amp; Developer</dd>
                    </div>
                    <div>
                      <dt>Project Type</dt>
                      <dd>Client Websites</dd>
                    </div>
                    <div>
                      <dt>Duration</dt>
                      <dd>August 2023 – Present</dd>
                    </div>
                  </dl>
                </section>

                <section>
                  <h3>The Challenge</h3>
                  <p>
                    Every client has different preferences, goals, and
                    expectations. The challenge is to translate those ideas into
                    a functional website while balancing visual appeal,
                    usability, technical constraints, and the client&apos;s
                    desired outcome.
                  </p>
                </section>

                <section>
                  <h3>My Design &amp; Collaboration Process</h3>
                  <ol>
                    <li>
                      <strong>Requirements Gathering</strong>
                      <p>
                        I work with clients to understand the purpose of their
                        website, their preferred visual style, the information
                        they want to communicate, and the experience they want
                        visitors to have.
                      </p>
                    </li>
                    <li>
                      <strong>Wireframing &amp; Visual Planning</strong>
                      <p>
                        I use Figma to plan page layouts and organize content
                        before development, creating a foundation for reviewing
                        the structure and overall direction.
                      </p>
                    </li>
                    <li>
                      <strong>Iterative Design &amp; Client Feedback</strong>
                      <p>
                        I maintain an ongoing feedback loop with clients,
                        sharing progress, discussing design choices, and
                        refining layouts based on their preferences. This
                        iterative approach helps align the final product with
                        the client&apos;s expectations.
                      </p>
                    </li>
                    <li>
                      <strong>Frontend Development</strong>
                      <p>
                        I translate approved design directions into working
                        websites using HTML, CSS, and JavaScript, focusing on
                        layout, visual consistency, functionality, and
                        responsive behavior where applicable.
                      </p>
                    </li>
                    <li>
                      <strong>Refinement &amp; Delivery</strong>
                      <p>
                        I review the website, address feedback, and refine the
                        implementation before delivering the final work
                        according to the agreed project requirements and
                        timeline.
                      </p>
                    </li>
                  </ol>
                </section>

                <section>
                  <h3>Skills Demonstrated</h3>
                  <ul>
                    <li>
                      <strong>Requirements gathering:</strong> Understanding
                      client goals and preferences before making design
                      decisions.
                    </li>
                    <li>
                      <strong>Stakeholder communication:</strong> Maintaining
                      an ongoing dialogue to clarify expectations and review
                      progress.
                    </li>
                    <li>
                      <strong>User-centered design:</strong> Considering how the
                      intended audience will navigate and use the website.
                    </li>
                    <li>
                      <strong>Wireframing &amp; prototyping:</strong> Using Figma
                      to plan and communicate layouts.
                    </li>
                    <li>
                      <strong>Iterative design:</strong> Refining the experience
                      through feedback and revisions.
                    </li>
                    <li>
                      <strong>Frontend development:</strong> Translating visual
                      concepts into functional web interfaces.
                    </li>
                    <li>
                      <strong>Expectation management:</strong> Aligning design
                      choices, project scope, and deliverables with client
                      needs.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3>What I Learned</h3>
                  <p>
                    Freelance work has taught me that good design is not just
                    about creating something visually appealing. It also
                    requires listening carefully, asking clarifying questions,
                    communicating trade-offs, and iterating until the solution
                    aligns with the client&apos;s goals.
                  </p>
                  <p>
                    These experiences have strengthened my interest in UI/UX
                    design and in the coordination required to move a project
                    from an initial idea to a finished deliverable.
                  </p>
                </section>
              </div>
            )}
            {project.title === "Claws of Fate" && (
              <div className="case-story">
                <section>
                  <p className="case-story-label">PROJECT OVERVIEW</p>
                  <h3>Claws of Fate — Team-Based 2D Pixel-Art Roguelike</h3>
                  <p>
                    Claws of Fate is a 2D fantasy roguelike developed in Godot
                    4.5 as a team project. Our team created the pixel-art assets
                    ourselves rather than relying on AI-generated artwork,
                    while implementing gameplay systems and coordinating
                    development through Jira and Git-based collaboration.
                  </p>
                  <dl className="case-facts">
                    <div>
                      <dt>My Roles</dt>
                      <dd>
                        Game Developer, UI/UX Contributor, Team Collaborator
                      </dd>
                    </div>
                    <div>
                      <dt>Tools</dt>
                      <dd>
                        Godot 4.5, Jira, Git, GitKraken, Bitbucket, Adobe
                        Illustrator
                      </dd>
                    </div>
                    <div>
                      <dt>Duration &amp; Workload</dt>
                      <dd>
                        August–December 2025 · Approximately 10–20+ hours per
                        week
                      </dd>
                    </div>
                  </dl>
                </section>

                <section>
                  <h3>Project Planning &amp; Agile Workflow</h3>
                  <p>
                    We organized development into weekly work cycles, using Jira
                    to plan and prioritize tasks based on importance, estimated
                    effort, and project needs.
                  </p>
                  <ul>
                    <li>
                      <strong>Sprint planning:</strong> Discussed upcoming work,
                      identified necessary features, and prioritized larger or
                      more critical tasks.
                    </li>
                    <li>
                      <strong>Task estimation:</strong> Estimated work at
                      approximately 10–20 hours per week or more, depending on
                      project demands, to help plan individual workloads.
                    </li>
                    <li>
                      <strong>Weekly goals:</strong> Established at least 3
                      tasks to complete by the end of each week.
                    </li>
                    <li>
                      <strong>Progress discussions:</strong> Participated in
                      regular team standups to share updates, discuss blockers,
                      and coordinate next steps.
                    </li>
                    <li>
                      <strong>Iterative development:</strong> Broke the game
                      into manageable features and refined the implementation as
                      development progressed.
                    </li>
                    <li>
                      <strong>Code reviews &amp; integration:</strong>{" "}
                      Frequently submitted and reviewed pull requests, provided
                      feedback to teammates, and merged branches to integrate
                      changes into the shared codebase.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3>My Development Contributions</h3>
                  <ul>
                    <li>
                      Programmed 7+ game features and systems, including the
                      main menu, item shop, item bar, character movement, and
                      item pickup/drop mechanics.
                    </li>
                    <li>
                      Created original pixel-art character and item assets using
                      Adobe Illustrator.
                    </li>
                    <li>
                      Implemented interactions between game assets and character
                      movement.
                    </li>
                    <li>
                      Contributed through version-controlled branches and pull
                      requests, reviewing changes and helping integrate team
                      contributions.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3>UI/UX Design Contributions</h3>
                  <p>
                    I also considered how the game&apos;s interface would affect
                    the player experience.
                  </p>
                  <ul>
                    <li>
                      Worked on the main menu layout and visual presentation to
                      make the game inviting and easy to navigate.
                    </li>
                    <li>
                      Considered where key gameplay elements, including the
                      minimap and item bar, should appear in the main game
                      interface.
                    </li>
                    <li>
                      Balanced interface placement with gameplay visibility and
                      access to important information.
                    </li>
                    <li>
                      Contributed feedback on the interface and iterated
                      alongside gameplay development.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3>What I Learned</h3>
                  <p>
                    This project gave me hands-on experience connecting
                    Agile-style planning with technical implementation. I
                    learned how effort estimation, prioritization, weekly goals,
                    code reviews, and frequent integration can help a team
                    coordinate work across interconnected features.
                  </p>
                  <p>
                    It also helped me understand that UI/UX decisions in games
                    involve more than appearance: layout and information
                    placement can directly influence how players interact with
                    the game.
                  </p>
                </section>
              </div>
            )}
            {project.title === "SHPE TXST Website" && (
              <div className="case-story">
                <section>
                  <p className="case-story-label">PROJECT OVERVIEW</p>
                  <h3>SHPE TXST Website — Frontend Styling &amp; UX Improvements</h3>
                  <p>
                    I&apos;m contributing frontend CSS improvements to the
                    Society of Hispanic Professional Engineers (SHPE) Texas
                    State University chapter website, which serves a community
                    of 70+ active members.
                  </p>
                  <p>
                    The goal is to create a more cohesive, intentional visual
                    experience while making important chapter information
                    easier to find for current members, prospective members, and
                    potential sponsors.
                  </p>
                  <dl className="case-facts">
                    <div>
                      <dt>My Role</dt>
                      <dd>Frontend CSS Contributor</dd>
                    </div>
                    <div>
                      <dt>Audience</dt>
                      <dd>
                        70+ active chapter members, prospective members, and
                        sponsors
                      </dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>
                        In Progress; publication planned for next semester
                      </dd>
                    </div>
                  </dl>
                </section>

                <section>
                  <h3>The Challenge</h3>
                  <p>
                    The website needs to communicate the chapter&apos;s identity
                    while making essential information accessible. I want to
                    move away from a generic, AI-generated visual feel and
                    toward a more intentional design that reflects the
                    organization and its community.
                  </p>
                </section>

                <section>
                  <h3>Project Goals</h3>
                  <ul>
                    <li>
                      Improve visual consistency, layout, typography, and
                      spacing.
                    </li>
                    <li>
                      Make chapter calendar events easier for members to find.
                    </li>
                    <li>
                      Clarify how prospective members can join SHPE TXST.
                    </li>
                    <li>
                      Organize sponsor and donor information so visitors can
                      find it more easily.
                    </li>
                    <li>
                      Improve the overall information hierarchy and usability
                      of the website.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3>My Contributions</h3>
                  <ul>
                    <li>
                      Developing frontend CSS changes to refine the
                      website&apos;s visual presentation.
                    </li>
                    <li>
                      Working toward consistent styling and layout across the
                      areas within my scope.
                    </li>
                    <li>
                      Considering how visual hierarchy and page organization
                      affect information discovery.
                    </li>
                    <li>
                      Focusing on the needs of current members and prospective
                      visitors when evaluating interface improvements.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3>Current Status</h3>
                  <p>
                    My updated version is still in progress and has not yet been
                    published. I plan to document the implemented changes
                    through before-and-after screenshots and evaluate the final
                    experience after publication.
                  </p>
                </section>

                <section>
                  <h3>What I Hope to Achieve</h3>
                  <p>
                    I want to help create a chapter website that feels more
                    representative of SHPE TXST while giving its 70+ members and
                    prospective members a clearer path to events, membership
                    information, and sponsorship opportunities.
                  </p>
                </section>
              </div>
            )}
            {project.title === "Sepsis Prediction Using LSTM" && (
              <div className="case-story">
                <section>
                  <p className="case-story-label">PROJECT OVERVIEW</p>
                  <h3>Sepsis Prediction Using LSTM</h3>
                  <p>
                    This machine learning project explored the use of a Long
                    Short-Term Memory (LSTM) neural network to predict sepsis
                    using sequential data from the MIMIC-IV Clinical Database
                    Demo.
                  </p>
                  <p>
                    The project used 11,121 de-identified ICU clinical samples,
                    with 6 time steps and 6 features as model inputs. I trained
                    and evaluated the model and documented the findings in a
                    research report.
                  </p>
                  <dl className="case-facts">
                    <div>
                      <dt>My Role</dt>
                      <dd>Machine Learning Research &amp; Modeling</dd>
                    </div>
                    <div>
                      <dt>Dataset</dt>
                      <dd>MIMIC-IV Clinical Database Demo</dd>
                    </div>
                    <div>
                      <dt>Model</dt>
                      <dd>LSTM Neural Network</dd>
                    </div>
                  </dl>
                </section>

                <section>
                  <h3>The Goal</h3>
                  <p>
                    Investigate whether sequential clinical data could support
                    sepsis prediction and evaluate model performance using
                    multiple classification metrics.
                  </p>
                </section>

                <section>
                  <h3>My Contributions</h3>
                  <ul>
                    <li>
                      Worked with 11,121 de-identified ICU clinical samples.
                    </li>
                    <li>
                      Used 6 time steps and 6 features as inputs to the LSTM
                      model.
                    </li>
                    <li>
                      Trained and evaluated the model using AUC, recall, and
                      false-positive rate.
                    </li>
                    <li>
                      Documented the methodology, evaluation results, and
                      findings in a research report.
                    </li>
                  </ul>
                </section>

                <section>
                  <h3>Model Evaluation</h3>
                  <p>
                    The model achieved an AUC of 0.86, a recall of 45.8%, and a
                    false-positive rate of 4.66%.
                  </p>
                  <p>
                    The results illustrate why machine learning evaluation
                    requires more than one metric. Although the AUC indicates
                    the model could distinguish between classes reasonably well
                    in the evaluated data, the recall shows that the model
                    identified only 45.8% of the actual positive cases at the
                    selected operating threshold.
                  </p>
                  <p>
                    The relatively low recall is an important limitation: the
                    model missed a substantial proportion of positive cases,
                    making further investigation and improvement necessary
                    before considering any practical clinical application.
                  </p>
                </section>

                <section>
                  <h3>What I Learned</h3>
                  <p>
                    This project strengthened my understanding of sequential
                    modeling, clinical data analysis, and model evaluation. It
                    also reinforced the importance of communicating limitations
                    clearly, especially in healthcare applications where missed
                    positive cases can have serious consequences.
                  </p>
                </section>
              </div>
            )}
            <button className="primary" onClick={() => setProject(null)}>
              Back to all work
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
