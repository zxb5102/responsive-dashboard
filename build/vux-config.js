'use strict'

// const path = require('path')
// const fs = require('fs')
// const demoPath = path.resolve(__dirname, '../src/demo_list.json')

// const argv = require('yargs').argv
// argv.simulate = argv.simulate || false
function getElement() {
    var reqs = ['button', 'form-item', 'form', 'input', 'select', 'option',
     'card','table','table-column','dialog',
     'pagination','checkbox','checkbox-group','radio','radio-group',];
    var result = "";
    var reg = /-[a-z]/
    for (var item of reqs) {
        var itemOrigin = item;

        if(reg.test(item)){
            var match = reg.exec(item)[0];
            var res = match.replace('-').toUpperCase();
            item = item.replace(reg,res);
        }
        // if (item == 'form-item') {
        //     item = 'formItem';
        // }else if(item == 'table-column'){
        //     item = 'tableColumn'
        // }
        result += "import 'element-ui/lib/theme-chalk/" + itemOrigin + ".css';import " + item + " from 'element-ui/lib/" + itemOrigin + "';Vue.component(" + item + ".name," + item + ");";
    }
    return result;
}

module.exports = {
    //   options: {
    //     vuxDev: !argv.simulate, // true
    //     vuxSetBabel: argv.simulate, // false
    //     vuxWriteFile: false,
    //     env: 'dev'
    //   },
    plugins: [
        // 'vux-ui', 'inline-manifest',
        // {
        //   name: 'duplicate-style'
        // },
        // {
        //   name: 'progress-bar',
        //   envs: ['development']
        // },
        {
            name: 'js-parser',
            test: /main\.js/,
            fn: function (source) {
                var replaceStr = process.env.NODE_ENV === 'production'
                    ? ""
                    : "import './mock/mock'"
                var result = source.replace("'@mock'", replaceStr);
                result = result.replace("'@ElementUI'", getElement());
                return result;
            }
        },
        // {
        //   name: 'i18n',
        //   vuxStaticReplace: false,
        //   staticReplace: false,
        //   extractToFiles: 'src/locales/components.yml',
        //   localeList: ['en', 'zh-CN']
        // },
        // {
        //   name: 'less-theme',
        //   path: 'src/theme.less'
        // }
    ]
}

// function toDash(str) {
//   return str.replace(/([A-Z])/g, function (m, w) {
//     return '-' + w.toLowerCase();
//   }).replace('-', '')
// }
