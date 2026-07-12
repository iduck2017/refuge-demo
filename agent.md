## Agent Operating Rules

- Do not install dependencies unless the user explicitly asks for it.
- Do not deploy the project unless the user explicitly asks for it.
- Do not start development servers or runtime processes unless the user explicitly asks for it.
- When dependencies, deployment, or server startup may be needed, explain the required commands and wait for the user to run or approve them.

## Code Style Rules

- Write all source code, identifiers, comments, and user-facing program text in English. Communicate with the user in Chinese.
- Add necessary comments, preferably using block comment style.
- Keep lines reasonably short. Prefer declaring values before using them when it improves readability and avoids long lines.
- Prefer concise names. Use a single-word name when the scope is unambiguous; use camelCase only when additional clarity is necessary.
- Prefer single-line return statements when they fit clearly in a conditional branch.
- Prefer single-line block comments when the comment fits on one line.
- Keep a property adjacent to its getter when they represent the same state.
- Do not add a blank line between a property and its corresponding getter.
- Keep each line focused on one responsibility. Read values into local variables before using them in control flow or other logic.
- Do not create convenience getters that merely expose nested model properties without a concrete need.
- Keep function bodies compact. Add blank lines only when they separate distinct logical sections.
- Write array callbacks such as `forEach`, `find`, and `some` across multiple lines, not as single-line arrow expressions.
- Encapsulate mutable model state in private `_property` fields. Use public getters and setters for externally readable and writable state.
- Initialize model state from constructor `props`; do not assign default values directly in property declarations.
- Create each new model as a folder with an `index.ts` entry file. Import folder models through explicit `index` paths.
- Do not add forwarding exports from unrelated or parent module entry files.
- Do not use TypeScript escape hatches in application code: no definite assignment assertions (`!:`), type assertions (`as`), or `any`.
- Do not declare explicit return types on getters; array getters must return a shallow copy with `[...value]`.
- Decorate every getter with `@useMemo()` so dependency collection does not break across getter calls.
- Wrap event listeners as reusable hooks when traits need to consume those events.
- Prefer `protected` over `private` for decor, event, and frame listener methods.
- Write simple getters and setters on one line.

## Business Rules

- A game contains one team.
- A game contains one timer.
- A team contains multiple roles.
- A role contains one root trait exposed as `trait`.
- A trait can contain multiple nested traits.
- A role contains one strength.
- Starvation is implemented as a trait subtype under the default root trait.

## Similar Practice References

- Attribute implementation: `src/model/strength.ts`
- State implementation: `src/model/starvation.ts`
- Route helper implementation: `src/model/game.ts`
