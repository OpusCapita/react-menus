const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:
    {
        headerMenu: './src/client/HeaderMenu',
        currencies: './src/client/SidebarMenu'
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
        modules: ['node_modules'],
        extensions: ['.json', '.jsx', '.js']
    },

    resolveLoader:
    {
        modules: ['node_modules']
    },

    module:
    {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: [path.join(__dirname, 'src/client')],
                options:
                {
                    presets: [
                        ['es2015',
                        {
                            modules: false
                        }],
                'react',
                'stage-0'
                ]}
            }
        ]
    }
}
