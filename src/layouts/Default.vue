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

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Schoolbell&display=swap');
  html{
    font-size:16px;
  }
  body {
    font-family: 'Schoolbell', Comic Sans MS, Comic Sans, cursive;
  margin:0;
  padding:0;

  line-height: 1.5;
  background: #000 0 0/200px 200px url("/img/starry-night.svg");
}
  .sans-serif{
    font-family: 'Open Sans', sans-serif;
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
  margin: 20px 0;
  border-radius: 10px;
  height: 80px;
  background-color:#69f;
  color:#fff;
  padding:0 20px;
  border: 8px ridge #fff;
}

img{
  max-width: 100%;
}

code{
  background: #eee;
  color: #2d2d2d;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  padding-left: 2px;
  padding-right: 2px;
}

.nav__link {
  margin-left: 20px;
  color:#fff;
  text-decoration: none;
}
  .nav__link.home{
    margin-left: 0;
  }
  .nav__link:hover,.nav__link:visited,.nav__link:active,.nav__link:focus{
    color:#fff;
  }

  .content{
    background-color: rgb(255,255,255);
    padding: 5px 20px;
    border-radius: 10px;
    border: 8px ridge #69f;
  }

</style>
