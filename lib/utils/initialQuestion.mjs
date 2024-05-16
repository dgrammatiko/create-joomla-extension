import { select } from "@clack/prompts";

async function initialQuestion() {
  return await select({
    message: "What do you want to build today?",
    options: [
      { label: "Component", value: "components" },
      { label: "Module", value: "modules" },
      { label: "Plugin", value: "plugins" },
      { label: "Template", value: "templates" },
      { label: "Library", value: "libraries" },
    ],
  });
}

export { initialQuestion };
