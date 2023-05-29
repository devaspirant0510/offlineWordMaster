// @ts-check
const path = require("path")

module.exports = {
    entry:"./src/app.js",
    mode:"development",
    resolve:{
        extensions:['.js']
    },
    module:{
        rules:[
            {
                test:/\.m?js$/i,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    },
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,"dist")
    }

}