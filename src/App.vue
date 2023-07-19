<script lang="ts" setup>
import {RouterLink, RouterView} from 'vue-router'
import AlImage from "@/components/shared/AlImage.vue";
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" height="125" src="@/assets/logo.svg" width="125"/>

    <div class="wrapper">
      <h2 class=" text tw-uppercase tw-text-black ">hello</h2>
      <al-image class="tw-w-[250px]" src="invalidURL" alt="invalidURL" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView/>
</template>

