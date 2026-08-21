import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 sm:pt-12 pb-6">

      <div className="container mx-auto px-4 sm:px-6">

        {/* KOLONAT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-8">

          {/* KOLONA 1 */}
          <div className="text-center sm:text-left">

            <h3 className="text-xl font-bold text-amber-500 mb-4">
              Mobileria ERDI
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
              Zgjidhje moderne dhe elegante për mobilimin e shtëpisë tuaj.
              Cilësi e garantuar, dizajn i përkryer.
            </p>

          </div>


          {/* KOLONA 2 */}
          <div className="text-center sm:text-left">

            <h4 className="font-semibold mb-4 text-amber-400">
              KATEGORITË
            </h4>

            <ul className="space-y-2 text-gray-400 text-sm">

              <li>
                <Link
                  to="/kuzhina"
                  className="hover:text-amber-400 transition"
                >
                  Kuzhina
                </Link>
              </li>

              <li>
                <Link
                  to="/tavolina"
                  className="hover:text-amber-400 transition"
                >
                  Tavolina
                </Link>
              </li>

              <li>
                <Link
                  to="/komoda"
                  className="hover:text-amber-400 transition"
                >
                  Komoda
                </Link>
              </li>

              <li>
                <Link
                  to="/divane"
                  className="hover:text-amber-400 transition"
                >
                  Divane
                </Link>
              </li>

            </ul>

          </div>


          {/* KOLONA 3 - KONTAKT */}
          <div className="text-center sm:text-left">

            <h4 className="font-semibold mb-4 text-amber-400">
              KONTAKT
            </h4>

            <ul className="space-y-3 text-gray-400 text-sm">

              <li>
                <a
                  href="https://maps.apple.com/?ll=42.328005%2C21.255429&q=R-122&t=h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition inline-block break-words"
                >
                  📍 Komogllav, Ferizaj, Kosovë
                </a>
              </li>

              <li>
                <a
                  href="tel:+38344233321"
                  className="hover:text-amber-400 transition inline-block"
                >
                  📞 +383 44 233 321
                </a>
              </li>

              <li>
                <a
                  href="mailto:erdiosmani233@gmail.com"
                  className="hover:text-amber-400 transition inline-block break-all"
                >
                  ✉️ erdiosmani233@gmail.com
                </a>
              </li>

            </ul>

          </div>


          {/* KOLONA 4 - ORARI */}
          <div className="text-center sm:text-left">

            <h4 className="font-semibold mb-4 text-amber-400">
              ORARI
            </h4>

            <ul className="space-y-2 text-gray-400 text-sm">

              <li>
                E Hënë — E Shtunë:
                <span className="text-white ml-1 block sm:inline">
                  08:00 — 18:00
                </span>
              </li>

              <li className="text-red-400">
                E Dielë: Mbyllur
              </li>

            </ul>

          </div>

        </div>


        {/* LINE */}
        <hr className="border-gray-800 mb-6" />


        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-gray-400 text-sm text-center md:text-left">

          <p>
            © 2026 Mobileria ERDI. Të gjitha të drejtat e rezervuara.
          </p>

          <Link
            to="/kontakt"
            className="hover:text-amber-400 transition"
          >
            Na kontaktoni →
          </Link>

        </div>

      </div>

    </footer>
  );
};

export default Footer;