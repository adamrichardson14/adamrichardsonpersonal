const projects = [
  {
    name: "Zoeble Website Design & Development",
    description:
      "My website design / development company. We are taking on exciting projects in the UK & Romania.",
    link: "https://zoeble.com",
  },
  {
    name: "Cojolt.io",
    description:
      "Coming soon... A platform to create a highly optimised website for your business, start adding contents in seconds.",
    link: "https://cojolt.io",
  },
  {
    name: "Aiphotoshoot.me",
    description:
      "Coming soon... A platform that takes 20 images of yourself, and will return over 100 images, from Linkedin style pictures to historic paintings.",
    link: "https://aiphotoshoot.me",
  },
  {
    name: "Adam Richardson Youtube",
    description:
      "Youtube channel focused on teaching real world coding skills. Project based so that you build real applications.",
    link: "https://www.youtube.com/channel/UC0QZp69ZABhoIr6Pp-lQEzA",
  },
];

export default function Projects() {
  return (
    <section className="mt-52">
      <span className="block text-5xl sm:text-6xl md:text-8xl font-semibold text-white">
        Projects
      </span>
      <dl className="mt-10 max-w-[610px]">
        {projects.map((project) => (
          <div key={project.link} className="my-4">
            <dt>
              <a
                className="text-2xl text-gray-200 font-mono hover:text-gray-50 transition-colors duration-250"
                href={project.link}
                target="__blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
            </dt>
            <dd className="text-gray-300">{project.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
