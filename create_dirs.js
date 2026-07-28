const fs = require('fs');
const path = require('path');

const dirs = [
  "backend/src/controllers",
  "backend/src/services",
  "backend/src/repositories",
  "backend/src/middleware",
  "backend/src/jobs",
  "backend/src/agents",
  "backend/src/ai",
  "frontend/src/components",
  "frontend/src/layouts",
  "frontend/src/hooks",
  "frontend/src/services",
  "frontend/src/stores",
  "frontend/src/contexts",
  "frontend/src/modules",
  "frontend/src/types",
  "frontend/src/theme"
];

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${dir}`);
  }
  fs.writeFileSync(path.join(fullPath, '.gitkeep'), '');
});
console.log("All directory structures initialized successfully.");
