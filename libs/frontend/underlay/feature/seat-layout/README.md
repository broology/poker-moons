# frontend-underlay-feature-seat-layout

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test frontend-underlay-feature-seat-layout` to execute the unit tests.

## Component structure

Considering these components are part of the underlay. They will not likely be performing any actions on the state. They are readonly.

The components have been structured in this way to take the approach of fetching only absolutely required data into the components to limit excess re-rendering and prioritize page speed over developer ease.

> **SeatLayoutFeature**
>
> Responsible for fetching data in order to display the structure of the seats. This class needs to be structured carefully, as we don't want to be re-rendering seats unless absolutely required.
> _Currently doesn't do anything, but it will, when dealing with client player always displayed at bottom_
>
> > **SeatLayoutUI**
> >
> > Responsible for the ui orientation of the seats, client seat being at the bottom, and shifting each other player seats along the table.
> >
> > > **Seat**
> > >
> > > Responsible for fetching data for the specific Player at the seat. And piping it to the Display and Action components.
> > >
> > > > **SeatPlayer**
> > > >
> > > > Responsible for displaying the immutable data of the player at the seat, `username`, `picture`.... Not likely to re-render after joining the table
> > > >
> > > > **SeatAction**
> > > >
> > > > Responsible for displaying the mutable data of the player at the seat, `chips`, `action`, `cards`, `amount called`... Will re-render a lot
