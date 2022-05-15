module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            boxShadow: {
                neumorph:
                    '0.05em 0.05em 0.1em #99b5d2, -0.05em -0.05em 0.1em #fff'
            }
        },
        fontFamily: {
            light: ['"GT Planar Light"'],
            regular: ['"GT Planar"'],
            bold: ['"GT Planar Bold"']
        }
    },
    plugins: []
};
