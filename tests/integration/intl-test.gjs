import { module, test, assert } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, getRootElement } from '@ember/test-helpers';
import Intl from '@zestia/ember-rich-intl/components/intl';

module('Integration | Component | intl', function (hooks) {
  setupRenderingTest(hooks);

  const assertHTML = (expecting) => {
    assert.strictEqual(
      getRootElement()
        .innerHTML.trim()
        .replace(/<!---->/g, '')
        .replace(/\s+/g, ' '),
      expecting
    );
  };

  test('block syntax', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Intl @string="Get <Link>support</Link>" as |intl|>
          <intl.Link as |string|>
            <a href="https://capsulecrm.com/support">{{string}}</a>
          </intl.Link>
        </Intl>
      </template>
    );

    assertHTML('Get <a href="https://capsulecrm.com/support">support</a>');
  });

  test('self closing syntax', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Intl @string="Hello <World />" as |intl|>
          <intl.World>🌎</intl.World>
        </Intl>
      </template>
    );

    assertHTML('Hello 🌎');
  });

  test('missing components', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Intl @string="Hello <World />" />
      </template>
    );

    assertHTML('Hello ');
  });

  module('not supported', function () {
    test('nested block syntax', async function (assert) {
      assert.expect(1);

      await render(
        <template>
          <Intl
            @string="Visit <Link>the <Blink>destination</Blink></Link>"
            as |intl|
          >
            <intl.Link as |string|>
              <a href="#">{{string}}</a>
            </intl.Link>
          </Intl>
        </template>
      );

      assertHTML(
        'Visit <a href="#">the &lt;Blink&gt;destination</a> &lt;/Link&gt;'
      );
    });

    test('nested self closing syntax', async function (assert) {
      assert.expect(1);

      await render(
        <template>
          <Intl @string="Visit <Link><Image /> destination</Link>" as |intl|>
            <intl.Link as |string|>
              <a href="#">{{string}}</a>
            </intl.Link>
          </Intl>
        </template>
      );

      assertHTML('Visit <a href="#">&lt;Image /&gt; destination</a>');
    });

    test('mixed with HTML', async function (assert) {
      assert.expect(1);

      await render(
        <template>
          {{! template-lint-disable require-valid-alt-text }}
          <Intl @string="<Image /> <em>really</em> interesting" as |intl|>
            <intl.Image>
              <img />
            </intl.Image>
          </Intl>
        </template>
      );

      assertHTML('<img> interesting');
    });
  });
});
