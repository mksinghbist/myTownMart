<script lang="ts" setup>
  const goProfile = () => {
    navigateTo('/vendor/profile')
  }

  const logout = () => {
    localStorage.clear()
    navigateTo('/auth/vendor')
  }
</script>
<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer
      permanent
      width="260"
      class="sidebar-bg"
    >
      <v-list>
        <v-list-item
          title="Vendor Panel"
          subtitle="Manage your store"
        />
        <v-divider />

        <v-list-item to="/vendor/dashboard" prepend-icon="mdi-view-dashboard" title="Dashboard" />
        <v-list-item to="/vendor/products" prepend-icon="mdi-package-variant" title="Products" />
        <v-list-item to="/vendor/orders" prepend-icon="mdi-cart" title="Orders" />
        <v-list-item to="/vendor/earnings" prepend-icon="mdi-cash" title="Earnings" />
      </v-list>
    </v-navigation-drawer>

    <!-- Top Bar -->
    <v-app-bar
      elevation="0"
      class="appbar-bg"
    >
      <v-app-bar-title>Vendor Dashboard</v-app-bar-title>
      <v-spacer />
      <v-btn icon="mdi-bell-outline" />
      <v-menu location="bottom end" transition="scale-transition">
        <template #activator="{ props }">
          <v-avatar
            v-bind="props"
            size="36"
            class="ml-3 avatar-bg"
            role="button"
          >
            <v-icon size="22">mdi-account</v-icon>
          </v-avatar>
        </template>

        <v-card class="profile-menu">
          <v-list density="compact">
            <v-list-item
              prepend-icon="mdi-account-outline"
              title="My Profile"
              @click="goProfile"
            />

            <v-divider />

            <v-list-item
              prepend-icon="mdi-logout"
              title="Logout"
              class="logout-item"
              @click="logout"
            />
          </v-list>
        </v-card>
      </v-menu>

    </v-app-bar>

    <!-- Page Content -->
    <v-main class="main-bg">
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped>
/* 🌸 Sidebar (Meesho style) */
.sidebar-bg {
  background: rgb(var(--v-theme-primary), 0.14);
  border-right: 1px solid rgb(var(--v-theme-primary), 0.25);
}

/* 🔝 Top bar (clean & light) */
.appbar-bg {
  background: rgb(var(--v-theme-primary), 0.25);
  backdrop-filter: blur(8px);
}

/* 📄 Main page background */
.main-bg {
  min-height: 100vh;
  background: rgb(var(--v-theme-primary), 0.25);
}
.v-list-item--active {
  background: rgb(var(--v-theme-primary), 0.22) !important;
  color: white;
  border-radius: 8px;
}
</style>
