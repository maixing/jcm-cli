const frameWorkPrompt = [{
    type: 'list',
    name: 'type',
    message: '请选择框架',
    choices: [{
            name: 'react',
        },
        {
            name: 'vue',
            url: 'github:maixing/vue3-demo#main'
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