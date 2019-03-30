<template>
  <div class="layout">
    <header class="header">
      <h1>
        <g-link class="nav__link" to="/">{{ $static.metaData.siteName }}</g-link>
      </h1>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about">About</g-link>
      </nav>
    </header>
    <main>
      <slot/>
    </main>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
  background-color:#69f;
  color:#fff;
  padding:0 10px;
}

.nav__link {
  margin-left: 20px;
  color:#fff;
  text-decoration: none;
}
  .nav__link:hover,.nav__link:visited,.nav__link:active,.nav__link:focus{
    color:#fff;
  }

</style>
