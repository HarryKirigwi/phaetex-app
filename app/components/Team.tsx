import Image from "next/image";

const ceo = {
  name: "Harrison Kirigwi",
  role: "CEO & Founder",
  company: "Phaetex Software",
  image: "/images/Harrison.jpeg",
  priority: true,
};

const teamMembers = [
  {
    name: "James Kamau",
    role: "DevOps / Backend Engineer",
    image: "/images/james.jpeg",
  },
  {
    name: "Wilson Kinyanjui",
    role: "AI Engineer",
    image: "/images/kinyanjui.jpeg",
  },
  {
    name: "Peter Kibe",
    role: "Frontend Engineer",
    image: "/images/kibe.jpeg",
  },
  {
    name: "Peter Migichi",
    role: "Social Media Manager",
    image: "/images/Migichi.jpeg",
  },
];

function TeamImage({
  src,
  alt,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 aspect-[4/5] sm:aspect-square shadow-inner">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

export default function Team() {
  return (
    <section
      id="team"
      data-animate
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-primary-dark/40"
      aria-labelledby="team-heading"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 lg:mb-14 max-w-2xl">
          <h2
            id="team-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark dark:text-white mb-3"
          >
            Our team
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg">
            The people behind Phaetex Software. Shipping reliable e-commerce for Kenyan
            businesses with a focus on craft, security, and support.
          </p>
        </header>

        <div className="space-y-12 lg:space-y-16">
          <article
            className="rounded-2xl md:rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-primary-dark/60 shadow-lg overflow-hidden border-l-4 border-l-accent-blue"
            data-animate
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10 items-center">
              <div className="max-w-md mx-auto lg:max-w-none w-full">
                <TeamImage
                  src={ceo.image}
                  alt={`${ceo.name}, ${ceo.role}`}
                  priority={ceo.priority}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="text-center lg:text-left">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent-orange mb-2">
                  {ceo.company}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary-dark dark:text-white mb-2">
                  {ceo.name}
                </h3>
                <p className="text-lg text-accent-blue font-medium">{ceo.role}</p>
              </div>
            </div>
          </article>

          <div data-animate>
            <h3 className="text-xl sm:text-2xl font-bold text-primary-dark dark:text-white mb-6 lg:mb-8">
              Engineering &amp; operations
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 list-none p-0 m-0">
              {teamMembers.map((member) => (
                <li key={member.name}>
                  <article className="h-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-primary-dark/40 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                    <TeamImage
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="p-5 flex-1 flex flex-col border-t border-gray-100 dark:border-gray-800">
                      <h4 className="text-lg font-bold text-primary-dark dark:text-white mb-1">
                        {member.name}
                      </h4>
                      <p className="text-sm text-accent-blue font-medium">{member.role}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
