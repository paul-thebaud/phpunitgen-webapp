<template>
    <BCol md>
        <p class="text-uppercase font-weight-bold">
            {{ this.title }}
        </p>
        <ul>
            <li v-for="link in links"
                :key="link.url">
                <b-link v-if="link.href.indexOf('/') !== 0"
                        :href="link.href"
                        target="_blank"
                        rel="noopener">
                    {{ link.title }}
                </b-link>
                <b-link v-if="link.href.indexOf('/') === 0"
                        :to="link.href">
                    {{ link.title }}
                </b-link>
            </li>
        </ul>
    </BCol>
</template>

<script>
    export default {
        props: {
            title: {
                required: true,
                type: String,
            },
            links: {
                required: true,
                type: Array,
            },
        },
    };
</script>
