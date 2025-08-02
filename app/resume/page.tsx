
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
                    <p className="text-xl opacity-90">Senior Video Editor & Post-Production Specialist</p>
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
                  <h2 className="text-2xl font-bold text-white mb-4">Professional Summary</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Creative and technically proficient Video Editor with 8+ years of experience in post-production for weddings, corporate videos, documentaries, and commercials. Expertise in storytelling, color grading, and audio post-production using industry-standard software. Proven track record of delivering high-quality content that exceeds client expectations while meeting tight deadlines.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Professional Experience</h2>

                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white">Senior Video Editor</h3>
                          <p className="text-blue-400 font-medium">Swizzer Prod (Freelance)</p>
                        </div>
                        <span className="text-gray-400 text-sm">2019 - Present</span>
                      </div>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Edited 150+ wedding videos, corporate presentations, and commercial projects</li>
                        <li>• Developed streamlined post-production workflows, reducing delivery time by 30%</li>
                        <li>• Collaborated with clients to understand vision and deliver compelling visual narratives</li>
                        <li>• Managed multiple projects simultaneously while maintaining quality standards</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white">Video Editor</h3>
                          <p className="text-blue-400 font-medium">Creative Media Studios</p>
                        </div>
                        <span className="text-gray-400 text-sm">2017 - 2019</span>
                      </div>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Edited promotional videos and documentaries for various clients</li>
                        <li>• Specialized in color correction and audio post-production</li>
                        <li>• Mentored junior editors and interns in post-production techniques</li>
                        <li>• Contributed to award-winning documentary series</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-white">Assistant Video Editor</h3>
                          <p className="text-blue-400 font-medium">MediaFlow Productions</p>
                        </div>
                        <span className="text-gray-400 text-sm">2016 - 2017</span>
                      </div>
                      <ul className="text-gray-300 space-y-1 ml-4">
                        <li>• Assisted senior editors with large-scale commercial and film projects</li>
                        <li>• Organized media assets and maintained project databases</li>
                        <li>• Performed basic editing tasks and quality control checks</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Technical Skills</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Software Proficiency</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Adobe Premiere Pro</span>
                          <span className="text-sm text-blue-400 font-medium">Expert</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Adobe After Effects</span>
                          <span className="text-sm text-blue-400 font-medium">Advanced</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">DaVinci Resolve</span>
                          <span className="text-sm text-blue-400 font-medium">Advanced</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Final Cut Pro</span>
                          <span className="text-sm text-blue-400 font-medium">Proficient</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Adobe Audition</span>
                          <span className="text-sm text-blue-400 font-medium">Advanced</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Core Competencies</h3>
                      <ul className="text-gray-300 space-y-1">
                        <li>• Narrative & Documentary Editing</li>
                        <li>• Color Grading & Correction</li>
                        <li>• Audio Post-Production</li>
                        <li>• Motion Graphics Design</li>
                        <li>• Project Management</li>
                        <li>• Client Communication</li>
                        <li>• Workflow Optimization</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Bachelor of Arts in Film Studies</h3>
                        <p className="text-blue-400 font-medium">University of Southern California</p>
                      </div>
                      <span className="text-gray-400 text-sm">2012 - 2016</span>
                    </div>
                    <p className="text-gray-300">Concentration in Post-Production and Digital Media</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-6">Awards & Recognition</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Best Wedding Film</h3>
                      <p className="text-gray-300">Los Angeles Wedding Videography Awards - 2022</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Excellence in Documentary Editing</h3>
                      <p className="text-gray-300">Independent Film Festival - 2021</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Client Choice Award</h3>
                      <p className="text-gray-300">Creative Media Studios - 2019</p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="bg-black px-8 py-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-download-line mr-2"></i>
                  Download PDF Resume
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
