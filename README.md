# ember-i18n-component

Addon that provides a `<I18n>` component to help with putting more complex content inside of translation strings.


## Compatibility

* Ember.js v3.28 or above
* Ember CLI v3.28 or above
* Node.js v14 or above


## Installation

```
ember install ember-i18n-component
```

## Usage

```hbs
<I18n
  @string='Visit our <:link>support documentation</:link> or read our <:online-guide>online guide</:online-guide>.'
  as |Message|
>
  <Message>
    <:link as |string|>
      <a href="https://capsulecrm.com">{{string}}</a>
    </:link>

    <:online-guide as |string|><a href="https://capsulecrm.com/guide">{{string}}</a></:online-guide>
  </Message>
</I18n>
```

or without content:

```hbs
<I18n
  @string='Task for <:party></:party>'
  as |Message|
>
  <Message>
    <:party>
      <span class="tooltipper">
        <a href="party/123">
          Burger King
        </a>
      </span>
    </:party>
  </Message>
</I18n>
```

Expected to be used like:

```hbs
<I18n @string={{t "my-translation-key"}} as |Message|>
</I18n>
```

so we get intellisense.


## Alternatives

We could use the existing https://github.com/RuslanZavacky/ember-intl-component

The add-on looks great for putting a component directly into translation strings but there are a few reasons why I think we shouldn’t use it:

* It doesn’t seem to support wrapping text in a translation string with a component. So it supports doing `[[[my-component]]]` where `my-component` is the name of yieldable block, but there’s no way to yield some text to that block as far as I can see.

* I don’t think the syntax it uses `[[[]]]` is proper ICU message syntax. It would probably be okay but it would be better to stick to supported/understandable tags (like `<my-tag></my-tag>`) which I believe _is_ supported: https://formatjs.io/docs/core-concepts/icu-syntax/#rich-text-formatting

* Assuming the above two points weren’t an issue, the functionality the add-on provides isn’t that complex so it might actually be easier to mange this ourselves in a private/public addon 🤔
