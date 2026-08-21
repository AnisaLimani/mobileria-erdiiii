import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const Home = () => {
  const categories = [
    {
      name: 'Kuzhina',
      path: '/kuzhina',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      textColor: 'text-amber-700',
      desc: 'Shiko koleksionet e mobiljeve për kuzhina moderne.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
          <path d="M3 10V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
          <line x1="9" y1="6" x2="9" y2="10" />
          <line x1="15" y1="6" x2="15" y2="10" />
          <line x1="8" y1="16" x2="16" y2="16" />
        </svg>
      )
    },
    {
      name: 'Tavolina',
      path: '/tavolina',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      textColor: 'text-blue-600',
      desc: 'Shiko koleksionet e mobiljeve për tavolina ngrënie.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18" />
          <path d="M3 12v6" />
          <path d="M21 12v6" />
          <path d="M6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" />
          <line x1="12" y1="18" x2="12" y2="12" />
        </svg>
      )
    },
    {
      name: 'Komoda',
      path: '/komoda',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      textColor: 'text-purple-600',
      desc: 'Shiko koleksionet e komodave për dhomën e gjumit.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
          <line x1="4" y1="10" x2="20" y2="10" />
          <line x1="4" y1="16" x2="20" y2="16" />
          <line x1="12" y1="10" x2="12" y2="16" />
        </svg>
      )
    },
    {
      name: 'Divane',
      path: '/divane',
      bg: 'bg-pink-50',
      border: 'border-pink-100',
      textColor: 'text-pink-600',
      desc: 'Shiko koleksionet e divaneve për dhomën e ndenjjes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
          <path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2" />
          <path d="M4 7h16" />
          <path d="M4 11h16" />
          <path d="M8 15v4" />
          <path d="M16 15v4" />
        </svg>
      )
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Kategoritë */}
      <section className="py-20 bg-[#fdfbf4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-widest mb-3">
              Kategoritë Tona
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Gjej mobiljet që i përshtaten stilit tuaj
            </h3>
            <p className="text-lg text-slate-600">
              Zgjidhni një kategori për të zbuluar mobilje modernë, komode dhe të hartuara për çdo dhomë.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <Link
                key={index}
                to={cat.path}
                className={`group ${cat.bg} rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer border ${cat.border}`}
              >
                <div className="w-20 h-20 mx-auto flex items-center justify-center mb-6 bg-white/70 rounded-2xl shadow-sm group-hover:bg-white group-hover:shadow-md group-hover:scale-110 transition duration-300 text-slate-800">
                  {cat.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-800 mb-2">{cat.name}</h4>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed px-2">
                  {cat.desc}
                </p>
                <span className={`inline-block ${cat.textColor} font-semibold text-sm group-hover:translate-x-2 transition-transform`}>
                  Shiko më shumë &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Transporti */}
      <section className="py-16 bg-[#fdfbf4]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
            📦 Dërgojmë mobilje kudo në Evropë
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Jo vetëm në Kosovë — Mobileria ERDI transporton mobilje edhe jashtë shtetit. 
            Ne kujdesemi për paketimin, transportin dhe montimin në destinacionin tuaj.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {['Kosovë 🇽🇰', 'Shqipëri 🇦🇱', 'Maqedoni 🇲🇰', 'Gjermani 🇩🇪', 
              'Zvicër 🇨🇭', 'Austri 🇦🇹', 'Itali 🇮🇹', 'Suedi 🇸🇪'].map(country => (
              <div key={country} className="bg-white p-3 rounded-lg shadow-md text-sm font-medium hover:shadow-lg transition">
                {country}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link 
              to="/kontakt" 
              className="inline-block bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition transform hover:scale-105"
            >
              📞 Na Kontaktoni - +383 44 233 321
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;