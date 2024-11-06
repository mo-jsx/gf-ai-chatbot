Here's a README file for your project, **Geppetto**:

---

# Geppetto

Geppetto is a React-based project designed to progressively render Markdown text in real-time as it's streamed in chunks, such as through Server-Sent Events (SSE). With built-in support for complex Markdown structures, Geppetto ensures smooth, clean rendering by handling end-of-line and end-of-paragraph logic. This project follows an atomic design structure to maintain scalable and well-organized components.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure: Atomic Design](#project-structure-atomic-design)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

### UI

- **Typescript**: For type safety and enhanced development experience.
- **React**: Core library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for creating responsive, custom designs quickly.

### Markdown Parsing

- **react-markdown**: Used to render Markdown as React components, making it simple to integrate Markdown in a React app.
- **remark plugins**: Enhances Markdown rendering capabilities with support for advanced formatting, such as embedded HTML and custom syntaxes.

### Testing

- **Vitest**: Fast and lightweight testing framework for running unit tests.
- **React Testing Library**: Helps with testing React components to ensure they behave as expected from a user's perspective.
- **Cypress**: End-to-end testing tool for simulating user interactions and verifying app functionality in a real browser environment.

## Project Structure: Atomic Design

Geppetto follows the **Atomic Design** methodology, a component-based structure that divides UI elements into three hierarchical categories to create consistent, reusable, and modular components. Here’s a brief overview of each level in the atomic design approach:

1. **Atoms**  
   The smallest building blocks in the UI. Examples include buttons, input fields, and icons. Atoms are highly reusable components that don’t typically depend on other components.

2. **Molecules**  
   Small combinations of atoms that work together as a single functional unit. Examples might include a ChatInput (input + button) or a ChatMessages with a collection of Messages. Molecules encapsulate simple functions but serve a unique purpose in the UI.

3. **Organisms**  
   Larger components made up of groups of molecules and/or atoms. Organisms define distinct sections of the interface, such as Chatbot. They are more complex and provide a more complete UI element, usually with distinct functionality.

This structure allows for the efficient reuse of components, making the UI highly modular and scalable.

## Architecture

## Installation

Clone the repository and install dependencies:

```bash
gi clone git@github.com:mo-jsx/gf-ai-chatbot.git
cd gf-ai-chatbot
npm install
```

## Usage

To start the development server, run:

```bash
npm run dev
```

Navigate to `http://localhost:5173` to see Geppetto in action.

## Testing

This project includes both unit and end-to-end tests.

1. **Unit Tests**: Run unit tests with Vitest and React Testing Library.

   ```bash
   npm run test
   ```

2. **End-to-End Tests**: Use Cypress for end-to-end testing.

   ```bash
   npm run cypress:open
   ```
