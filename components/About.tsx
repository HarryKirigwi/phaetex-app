export default function About() {
  return (
    <section
      id="about"
      data-animate
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-primary-dark/40"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark dark:text-white mb-4">
              What we do
            </h2>
            <p className="text-accent-orange font-medium text-sm uppercase tracking-wider">
              Bridging the Gap Between Innovation and Accessibility
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              At Phaetex Solutions, we specialize in{" "}
              <strong>managed e-commerce</strong> for Kenyan retail and growing
              brands: a full online store as a service, with pricing from as low as
              Ksh 2,000, no surprise developer invoices, and no need to manage hosting
              or security yourself.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We focus on the product that matters most to shop owners: a reliable
              storefront, clear checkout, and a team that keeps the platform
              running while you focus on customers and inventory.
            </p>
            <ul className="flex flex-wrap gap-3 pt-2">
              {[
                "E-commerce as a service",
                "Managed hosting & updates",
                "Affordable",
                "Budget-friendly",
                "Retail-ready",
                "Digital growth",
                "Intuitive",
              ].map((item) => (
                <li
                  key={item}
                  className="px-3 py-1.5 rounded-full text-sm bg-white dark:bg-primary-dark border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


 
