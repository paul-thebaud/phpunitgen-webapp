<template>
    <BCol md>
        <p class="text-uppercase font-weight-bold">
            {{ this.title }}
        </p>
        <ul>
            <li v-for="link in links"
                :key="link.url">
                <b-link :href="link.url">
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
