# PokerMoons Poker Chip Display in W.A.S.M. via RUST

For curiosity sake I've compared the performance of rendering our poker chips in `Angular` vs W.A.S.M `Rust`.

## Results:

`Angular`: ~35ms per rerender of a $499999 chip stack

`Rust`: ~30μs per rerender of a $499999 chip stack

**Yes you are seeing ^this right, milliseconds to microseconds**

## Usage

If you wish to serve the rust app locally follow these steps.

1. Install rust `https://www.rust-lang.org/tools/install`
2. Install trunk `cargo install --locked trunk`
3. Serve app `trunk serve` at http://localhost:8080

![Image of web app](./assets/img.png)
