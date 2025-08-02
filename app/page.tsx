
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    setTimeout(observeElements, 100);
    setTimeout(observeElements, 500);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      project_type: formData.get('project_type'),
      message: formData.get('message'),
      to_email: 'swizzerprod@gmail.com'
    };

    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      if (!publicKey || !serviceId || !templateId) {
        throw new Error('Variables d\'environnement EmailJS manquantes');
      }

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        project_type: data.project_type,
        message: data.message,
        reply_to: data.email,
        time: new Date().toLocaleString('fr-FR')
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setSubmitStatus('success');

      if (e.currentTarget) {
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Erreur détaillée EmailJS:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        <section
          id="hero"
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ zIndex: -1 }}
            >
              <source src="/logo-swizzer_1080p/logo-Swizzer_1080p-60fps.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="absolute inset-0 bg-black/70"></div>
          <div className="relative z-10 container mx-auto px-6">
            <div className="w-full max-w-2xl scroll-animate">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Un montage fluide, efficace et adapté à votre audience
              </h1>
              <button
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg shadow-cyan-500/25"
              >
                Voir mes Projets
              </button>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <h2 className="text-4xl font-bold text-white mb-6">À Propos de Moi</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Passionné par l'art du montage vidéo depuis plusieux années, je transforme vos idées en histoires visuelles.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                <div className="order-2 lg:order-1 scroll-animate slide-left">
                  <div className="mb-8">
                    <span className="inline-block bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      Mon expertise
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-6">
                      Une approche créative et technique
                    </h3>
                    <p className="text-xl text-gray-300 leading-relaxed mb-6">
                      Avec plus de 3 années d'expérience dans l'industrie audiovisuelle, je me spécialise dans la création de contenus vidéo qui marquent les esprits. Mon approche combine technique de pointe et sensibilité artistique pour transformer vos idées en récits visuels captivants.
                    </p>
                    <p className="text-gray-300 leading-relaxed mb-8">
                      Que ce soit pour un mariage intime, un documentaire engagé, ou une campagne corporate, je m'investis pleinement dans chaque projet pour créer des œuvres qui dépassent les attentes. Ma philosophie : chaque histoire mérite d'être racontée avec excellence.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-colors scroll-animate">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-lg mr-3">
                          <i className="ri-scissors-line text-cyan-400 text-lg"></i>
                        </div>
                        <h4 className="font-semibold text-white">Montage Expert</h4>
                      </div>
                      <p className="text-gray-300 text-sm">Maîtrise avancée d'Adobe Premiere Pro, Final Cut Pro et DaVinci Resolve</p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-purple-500/30 transition-colors scroll-animate">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-lg mr-3">
                          <i className="ri-palette-line text-purple-400 text-lg"></i>
                        </div>
                        <h4 className="font-semibold text-white">Direction Artistique</h4>
                      </div>
                      <p className="text-gray-300 text-sm">Vision créative et esthétique pour sublimer vos contenus</p>
                    </div>
                  </div>
                </div>

                <div className="relative order-1 lg:order-2 scroll-animate slide-right">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src="/logo-swizzer_1080p/logo-swizzer_couleurs_1080p.png"
                      alt="Alex - Video Editor"
                      className="w-full h-96 lg:h-[500px] object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/30 transition-colors scroll-animate slide-left">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-lg mb-4">
                    <i className="ri-graduation-cap-line text-2xl text-cyan-400"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Formation</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-base font-semibold text-white mb-1">-</h5>
                      <p className="text-gray-300 text-sm">-</p>
                    </div>
                    <div>
                      <h5 className="text-base font-semibold text-white mb-1">Certification Adobe</h5>
                      <p className="text-gray-300 text-sm">Certification professionnelle Adobe • Premiere Pro, After Effects</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-500/30 transition-colors scroll-animate slide-right">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-lg mb-4">
                    <i className="ri-briefcase-line text-2xl text-purple-400"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Expérience</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-base font-semibold text-white mb-1">+3 années d'expérience</h5>
                      <p className="text-gray-300 text-sm">Dans l'industrie audiovisuelle • Depuis 2022</p>
                    </div>
                    <div>
                      <h5 className="text-base font-semibold text-white mb-1">+30 projets réalisés</h5>
                      <p className="text-gray-300 text-sm">Vidéos Youtube, podcasts, documentaires • 100% satisfaction client</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='services' className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-4xl font-bold text-white mb-6">Mes Services de Montage Vidéo</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Je propose une gamme complète de services de montage vidéo pour donner vie à vos projets, du montage basique aux effets avancés.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-800 scroll-animate slide-left">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-xl mr-4">
                    <i className="ri-film-line text-3xl text-cyan-400"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Montage Vidéo</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start scroll-animate">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Montage Basique</h4>
                      <p className="text-gray-300 text-sm">Assemblage, découpage et synchronisation avec transitions fluides et effets de base.</p>
                    </div>
                  </div>

                  <div className="flex items-start scroll-animate">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Montage Avancé</h4>
                      <p className="text-gray-300 text-sm">Montage complexe avec motion graphics, effets visuels et synchronisation multi-caméras.</p>
                    </div>
                  </div>

                  <div className="flex items-start scroll-animate">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Étalonnage Couleur</h4>
                      <p className="text-gray-300 text-sm">Correction et amélioration des couleurs avec un étalonnage professionnel.</p>
                    </div>
                  </div>

                  <div className="flex items-start scroll-animate">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Design Sonore</h4>
                      <p className="text-gray-300 text-sm">Mixage audio, effets sonores et musique de fond pour une qualité optimale.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-800 scroll-animate slide-right">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-xl mr-4">
                    <i className="ri-settings-3-line text-3xl text-purple-400"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Post-Production</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start scroll-animate">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Encodage Vidéo</h4>
                      <p className="text-gray-300 text-sm">Optimisation pour différentes plateformes et appareils avec les meilleurs formats.</p>
                    </div>
                  </div>

                  <div className="flex items-start scroll-animate">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Sous-titrage</h4>
                      <p className="text-gray-300 text-sm">Ajout de sous-titres et légendes pour rendre votre contenu accessible.</p>
                    </div>
                  </div>

                  <div className="flex items-start scroll-animate">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Conversion de Formats</h4>
                      <p className="text-gray-300 text-sm">Conversion entre différents formats pour assurer la compatibilité.</p>
                    </div>
                  </div>

                  <div className="flex items-start scroll-animate">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Livraison & Distribution</h4>
                      <p className="text-gray-300 text-sm">Préparation et livraison de vos vidéos sur les plateformes désirées.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 mb-16 border border-gray-800">
              <div className="text-center mb-12 scroll-animate">
                <h3 className="text-3xl font-bold text-white mb-4">Services Spécialisés</h3>
                <p className="text-gray-200 text-lg max-w-2xl mx-auto">
                  Des services sur mesure pour vos projets spécifiques, adaptés à vos besoins et votre secteur d'activité.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors group scroll-animate">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-cyan-400/30 group-hover:to-blue-500/30 transition-colors">
                    <i className="ri-file-text-line text-3xl text-cyan-400"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Montage de vidéos Youtube</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                  Création de vidéos dynamiques pour YouTube, formats courts, interviews et contenus engageants.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors group scroll-animate">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-400/30 group-hover:to-purple-500/30 transition-colors">
                    <i className="ri-building-line text-3xl text-blue-400"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Montage documentaire</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                  Création de récits captivants à partir de séquences brutes pour vos documentaires.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors group scroll-animate">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-xl mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-400/30 group-hover:to-pink-500/30 transition-colors">
                    <i className="ri-calendar-event-line text-3xl text-purple-400"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Podcast</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                  Nettoyage audio, découpage précis et habillage dynamique pour des podcasts vidéo fluides et engageants.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors group scroll-animate">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-pink-500/20 to-rose-600/20 rounded-xl mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-pink-400/30 group-hover:to-rose-500/30 transition-colors">
                    <i className="ri-mic-2-line text-3xl text-pink-400"></i>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">Vidéo Corporate</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                  Création de vidéos professionnelles pour entreprises, formations et présentations.

                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-4xl font-bold text-white mb-6">Mes Derniers Projets</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Découvrez une sélection de mes créations récentes, alliant technique et créativité pour donner vie à des histoires uniques.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 mb-12">
              <div className="lg:col-span-8 group cursor-pointer scroll-animate">
                <a href="https://www.youtube.com/watch?v=zTaxhA-QTU0" target="_blank" rel="noopener noreferrer">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 to-purple-600 p-8 h-96">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <img
                      src="https://img.youtube.com/vi/zTaxhA-QTU0/maxresdefault.jpg"
                      alt="Featured Project"
                      className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="relative z-10 h-full flex flex-col justify-end">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">Podcast</span>
                        </div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <a href="https://www.youtube.com/watch?v=TlQSxtZN3EA" target="_blank" rel="noopener noreferrer">
                  <div className="group cursor-pointer scroll-animate">
                    <div className="relative overflow-hidden rounded-xl h-44">
                      <img
                        src="https://img.youtube.com/vi/TlQSxtZN3EA/maxresdefault.jpg"
                        alt="Wedding Project"
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">Concept</span>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="https://www.youtube.com/watch?v=2ShuHJMoXAY" target="_blank" rel="noopener noreferrer">
                  <div className="group cursor-pointer scroll-animate">
                    <div className="relative overflow-hidden rounded-xl h-44">
                      <img
                        src="https://img.youtube.com/vi/2ShuHJMoXAY/maxresdefault.jpg"
                        alt="Corporate Project"
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">Débat</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 border border-gray-800 scroll-animate">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="scroll-animate">
                  <div className="text-3xl font-bold text-white mb-2">30+</div>
                  <div className="text-gray-400">Projets Complétés</div>
                </div>
                <div className="scroll-animate">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-gray-400">Clients Satisfaits</div>
                </div>
                <div className="scroll-animate">
                  <div className="text-3xl font-bold text-white mb-2">3</div>
                  <div className="text-gray-400">Années d'Expérience</div>
                </div>
                <div className="scroll-animate">
                  <div className="text-3xl font-bold text-white mb-2">24h</div>
                  <div className="text-gray-400">Temps de Réponse</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 scroll-animate">
                <h2 className="text-4xl font-bold text-white mb-6">Contactez-moi</h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Discutons de votre projet et donnons vie à vos envies.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-12">
                <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 w-full max-w-2xl scroll-animate">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Envoyez-moi un message</h3>
                    <p className="text-gray-400">Je vous réponds dans les 24 heures</p>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-center">
                        ✅ Message envoyé avec succès ! Je vous répondrai dans les 24 heures.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-center">
                        ❌ Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Nom *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Votre email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Type de projet</label>
                        <input
                          type="text"
                          name="project_type"
                          className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ex: Vidéo Youtube, Podcast..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        maxLength={500}
                        rows={5}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Parlez-moi de votre projet, vos objectifs et votre vision créative..."
                      ></textarea>
                      <div className="text-right text-sm text-gray-500 mt-1">0/500</div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full font-semibold py-4 rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg ${
                        isSubmitting
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-cyan-500/25'
                      }`}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </form>
                </div>

                <div className="bg-gradient-to-br from-cyan-600 to-purple-700 rounded-2xl p-8 w-full max-w-2xl scroll-animate">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Suivez-moi</h3>
                  <p className="text-cyan-100 mb-6 text-center">
                    Découvrez mes dernières créations et coulisses de mes projets sur les réseaux sociaux.
                  </p>

                  <div className="flex justify-center space-x-4">
                    <a href="https://www.instagram.com/swizzerprod?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors cursor-pointer">
                      <i className="ri-instagram-line text-lg"></i>
                    </a>
                    <a href="https://www.twitch.tv/swizzerj" target="_blank" className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors cursor-pointer">
                      <i className="ri-discord-line text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
