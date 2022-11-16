<template>
  <div class="layout">
    <header class="header">
      <h1>
        <g-link class="nav__link home" to="/">{{ $static.metadata.siteName }}</g-link>
      </h1>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about">About</g-link>
        <a class="nav__link" href="/rss.xml">RSS</a>
        <a href="https://notacult.social/@fimion" rel="me" class="nav__link">Mastodon</a>
        <a class="nav__link" href="https://twitch.tv/fimion">Twitch</a>
      </nav>
    </header>
    <main class="content">
      <slot/>
    </main>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  name: 'DefaultLayout',
  metaInfo(){
    return {
      link:[
        {rel:"alternate", type:"application/rss+xml", title:"RSS Feed for alex.party", href:"/rss.xml"},
      ]
    }
  }
};
</script>


<style src="~/style/default.css"></style>
