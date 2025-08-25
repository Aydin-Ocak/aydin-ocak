
export default function Hero() {
  return (
    <section className="hero-field h-dvh bg-bodyColor">
      <div className="container mx-auto max-w-[1720px] px-[30px] h-full">
        <div className="wrapper h-full text-textColor flex-center">
          <div className="relative">
            <div className="absolute-full bg-primary/10 rounded-full blur-2xl"></div>
          <h1 className="clamp-text-[24,65] ">Hello, <span className="font-sansita text-primary">NextJs!</span></h1>
          </div>
        </div>
      </div>
    </section>
  );
}
