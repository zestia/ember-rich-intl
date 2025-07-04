# @zestia/ember-rich-intl

<!-- [![Ember Observer][ember-observer-badge]][ember-observer-url] -->
<!-- [![GitHub Actions][github-actions-badge]][github-actions-url] -->

[npm-badge]: https://img.shields.io/npm/v/@zestia/ember-rich-intl.svg
[npm-badge-url]: https://www.npmjs.com/package/@zestia/ember-rich-intl
[github-actions-badge]: https://github.com/zestia/ember-rich-intl/workflows/CI/badge.svg
[github-actions-url]: https://github.com/zestia/ember-rich-intl/actions
[ember-observer-badge]: https://emberobserver.com/badges/-zestia-ember-rich-intl.svg
[ember-observer-url]: https://emberobserver.com/addons/@zestia/ember-rich-intl

This Ember addon works in conjunction with [ember-intl](https://github.com/ember-intl/ember-intl). It swaps [ICU message syntax](https://formatjs.io/docs/core-concepts/icu-syntax/#rich-text-formatting) for components, allowing for dynamic content within translated strings.

**Important note:** We recommend limiting usage of components in translation strings. The majority of the time, its possible to reword the string, or reconsider the design instead.

## Installation

```
ember install @zestia/ember-rich-intl
```

Add the following to `~/.npmrc` to pull @zestia scoped packages from Github instead of NPM.

```
@zestia:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR_GH_TOKEN>
```

## Demo

https://zestia.github.io/ember-rich-intl

## Example

```hbs
<Intl @string='View <More>more</More>' as |intl|>
  <intl.More as |string|>
    <button type='button {{on "click" this.viewMore}}'>
      {{string}}
    </button>
  </intl.More>
</Intl>
```

## `Intl`

### Arguments

#### `@string`

Required. The text within which to find parts.

### API

When a token is found, and a component is rendered in its place, that component will will yield:

#### `string`

Optional. The matched part
