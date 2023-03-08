/** @type {import('tailwindcss').Config} */
module.exports = {
        content: ['./src/**/*.{html,js,svelte,ts}'],
        theme: {
                extend: {
                        ringWidth: {
                                3: '3px'
                        },
                        transitionProperty: {
                                colors: 'color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow',
                                layout: 'inset,transform,height,min-height,max-height,width,min-width,max-width,margin,padding,outline-color,opacity,font-size',
                                quick: 'box-shadow,color,background-color,border-color,text-decoration-color,fill,stroke,inset,transform,height,min-height,max-height,width,min-width,max-width,margin,padding,outline-color,opacity,font-size'
                        }
                },
                colors: {
                        primary: 'var(--clr-primary)',
                        secondary: 'var(--clr-secondary)'
                }
        },
        plugins: [
                require('@tailwindcss/typography'),
                require('@tailwindcss/line-clamp'),
                require('@tailwindcss/forms')
        ]
};
