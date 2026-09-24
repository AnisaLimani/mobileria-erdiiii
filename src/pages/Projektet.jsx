import React, { useCallback, useEffect, useState } from 'react';
import { API_URL, SITE_BASE_URL, UPLOADS_BASE_URL } from '../config';

const Projektet = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_URL}/get_projects.php`
      );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status}`
        );
      }

      const data = await response.json();

      console.log('Projects from API:', data);

      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
      } else {
        setProjects([]);
      }

    } catch (err) {
      console.error('Error fetching projects:', err);

      setError(
        'Nuk mund të ngarkohen projektet.'
      );

      setProjects([]);

    } finally {
      setLoading(false);
    }
  }, []);

  // ================================
  // LOAD PROJECTS
  // ================================
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ================================
  // IMAGE URL
  // ================================
  const getImageUrl = (image) => {
    if (!image) {
      return '';
    }

    if (
      image.startsWith('http://') ||
      image.startsWith('https://')
    ) {
      return image;
    }

    if (image.startsWith('/')) {
      return `${SITE_BASE_URL}${image}`;
    }

    return `${UPLOADS_BASE_URL}/${image}`;
  };

  // ================================
  // NEXT SLIDE
  // ================================
  const nextSlide = useCallback(() => {
    if (
      isTransitioning ||
      projects.length <= 1
    ) {
      return;
    }

    setIsTransitioning(true);

    setActiveIndex(
      (prev) => (prev + 1) % projects.length
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning, projects.length]);

  // ================================
  // PREVIOUS SLIDE
  // ================================
  const prevSlide = () => {
    if (
      isTransitioning ||
      projects.length <= 1
    ) {
      return;
    }

    setIsTransitioning(true);

    setActiveIndex(
      (prev) =>
        (prev - 1 + projects.length) %
        projects.length
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // ================================
  // GO TO SLIDE
  // ================================
  const goToSlide = (index) => {
    if (
      isTransitioning ||
      index === activeIndex
    ) {
      return;
    }

    setIsTransitioning(true);

    setActiveIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // ================================
  // AUTO SLIDE
  // ================================
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (projects.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [
    activeIndex,
    nextSlide,
    projects.length,
    isTransitioning
  ]);

  // ================================
  // LOADING
  // ================================
  if (loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-500">
            Duke ngarkuar projektet...
          </p>

        </div>

      </main>
    );
  }

  // ================================
  // ERROR
  // ================================
  if (error) {
    return (
      <main className="bg-white min-h-screen">

        <section className="py-16 text-center">

          <span className="text-sm text-slate-400 uppercase tracking-[0.2em]">
            Portofolio
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Projektet tona
          </h1>

          <p className="text-red-600 mt-5">
            {error}
          </p>

          <button
            onClick={fetchProjects}
            className="mt-5 bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition"
          >
            Provo përsëri
          </button>

        </section>

      </main>
    );
  }

  // ================================
  // NO PROJECTS
  // ================================
  if (projects.length === 0) {
    return (
      <main className="bg-white min-h-screen">

        <section className="py-16 text-center">

          <span className="text-sm text-slate-400 uppercase tracking-[0.2em]">
            Portofolio
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Projektet tona
          </h1>

          <p className="text-slate-600 mt-4">
            Nuk ka projekte të shtuara akoma.
          </p>

        </section>

      </main>
    );
  }

  // ================================
  // MAIN PAGE
  // ================================
  return (
    <main className="bg-white text-slate-800">

      {/* =================================
          HERO
      ================================= */}

      <section className="py-12 md:py-16 bg-slate-50 text-center border-b border-slate-200">

        <div className="max-w-3xl mx-auto px-6">

          <span className="text-sm font-medium text-slate-400 uppercase tracking-[0.2em]">
            Portofolio
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-3">
            Projektet tona
          </h1>

          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Ide të bukura për shtëpinë tuaj
          </p>

        </div>

      </section>


      {/* =================================
          PROJECT SLIDER
      ================================= */}

      <section className="py-10 md:py-14 bg-slate-100">

        <div className="max-w-5xl mx-auto px-6">

          {/* MAIN IMAGE */}

          <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">

            <div className="relative h-[400px] md:h-[500px]">

              <img
                src={getImageUrl(
                  projects[activeIndex].image
                )}
                alt={
                  projects[activeIndex].title
                }
                className={`w-full h-full object-cover transition-all duration-600 ${
                  isTransitioning
                    ? 'opacity-70 scale-105'
                    : 'opacity-100 scale-100'
                }`}
                onError={(e) => {
                  console.error(
                    'FOTO NUK U GJET:',
                    getImageUrl(
                      projects[activeIndex].image
                    )
                  );
                }}
              />


              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">

                  {/* NUMBER */}

                  <div className="flex items-center gap-2 mb-2">

                    <span className="text-xs font-medium text-amber-400 uppercase tracking-[0.2em]">
                      Projekti{' '}
                      {String(
                        activeIndex + 1
                      ).padStart(2, '0')}
                    </span>

                    <span className="text-amber-400/50">
                      /
                    </span>

                    <span className="text-xs text-white/50">
                      {String(
                        projects.length
                      ).padStart(2, '0')}
                    </span>

                  </div>


                  {/* TITLE */}

                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">

                    {
                      projects[
                        activeIndex
                      ].title
                    }

                  </h2>


                  {/* DESCRIPTION */}

                  <p className="text-white/80 text-base md:text-lg max-w-2xl mb-4">

                    {
                      projects[
                        activeIndex
                      ].description
                    }

                  </p>


                  {/* TAGS */}

                  <div className="flex flex-wrap gap-2">

                    {Array.isArray(
                      projects[
                        activeIndex
                      ].tags
                    ) &&
                      projects[
                        activeIndex
                      ].tags.map(
                        (tag, index) => (

                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-white/10 text-white text-sm backdrop-blur-sm border border-white/10"
                          >
                            {tag}
                          </span>

                        )
                      )}

                  </div>

                </div>

              </div>


              {/* =================================
                  LEFT BUTTON
              ================================= */}

              {projects.length > 1 && (

                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition flex items-center justify-center text-2xl z-10"
                >
                  ‹
                </button>

              )}


              {/* =================================
                  RIGHT BUTTON
              ================================= */}

              {projects.length > 1 && (

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition flex items-center justify-center text-2xl z-10"
                >
                  ›
                </button>

              )}


              {/* =================================
                  DOTS
              ================================= */}

              {projects.length > 1 && (

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">

                  {projects.map(
                    (_, index) => (

                      <button
                        key={index}
                        onClick={() =>
                          goToSlide(index)
                        }
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index ===
                          activeIndex
                            ? 'w-8 bg-white'
                            : 'w-2.5 bg-white/40 hover:bg-white/60'
                        }`}
                      />

                    )
                  )}

                </div>

              )}

            </div>

          </div>


          {/* =================================
              THUMBNAILS
          ================================= */}

          {projects.length > 1 && (

            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 justify-center">

              {projects.map(
                (project, index) => (

                  <button
                    key={
                      project.id ||
                      index
                    }
                    onClick={() =>
                      goToSlide(index)
                    }
                    className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index ===
                      activeIndex
                        ? 'border-slate-900 scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >

                    <img
                      src={getImageUrl(
                        project.image
                      )}
                      alt={
                        project.title
                      }
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(
                          'THUMBNAIL NUK U GJET:',
                          getImageUrl(
                            project.image
                          )
                        );
                      }}
                    />

                    {index ===
                      activeIndex && (

                      <div className="absolute inset-0 bg-slate-900/20"></div>

                    )}

                  </button>

                )
              )}

            </div>

          )}

        </div>

      </section>

    </main>
  );
};

export default Projektet;