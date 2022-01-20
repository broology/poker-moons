# frontend-hud-feature-action-panel

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test frontend-hud-feature-action-panel` to execute the unit tests.

## Component structure

Considering these components are part of the HUD. They are the most player-interactive components.

This library is responsible for handling the actions made by the player onto the table. Joining, leaving, or performing an action onto the table.

> **ActionPanelFeature**
>
> Responsible for all direct interactions with the table state. Fetching the necessary data. And performing the necessary actions.
>
> > **ActionPanelUi**
> >
> > Responsible for displaying the correct set of controls depending on the state the client is in. Also responsible for passing only the required data
> > from the parent to the children.
> >
> > > **ActiveControls**
> > >
> > > Responsible for displaying the controls the player has when it's their turn during a round.
> > >
> > > **InActiveControls**
> > >
> > > Responsible for displaying the controls the player has when it's not their turn during a round.
> > >
> > > **SpectatorControls**
> > >
> > > Responsible for displaying the controls the player has when they haven't joined the game yet.
> > >
> > > _Possibilities_
> > >
> > > They could also be displayed for players who have run out of chips and want to continue watching the game.
