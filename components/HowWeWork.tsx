const items = [
  {
    title: "Discover",
    description:
      "We start by understanding your goals, constraints, and how your teams work. No cookie-cutter templates—we shape the scope around your reality.",
  },
  {
    title: "Design & build",
    description:
      "Clear milestones, regular check-ins, and incremental delivery. You see progress early and can steer before we go too far in any direction.",
  },
  {
    title: "Deploy & support",
    description:
      "We help you launch and hand over with documentation and clarity. Ongoing support and iterations are available so the system keeps fitting your needs.",
  },
];

export default function HowWeWork() {
  return (
    <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-primary-dark border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark dark:text-white mb-4">
              How we work
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              From idea to deployment, we keep the process transparent and
              aligned with your priorities.
            </p>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <div key={item.title} className="flex flex-col">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 dark:bg-accent-orange/10 text-accent-blue dark:text-accent-orange font-bold text-lg mb-4">
                  {i + 1}
                </span>
                <h3 className="text-lg font-semibold text-primary-dark dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
