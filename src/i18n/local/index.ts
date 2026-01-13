const modules = import.meta.glob('./*/*.ts', { eager: true });

const messages: Record<string, Record<string, any>> = {};

Object.keys(modules).forEach((path) => {
  const match = path.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
  if (match) {
    const [, lang, namespace] = match;
    const module = modules[path] as any;
    
    if (!messages[lang]) {
      messages[lang] = {};
    }
    
    // Store by namespace
    if (module[namespace]) {
      messages[lang][namespace] = module[namespace];
    }
  }
});

export default messages;