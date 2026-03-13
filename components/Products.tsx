import Image from "next/image";

const comparisonRows = [
  {
    feature: "Setup / Installation",
    traditional: "Ksh 50,000 – 150,000 (Development)",
    ourSolution: "Ksh 2,000 (One-time)",
  },
  {
    feature: "Monthly Salary / Fee",
    traditional: "Ksh 40,000 – 120,000+",
    ourSolution: "Ksh 2,000 (Fixed)",
  },
  {
    feature: "Hosting & Servers",
    traditional: "You pay separately (Ksh 500 – 5,000/mo)",
    ourSolution: "Included",
  },
  {
    feature: "Security & Backups",
    traditional: "Manual (Risk of human error)",
    ourSolution: "Automated & Managed",
  },
  {
    feature: "Technical Support",
    traditional: "Depends on developer availability",
    ourSolution: "24/7 Monitoring Included",
  },
  {
    feature: "Annual Total",
    traditional: "Ksh 500,000+",
    ourSolution: "Ksh 26,000",
  },
];

const products = [
  {
    id: "phaetex-humanizer",
    name: "Phaetex Humanizer: Write with Authenticity",
    description:
      "Stop sounding like a machine. Our AI Humanizer helps bloggers, students, and professionals refine automated content into natural, engaging prose.",
    points: [
      {
        title: "Authentic Tone",
        text: "Maintains your unique voice while polishing the flow.",
      },
      {
        title: "High Readability",
        text: "Ensures your audience (and search engines) love your content.",
      },
      {
        title: "Time Efficient",
        text: 'Transform drafts in seconds without losing the "human touch."',
      },
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    inDevelopment: true,
    layout: "dashboard",
    style: "accentBar",
    ctaLabel: "Humanize",
    ctaHref: "https://humanizer.phaetex.com",
  },
  {
    id: "managed-ecommerce",
    name: "Managed E-commerce: Your Shop, Online, Tonight",
    description:
      "Get a professional online presence without the enterprise price tag. We provide a fully managed SaaS platform specifically for retail shops.",
    introLine:
      "In the tech world, hiring a developer is just the tip of the iceberg—there are also servers, security, and the \"headache factor.\" Here is a comparison designed to show that for the cost of a developer's lunch, you get an entire IT department.",
    points: [
      {
        title: "Transparent Pricing",
        text: "Only Ksh 2,000 for installation.",
      },
      {
        title: "Worry-Free Maintenance",
        text: "For just Ksh 2,000/month, we handle the hosting, security, and updates.",
      },
      {
        title: "Mobile-Ready",
        text: "Your customers can shop from any device, anywhere.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    inDevelopment: false,
    showComparison: true,
    verdict:
      "By choosing our managed solution, you save over Ksh 450,000 per year while getting the same professional online presence.",
    layout: "dashboardCentered",
    ctaLabel: "Get an online store today",
    ctaHref: "/contact",
  },
];

export default function Products() {
  return (
    <section
      id="products"
      data-animate
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-primary-dark"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark dark:text-white mb-2">
              Our products
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl">
              Tools and platforms we build for modern creators and small businesses. More coming as we
              ship.
            </p>
          </div>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {products.map((product, index) => {
            const productNumber = index + 1;
            const layout = (product as { layout?: string }).layout;
            const isDashboard = layout === "dashboard";
            const isDashboardCentered = layout === "dashboardCentered";
            const imageLeft = layout !== "imageRight" && !isDashboardCentered;
            const isAccentBar = (product as { style?: string }).style === "accentBar";
            const isElevated = (product as { style?: string }).style === "elevated";
            const ctaLabel = (product as { ctaLabel?: string }).ctaLabel;
            const ctaHref = (product as { ctaHref?: string }).ctaHref ?? "#";
            const isExternalCta = ctaHref?.startsWith("http");

            if (isDashboard) {
              return (
                <article
                  key={product.id}
                  className="rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 dark:bg-primary-dark/60 border border-gray-200 dark:border-gray-700 shadow-xl"
                >
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10 lg:min-h-[480px] items-center">
                    <div className="order-2 lg:order-1">
                      <span className="inline-block text-5xl sm:text-6xl font-bold text-accent-blue/30 dark:text-accent-blue/40 leading-none mb-4">
                        {String(productNumber).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark dark:text-white mb-4 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-lg">
                        {product.description}
                      </p>
                      {ctaLabel && (
                        <a
                          href={ctaHref}
                          {...(isExternalCta && { target: "_blank", rel: "noopener noreferrer" })}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors mb-8"
                        >
                          <span className="w-2 h-2 rounded-sm bg-white/80" aria-hidden />
                          {ctaLabel}
                        </a>
                      )}
                      {"points" in product && product.points && (
                        <div className="grid sm:grid-cols-3 gap-4">
                          {product.points.map((point) => (
                            <div
                              key={point.title}
                              className="p-4 rounded-xl bg-white dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 shadow-sm"
                            >
                              <div className="w-10 h-10 rounded-lg bg-accent-blue/10 dark:bg-accent-blue/20 flex items-center justify-center mb-3 text-accent-blue">
                                {point.title === "Authentic Tone" && (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                  </svg>
                                )}
                                {point.title === "High Readability" && (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                )}
                                {point.title === "Time Efficient" && (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                )}
                              </div>
                              <h4 className="font-semibold text-primary-dark dark:text-white text-sm mb-1">
                                {point.title}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                {point.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="order-1 lg:order-2 relative">
                      <div className="relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-[4/3] lg:aspect-auto lg:min-h-[380px] shadow-lg">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          unoptimized={product.image.startsWith("http")}
                        />
                        {product.inDevelopment && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-lg bg-accent-orange text-primary-dark shadow">
                            In development
                          </span>
                        )}
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-28 sm:w-32 p-2.5 rounded-xl bg-primary-dark/90 dark:bg-primary-dark border border-white/10 shadow-lg">
                          <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">Tone</p>
                          <p className="text-sm font-semibold text-white">Authentic</p>
                        </div>
                        <div className="absolute bottom-4 left-3 sm:left-4 w-28 sm:w-32 p-2.5 rounded-xl bg-accent-blue/95 dark:bg-accent-blue border border-white/20 shadow-lg">
                          <p className="text-[10px] sm:text-xs font-medium text-white/80 uppercase tracking-wider">Readability</p>
                          <p className="text-sm font-semibold text-white">High</p>
                        </div>
                        <div className="absolute bottom-4 right-3 sm:right-4 w-24 sm:w-28 p-2 rounded-xl bg-white/95 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg">
                          <p className="text-[10px] font-medium text-gray-500 uppercase">Score</p>
                          <p className="text-lg font-bold text-accent-orange">98%</p>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-24 h-24 sm:w-32 sm:h-32 text-gray-300 dark:text-gray-600 opacity-60 pointer-events-none" aria-hidden>
                        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                          <path d="M0 50 Q 25 20, 50 50 T 100 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
                          <path d="M0 60 Q 30 30, 60 60 T 100 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            if (isDashboardCentered) {
              return (
                <article
                  key={product.id}
                  className=""
                >
                  <div className="p-6 sm:p-8 lg:p-10 text-center">
                    <span className="inline-block text-5xl sm:text-6xl font-bold text-accent-blue/30 dark:text-accent-blue/40 leading-none mb-4">
                      {String(productNumber).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark dark:text-white mb-4 leading-tight max-w-3xl mx-auto">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto">
                      {product.description}
                    </p>
                    {ctaLabel && (
                      <a
                        href={ctaHref}
                        {...(isExternalCta && { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-sm bg-white/80" aria-hidden />
                        {ctaLabel}
                      </a>
                    )}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-0 border-t border-gray-200 dark:border-gray-700">
                    <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-gray-50 dark:bg-primary-dark/50">
                      {"points" in product && product.points && (
                        <ul className="space-y-8">
                          {product.points.map((point) => (
                            <li key={point.title} className="flex gap-4">
                              <div className="w-12 h-12 shrink-0 rounded-xl bg-accent-blue/10 dark:bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                                {point.title === "Transparent Pricing" && (
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0-8V7m0 1v8m0-8V7m0 1v8" />
                                  </svg>
                                )}
                                {point.title === "Worry-Free Maintenance" && (
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                )}
                                {point.title === "Mobile-Ready" && (
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-primary-dark dark:text-white text-lg mb-1">
                                  {point.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                  {point.text}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="relative rounded-b-2xl lg:rounded-b-none lg:rounded-r-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        unoptimized={product.image.startsWith("http")}
                      />
                      <div className="absolute top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-40 p-3 rounded-xl bg-primary-dark/90 dark:bg-primary-dark border border-white/10 shadow-lg">
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Setup</p>
                        <p className="text-lg font-bold text-white">Ksh 2,000</p>
                        <p className="text-xs text-gray-500">One-time</p>
                      </div>
                      <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-36 p-3 rounded-xl bg-accent-blue/95 border border-white/20 shadow-lg">
                        <p className="text-[10px] font-medium text-white/80 uppercase tracking-wider">Monthly</p>
                        <p className="text-xl font-bold text-white">Ksh 2,000</p>
                        <p className="text-xs text-white/80">All-inclusive</p>
                      </div>
                      <div className="absolute bottom-4 left-4 sm:left-4 w-36 p-3 rounded-xl bg-white/95 dark:bg-primary-dark border border-gray-200 dark:border-gray-600 shadow-lg">
                        <p className="text-[10px] font-medium text-accent-orange uppercase tracking-wider">You save</p>
                        <p className="text-lg font-bold text-primary-dark dark:text-white">Ksh 450,000+</p>
                        <p className="text-xs text-gray-500">per year</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={product.id}
                className={`overflow-hidden transition-shadow ${
                  isAccentBar
                    ? "rounded-r-2xl md:rounded-r-3xl border border-gray-200 dark:border-gray-700 border-l-4 border-l-accent-blue bg-gray-50 dark:bg-primary-dark/50 shadow-md hover:shadow-lg"
                    : isElevated
                      ? "rounded-2xl md:rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-primary-dark/60 shadow-xl hover:shadow-2xl md:max-w-5xl md:ml-auto"
                      : "rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-primary-dark/50"
                }`}
              >
                <span className="sr-only">Product {productNumber}</span>
                <span className="absolute mt-4 ml-4 md:mt-6 md:ml-6 text-2xl font-bold text-accent-blue/30 dark:text-accent-blue/40 pointer-events-none">
                  {String(productNumber).padStart(2, "0")}
                </span>
                <div
                  className={`grid md:grid-cols-2 gap-0 min-h-0 ${
                    imageLeft ? "" : "md:grid-flow-dense"
                  }`}
                >
                  <div
                    className={`relative aspect-video md:aspect-auto md:min-h-[340px] bg-gray-200 dark:bg-gray-800 ${
                      imageLeft
                        ? "md:rounded-r-2xl overflow-hidden order-1"
                        : "md:rounded-l-2xl overflow-hidden md:order-2"
                    }`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={product.image.startsWith("http")}
                    />
                    {product.inDevelopment && (
                      <span className="absolute top-4 right-4 px-3 py-1.5 text-xs font-medium rounded-full bg-accent-orange text-primary-dark shadow">
                        In development
                      </span>
                    )}
                  </div>
                  <div
                    className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative ${
                      imageLeft ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10"
                    } ${isAccentBar ? "md:border-l-0" : ""}`}
                  >
                    <span className="text-3xl font-bold text-accent-blue/30 dark:text-accent-blue/40 leading-none mb-2 block">
                      {String(productNumber).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-dark dark:text-white mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                      {product.description}
                    </p>
                    {"introLine" in product && product.introLine && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 mb-5 leading-relaxed italic">
                        {product.introLine}
                      </p>
                    )}
                    {"points" in product && product.points && (
                      <ul className="space-y-3 list-none">
                        {product.points.map((point) => (
                          <li key={point.title} className="flex gap-3">
                            <span className="text-accent-orange mt-1.5 shrink-0" aria-hidden>
                              •
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              <strong className="text-gray-700 dark:text-gray-300 font-medium">
                                {point.title}:
                              </strong>{" "}
                              {point.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <section
          id="comparison"
          className="mt-20 lg:mt-28 pt-16 lg:pt-20 border-t border-gray-200 dark:border-gray-700"
          aria-labelledby="comparison-heading"
        >
          <h2 id="comparison-heading" className="text-2xl sm:text-3xl font-bold text-primary-dark dark:text-white mb-6">
            Price Comparison: Our Managed SaaS vs. Traditional Hiring
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl">
            In the tech world, hiring a developer is just the tip of the iceberg. There are also servers, security, and the &ldquo;headache factor.&rdquo;
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
            Here is a comparison table designed to show that for the cost of a developer&rsquo;s lunch, you get an entire IT department.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-primary-dark/50 shadow-sm">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-primary-dark/80">
                  <th className="py-3 px-4 font-semibold text-primary-dark dark:text-white">Feature</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Hiring a Full-Time Developer</th>
                  <th className="py-3 px-4 font-semibold text-accent-blue dark:text-accent-blue bg-accent-blue/5 dark:bg-accent-blue/10">Our Managed SaaS</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-gray-100 dark:border-gray-700/80 ${i % 2 === 1 ? "bg-gray-50/50 dark:bg-white/[0.02]" : ""} ${i === comparisonRows.length - 1 ? "border-b-0" : ""}`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">{row.feature}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{row.traditional}</td>
                    <td className="py-3 px-4 text-primary-dark dark:text-white font-medium bg-accent-blue/5 dark:bg-accent-blue/10">{row.ourSolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 p-5 sm:p-6 rounded-xl border-2 border-accent-orange/40 bg-accent-orange/5 dark:bg-accent-orange/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-orange mb-2">The Verdict</p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
              By choosing our managed solution, you save over Ksh 450,000 per year while getting the same professional online presence.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
