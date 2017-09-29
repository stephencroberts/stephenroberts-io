var fs = require('fs');

hexo.extend.filter.register('after_render:html', function(str, data) {
  var matches,
      newStr = str,
      imageRegex = /<img\s[^>]+?src(\s+)?=[(\s+)"]?([^>\s"]+)[^>]*>/gi;

  while ((matches = imageRegex.exec(str)) !== null) {
    var src = matches[2],
        path = hexo.theme_dir + 'source/' + src,
        data = fs.readFileSync(path),
        base64 = data.toString('base64');

    if (data.length < 100000) {
      var newSrc = matches[0].replace(/(src(\s+)?=[(\s+)"]?)[^>\s"]+/, '$1data:image/png;base64,' + base64 + '$2');
      newStr = newStr.replace(matches[0], newSrc);
    }
  }

  return newStr;
});
