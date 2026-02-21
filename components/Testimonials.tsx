"use client";

const testimonials = [
  {
    name: "Wanjiku",
    role: "SEO",
    quote:
      "Very easy to use. I am completely blown away. This is the real deal!",
  },
  {
    name: "Kipchoge",
    role: "Direct Optimization Executive",
    quote:
      "The user interface is intuitive, making it easy for our team to adapt and maximize productivity.",
  },
  {
    name: "Akinyi",
    role: "Content Lead",
    quote:
      "From humanizer to our online store, everything just works. Best value in Kenya.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-animate
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-primary-dark"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 lg:mb-12">
          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
          >
            Customer success stories
          </h2>
          <a
            href="#testimonials"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-medium bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shrink-0 w-fit"
          >
            Read all Reviews
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map(({ name, role, quote }) => (
            <article
              key={name}
              className="relative rounded-2xl bg-gray-800/80 dark:bg-gray-800/90 border border-gray-700/60 p-6 lg:p-8 min-h-[240px] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="w-12 h-12 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue text-lg font-bold shrink-0"
                  aria-hidden
                >
                  {name.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-white">{name}</p>
                  <p className="text-sm text-gray-400">{role}</p>
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed flex-1">{quote}</p>
              <span
                className="absolute bottom-4 left-6 text-6xl sm:text-7xl font-serif text-accent-blue/40 leading-none select-none"
                aria-hidden
              >
                &ldquo;
              </span>
            </article>
          ))}
        </div>

        <div
          className="flex justify-center gap-2 mt-10"
          role="tablist"
          aria-label="Testimonial slides"
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === 2}
              aria-label={`Slide ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === 2
                  ? "bg-accent-blue"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
