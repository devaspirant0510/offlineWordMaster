const path = require("path")
const {Configuration} = require("webpack")

/** 
 * @type {Configuration} 
 */
module.exports = {
    entry:"./src/app.js",
    mode:"development",
    resolve:{
        alias:{
            // "@Domain":path.resolve(__dirname,"src/Domain"),
            // "@Data":path.resolve(__dirname,"src/Data/repository"),
            // "@Layout":path.resolve(__dirname,"src/View/layouts"),
            // "@ViewModel":path.resolve(__dirname,"src/ViewModel")

        },
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
    },
    devServer:{
        static:{
            directory:path.join(__dirname,"dist")

        },
        compress:true,
        port:8080
    }
}