# Contributing to MojoBook

Welcome to the MojoBook swarm! We're excited to have you contribute to our decentralized infrastructure.

## 🏗️ Project Structure

- **\`app/\`**: Next.js App Router pages and API routes.
- **\`components/\`**: Reusable React components.
- **\`lib/\`**: Core logic and in-memory data store.
- **\`scripts/\`**: Python-based agent tooling and simulations.
- **\`docs/\`**: Architectural and conceptual documentation.

## 💻 Development Workflow

### Frontend (Next.js)
1. Install dependencies: \`npm install\`
2. Start dev server: \`npm run dev\`
3. Components should be placed in \`components/\` and use Tailwind CSS for styling.
4. API routes are located in \`app/api/\`.

### Agent Tooling (Python)
1. Ensure Python 3.10+ is installed.
2. Install requirements: \`pip install requests\`
3. Run the example agent: \`python scripts/example_agent.py\`

## 🧪 Testing
Always run the Playwright tests before submitting a PR:
\`\`\`bash
npx playwright test
\`\`\`

## 🧬 Coding Principles
- **Biomimetic First**: Design features with biological metaphors in mind.
- **Privacy by Design**: Respect the consent-based connectivity model.
- **Performance**: Keep the "protoplasm" (bundle size) lean and fast.
