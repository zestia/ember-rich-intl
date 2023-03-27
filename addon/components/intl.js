import Component from '@glimmer/component';
import { compileHBS } from 'ember-repl';

export default class IntlComponent extends Component {
  get template() {
    const parts = this._getPartsFromString(this.args.string);

    let hbs = '';

    parts.forEach((part) => {
      if (typeof part === 'object') {
        hbs += `{{yield "${part.content}" to="${part.name}"}}`;
      } else {
        hbs += part;
      }
    });

    return compileHBS(hbs);
  }

  /**
   * @param {string} string
   *
   * Given the following string: "Visit our <:link>documentation</:link>."
   * Return: ["Visit our ", {name: "link", content: "documentation"}, "."]
   */
  _getPartsFromString(string) {
    const regex = /(<:[\w'-]+>.*?<\/:[\w'-]+>)/g;

    const parts = string.split(regex).map((part) => {
      const matches = part.match(regex);

      if (matches !== null) {
        const blockName = part.match(/<:(.*?)>/)[1];
        const blockContent = part.match(/<:[\w'-]+>(.*?)<\/:[\w'-]+>/)[1];

        return {
          name: blockName,
          content: blockContent,
        };
      }

      return part;
    });

    return parts;
  }
}
