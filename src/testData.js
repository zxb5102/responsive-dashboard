var filters = {
    'adType|5':[
        {
            id:"@increment",
            name:/(右上角)|(左上角)|(对联)|(下面)/
        }
    ],
    'cls|5': [
        {
            id: "@increment",
            name:/(博彩)|(水果)|(玩具)/
        }
    ],
    'size|5': [
        {
            width:/[1-5]{3}/,
            height:/[1-5]{3}/
        },
    ],
    'cost': [
        {
            id: 1,
            name: 'cpa'
        },
        {
            id: 2,
            name: 'cpb'
        },
        {
            id: 3,
            name: 'cpc'
        },
        {
            id: 4,
            name: 'cpd'
        },
    ],

}
export {
    filters
}