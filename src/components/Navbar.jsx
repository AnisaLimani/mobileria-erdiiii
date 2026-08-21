import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const API_URL = 'http://localhost/mobileria-api/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const location = useLocation();

  // =========================================
  // FETCH CATEGORIES FROM DATABASE
  // =========================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_URL}/get_categories.php`
        );

        if (!response.ok) {
          throw new Error(
            `API error: ${response.status}`
          );
        }

        const data = await response.json();

        if (
          data.success &&
          Array.isArray(data.categories)
        ) {
          setCategories(data.categories);
        } else {
          console.error(
            'Invalid categories response:',
            data
          );
        }
      } catch (error) {
        console.error(
          'Error fetching categories:',
          error
        );
      }
    };

    fetchCategories();
  }, []);

  // =========================================
  // OLD CATEGORIES
  // KEEP OLD URLS
  // =========================================

  const oldCategoryPaths = {
    Kuzhina: '/kuzhina',
    Tavolina: '/tavolina',
    Komoda: '/komoda',
    Divane: '/divane'
  };

  // =========================================
  // GET CATEGORY URL
  // =========================================

  const getCategoryPath = (category) => {
    // Nëse është kategori e vjetër,
    // përdorim URL-në që e ke pasur.
    if (oldCategoryPaths[category.name]) {
      return oldCategoryPaths[category.name];
    }

    // Kategoritë e reja marrin URL dinamike.
    return `/kategori/${category.id}`;
  };

  // =========================================
  // STATIC LINKS
  // =========================================

  const mainLinks = [
    {
      to: '/',
      label: 'Kryefaqja'
    }
  ];

  // =========================================
  // CATEGORY LINKS
  // =========================================

  const categoryLinks = categories.map(
    (category) => ({
      to: getCategoryPath(category),
      label: category.name
    })
  );

  // =========================================
  // OTHER LINKS
  // =========================================

  const otherLinks = [
    {
      to: '/projektet',
      label: 'Projektet'
    },
    {
      to: '/kontakt',
      label: 'Kontakt'
    }
  ];

  // =========================================
  // ALL LINKS
  // =========================================

  const links = [
    ...mainLinks,
    ...categoryLinks,
    ...otherLinks
  ];

  // =========================================
  // ACTIVE LINK
  // =========================================

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-50 max-w-7xl mx-auto">

      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/70 rounded-2xl sm:rounded-3xl shadow-xl px-4 py-3 sm:px-6 sm:py-5">

        {/* =====================================
            TOP BAR
        ===================================== */}

        <div className="flex items-center justify-between w-full">

          {/* LOGO */}

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-2.5 sm:gap-3 text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-amber-800 hover:text-amber-900 transition duration-300"
          >

            <img
              src="/images/logo.png"
              alt="Mobileria ERDI"
              className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-amber-200 shadow-sm"
            />

            <span className="whitespace-nowrap">
              Mobileria ERDI
            </span>

          </Link>


          {/* =====================================
              DESKTOP MENU
          ===================================== */}

          <div className="hidden min-[901px]:flex items-center gap-5 lg:gap-7 text-sm lg:text-base font-medium text-slate-700">

            {links.map((link) => (

              <Link
                key={link.to}
                to={link.to}
                className={`relative py-2 transition-all duration-300 ${
                  isActive(link.to)
                    ? 'text-amber-700 font-semibold'
                    : 'hover:text-amber-700'
                }`}
              >

                {link.label}

                {/* ACTIVE LINE */}

                {isActive(link.to) && (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-amber-700 rounded-full"></span>
                )}

              </Link>

            ))}

          </div>


          {/* =====================================
              MOBILE BUTTON
          ===================================== */}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Hap menunë"
            aria-expanded={isOpen}
            className={`min-[901px]:hidden flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 ${
              isOpen
                ? 'bg-amber-700 border-amber-700 text-white rotate-90'
                : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
            }`}
          >

            {isOpen ? (

              <span className="text-xl leading-none">
                ✕
              </span>

            ) : (

              <div className="flex flex-col gap-1.5">

                <span className="block w-5 h-0.5 bg-current rounded-full"></span>

                <span className="block w-5 h-0.5 bg-current rounded-full"></span>

                <span className="block w-3.5 h-0.5 bg-current rounded-full ml-auto"></span>

              </div>

            )}

          </button>

        </div>


        {/* =====================================
            MOBILE MENU
        ===================================== */}

        <div
          className={`min-[901px]:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-[800px] opacity-100 mt-4 pt-3 border-t border-slate-200'
              : 'max-h-0 opacity-0 mt-0 pt-0'
          }`}
        >

          <div className="flex flex-col gap-1.5">

            {links.map((link, index) => (

              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-amber-50 text-amber-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-amber-700'
                }`}
              >

                <div className="flex items-center gap-3">

                  {/* NUMBER */}

                  <span
                    className={`text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center ${
                      isActive(link.to)
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-700'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span>
                    {link.label}
                  </span>

                </div>


                {/* ARROW */}

                <span
                  className={`text-lg transition-transform duration-200 ${
                    isActive(link.to)
                      ? 'text-amber-700 translate-x-0'
                      : 'text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1'
                  }`}
                >
                  →
                </span>

              </Link>

            ))}

          </div>


          {/* =====================================
              MOBILE BOTTOM
          ===================================== */}

          <div className="mt-4 pt-3 border-t border-slate-100">

            <p className="text-center text-xs text-slate-400 tracking-wide">
              MOBILERIA{' '}
              <span className="text-amber-600 font-semibold">
                ERDI
              </span>
            </p>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;