var Mock = require('mockjs')
import { filters } from '../testData'
// getSitList
var siteList = {
    'total': /[3-8][0-9]/,
    'rows|10': [{
        siteId: '@increment',
        url: '@domain',
        name: /[a-z]{3}[A-Z]{5}/,
        cls: /(博彩)|(化妆品)|(水果)/,
        adCount: /[0-5]/,
        status: /[0-1]/,
        // edit: false
    }]
}
Mock.mock('/getAllPlans', {
    'rows|10': [{
        id: '@increment',
        name: /[a-z]{3}[A-Z]{5}/,
        price: /[1-8] 元\/每次/,
        period: /(周结)|(月结)|(日结)/
    }]
});
Mock.mock('/getZoneFilter', {
    'size|5': [{
        value: /[1-9]{3} x [1-9]{3}/,
        label: /[1-9]{3} x [1-9]{3}/
    }],
    'domain|3': [{
        value: '@domain',
        label: '@domain'
    }],
    'settleType|4': [{
        value: /(cap)|(cac)|(cam)|(cad)/,
        label: /(cap)|(cac)|(cam)|(cad)/
    }]
});
Mock.mock('/getZoneList', {
    'total': 50,
    'rows|10': [{
        name: /[a-z]{9}/,
        site: '@domain',
        size: /[1-9]{3} x [1-9]{3}/,
        preview: '@image',
        settleType: /(cpa)|(cpc)|(cpm)/,
        category: /(category1)|(category2)|(category3)/
    }]
});
Mock.mock('/Plan/Conditions', filters);
Mock.mock('/Plan/List', {
    'total': /[3-8][0-9]/,
    'rows|10': [{
        planId: '@increment',
        name: /[a-z]{3}[A-Z]{5}/,
        price: /[1-9]元\/每次/,
        cost: /(cpa)|(cps)|(cpm)|(cpc)/,
        cycle: /[年月日]结/,
        cls: /(博彩)|(化妆品)|(水果)/,
        logo:'@image'
    }]
});
Mock.mock('/getAllAds', {
    'rows|10': [{
        name: /[a-z]{10}/,
        demand: /[a-z]{10}/,
        chargePattern: /(cpa)|(cps)|(cpm)|(cpc)/,
        price: /[1-9]元\/每次/,
        size: /[1-9]{3} x [1-9]{3}/,
        preview: '@image',
        period: /[年月日]结/
    }]
});
Mock.mock('/getAccountInfo', {
    name: '@first',
    phone: /[0-9]{9}/,
    mail: /[a-z]{5}@[a-z]{2}\.com/,
    bankName: "支付宝",
    bankName2: "",
    bankAccountNum: /[0-9]{9}/,
    bankAccountName: '@first'
});
Mock.mock('/getSitList', siteList);
Mock.mock('/Site/List', siteList);
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