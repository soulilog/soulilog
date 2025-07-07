<template>
    <Layout>
        <template #nav-bar-content-before>
            <div class="claim-wrapper">
                <div class="claim-inner">Ein Flüstern im Sturm der Meinungen.</div>
            </div>
        </template>
    </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';


const { Layout } = DefaultTheme;
const { site, page, frontmatter } = useData();
</script>
