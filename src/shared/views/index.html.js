const renderHtml = (
  {
    body,
    scripts,
    styles
  } = {}
) => `<!DOCTYPE html>
<html>

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">

    ${typeof styles !== "undefined" ? styles : ""}

    <title>React Isomorphic Starter Kit</title>
  </head>

  <body>
    <div id="app">${typeof body !== "undefined" ? body : ""}</div>

    ${typeof scripts !== "undefined" ? scripts : ""}
  </body>

</html>
`;

module.exports = renderHtml;
