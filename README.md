# insomnia-plugin-jsonata

`insomnia-plugin-jsonata` is an Insomnia REST Client Template Tag plugin that serves as an alternative to the builtin `JSONPath` Template Tag

This plugin uses the community-driven [JSONata NPM library](https://www.npmjs.com/package/jsonata) to query and transform JSON data.

---

[JSONata](http://jsonata.org/) allows a user to have greater control over the querying and manipulation of a JSON object than the builtin `JSONPath` template that utilizes the [JSONPath-Plus](https://github.com/JSONPath-Plus/JSONPath) library. In many ways, `JSONata` is more comparable to [jq](https://stedolan.github.io/jq/) than JSONPath with its extended functionality and ability to query and manipulate the object. The upside in using `JSONata` is that it is web native Javascript, whereas `jq` is written and built as a portable C single binary.

You can refer to [the docs](http://docs.jsonata.org/overview.html) for information on writing a JSONata query filter. It's pretty straightforward:

`$` as the root object

`.` notation for retrieving nested objects

`[]` filter by index or subquery

To emulate the examples that Insomnia provides regarding a hypothetical book store API:

| JSONata Query Filter | Action |
|----------------------|--------|
| `$.store.books.title`  | Get titles of all books in the store |
| `$.store.books[price < 10].title` | Get titles of books costing less than $10 |
| `$.store.books[-1]`   | Get the last book in the store |
| `$count($.store.books)` | Get the number of books in the store
| `$.store.books[$match(title, /lord.*rings/)]` | Get book by title regular expression

Further querying and manipulation can be done with `JSONata`, as is shown in these examples from a hypothetical book store:

| JSONata Query Filter | Action |
|----------------------|--------|
| `$sum($.store.cart.products.(price * quantity))` | Calculate the total sum of the products in the shopping cart |
| `$.store ~> $keys()` | Retrieve all of the object keys inside the `store` object
| `$.store.books.{ "title": title, "price": price }` | Get all books and only return their titles and prices

## Installation

This plugin may be installed as discussed in [Insomnia's "Introduction to Plugins" documentation](https://docs.insomnia.rest/insomnia/introduction-to-plugins#add-a-plugin).

1. Open Insomnia
2. Go to Application > Preferences
3. Go to "Plugins" tab
4. Type "insomnia-plugin-faker" in the "Install Plugin" field
5. Click "Install Plugin"

## Usage

### Add JSONata template tag

Use Template Tags (i.e., CTRL + SPACE, then find "JSONata") to add JSONata template tags.

![Screenshot](https://raw.githubusercontent.com/bbbco/insomnia-plugin-jsonata/master/jsonata_template_tag_edit.png)

### Template Arguments

**JSON string (string)**
The valid JSON string to be filtered. Must be able to be parsed by `JSON.parse()`.

**JSONata Query Filter (string)**
A valid JSONata query filter.
Anything as simple as `$` or `$.data.id` or even as complex as `$.store.books[$match(title,/lord.*rings/)].{ "title": title, "price": price }`

**JSON Stringify Output (boolean)**
Check this if you want to explicitly pass the output from JSONata through `JSON.stringify()`. This is helpful in rendering objects/arrays as strings.
