var Mock = require('mockjs')
Mock.mock('/getAllSites', {
    'rows|9': [{
        id:'@increment',
        domain: '@domain',
        name: /[a-z]{3}[A-Z]{5}/,
        category: /(category1)|(category2)|(category3)/,
        adNum: /[0-5]/,
        status: /[0-1]/,
        edit:false 
    }]
});
Mock.mock('/getSiteCategorys', {
    'rows': [{
        label: 'category1',
        value: 'category1'
    }, {
        label: 'category2',
        value: 'category2'
    }, {
        label: 'category3',
        value: 'category3'
    }]
});
// getSiteCategorys