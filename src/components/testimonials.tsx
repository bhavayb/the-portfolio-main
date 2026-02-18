"use client";

import { Testimonial as ITestimonial } from "../utils/interface";
import { InfiniteScroll } from "./ui/InfiniteScroll";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";

const Testimonials = ({ testimonials }: { testimonials: ITestimonial[] }) => {
  return (
    <section className="py-12 sm:py-16 md:py-20 relative" id="testimonials">
      <span className="blob size-1/2 absolute -top-20 left-0 blur-[100px] -z-10" />
      <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(251,191,36,0.22)]">
          Client <span className="text-orange-400">Testimonials</span>
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full mb-3 sm:mb-4" />
        <p className="text-muted-foreground text-base sm:text-lg">What our clients say</p>
      </div>
      <Testimonial testimonials={testimonials} speed="normal" pauseOnHover />
      <Testimonial
        testimonials={testimonials}
        pauseOnHover
        speed="normal"
        direction="left"
      />
    </section>
  );
};

export default Testimonials;

interface TestimonialProps {
  testimonials: ITestimonial[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

const Testimonial = ({
  testimonials,
  direction,
  speed,
  pauseOnHover,
}: TestimonialProps) => {
  return (
    <Transition viewport={{ once: true }}>
      <InfiniteScroll
        direction={direction}
        speed={speed}
        pauseOnHover={pauseOnHover}
        className="pb-4"
      >
        {testimonials.map((val) => (
          <li
            key={val._id}
            className="p-4 sm:p-5 md:p-6 bg-card/70 border border-border w-[280px] sm:w-[320px] md:w-[400px] lg:w-[450px] rounded-xl sm:rounded-2xl space-y-2 relative overflow-hidden z-0 backdrop-blur-sm hover:bg-card/90 hover:border-yellow-400/30 transition-all hover:-translate-y-1 flex-shrink-0"
          >
            <div className="relative">
              <span className="text-6xl sm:text-7xl md:text-9xl absolute -top-6 sm:-top-7 md:-top-9 -left-1 sm:-left-2 size-8 sm:size-10 text-amber-400/24">
                &quot;
              </span>
              <p className="line-clamp-3 sm:line-clamp-4 text-foreground/80 text-sm sm:text-base">
                {val.review}
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-5 md:pt-6">
              <img
                src={val.image.url}
                width={50}
                height={50}
                alt={val.name}
                className="object-scale-down size-8 sm:size-9 md:size-10 bg-background rounded-full border border-border"
              />
              <div>
                <h4 className="font-medium sm:font-semibold text-foreground text-sm sm:text-base">{val.name}</h4>
                <h5 className="text-xs sm:text-sm text-muted-foreground">
                  {val.position}
                </h5>
              </div>
            </div>
            <span className="absolute -bottom-6 -z-10 -right-0 ">
              <svg
                width="80"
                height="176"
                viewBox="0 0 80 176"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M80 0.311005L80 75.7528L66.8466 87.9639L79.9853 100.869L79.9853 176H57.5783L57.5783 123.751L22.9432 157.376L6.80805 142.143L50.6601 99.1772L0 99.1772L0 77.0325L49.6613 77.0325L6.90351 34.3051L22.7082 18.7178L56.9467 52.1552L56.9467 0H80"
                  fill="#34363C"
                />
              </svg>
            </span>
          </li>
        ))}
      </InfiniteScroll>
    </Transition>
  );
};

