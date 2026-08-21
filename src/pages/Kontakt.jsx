const Kontakt = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-amber-900 pt-24">

      {/* HERO */}
      <section className="bg-amber-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <p className="text-amber-200 uppercase tracking-[0.25em] text-sm mb-3">
            Kontakt
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Na vizitoni në Mobileria ERDI
          </h1>

          <p className="max-w-2xl mx-auto text-amber-100 text-lg leading-relaxed">
            Jeni të mirëseardhur në showroom-in tonë.
            Ejani të shihni nga afër koleksionin tonë dhe të gjeni
            zgjidhjen perfekte për shtëpinë tuaj.
          </p>

        </div>
      </section>


      {/* LOCATION + HOURS */}
      <section className="max-w-6xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LOCATION */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

            <div className="bg-amber-100 h-64 flex items-center justify-center">
              <div className="text-center">

                <div className="text-7xl mb-3">
                  📍
                </div>

                <p className="text-amber-900 font-bold text-xl">
                  Komogllav, Ferizaj
                </p>

                <p className="text-gray-600 mt-1">
                  Kosovë
                </p>

              </div>
            </div>

            <div className="p-8">

              <p className="text-amber-700 uppercase tracking-widest text-sm font-semibold mb-2">
                Lokacioni ynë
              </p>

              <h2 className="text-3xl font-bold mb-4">
                Na gjeni në Komogllav
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                Vizitoni showroom-in e Mobileria ERDI dhe shikoni
                produktet tona nga afër.
              </p>

              <a
                href="https://maps.apple.com/?ll=42.328005%2C21.255429&q=R-122&t=h"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-900 transition"
              >
                📍 Hap lokacionin në Maps
              </a>

            </div>

          </div>


          {/* ORARI */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">

            <p className="text-amber-700 uppercase tracking-widest text-sm font-semibold mb-2">
              Orari
            </p>

            <h2 className="text-3xl font-bold mb-8">
              Kur mund të na vizitoni?
            </h2>


            <div className="space-y-5">

              {/* E HËNË - E SHTUNË */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-5">
                <div>
                  <p className="font-semibold text-gray-800">
                    E Hënë – E Shtunë
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Orari i rregullt
                  </p>
                </div>

                <span className="font-bold text-amber-800">
                  08:00 – 18:00
                </span>
              </div>


              {/* E DIELË */}
              <div className="flex justify-between items-center pb-2">
                <div>
                  <p className="font-semibold text-gray-800">
                    E Dielë
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Pushim
                  </p>
                </div>

                <span className="font-bold text-red-500">
                  Mbyllur
                </span>
              </div>

            </div>


            {/* KONTAKT */}
            <div className="mt-10 bg-amber-50 rounded-2xl p-6">

              <h3 className="text-xl font-bold mb-2">
                Keni ndonjë pyetje?
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Na kontaktoni direkt dhe ekipi ynë do t'ju ndihmojë
                me çdo informacion që ju nevojitet.
              </p>


              <div className="space-y-3 mb-5">

                {/* TELEFONI */}
                <a
                  href="tel:+38344233321"
                  className="flex items-center gap-3 text-gray-700 hover:text-amber-800 transition"
                >
                  <span className="text-xl">📞</span>

                  <span className="font-semibold">
                    +383 44 233 321
                  </span>
                </a>


                {/* EMAIL */}
                <a
                  href="mailto:erdiosmani233@gmail.com"
                  className="flex items-center gap-3 text-gray-700 hover:text-amber-800 transition"
                >
                  <span className="text-xl">✉️</span>

                  <span className="font-semibold">
                    erdiosmani233@gmail.com
                  </span>
                </a>

              </div>


              <div className="flex flex-col sm:flex-row gap-3">

                <a
                  href="tel:+38344233321"
                  className="flex-1 text-center bg-amber-800 text-white px-5 py-3 rounded-xl font-semibold hover:bg-amber-900 transition"
                >
                  📞 Na telefono
                </a>

                <a
                  href="mailto:erdiosmani233@gmail.com"
                  className="flex-1 text-center border border-amber-800 text-amber-800 px-5 py-3 rounded-xl font-semibold hover:bg-white transition"
                >
                  ✉️ Na shkruani
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="bg-white border-t border-gray-100 py-14">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <div className="text-5xl mb-5">
            🏠
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ju presim në showroom!
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-7">
            Shikoni nga afër produktet tona, diskutoni idetë tuaja
            dhe gjeni mobiliet që i përshtaten hapësirës suaj.
          </p>

          <a
            href="https://maps.apple.com/?ll=42.328005%2C21.255429&q=R-122&t=h"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-800 text-white px-7 py-3 rounded-xl font-semibold hover:bg-amber-900 transition"
          >
            📍 Na gjeni në Maps
          </a>

        </div>

      </section>

    </main>
  );
};

export default Kontakt;