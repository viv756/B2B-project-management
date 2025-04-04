const CreateWorkspaceForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <main className="w-full flex flex-row min-h-[590px] h-auto max-w-full">
      <div className="h-full px-10 py-10 flex-1">
        <div className="mb-5">
          <h1
            className="text-2xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5
           text-center sm:text-left">
            Let's build a Workspace
          </h1>
          <p className="text-muted-foreground text-lg leading-tight">
            Boost your productivity by making it easier for everyone to access projects in one
            location.
          </p>
        </div>
      </div>
    </main>
  );
};

export default CreateWorkspaceForm;
