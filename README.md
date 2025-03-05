# ClassSwift Student Web

---

## Prerequisites

- Node.js >= 16
- Yarn

---

## Tech Skills

- [React](https://react.dev/): For building user interfaces.
- [TypeScript](https://www.typescriptlang.org/): For type-safe JavaScript development.
- [Styled Components](https://styled-components.com/): For CSS-in-JS styling.
- [MUI](https://mui.com/): A component library configured with the styled-components engine for this project
- [Prettier](https://prettier.io/): Code formatting tool.
- [ESLint](https://eslint.org/): Linter for consistent code quality.
- [Redux Toolkit](https://redux-toolkit.js.org/): State management.
  - Follow the [Redux Style Guide](https://redux.js.org/style-guide) for consistent and maintainable code.
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview): Data fetching and caching.
- [Axios](https://axios-http.com/docs/intro): For making HTTP requests.
- [SocketIO](https://socket.io/): Real-time communication.

---

## Frontend guideline

The [Frontend Guideline](https://outline.universe-vs.org/doc/frontend-guideline-VUIg46aMUz), including:

- Component structure and naming.
- Styling conventions. Refer to this guide before starting development.

---

## Project Structure

### Main Parts

1. **`src/`**: New version code for active development.
2. **`fishing_cat_src/`**: Legacy code for reference and refactoring.

### Directory Structure

```
src/
├── api/
│   ├── models/         # API request/response interfaces
│   └── services/       # API service implementations
├── assets/             # Static resources
├── components/         # React components
│   └── svgr/           # SVGs are used as components
│   ├── pages/          # Page-level components
│   └── prototypes/     # Reusable base components
├── enums/              # Enumerations
├── hooks/              # Custom React hooks
├── i18n/               # Localization files
├── layouts/            # Layout components
├── pages/              # Page-specific components
├── redux/              # State management with Redux
│   ├── store/          # Store setup
│   └── slices/         # Reducer logic
├── router/             # Routing configuration
├── service/            # Auxiliary services
├── styles/             # Common/global styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

---

## Naming Conventions

### Component Folder Structure

- Component folder names should be **capitalized**.
- Each component should have its own folder and follow this structure:

- `components/Foo/`
  - `index.ts`
  - `Foo.tsx`
  - `Foo.style.ts`
  - `Foo.type.ts`

### Non-Component Files

- Use **lowercase** for non-component files (e.g., utilities).
- Examples:
  ```
  utils/helper.js
  config/settings.js
  ```

This ensures clear distinction between component and non-component files.

---

## Assets

### Svg component

Place SVGs used as components under:: `/src/assets/svgr/**/*.svg`

### Other Assets

For other assets without specific rules

## I18n

### Structure

```
src/i18n/
├── i18n.ts                 # i18n configuration
└── locales/
    ├── resources.ts        # dynamic loading setup
    ├── {language}/                 # must match LANGUAGE
    │   ├── {nameSpace}.json # must match nameSpace
```

### Notes

1. **Language Folders**
   - Must match `LANGUAGE` enum values
   - Example: `LANGUAGE.ZH = 'zh'` → folder must be named `zh`
2. **Namespace Files**
   - Each language folder must contain all namespace files
   - File names must match namespace names
   - Put shared translations in `common.json`

### Adding New Language

1. Add new value to `LANGUAGE` enum
2. Create language folder with all namespace files
3. Update namespace list in `resource.ts` to dynamic loading
4. Update language selection Options

---

## API

API interceptors:

- Convert API response data to Lower Camel Case
- Convert API request data to Snake Case

## OIDC Sign-In for Local Development

To set up OIDC sign-in for local development, update the following variables and run the application on port 3000:

```
# node env
VITE_NODE_ENV=local
...

#for viewSonic oidc
...
VITE_OIDC_REDIRECT_URI=http://localhost:3000/auth/callback
VITE_OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:3000/auth/logout

```
