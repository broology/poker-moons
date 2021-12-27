# frontend-underlay-feature-table-display

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test frontend-underlay-feature-table-display` to execute the unit tests.

## Component structure

Considering these components are part of the underlay. They will not likely be performing any actions on the state. They are readonly.
The components are structured in a way that can be greatly optimized. But doesn't seem to be worth the performance benefit right now.

This component overall is responsible for displaying to the player what is the status of the active round.

> **TableDisplay**
>
> Responsible for fetching data from the state that will be displayed in it's child components.
>
> > **CommunityCards**
> >
> > Responsible for the ui orientation of the community cards on the table.
> > At some point the animation of the cards will be handled here aswell
> >
> > **Pot**
> >
> > Responsible for the display of the active chip amount in the round.
> > At some point will need to handle the case of `sidePots` when we handle all the `all-in` cases.
> >
> > **Status**
> >
> > Responsible for letting the player know what the current status of the game is.
> > This will need to be significantly built on. As I'm not sure if this should control pointing at the active player.
> > And if this should handle displaying the winner of the last round. I'm thinking that'll be handled by the state it-self creating a popup.
