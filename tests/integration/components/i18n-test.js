import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | i18n', function (hooks) {
  setupRenderingTest(hooks);

  test('it replaces blocks in string with actual yielded named blocks', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <div class="text">
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
      </div>
    `);

    assert
      .dom('.text')
      .hasText('Visit our support documentation or read our online guide.');

    assert
      .dom('a[href="https://capsulecrm.com"]')
      .hasText('support documentation');

    assert
      .dom('a[href="https://capsulecrm.com/guide"]')
      .hasText('online guide');
  });

  test('empty named blocks', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <div class="text">
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
      </div>
    `);

    assert.dom('.text').hasText('Task for Burger King');

    assert
      .dom('.tooltipper')
      .exists('it renders the content inside the named block');
  });
});
