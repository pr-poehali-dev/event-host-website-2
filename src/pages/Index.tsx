import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const GoldDivider = () => (
  <div className="flex items-center gap-4 my-2">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold" />
    <span className="text-gold text-lg">✦</span>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold" />
  </div>
);

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const FadeSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const services = [
  { icon: "Heart", title: "Свадьбы", desc: "Организую ваш главный день с безупречным вниманием к каждой детали — от декора до тайминга." },
  { icon: "Star", title: "Юбилеи", desc: "Создаю торжества, которые остаются в памяти на десятилетия. Камерные и масштабные форматы." },
  { icon: "Briefcase", title: "Корпоративы", desc: "Профессиональные мероприятия для вашего бизнеса: презентации, тимбилдинг, гала-ужины." },
  { icon: "Sparkles", title: "Частные вечеринки", desc: "Изысканные вечера в узком кругу — стиль, атмосфера и сервис премиального уровня." },
  { icon: "Camera", title: "Фотосессии", desc: "Организую профессиональные съёмки с подбором локации, стилиста и команды." },
  { icon: "Gift", title: "Особые случаи", desc: "Помолвки, baby shower, выпускные — любой повод превращаю в незабываемое событие." },
];

const portfolio = [
  { year: "2024", title: "Свадьба в Венеции", guests: "120 гостей", desc: "Канальные гондолы, флорентийский декор, живая музыка" },
  { year: "2024", title: "Корпоратив Сбер", guests: "500 гостей", desc: "Гала-ужин в Большом Театре, авторская программа" },
  { year: "2023", title: "Юбилей 50 лет", guests: "80 гостей", desc: "Белый зал Ritz, живой оркестр, дресс-код black tie" },
  { year: "2023", title: "Выставка украшений", guests: "300 гостей", desc: "Частный вернисаж, cocktail reception, пресс-материалы" },
];

const testimonials = [
  { name: "Анна М.", event: "Свадьба", text: "Наталья создала мечту. Каждая деталь была продумана до мелочей — мы просто наслаждались своим днём, не думая ни о чём. Профессионализм высшего класса." },
  { name: "Дмитрий К.", event: "Корпоратив", text: "Наше мероприятие прошло безупречно. Гости до сих пор вспоминают этот вечер. Наталья — редкий специалист, который действительно слышит клиента." },
  { name: "Елена В.", event: "Юбилей", text: "Я не ожидала, что организатор сможет так точно уловить атмосферу, которую я хотела. Это было магически красиво. Рекомендую всем без исключения." },
];

export default function Index() {
  const [formData, setFormData] = useState({ name: "", phone: "", event: "", message: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-obsidian text-champagne font-montserrat overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-obsidian/95 backdrop-blur-sm border-b border-gold/20" : ""}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-cormorant text-xl text-gold tracking-[0.2em] uppercase">
            Наталья
          </div>
          <div className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase text-champagne/70">
            {[["hero","Главная"],["about","О мне"],["services","Услуги"],["portfolio","Портфолио"],["reviews","Отзывы"],["contact","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-gold transition-colors duration-300">{label}</button>
            ))}
          </div>
          <button className="md:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-charcoal border-t border-gold/20 px-6 py-4 flex flex-col gap-4 text-xs tracking-[0.2em] uppercase">
            {[["hero","Главная"],["about","О мне"],["services","Услуги"],["portfolio","Портфолио"],["reviews","Отзывы"],["contact","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-champagne/70 hover:text-gold transition-colors">{label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-charcoal to-obsidian" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            className="text-xs tracking-[0.5em] uppercase text-gold mb-8"
            style={{ animation: "fadeUp 0.8s ease 0.2s both" }}
          >
            Организатор мероприятий
          </div>
          <h1
            className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-6 text-champagne"
            style={{ animation: "fadeUp 0.8s ease 0.4s both" }}
          >
            Наталья
          </h1>
          <div
            className="flex items-center justify-center gap-4 mb-8"
            style={{ animation: "fadeUp 0.8s ease 0.55s both" }}
          >
            <div className="w-20 h-px bg-gold" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-cormorant italic">premium events</span>
            <div className="w-20 h-px bg-gold" />
          </div>
          <p
            className="text-champagne/60 text-lg font-light leading-relaxed max-w-xl mx-auto mb-12 tracking-wide"
            style={{ animation: "fadeUp 0.8s ease 0.7s both" }}
          >
            Превращаю ваши мечты в незабываемые события. Свадьбы, корпоративы и частные торжества на высшем уровне.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fadeUp 0.8s ease 0.85s both" }}
          >
            <button
              onClick={() => scrollTo("contact")}
              className="px-10 py-4 bg-gold text-obsidian text-xs tracking-[0.3em] uppercase font-montserrat font-medium hover:bg-gold-light transition-all duration-300 hover:scale-105"
            >
              Обсудить мероприятие
            </button>
            <button
              onClick={() => scrollTo("portfolio")}
              className="px-10 py-4 border border-gold/50 text-gold text-xs tracking-[0.3em] uppercase font-montserrat hover:border-gold hover:bg-gold/5 transition-all duration-300"
            >
              Посмотреть работы
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-gold/50" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <FadeSection>
            <div className="relative">
              <div className="w-full aspect-[3/4] bg-charcoal border border-gold/20 relative overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl font-cormorant text-gold italic">Н</span>
                  </div>
                  <div className="text-champagne/30 text-xs tracking-widest uppercase">Ваше фото</div>
                </div>
                <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-gold/40" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-gold/40" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-charcoal border border-gold/30 p-6 text-center">
                <div className="font-cormorant text-4xl text-gold font-light">8+</div>
                <div className="text-xs tracking-widest uppercase text-champagne/50 mt-1">лет опыта</div>
              </div>
            </div>
          </FadeSection>

          <FadeSection delay={0.2}>
            <div>
              <div className="text-xs tracking-[0.4em] uppercase text-gold mb-4">О Наталье</div>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light text-champagne leading-tight mb-6">
                Искусство<br /><em>идеального</em><br />события
              </h2>
              <GoldDivider />
              <p className="text-champagne/60 leading-relaxed mt-6 mb-4 text-sm tracking-wide">
                Я создаю мероприятия, которые живут в памяти годами. За 8 лет работы я организовала более 200 событий — от камерных ужинов до масштабных корпоративных вечеров.
              </p>
              <p className="text-champagne/60 leading-relaxed mb-8 text-sm tracking-wide">
                Мой подход — это полное погружение в ваш проект. Я беру на себя всё: концепцию, поиск площадки, работу с подрядчиками, тайминг и присутствие в день события. Вы просто наслаждаетесь.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[["200+", "Мероприятий"], ["98%", "Довольных клиентов"], ["15+", "Городов"]].map(([num, label]) => (
                  <div key={label} className="border-l border-gold/30 pl-4">
                    <div className="font-cormorant text-3xl text-gold font-light">{num}</div>
                    <div className="text-xs text-champagne/40 tracking-wider uppercase mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6 bg-charcoal/50">
        <div className="max-w-6xl mx-auto">
          <FadeSection className="text-center mb-20">
            <div className="text-xs tracking-[0.4em] uppercase text-gold mb-4">Чем я занимаюсь</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-champagne">Услуги</h2>
            <GoldDivider />
          </FadeSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
            {services.map((s, i) => (
              <FadeSection key={s.title} delay={i * 0.1}>
                <div className="bg-obsidian p-10 group hover:bg-charcoal transition-all duration-500 h-full">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300">
                    <Icon name={s.icon as "Heart" | "Star" | "Briefcase" | "Sparkles" | "Camera" | "Gift"} size={20} className="text-gold" />
                  </div>
                  <h3 className="font-cormorant text-2xl text-champagne mb-3 group-hover:text-gold transition-colors duration-300">{s.title}</h3>
                  <p className="text-champagne/50 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-6 w-8 h-px bg-gold/30 group-hover:w-16 group-hover:bg-gold transition-all duration-500" />
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeSection className="text-center mb-20">
            <div className="text-xs tracking-[0.4em] uppercase text-gold mb-4">Избранные проекты</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-champagne">Портфолио</h2>
            <GoldDivider />
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolio.map((p, i) => (
              <FadeSection key={p.title} delay={i * 0.15}>
                <div className="border border-gold/20 p-8 hover:border-gold/50 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-500" />
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs tracking-widest text-gold/60 uppercase">{p.year}</span>
                    <span className="text-xs text-champagne/30 tracking-widest">{p.guests}</span>
                  </div>
                  <h3 className="font-cormorant text-3xl text-champagne mb-3 group-hover:text-gold transition-colors duration-300">{p.title}</h3>
                  <p className="text-champagne/50 text-sm">{p.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-gold/50 group-hover:text-gold transition-colors duration-300">
                    <span className="text-xs tracking-widest uppercase">Подробнее</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-32 px-6 bg-charcoal/50">
        <div className="max-w-6xl mx-auto">
          <FadeSection className="text-center mb-20">
            <div className="text-xs tracking-[0.4em] uppercase text-gold mb-4">Что говорят клиенты</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-champagne">Отзывы</h2>
            <GoldDivider />
          </FadeSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeSection key={t.name} delay={i * 0.15}>
                <div className="p-8 border border-gold/15 hover:border-gold/40 transition-all duration-500 relative">
                  <div className="font-cormorant text-6xl text-gold/20 absolute top-4 left-6 leading-none">"</div>
                  <p className="text-champagne/70 text-sm leading-relaxed mb-8 pt-6 italic font-cormorant text-base">
                    {t.text}
                  </p>
                  <div className="border-t border-gold/20 pt-4">
                    <div className="font-montserrat text-sm font-medium text-champagne">{t.name}</div>
                    <div className="text-gold text-xs tracking-widest uppercase mt-1">{t.event}</div>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-gold text-xs">★</span>)}
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeSection className="text-center mb-16">
            <div className="text-xs tracking-[0.4em] uppercase text-gold mb-4">Начнём?</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-champagne">Связаться</h2>
            <GoldDivider />
            <p className="text-champagne/50 mt-6 text-sm leading-relaxed max-w-md mx-auto">
              Расскажите о вашем мероприятии — я свяжусь с вами в течение 24 часов для обсуждения деталей
            </p>
          </FadeSection>

          <FadeSection delay={0.2}>
            <div className="border border-gold/20 p-10 md:p-14">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs tracking-widest uppercase text-gold/70 block mb-2">Ваше имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Елена Смирнова"
                    className="w-full bg-transparent border-b border-gold/30 pb-3 text-champagne placeholder-champagne/20 text-sm focus:outline-none focus:border-gold transition-colors duration-300 tracking-wide"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-gold/70 block mb-2">Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full bg-transparent border-b border-gold/30 pb-3 text-champagne placeholder-champagne/20 text-sm focus:outline-none focus:border-gold transition-colors duration-300 tracking-wide"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="text-xs tracking-widest uppercase text-gold/70 block mb-2">Тип мероприятия</label>
                <input
                  type="text"
                  value={formData.event}
                  onChange={e => setFormData({...formData, event: e.target.value})}
                  placeholder="Свадьба, корпоратив, юбилей..."
                  className="w-full bg-transparent border-b border-gold/30 pb-3 text-champagne placeholder-champagne/20 text-sm focus:outline-none focus:border-gold transition-colors duration-300 tracking-wide"
                />
              </div>
              <div className="mb-10">
                <label className="text-xs tracking-widest uppercase text-gold/70 block mb-2">Расскажите подробнее</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="Дата, место, количество гостей, пожелания..."
                  className="w-full bg-transparent border-b border-gold/30 pb-3 text-champagne placeholder-champagne/20 text-sm focus:outline-none focus:border-gold transition-colors duration-300 resize-none tracking-wide"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <button className="w-full sm:w-auto px-14 py-4 bg-gold text-obsidian text-xs tracking-[0.3em] uppercase font-montserrat font-medium hover:bg-gold-light transition-all duration-300 hover:scale-105">
                  Отправить заявку
                </button>
                <div className="flex gap-6 text-champagne/30">
                  <a href="#" className="hover:text-gold transition-colors duration-300 text-xs tracking-widest uppercase">Instagram</a>
                  <a href="#" className="hover:text-gold transition-colors duration-300 text-xs tracking-widest uppercase">Telegram</a>
                  <a href="#" className="hover:text-gold transition-colors duration-300 text-xs tracking-widest uppercase">WhatsApp</a>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-cormorant text-2xl text-gold tracking-[0.2em] uppercase">Наталья</div>
          <div className="text-xs text-champagne/20 tracking-widest">
            © 2024 · Организатор мероприятий · Москва
          </div>
          <div className="flex gap-6 text-xs tracking-widest uppercase text-champagne/30">
            <span>Premium Events</span>
            <span className="text-gold/30">✦</span>
            <span>Since 2016</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
