# frontend-builder-feature-form

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test frontend-builder-feature-form` to execute the unit tests.

## Component structure

This Library is overall responsible for the client creation of the poker tables. It provides the user with a form, and if valid information is entered, then it creates the table and redirects them to the created table.

> **FrontendBuilderFormFeature**
>
> The component that handles the interactions with the component store. aka smart component.
>
> > **FrontendBuilderFormUI**
> >
> > The component that is responsible for displaying the form and sending user input the the parent smart component. aka dumb component.
