<script>
  export let tokenData
</script>

<svelte:head>
  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content={`The Burst DAppository - ${tokenData.name}`}>
  <meta itemprop="description" content={tokenData.desc}>
  <meta itemprop="image" content={tokenData.img}>

  <!-- Facebook Meta Tags -->
  <meta property="og:type" content="website">
  <meta itemprop="og:title" content={`The Burst DAppository - ${tokenData.name}`}>
  <meta property="og:description" content={tokenData.desc}>
  <meta property="og:image" content={tokenData.img}>

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={`The Burst DAppository - ${tokenData.name}`}>
  <meta name="twitter:description" content={tokenData.desc}>
  <meta name="twitter:image" content={tokenData.img}>
</svelte:head>
