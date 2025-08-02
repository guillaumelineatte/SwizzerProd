
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Resume() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
                <div className="flex items-center space-x-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%20video%20editor%20headshot%20portrait%2C%20confident%20creative%20professional%20in%20modern%20editing%20studio%2C%20warm%20lighting%2C%20contemporary%20workspace%20background%2C%20artistic%20and%20sophisticated%20atmosphere%2C%20high%20quality%20professional%20photography&width=120&height=120&seq=resume-photo&orientation=squarish"
                    alt="Alex Portrait"
                    className="w-24 h-24 rounded-full object-cover object-top"
                  />
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Alex Thompson</h1>
                    <p className="text-xl opacity-90">Monteur Vidéo Senior & Spécialiste Post-Production</p>
                    <div className="flex items-center space-x-6 mt-3 text-sm">
                      <span>alex@alexedits.com</span>
                      <span>+1 (555) 123-4567</span>
                      <span>Los Angeles, CA</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Résumé Professionnel</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Monteur vidéo créatif et techniquement compétent avec plus de 8 ans d'expérience en post-production pour mariages, vidéos corporate, documentaires et publicités. Expertise en narration, étalonnage couleur et post-production audio utilisant des logiciels standards de l'industrie. Historique prouvé de livraison de contenu de haute qualité qui dépasse les attentes des clients tout en respectant les délais serrés.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Expérience Professionnelle</h2>

                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white">Monteur Vidéo Senior</h3>
                          <p className="text-blue-400 font-medium">Swizzer Prod (Freelance)</p>
                        </div>
                        <span className="text-gray-400 text-sm">2019 - Présent</span>
                      </div>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Monté plus de 150 vidéos de mariage, présentations corporate et projets commerciaux</li>
                        <li>• Développé des workflows de post-production optimisés, réduisant le temps de livraison de 30%</li>
                        <li>• Collaboré avec les clients pour comprendre leur vision et livrer des récits visuels captivants</li>
                        <li>• Géré plusieurs projets simultanément tout en maintenant les standards de qualité</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white">Monteur Vidéo</h3>
                          <p className="text-blue-400 font-medium">Creative Media Studios</p>
                        </div>
                        <span className="text-gray-400 text-sm">2017 - 2019</span>
                      </div>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Monté des vidéos promotionnelles et documentaires pour divers clients</li>
                        <li>• Spécialisé en correction couleur et post-production audio</li>
                        <li>• Mentoré des monteurs juniors et stagiaires dans les techniques de post-production</li>
                        <li>• Contribué à des séries documentaires primées</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white">Assistant Monteur</h3>
                          <p className="text-blue-400 font-medium">MediaFlow Productions</p>
                        </div>
                        <span className="text-gray-400 text-sm">2016 - 2017</span>
                      </div>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Assisté les monteurs seniors sur des projets commerciaux et cinématographiques à grande échelle</li>
                        <li>• Organisé les assets média et maintenu les bases de données de projets</li>
                        <li>• Effectué des tâches de montage de base et des contrôles qualité</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Compétences Techniques</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Maîtrise des Logiciels</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Adobe Premiere Pro</span>
                          <span className="text-sm text-blue-400 font-medium">Expert</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Adobe After Effects</span>
                          <span className="text-sm text-blue-400 font-medium">Avancé</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">DaVinci Resolve</span>
                          <span className="text-sm text-blue-400 font-medium">Avancé</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Final Cut Pro</span>
                          <span className="text-sm text-blue-400 font-medium">Compétent</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Adobe Audition</span>
                          <span className="text-sm text-blue-400 font-medium">Avancé</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Compétences Principales</h3>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Montage Narratif & Documentaire</li>
                        <li>• Étalonnage & Correction Couleur</li>
                        <li>• Post-Production Audio</li>
                        <li>• Design Motion Graphics</li>
                        <li>• Gestion de Projet</li>
                        <li>• Communication Client</li>
                        <li>• Optimisation Workflow</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Formation</h2>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Licence en Études Cinématographiques</h3>
                        <p className="text-blue-400 font-medium">University of Southern California</p>
                      </div>
                      <span className="text-gray-400 text-sm">2012 - 2016</span>
                    </div>
                    <p className="text-gray-300">Spécialisation en Post-Production et Médias Numériques</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">Prix & Reconnaissance</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Meilleur Film de Mariage</h3>
                      <p className="text-gray-300">Los Angeles Wedding Videography Awards - 2022</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Excellence en Montage Documentaire</h3>
                      <p className="text-gray-300">Festival du Film Indépendant - 2021</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Prix Choix Client</h3>
                      <p className="text-gray-300">Creative Media Studios - 2019</p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="bg-black px-8 py-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-download-line mr-2"></i>
                  Télécharger le CV en PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
