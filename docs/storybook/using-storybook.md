## Why use storybook?

Story book is a UI interface that allows you to preview UI components and develop them in isolation. This is nice for two reasons: One being that you don't need to serve the entire app to see what the component looks like, Two as this lets you easily setup all edge cases of dynamic ui components in so called "stories" and easily switch between them. Which makes it much easier to develop initially and change or add to in the future.

There is advantages to regression tests with cypress on the storybook, but isn't always necessary.

## Adding storybook to an nx library

After you've created a nx angular library, it will not have storybook by default. In-order to add storybook to the library run:

```cli
yarn storybookify <LIBRARY_NAME>
```

**You will be prompted with options**:

`Configure a Cypress e2e app to run against the storybook instance? (Y/n)`

_If you plan to write cypress e2e component tests for the storybook instance._

`Automatically generate *.stories.ts files for components declared in this project?`

_This will automatically create the \*.stories.ts files for the angular components_

` Automatically generate *.spec.ts files in the generated Cypress e2e app?`

_If you plan to write cypress e2e tests on the storybook._

Now the nx library will be configured to use storybook. To run the storybook ui:

```cli
yarn nx storybook <LIBRARY_NAME>
```
