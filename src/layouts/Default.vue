<template>
  <div class="layout">
    <header class="header">
      <h1>
        <g-link class="nav__link home" to="/">{{ $static.metadata.siteName }}</g-link>
      </h1>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about">About</g-link>
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

<style src="~/style/default.css"></style>
