import ProjectAnalytics from "@/components/workspace/project/project-analytics";
import ProjectHeader from "@/components/workspace/project/project-header";

const ProjectDetails = () => {
  return (
    <div className="w-full space-y-6 py-4 md:pt-3">
      <ProjectHeader />
      <div className="space-y-5">
        <ProjectAnalytics />
      </div>
    </div>
  );
};

export default ProjectDetails;
