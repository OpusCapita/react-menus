const path = require('path');
const webpack = require('webpack');

module.exports =
{
    entry:
    {
        headerMenu: './src/client/HeaderMenu',
        sidebarMenu: './src/client/SidebarMenu'
    },
    output:
    {
        path: path.resolve(__dirname, './src/server/static'),
        publicPath: '/static',
        filename: 'components/[name]-bundle.js',
        library: 'menus-[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    resolve:
    {
        modules: [process.env.NODE_PATH, 'node_modules'],
        extensions: ['.json', '.jsx', '.js']
    },

    resolveLoader:
    {
        modules: [process.env.NODE_PATH, 'node_modules']
    },

    module:
    {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, 'src/client')],
                options:
                {
                    presets: [['es2015',
                    {
                        modules: false
                    }], 'react', 'stage-0']
                }
            },
            {
                test: /\.svg$/,
                loader: 'babel-loader!svg-react-loader'
            }
        ]
    }
}
