# Poker Moons Colour Guide

This guide is to give a basic understanding of the colour scheme followed in this project. It will display how to use the global colour scheme, as well as show you which colour you should be using.

## Base Colours

> **Primary**
>
> > This colour will be used for branding, non-poker game based actions that are essential to click buttons.

> **Secondary**
>
> > This colour will be used for buttons that don't need to be click and as the term states "Secondary" things that should compliment "Primary" not take the focus away from it.

> **Foreground**
>
> > Will be the colour between the background and the "Primary" and "Secondary" UI elements.

> **Background**
>
> > Used to give contrast to the UI layers above.

> **Success**
>
> > Colour that will be displayed in the case of a successful action.

> **Warning**
>
> > Colour that will be displayed when the user should be warned.

> **Error**
>
> > Colour that will be displayed when an error has occurred.

## Transforms

> **Tinted**
>
> > Used to give a slightly brighter tint to the base colour. This will be used to compliment the default base colour.

> **Shaded**
>
> > Used to give a slightly darker shade to the base colour. This will be used to compliment the default base colour.

> **Alpha-50**
>
> > This reduces the opacity fo the colour by 50%.

> **Alpha-25**
>
> > This reduces the opacity fo the colour by 75%.

## Usage in `scss files`

```scss
// base colour
img {
    border: 1px solid var(--primary);
}
// base colour with transform
img {
    border: 1px solid var(--primary-alpha-25);
}
```

## References

-   [aesthetic-sass-colours](https://www.digitalocean.com/community/tutorials/aesthetic-sass-2-colors)
-   [color in ux design](https://uxdesign.cc/how-to-use-color-in-ux-design-9ba6db4807d5)
