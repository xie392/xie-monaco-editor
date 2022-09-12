<template>
    <div>
        登录
        <button @click="data.count++">+({{ data.count }})</button>
    </div>
</template>


<script setup lang="ts" name="Dashboard">
import { reactive } from 'vue';

const data = reactive({
    count: 0
});

</script>