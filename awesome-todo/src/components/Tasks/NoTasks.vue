<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="signal_wifi_off" color="primary" />
    </template>
    You have lost connection to the internet. This app is offline.
    <template v-slot:action>
      <q-btn flat color="primary" label="Turn on Wifi" />
    </template>
  </q-banner>
</template>

<script>
export default {};
</script>
