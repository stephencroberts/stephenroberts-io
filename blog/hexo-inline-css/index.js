var fs = require('fs');

hexo.extend.helper.register('css', function() {
  var result = '';
  var path = '';
  var inline = arguments[arguments.length - 1] === true;

  for (var i = 0, len = arguments.length; i < len; i++) {
    path = arguments[i];

    if (i) result += '\n';

    if (Array.isArray(path)) {
      result += cssHelper.apply(this, path);
    } else if (typeof path === 'string' || path instanceof String) {
      if (path.indexOf('?') < 0 && path.substring(path.length - 4, path.length) !== '.css') path += '.css';
      if (inline) {
        var css = fs.readFileSync(hexo.theme_dir + 'source/' + path, 'utf-8');
        var filteredCSS = hexo.execFilterSync('after_render:css', css, { context: hexo, args: [{path: path}]});
        result += filteredCSS;
      } else {
        result += '<link rel="stylesheet" href="' + this.url_for(path) + '">';
      }
    }
  }

  return inline ? '<style>' + result + '</style>' : result;
});
