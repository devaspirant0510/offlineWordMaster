const path = require("path")
const {Configuration} = require("webpack")

/** 
 * @type {Configuration} 
 */
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
    },
    devServer:{
        static:{
            directory:path.join(__dirname,"dist")

        },
        compress:true,
        port:8080
    }
}