import Route from 'ember-route-template';
import Intl from '@zestia/ember-rich-intl/components/intl';

export default Route(
  <template>
    <h1>
      @zestia/ember-rich-intl
    </h1>

    <Intl @string="Hello <World>World</World>" as |intl|>
      <intl.World>🌎</intl.World>
    </Intl>

    {{outlet}}

    {{! template-lint-disable no-inline-styles }}
    <a href="https://github.com/zestia/ember-rich-intl">
      <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
        class="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </a>
  </template>
);
