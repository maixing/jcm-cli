const frameWorkPrompt = [{
    type: 'list',
    name: 'type',
    message: '请选择框架',
    choices: [{
            name: 'react',
            value: {
                name: 'react',
                url: ''
            }
        },
        {
            name: 'vue3-demo',
            value: {
                name: 'vue3-demo',
                url: 'github:maixing/vue3-demo#main'
            }
        }
    ]
}]
const reactPrompt = [{
    type: "list",
    name: "type",
    message: "请选择React工程类型: ",
    choices: [{
            name: "JS版",
            value: {
                url: "github:maixing/ultra-react#master",
                name: "JS版",
            },
        },
        {
            name: "TS版",
            value: {
                url: "github:maixing/ultra-react-ts#master",
                value: "TS版",
            },
        },
    ],
}]
module.exports = {
    frameWorkPrompt,
    reactPrompt
}