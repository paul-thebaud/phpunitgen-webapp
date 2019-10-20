<template>
    <BCol cols="6" md="4">
        <p class="text-uppercase font-weight-bold">
            {{ this.title }}
        </p>
        <ul>
            <li v-for="link in links"
                :key="link.url">
                <b-link v-if="! link.internal"
                        :href="link.href"
                        target="_blank"
                        rel="noopener">
                    {{ link.title }}
                </b-link>
                <b-link v-else
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
