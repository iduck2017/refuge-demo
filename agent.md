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
- Prefer adjacent single-line conditionals over a small `else` block when the branches stay clear.
- Prefer single-line block comments when the comment fits on one line.
- Keep a property adjacent to its getter when they represent the same state.
- Do not add a blank line between a property and its corresponding getter.
- Keep each line focused on one responsibility. Read values into local variables before using them in control flow or other logic.
- Do not create convenience getters that merely expose nested model properties without a concrete need.
- Keep function bodies compact. Add blank lines only when they separate distinct logical sections.
- Write array callbacks such as `forEach`, `find`, and `some` across multiple lines, not as single-line arrow expressions.
- Encapsulate mutable model state in private `_property` fields.
- Do not add setter or setter-like state change methods unless the user explicitly asks for them.
- Initialize model state from constructor `props`; do not assign default values directly in property declarations.
- Keep model constructor `props` optional.
- Create each new model as a folder with an `index.ts` entry file. Import folder models through explicit `index` paths.
- Keep singular base models in the plural folder `index.ts`; when a group model exists, keep it in `group.ts`.
- Do not add forwarding exports from unrelated or parent module entry files.
- Do not use TypeScript escape hatches in application code: no definite assignment assertions (`!:`), type assertions (`as`), or `any`.
- Do not declare explicit return types on getters; array getters must return a shallow copy with `[...value]`.
- Decorate every getter with `@useMemo()` so dependency collection does not break across getter calls.
- Wrap event listeners as reusable hooks when traits need to consume those events.
- Prefer `protected` over `private` for decor, event, and frame listener methods.
- Decorate Phaser game-object properties owned by views with `@useGraph()`.
- Write simple getters on one line.

## Business Rules

- An app contains one game.
- A game contains one regions model.
- A game contains one tasks model.
- A game contains one team.
- A game contains one calendar.
- A calendar has 60 days per year.
- Each calendar proceed advances half a day.
- Each calendar proceed emits a time proceed event.
- The first 40 days of a calendar year are spring; the last 20 days are winter.
- A regions model contains one refuge and one forest.
- A tasks model contains multiple tasks.
- A task controls availability through its actived state.
- A task contains one prior attribute.
- Tasks update availability by consuming time proceed events.
- Sloe can be harvested during spring days 15 through 25.
- Refuge is the first region on a map.
- Forest is the second region on a map.
- A team contains multiple roles.
- A role contains one root traits model exposed as `traits`.
- A role traits model contains one starvation trait.
- `RoleTraitModel` extends `TraitModel` and only adds the role relation.
- A trait can contain multiple nested traits.
- A role contains one strength.
- Starvation is implemented as a trait subtype.
- Starvation consumes role nutrition on each time proceed and updates its level from remaining nutrition.
- Region, item, role, trait, and task base models are abstract.

## Similar Practice References

- Attribute implementation: `src/model/strength.ts`
- State implementation: `src/model/starvation.ts`
- Route helper implementation: `src/model/game/index.ts`
