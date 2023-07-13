<template>
    <div class="a">{{ num }}{{ nums }}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {nums} from './index'
const num = ref(10002)
</script>

<style>
.a{
    width: 100px;
    height: 100px;
    background: red;
}
</style>