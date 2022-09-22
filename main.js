const jsonata = require('jsonata');

module.exports.templateTags = [{
    name: 'jsonata',
    displayName: 'JSONata',
    description: 'Use JSONata to filter a JSON object',
    args: [
      {
        displayName: 'JSON string',
        help: 'The valid JSON string to be filtered. Must be able to be parsed by JSON.parse().',
        type: 'string',
      },
      {
        displayName: 'JSONata Query Filter',
        encoding: 'base64', // So it doesn't cause syntax errors
        help: 'A valid JSONata query filter. For example: `$.store.books[$match(title,/lord.*rings/)].{ "title": title, "price": price }`',
        type: 'string',
      },
      {
        displayName: 'JSON Stringify Output',
        help: 'Check if you want to explicitly pass the output through JSON.stringify(). Helpful in rendering objects/arrays as strings.',
        type: 'boolean',
        defaultValue: false,
      }
    ],
    run(_context, jsonString, filter, stringifyOutput) {
        let body;
        try {
          body = JSON.parse(jsonString);
        } catch (err) {
          throw new Error(`Invalid JSON: ${err.message}`);
        }

        let results;
        try {
          const expression = jsonata(filter);
          results = expression.evaluate(body);
          if (stringifyOutput) {
            results = JSON.stringify(results);
          }
        } catch (err) {
          throw new Error(`Invalid JSONata query: \`${filter}\`\n\n ${err.message}\n\nRefer to the documentation http://docs.jsonata.org/overview.html`);
        }

        if (!results) {
          throw new Error(`JSONata query returned no results: \`${filter}\``);
        }

        return results;

    }
}]