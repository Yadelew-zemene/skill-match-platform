import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
             <span className="text-blue-600 italic">Connect through Intelligent Matching</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            SkillMatch uses advanced evolutionary algorithms to rank candidates 
            based on real skills, not just keywords. Get matched with the right 
            opportunity in seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Get Started Now <ArrowRight size={20} />
            </Link>
            <Link 
              href="/about" 
              className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-blue-600 transition-all"
            >
              Learn How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* Trust/Feature Section */}
      {/* <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Instant Matching</h3>
            <p className="text-gray-500">Our system processes resumes and job descriptions instantly to provide a match score.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Skill-First Hiring</h3>
            <p className="text-gray-500">We prioritize verified skills and project experience over traditional metrics.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Verified Results</h3>
            <p className="text-gray-500">Built on the MOSES and Hyperon frameworks for transparent, evolution-based AI matching.</p>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-900">Smarter hiring in 3 steps</h2>
      <p className="text-gray-500 mt-4">Powered by MOSES to Hyperon framework transition.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { step: "01", title: "Upload Resume", desc: "Our AI extracts core competencies from your CV or job description." },
        { step: "02", title: "Evolutionary Matching", desc: "MOSES algorithms calculate skill compatibility in real-time." },
        { step: "03", title: "Get Hired", desc: "Connect directly with top matches ranked by true skill scores." }
      ].map((item, i) => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:border-blue-200 transition-colors">
          <span className="text-6xl font-black text-blue-50 absolute -right-2 -top-2 group-hover:text-blue-100 transition-colors">
            {item.step}
          </span>
          <h4 className="text-xl font-bold mb-4 relative z-10">{item.title}</h4>
          <p className="text-gray-500 relative z-10 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
        </div>
        
      </section> */}
    
  <section className="about py-24 bg-white">
   <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
    <div className="flex-1">
      <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Born from the pursuit of <br />
        <span className="text-blue-600">Artificial General Intelligence.</span>
      </h2>
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        SkillMatch isn't just a job board. We are a technical collaboration 
        inspired by work at iCog Labs, utilizing symbolic AI and program evolution 
        to solve the human problem of "fit."
      </p>
      <Link href="/about" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
        Read our story <ArrowRight size={20} />
      </Link>
    </div>
    <div className="flex-1 bg-blue-600 w-full h-80 rounded-3xl shadow-2xl shadow-blue-200 flex items-center justify-center p-12 text-center">
       <p className="text-white text-2xl italic font-serif leading-relaxed">
         "Finding the right person is no longer a search—it's an evolution."
       </p>
    </div>
  </div>
      </section>
      {/* Final Call to Action */}
<section className="py-24 bg-blue-600 overflow-hidden relative">
  <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
      Ready to find your perfect match?
    </h2>
    <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto">
      Join the thousands of developers and employers already using symbolic AI to build better teams.
    </p>
    <Link href="/register" className="bg-white text-blue-600 px-10 py-4 rounded-full font-black text-lg hover:bg-gray-100 transition-all">
      Create Your Account
    </Link>
  </div>
  {/* Decorative Circle */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full -mr-48 -mt-48 opacity-50"></div>
</section>
    </div>
  );
}