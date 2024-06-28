<template>
    <nav id="sidebar" :class="{ active: sidebarActive }">

      <ul class="list-unstyled components">
        <li>
          <RouterLink to="/tracker" class="nav-text">
            <i class="fa fa-home fa-lg nav-icon"></i>
            Expenses
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/income" class="nav-text">
            <i class="fa fa-user fa-lg nav-icon"></i>
            Income
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/summary" class="nav-text">
            <i class="fa fa-envelope-o fa-lg nav-icon"></i>
            Summary
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div id="content">
      
      <RouterView />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router';
import { RouterLink } from 'vue-router';


const sidebarActive = ref(false)

function toggleSidebar() {
  sidebarActive.value = !sidebarActive.value
}
</script>

<style scoped>
#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: blue;
  overflow-y: auto;
  transition: all 0.3s;
  z-index: 1000;
}


.sidebar-header h3 {
  margin: 0;
}

.list-unstyled {
  padding: 20px;
}

.nav-text {
  color: #fff;
  text-decoration: none;
  display: block;
  padding: 10px;
  transition: background-color 0.3s;
}

.nav-text:hover {
  background-color: skyblue;
  color: black;
}

.nav-icon {
  margin-right: 10px;
}


#content {
  margin-left: 250px;
  padding: 20px;
}

.navbar {
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
