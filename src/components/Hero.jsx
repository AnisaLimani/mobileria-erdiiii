import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative text-center px-4 sm:px-6 max-w-4xl z-10">

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-lg">
          MOBILERIA <span className="text-amber-400">ERDI</span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 font-light drop-shadow-lg">
          Mobilje Moderne për Shtëpinë Tuaj
        </p>

        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Zbuloni koleksionin tonë të kujdesur me dorë, mobilje që kombinojnë
          elegancën me komoditetin për çdo ambient të shtëpisë suaj.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">

          <Link
            to="/kuzhina"
            className="w-full sm:w-auto bg-amber-700 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition transform hover:scale-105 shadow-lg font-semibold"
          >
            Shiko Koleksionin
          </Link>

          <Link
            to="/kontakt"
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full hover:bg-white/20 transition transform hover:scale-105 border-2 border-white/50 shadow-lg font-semibold"
          >
            Na Kontaktoni
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;