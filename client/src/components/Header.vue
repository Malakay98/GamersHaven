<!-- Header -->
<template>
  <header>
    <nav>
      <ul v-if="!isLoggedIn || isHomePage">
        <li class="logo-container">
          <img src="../assets/images/Logo.png" alt="Logo" class="logo">
        </li>
        <li>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </li>
      </ul>
      <ul v-else>
        <li class="logo-container">
          <img src="../assets/images/Logo.png" alt="Logo" class="logo">
        </li>
        <li>
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComp',
  data() {
    return {
      isLoggedIn: false,
      isHomePage: false,
    };
  },
  created() {
    // Check if the current route is the home page
    this.isHomePage = this.$route.path === '/';
  },
};
</script>


<style>
header {
  padding: 10px;
}

nav ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav li {
  display: inline-block;
  margin-right: 10px;
}

.logo-container {
  max-width: 150px;
  /* Adjust the maximum width as needed */
}

.logo {
  max-width: 100%;
  height: auto;
  filter: invert(100%); /* Change the color of the image to white */
}

nav li a {
  color: #ffffff;
  text-decoration: none;
  padding: 5px 10px;
}

nav li a:hover {
  color: #a03131;
}
</style>