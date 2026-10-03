import OsShell from "../../components/os/OsShell";
import OsImageScroll from "../../components/os/OsImageScroll";
import { PROJECTS, getProject } from "../../lib/projects";
import { getProjectInfo } from "../../lib/project-info";

export default function ProjectItem({ project, infoMarkdown }) {
  if (!project) {
    return (
      <OsShell
        title="Projects"
        chrome={{
          title: "Projects",
        }}
      />
    );
  }

  return (
    <OsShell
      title={project.title}
      description={project.description}
      chrome={{
        title: project.title,
        infoMarkdown: infoMarkdown || null,
      }}
    >
      <OsImageScroll images={project.images} alt={project.title} />
    </OsShell>
  );
}

export async function getStaticPaths() {
  return {
    paths: PROJECTS.map((item) => ({ params: { slug: item.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = getProject(params.slug);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
      infoMarkdown: getProjectInfo(project.slug),
    },
  };
}
