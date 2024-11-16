async function main() {
    const babel = require("babel-core")
    const fs = require("node:fs/promises")


    var source = await fs.readFile("src/index.js", {
        encoding:
            "utf-8"
    });
    const minified = babel.transform(source, { presets: ["minify"] }).code;

    const bookmarklet = "javascript:" + encodeURIComponent(minified);

    const installer = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>High Seas Toolkit Bookmarklet Installer</title>
</head>
<body>
    <p>To install the bookmarklet, drag the emoji below into your bookmarks bar.</p>
    <a href="${bookmarklet}">⚓</a>
</body>
</html>`;

    await fs.writeFile("dist/bookmarklet.html", installer);
    await fs.writeFile("./index.html", installer);
}
main()