<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/user">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/paper">Papers</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/room">Rooms</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/tag">Tags</router-link>
        </li>
	<li class="nav-item">
          <router-link class="nav-link" to="/conference">Conferences</router-link>
        </li>
	<li class="nav-item">
          <router-link class="nav-link" to="/presentation">Presentations</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

