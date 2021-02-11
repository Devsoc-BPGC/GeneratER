<script lang="ts">
</script>

<button
  on:click={() => {
    tsvscode.postMessage({ type: "onInfo", value: "It is working" });
  }}>Open</button
>

<style>
</style>
