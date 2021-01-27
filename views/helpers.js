const Handlebars = require('handlebars');

Handlebars.registerHelper('recipe', function (items, options) {
    const itemAsHtml = items.map(item => "<li>" + options.fn(item.ingredients) + "</li>");
    return "<ul>\n" + itemsAsHtml.join("\n") + "\n</ul>";
})