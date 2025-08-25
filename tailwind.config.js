/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      screens: {
         'min-xs': { min: '415px' },   // iPhone XR/11 sonrası
         'min-sm': { min: '769px' },   // Tablet portrait sonrası
         'min-md': { min: '1025px' },  // Tablet landscape sonrası
         'min-lg': { min: '1281px' },  // HD+ desktop başlangıcı
         'min-xl': { min: '1367px' },  // Standart laptop üstü
         'min-2xl': { min: '1537px' }, // Yüksek çözünürlük desktop
         'min-3xl': { min: '1681px' }, // Ultra-wide başlangıcı

         '3xl': { max: '1680px' },
         '2xl': { max: '1536px' }, // Windows scaling altı
         xl: { max: '1366px' },    // Standart laptop
         lg: { max: '1280px' },    // HD desktop
         md: { max: '1024px' },    // Tablet landscape
         sm: { max: '768px' },     // Tablet portrait
         xs: { max: '414px' },     // Büyük telefon
      },
      extend: {
         colors: {
            textColor: '#E2E8F0',
            bodyColor: '#1E293B',
            primary: '#10B981',
            dark: '#0F172A'

         },
         fontFamily:{
            sansita: ["Sansita One"]
         },
         transitionTimingFunction: {
            format: 'cubic-bezier(0.19, 0.09, 0.82, 0.88)',
         },
         transitionDuration: {
            '0': '0ms',
            '50': '50ms',
            '100': '100ms',
            '150': '150ms',
            '200': '200ms',
            '250': '250ms',
            '300': '300ms',
            '350': '350ms',
            '400': '400ms',
            '450': '450ms',
            '500': '500ms',
            '550': '550ms',
            '600': '600ms',
            '650': '650ms',
            '700': '700ms',
            '750': '750ms',
            '800': '800ms',
            '850': '850ms',
            '900': '900ms',
            '1000': '1000ms'
         },
         animationDelay: {
            '0': '0ms',
            '50': '50ms',
            '100': '100ms',
            '150': '150ms',
            '200': '200ms',
            '250': '250ms',
            '300': '300ms',
            '350': '350ms',
            '400': '400ms',
            '450': '450ms',
            '500': '500ms',
            '550': '550ms',
            '600': '600ms',
            '650': '650ms',
            '700': '700ms',
            '750': '750ms',
            '800': '800ms',
            '850': '850ms',
            '900': '900ms',
            '1000': '1000ms'
         },
         zIndex: {
            ...[...Array(6).keys()].reduce((acc, n) => {
               acc[`${n}`] = `${n}`;
               return acc;
            }, {}),
            '10': '10', '20': '20', '30': '30', '40': '40',
            '50': '50', '60': '60', '70': '70', '80': '80', '90': '90', '100': '100',
         },
         keyframes: {
            ripple: {
               '0%': { opacity: '0', transform: 'scale(0.9) translateX(-50%) translateY(-50%)' },
               '1%': { opacity: '1' },
               '50%': { transform: 'scale(2.9)' },
               '100%': { opacity: '0', transform: 'scale(3.9)' },
            },
         },
      },
   },
  plugins: [
      
      /** Clamp Plugin */
      plugin(({ matchUtilities }) => {
         const vw = { min: 769, max: 1600 };

         const parseValue = (str) => {
            if (!str) return null;
            const trimmedStr = str.trim();
            const match = trimmedStr.match(/^(-?\d*\.?\d+)(rem|em|px|%|vh|vw)?$/);
            if (!match) return null;

            const val = parseFloat(match[1]);
            if (Number.isNaN(val)) return null;

            return {
               value: val,
               unit: match[2] || 'px',
            };
         };

         const clamp = (min, max, minVW = vw.min, maxVW = vw.max) => {
            if (min.unit !== max.unit) {
               console.warn(`[Clamp Plugin] Min (${min.value}${min.unit}) and Max (${max.value}${max.unit}) units do not match. Skipping.`);
               return null;
            }

            if (min.value > max.value) {
               [min, max] = [max, min];
               [minVW, maxVW] = [maxVW, minVW];
            }

            const unit = min.unit;
            if (min.value === max.value) return `${min.value}${unit}`;

            const slope = (max.value - min.value) / (maxVW - minVW);
            const yInt = -minVW * slope + min.value;

            return `clamp(${min.value}${unit}, ${yInt.toFixed(4)}${unit} + ${(slope * 100).toFixed(4)}vw, ${max.value}${unit})`;
         };

         // Desteklenen CSS özellikleri ve karşılık gelen CSS property'leri:
         const props = {
            // Spacing
            p: ['padding'],
            pt: ['paddingTop'],
            pr: ['paddingRight'],
            pb: ['paddingBottom'],
            pl: ['paddingLeft'],
            px: ['paddingLeft', 'paddingRight'],
            py: ['paddingTop', 'paddingBottom'],

            m: ['margin'],
            mt: ['marginTop'],
            mr: ['marginRight'],
            mb: ['marginBottom'],
            ml: ['marginLeft'],
            mx: ['marginLeft', 'marginRight'],
            my: ['marginTop', 'marginBottom'],

            gap: ['gap'],
            'gap-x': ['columnGap'],
            'gap-y': ['rowGap'],

            // Sizing
            w: ['width'],
            h: ['height'],
            size: ['width', 'height'],
            'min-w': ['minWidth'],
            'max-w': ['maxWidth'],
            'min-h': ['minHeight'],
            'max-h': ['maxHeight'],

            // Layout
            top: ['top'],
            right: ['right'],
            bottom: ['bottom'],
            left: ['left'],
            inset: ['top', 'right', 'bottom', 'left'],
            'inset-x': ['left', 'right'],
            'inset-y': ['top', 'bottom'],

            // Typography
            text: ['fontSize'],
            leading: ['lineHeight'],
            tracking: ['letterSpacing'],

            // Borders
            rounded: ['borderRadius'],
            border: ['borderWidth'],
            'border-t': ['borderTopWidth'],
            'border-r': ['borderRightWidth'],
            'border-b': ['borderBottomWidth'],
            'border-l': ['borderLeftWidth'],

            // Transforms (CSS değişkenleri)
            'translate-x': ['--tw-translate-x'],
            'translate-y': ['--tw-translate-y'],
         };

         const applyProp = (prop, value) =>
            Array.isArray(prop) ? Object.fromEntries(prop.map((p) => [p, value])) : { [prop]: value };

         Object.entries(props).forEach(([prefix, cssProp]) => {
            matchUtilities(
               {
                  [`clamp-${prefix}`]: (value) => {
                     const partsStr = value.split(',');
                     let finalValue;

                     if (partsStr.length === 2) {
                        const [min, max] = partsStr.map(parseValue);
                        if (!min || !max) return {};
                        finalValue = clamp(min, max);
                     } else if (partsStr.length === 4) {
                        const minVW = parseInt(partsStr[0].trim(), 10);
                        const maxVW = parseInt(partsStr[2].trim(), 10);
                        const min = parseValue(partsStr[1]);
                        const max = parseValue(partsStr[3]);

                        if (isNaN(minVW) || isNaN(maxVW) || !min || !max) return {};
                        finalValue = clamp(min, max, minVW, maxVW);
                     } else {
                        return {};
                     }

                     if (!finalValue) return {};
                     return applyProp(cssProp, finalValue);
                  },
               },
               {
                  values: {},
                  type: ['length', 'any'], // Daha esnek tip
               }
            );
         });
      }),

      /** Extra Utilities */
      plugin(({ addUtilities }) => {
         addUtilities({
            '.rounded-inherit': { 'border-radius': 'inherit' },
            '.font-heavy': { 'font-weight': '1000' },
            '.font-regular': { 'font-weight': '450' },
            '.text-fill-transparent': { '-webkit-text-fill-color': 'transparent' },
            '.transform-fill': { 'transform-box': 'fill-box' },
            '.transform-flat': { 'transform-style': 'flat' },
            '.transform-3d': { 'transform-style': 'preserve-3d' },
            '.backface-hidden': { 'backface-visibility': 'hidden' },
            '.backface-visible': { 'backface-visibility': 'visible' },
            '.writing-vertical-rl': { 'writing-mode': 'vertical-rl' },
            '.fixed-full': { 'position': 'fixed', 'left': '0', 'top': '0', 'width': '100%', 'height': '100%' },
            '.absolute-full': { 'position': 'absolute', 'left': '0', 'top': '0', 'width': '100%', 'height': '100%' },
            '.absolute-center': { 'position': 'absolute', 'left': '50%', 'top': '50%', 'transform': 'translate(-50%, -50%)' },
            '.before-full': { '&::before': { 'content': '""', 'position': 'absolute', 'left': '0', 'top': '0', 'width': '100%', 'height': '100%' } },
            '.after-full': { '&::after': { 'content': '""', 'position': 'absolute', 'left': '0', 'top': '0', 'width': '100%', 'height': '100%' } },
            '.before-center': { '&::before': { 'content': '""', 'position': 'absolute', 'left': '50%', 'top': '50%', 'transform': 'translate(-50%, -50%)' } },
            '.after-center': { '&::after': { 'content': '""', 'position': 'absolute', 'left': '50%', 'top': '50%', 'transform': 'translate(-50%, -50%)' } },
            '.full-cover': { 'width': '100%', 'height': '100%', 'object-fit': 'cover', 'object-position': 'center' },
            '.full-contain': { 'width': '100%', 'height': '100%', 'object-fit': 'contain', 'object-position': 'center' },
            '.flex-center': { 'display': 'flex', 'justify-content': 'center', 'align-items': 'center' },
            '.flex-between': { 'display': 'flex', 'justify-content': 'space-between', 'align-items': 'center' },
            '.line-clamp': { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', 'max-width': '100%' },
         });
      }),

      /** Color Vars */
      plugin(({ addBase, theme }) => {
         const extractColorVars = (obj, prefix = '') =>
            Object.entries(obj).reduce((acc, [k, v]) => {
               const key = `${prefix}-${k}`;
               if (typeof v === 'string') acc[`--color${key}`] = v;
               else Object.assign(acc, extractColorVars(v, key));
               return acc;
            }, {});
         addBase({ ':root': extractColorVars(theme('colors')) });
      }),

      /** Variants: toggle, hover, etc. */
      plugin(({ addVariant, matchUtilities, matchVariant, e }) => {
         addVariant('toggle', '&.toggle');

         addVariant('group-toggle', ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => `.group.toggle .${e(`group-toggle${separator}${className}`)}`);
         });

         matchVariant('group-toggle', (_, { modifier }) =>
            modifier ? `:merge(.group\\/${modifier}).toggle &` : `:merge(.group).toggle &`
         );

         addVariant('peer-toggle', ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => `.peer.toggle ~ .${e(`peer-toggle${separator}${className}`)}`);
         });

         matchVariant('peer-toggle', (_, { modifier }) =>
            modifier ? `:merge(.peer\\/${modifier}).toggle ~ &` : `:merge(.peer).toggle ~ &`
         );

         addVariant('group-not-hover', ':merge(.group):not(:hover) &');
         addVariant('not-hover', ':not(:hover) &');
         addVariant('starting', '@starting-style');

         matchUtilities({
            'translate-z': val => ({
               '--tw-translate-z': val,
               transform:
                  'translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) ' +
                  'rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) ' +
                  'scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))',
            }),
         }, { supportsNegativeValues: true });
      }),
   ]
}
