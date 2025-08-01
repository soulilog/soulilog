import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { defineConfig } from 'vitepress';
import matter from 'gray-matter';

const baseUri = 'https://soulilog.github.io';
const root    = resolve(__dirname, '../src');
const essays  = globSync(resolve(root, '**/*.md'), {
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
        [ 'meta', { name: 'language', content: 'de' } ],
        [ 'meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' } ],
        [ 'meta', { name: 'theme-color', content: '#0e0f1c' } ],

        [ 'link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' } ],
        [ 'link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' } ],
        [ 'link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' } ],
        [ 'link', { rel: 'icon', sizes: 'any', href: '/favicon.ico' } ],

        [ 'link', { rel: 'sitemap', href: '/sitemap.xml' } ],
    ],

    themeConfig: {
        favicon: '/favicon.png',
        siteTitle: 'I am.',
        nav: [],
        sidebar: [
            {
                text: 'Essays',
                items: essayItems,
            },
        ],

        socialLinks: [
            { icon: 'instagram', link: 'https://www.instagram.com/praestigia_' },
            { icon: 'threads', link: 'https://www.threads.com/praestigia_' },
            { icon: 'x', link: 'https://x.com/Soulilog' },
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

    async transformHead({ pageData, siteData }) {
        const canonicalUrl = `${baseUri}/${pageData.relativePath}`
            .replace(/index\.md$/, '')
            .replace(/\.md$/, '.html')
        ;

        const title         = `${pageData.title} | ${siteData.title}`;
        const headline      = pageData.frontmatter.headline;
        const keywords      = pageData.frontmatter.keywords || [];
        const datePublished = pageData.frontmatter.published_at || null;

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "Article",
            name: pageData.title,
            headline,
            author: {
                "@type": "Person",
                name: "Alex Praestigia"
            },
            description: pageData.description,
            keywords,
            ...(datePublished ? { datePublished } : {}),
            url: canonicalUrl,
        };

        const head = [
            [ 'link', { rel: 'canonical', href: canonicalUrl } ],

            [ 'meta', { name: 'author', content: 'Alex Praestigia' } ],
            [ 'meta', { name: 'copyright', content: 'Copyright © 2025-present Soulilog' } ],
            [ 'meta', { name: 'robots', content: 'index, follow' } ],

            [ 'meta', { property: 'og:site_name', content: siteData.title } ],
            [ 'meta', { property: 'og:type', content: 'website' } ],
            [ 'meta', { property: 'og:title', content: title } ],
            [ 'meta', { property: 'og:description', content: pageData.description } ],
            [ 'meta', { property: 'og:image', content: `${baseUri}/soulilog-og.jpg` } ],
            [ 'meta', { property: 'og:height', content: '1200' } ],
            [ 'meta', { property: 'og:width', content: '630' } ],
            [ 'meta', { property: 'og:url', content: canonicalUrl } ],

            [ 'meta', { property: 'twitter:card', content: 'content="summary_large_image"' } ],
            [ 'meta', { property: 'twitter:title', content: title } ],
            [ 'meta', { property: 'twitter:description', content: pageData.description } ],
            [ 'meta', { property: 'twitter:image', content: `${baseUri}/soulilog-og.jpg` } ],
            [ 'meta', { property: 'twitter:site', content: '@Soulilog' } ],
            [ 'meta', { property: 'twitter:creator', content: '@Soulilog' } ],

            [ 'script', { type: 'application/ld+json' }, JSON.stringify(jsonLd) ],
        ];

        if (datePublished) {
            head.push(
                [ 'meta', { property: 'article:published_time', content: `${datePublished}` } ],
            );
        }

        return head;
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
    },
});
