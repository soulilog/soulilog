<template>
    <Layout>
        <template #nav-bar-content-before>
            <div class="claim-wrapper">
                <div class="claim-inner">Ein Flüstern im Sturm der Meinungen.</div>
            </div>
        </template>

        <template
            #doc-footer-before
            v-if="publishedAt"
        >
            <div class="published-at text-right">
                - veröffentlich am {{ publishedAt }} Uhr
            </div>
        </template>
    </Layout>
</template>
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { ref, watchEffect } from "vue";
import { useData } from 'vitepress';

const { Layout }      = DefaultTheme;
const { frontmatter } = useData();
const publishedAt     = ref();

watchEffect(() => {
    if (frontmatter.value.published_at) {
        const formatter = new Intl.DateTimeFormat('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });

        publishedAt.value = formatter.format(new Date(frontmatter.value.published_at));
    }
});
</script>

