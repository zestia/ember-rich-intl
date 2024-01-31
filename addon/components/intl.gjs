import Component from '@glimmer/component';

const Part = <template>{{yield @string}}</template>;

const api = (name, Component) => {
  return {
    [name]: Component
  };
};

export default class IntlComponent extends Component {
  get parts() {
    const regex = /(<[\w:'-]+>.*?<\/[\w:'-]+>|<[\w:'-]+ ?\/>)/g;

    return this.args.string.split(regex).map((part) => {
      const matches = part.match(regex);

      if (matches !== null) {
        const name = part.match(/<([\w:'-]+)\s?\/?>/)[1];

        let string = '';

        const matches = part.match(/<[\w:'-]+>(.*?)<\/[\w:'-]+>/);

        if (matches !== null) {
          string = matches[1];
        }

        return {
          string,
          name
        };
      }

      return part;
    });
  }

  <template>
    {{~#each this.parts as |part|~}}
      {{~#if part.name~}}
        {{~yield (api part.name (component Part string=part.string))~}}
      {{~else~}}
        {{~part~}}
      {{~/if~}}
    {{~/each~}}
  </template>
}
