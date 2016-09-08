import './index.html'
import './css/main.css'
import './css/print.css'
import './js/main.js'
import 'file?name=[name].[ext]!./images/favicon.ico'

// LoadCSS requires both of these scripts to work, executed in global context
import 'script!../node_modules/fg-loadcss/src/loadCSS.js'
import 'script!../node_modules/fg-loadcss/src/cssrelpreload.js'