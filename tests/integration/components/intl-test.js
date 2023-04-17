import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | intl', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    assert.expect(1);

    this.input =
      'Hello, this is a <Button>test string</Button> that can be ' +
      '<Link>translated</Link> into multiple languages. ' +
      'Inside it there are tokens such as <Icon />  or <Tag/> which are swapped for ' +
      'components allowing for dynamic content.';

    this.output =
      'Hello, this is a <button type="button">test string</button> that can be ' +
      '<a href="https://capsulecrm.com">translated</a> into multiple languages. ' +
      'Inside it there are tokens such as <img src="icon.png" alt="Icon"> or <span>test</span> which are swapped for ' +
      'components allowing for dynamic content.';

    await render(hbs`
      <Intl @string={{this.input}} as |intl|>
        <intl.Button as |string|>
          <button type="button">{{string}}</button>
        </intl.Button>
        <intl.Link as |string|>
          <a href="https://capsulecrm.com">{{string}}</a>
        </intl.Link>
        <intl.Icon>
          <img src="icon.png" alt="Icon" />
        </intl.Icon>
        <intl.Tag>
          <span>test</span>
        </intl.Tag>
      </Intl>
    `);

    assert.strictEqual(
      this.element.innerHTML
        .trim()
        .replace(/<!---->/g, '')
        .replace(/\s+/g, ' '),
      this.output
    );
  });
});
