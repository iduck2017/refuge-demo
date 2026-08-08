## Agent Operating Rules

- Do not install dependencies unless the user explicitly asks for it.
- Do not deploy the project unless the user explicitly asks for it.
- Do not start development servers or runtime processes unless the user explicitly asks for it.
- When dependencies, deployment, or server startup may be needed, explain the required commands and wait for the user to run or approve them.
- Before editing the project for the first time, read the set-piece README at `../set-piece/readme.md`.

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
- Keep constructor `props` optional for abstract, base, group, and intentionally configurable models.
- Final concrete model classes do not define or accept `props`; write their fixed instance values directly in the constructor.
- Create each new model as a folder with an `index.ts` entry file. Import folder models through explicit `index` paths.
- Keep singular base models in the plural folder `index.ts`; when a group model exists, keep it in `group.ts`.
- Do not add forwarding exports from unrelated or parent module entry files.
- Do not use TypeScript escape hatches in application code: no definite assignment assertions (`!:`), type assertions (`as`), or `any`.
- Do not declare explicit return types on getters; array getters must return a shallow copy with `[...value]`.
- Decorate every getter with `@useMemo()` so dependency collection does not break across getter calls.
- Wrap event listeners as reusable hooks when traits need to consume those events.
- Keep every custom `useXxx` hook in a `src/hooks/use-xxx.ts` module.
- Name ancestor route hooks `useXxxRoute` and their files `use-xxx-route.ts`.
- Route hooks import their runtime target model constructors from `src/index.ts`
  instead of source modules to avoid direct circular initialization.
- Prefer `protected` over `private` for decor, event, and frame listener methods.
- Decorate Phaser game-object properties owned by views with `@useGraph()`.
- Write simple getters on one line.

## Model File Organization Rules

- Every TypeScript file under `src/model` must define at least one model class.
- Prefix every non-entity model with its owning entity name, such as
  `AssetFreshnessModel` for an asset's freshness.
- Keep the application root model at `src/model/app.ts`.
- Put shared model foundations, abstract models, group models, and reusable
  child models under `src/model/common/<domain>`.
- Use a singular domain folder under `common`, such as `common/asset`,
  `common/role`, and `common/task`.
- Put concrete domain entities under a plural top-level category, such as
  `assets`, `events`, and `regions`.
- Give each concrete entity or feature its own singular kebab-case folder, such
  as `assets/bread`, `events/wild-fruit-season`, and `regions/forest`.
- Keep a feature-specific model inside its owning feature folder. For example,
  keep the trait and task used only by `wild-fruit-season` beside that event.
- Keep models owned by `RoleAttrsModel` under `common/role/attrs`; role trait
  models belong under `common/role/trait`.
- Keep simple attr and state specializations as flat files under the
  owning domain, such as `common/asset/nutrition.ts`.
- Use `index.ts` for the primary model of a folder.
- Use `group.ts` for the model that owns a collection of the folder's primary
  models.
- Keep small supporting models in descriptively named sibling files. Promote a
  supporting model to its own folder when it gains its own children or related
  files.
- Import folder models through explicit `index` paths.
- Do not add forwarding exports to parent model folders. Export public models
  only from the package entry point when external access is required.
- Keep each model in one canonical location. Do not duplicate shared models
  inside concrete entity folders.
- Move a model into `common` only when it defines shared domain structure or is
  reused by multiple concrete models. Keep concrete gameplay content out of
  `common`.

## Business Rules

- An app contains one game.
- An app can contain one app view.
- A game contains one regions model.
- A game contains one tasks model.
- A game contains one events model.
- A game contains one roles model exposed as `roles`.
- A game contains one calendar.
- A game starts with two bread assets.
- A calendar has 60 days per year.
- Each calendar proceed advances half a day.
- Each calendar proceed emits a time proceed event.
- The first 40 days of a calendar year are spring; the last 20 days are winter.
- A regions model contains one refuge and one forest.
- A tasks model contains multiple tasks.
- A task controls availability through its actived state.
- A task contains one prior attr.
- Tasks update availability by consuming time proceed events.
- An event model represents a gameplay event, not a code-level event.
- Sloe can be harvested during spring days 15 through 25.
- Refuge is the first region on a map.
- Forest is the second region on a map.
- A forest contains one root traits model exposed as `traits`.
- A forest creates a `TraitsModel` containing wild fruit season.
- Wild fruit season consumes time proceed events and adds its gameplay event
  during spring days 15 through 25.
- A roles model exposes its role collection as `items`.
- A role has a name and description.
- A role contains one root attrs model exposed as `attrs`.
- A role attrs model contains one gathering model and one strength model.
- A role contains one root state model exposed as `state`.
- A role state model contains one satiety model and one vitality model.
- A role contains one root traits model exposed as `traits`.
- A role creates a `TraitsModel` with starvation first, followed by traits
  supplied through `RoleProps`.
- A `TraitsModel` never adds defaults; its parent model controls all input.
- `RoleTraitModel` extends `TraitModel` and only adds the role relation.
- A role can handle only one task at the same time.
- A trait can contain multiple nested traits.
- An assets model has a size and rejects assets when it is full.
- An asset has a name.
- A role contains one assets model.
- Strength, gathering, vitality, and task priority extend `AttrModel`.
- Role satiety and asset freshness implement their numeric state directly.
- Asset nutrition extends `AttrModel`.
- Numeric attrs expose `origin`, `offset`, and a derived `current` value.
- Numeric states expose `origin`, `offset`, `loss`, and a derived `current`
  value.
- Starvation is implemented as a trait subtype.
- Starvation consumes role satiety on each time proceed and updates its level from remaining satiety.
- Region, asset, role, trait, and task base models are abstract.

## Similar Practice References

- Attr implementation: `src/model/common/attr.ts`
- Satiety implementation: `src/model/common/role/satiety.ts`
- Freshness implementation: `src/model/common/asset/freshness.ts`
- Route hook implementation: `src/hooks/use-game-route.ts`
