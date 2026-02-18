"use client";


import AnimatedShaderHero from "./animated-shader-hero";
import { About, SocialHandle } from "../utils/interface";

interface HeroProps {
  about: About;
  social: SocialHandle[];
}

const Hero = ({ about, social }: HeroProps) => {
  return (
    <AnimatedShaderHero backgroundOnly>
      {/* Overlay your custom hero layout here */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        {/* Profile Picture Example */}
        <div className="mb-8">
          <img
            src= "profile.png"
            alt={about.name}
            className="w-40 h-40 rounded-full border-4 border-amber-400 shadow-lg object-cover mx-auto"
          />
        </div>
        <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
            {`Hello! I'm ${about.name}`}
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold text-orange-400 mt-2">
            {about.title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-orange-100/90 font-light leading-relaxed mt-4">
            {about.subTitle}
          </p>
          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-6">
            {social.filter(s => s.enabled).map(s => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" title={s.platform} className="text-amber-400 hover:text-orange-400 text-xl">
                {/* You can use an icon component or SVG here */}
                <span>{s.platform}</span>
              </a>
            ))}
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
            >
              Let's talk
            </button>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('/batra-bhavay.pdf', '_blank');
                }
              }}
              className="px-6 py-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              View Resume
            </button>
          </div>
        </div>
      </div>
    </AnimatedShaderHero>
  );
};

export default Hero;

