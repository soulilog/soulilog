import { defineConfig } from 'vitepress';

export default defineConfig({
    lang: 'de-DE',
    srcDir: './src',
    title: "Soulilog",
    description: "Ein Flüstern im Sturm der Meinungen.",
    appearance: 'force-dark',
    themeConfig: {
        siteTitle: 'I am.',
        nav: [],
        sidebar: [
            {
                text: 'Essays',
                items: [
                    {
                        text: 'Im Käfig der Wahrnehmung',
                        link: '/essay/im-kaefig-der-wahrnehmung.html',
                    },
                ]
            },
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/soulilog/soulilog.github.io' },
        ],

        outline: {
            label: 'Inhaltsübersicht',
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025-present Soulilog'
        },

        docFooter: {
            prev: 'Vorherige Seite',
            next: 'Nächste Seite'
        },
    },
});
