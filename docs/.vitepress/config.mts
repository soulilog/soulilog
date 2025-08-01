import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { defineConfig } from 'vitepress';
import matter from 'gray-matter';

const root   = resolve(__dirname, '../src');
const essays = globSync(resolve(root, '**/*.md'), {
    ignore: resolve(__dirname, '../src/index.md'),
});

const essayItems = [];

essays.forEach((page) => {
    const raw = readFileSync(page, 'utf-8');
    const fm  = matter(raw).data
    const rel = page.replace(root, '');

    essayItems.push({
        text: fm.title,
        link: rel,
        publishedAt: fm.published_at,
    });
});

essayItems.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

export default defineConfig({
    lang: 'de-DE',
    srcDir: './src',
    title: "Soulilog",
    description: "Ein Flüstern im Sturm der Meinungen.",
    appearance: 'force-dark',

    head: [
        [ 'meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' } ],
        [ 'link', { rel: 'sitemap', href: '/sitemap.xml' } ],
    ],

    themeConfig: {
        siteTitle: 'I am.',
        nav: [],
        sidebar: [
            {
                text: 'Essays',
                items: essayItems,
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

    vite: {
        plugins: [{
            name: 'postprocess-html-generator-tag',
            apply: 'build',

            closeBundle() {
                setTimeout(() => {
                    const htmlFiles = globSync(resolve(__dirname, 'dist/**/*.html'));

                    for (const file of htmlFiles) {
                        writeFileSync(file, readFileSync(file, 'utf-8').replace(
                            /<meta name="generator" content="VitePress v[^"]+">/,
                            '<meta name="generator" content="Whispermark">'
                        ));
                    }
                }, 1000);
            },
        }],
    }
});
