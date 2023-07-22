<script lang="ts" setup>
import {watch} from 'vue'
import {RouterLink, RouterView, useRoute} from 'vue-router'

const route = useRoute()
watch(() => route.name, (vv) => {
  console.log(vv)
})
</script>

<template>
  <ol>
    <li>
      <RouterLink :to="{name:'auth-login'}">login</RouterLink>
    </li>
    <li>
      <RouterLink :to="{name:'dashboard-home'}">homepage</RouterLink>
    </li>
    <li>
      <RouterLink :to="{name:'dashboard-about'}">about us</RouterLink>
    </li>
  </ol>
  <RouterView/>
</template>

