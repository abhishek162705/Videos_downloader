# Contributing to Videos Downloader

Thank you for considering contributing to this project! Here's how you can help.

## How to Contribute

### Reporting Bugs

1. Check if the issue already exists in [GitHub Issues](https://github.com/brolyroly007/Videos_downloader/issues)
2. If not, create a new issue with:
   - A clear title and description
   - Steps to reproduce the bug
   - Expected vs actual behavior
   - Your environment (OS, Python version, etc.)
   - Relevant logs or error messages

### Suggesting Features

Open an issue with the **feature request** label describing:
- What problem does it solve?
- How should it work?
- Any alternatives you've considered

### Pull Requests

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the code style below
4. **Test** your changes thoroughly
5. **Commit** with a clear message:
   ```bash
   git commit -m "Add: description of your change"
   ```
6. **Push** and create a Pull Request

## Code Style

### Python (Backend)
- Follow **PEP 8** conventions
- Use type hints where practical
- Keep functions focused and under 50 lines when possible
- Use descriptive variable and function names

### TypeScript (Frontend)
- Follow the existing project conventions
- Use functional components with hooks
- Keep components small and reusable

### Commits
- Use clear, concise commit messages
- Prefix with action: `Add:`, `Fix:`, `Update:`, `Remove:`, `Refactor:`

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Videos_downloader.git
cd Videos_downloader

# Set up Python environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Set up frontend (optional)
cd frontend
npm install
cd ..

# Run the application
python app.py
```

## Project Architecture

- `app.py` &mdash; FastAPI application and API routes
- `modules/` &mdash; Core functionality (download, process, upload, AI)
- `frontend/` &mdash; Next.js dashboard
- `templates/` &mdash; Legacy Jinja2 templates

## Questions?

Open an issue or start a discussion. We're happy to help!
