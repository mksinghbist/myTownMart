<script setup lang="ts">
import { ref, onMounted } from 'vue'
definePageMeta({
  layout: false,
})

const route = useRoute()
const router = useRouter()

const role = route.params.role as 'user' | 'vendor' | 'admin'
const mode = ref<'login' | 'register'>('login')

const roleConfig = {
  user: {
    title: 'User',
    dashboard: '/account',
  },
  vendor: {
    title: 'Vendor',
    dashboard: '/vendor/dashboard',
  },
  admin: {
    title: 'Admin',
    dashboard: '/admin/dashboard',
  },
}

onMounted(() => {
  if (!roleConfig[role]) navigateTo('/')
  if (localStorage.getItem('token')) {
    navigateTo(roleConfig[role].dashboard)
  }
})

function onSuccess() {
  if(role == 'user') {
    const redirect = route.query.redirect as string || "/"
    navigateTo(redirect)
    return 
  }
  navigateTo(roleConfig[role].dashboard)
}
</script>

<template>
  <v-app>
    <v-container class="fill-height main-bg" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="5">
          <v-card rounded="xl">
            <v-card-text>
              <div class="text-center mb-6">
                <h2>{{ roleConfig[role].title }} {{ mode }}</h2>
              </div>

              <AuthLoginForm
                v-if="mode === 'login'"
                class=""
                :role="role"
                @success="onSuccess"
                @switch="mode = 'register'"
              />

              <AuthRegisterForm
                v-else
                :role="role"
                @switch="mode = 'login'"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<style scoped>
.main-bg {
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-secondary), 0.50),
    rgb(var(--v-theme-primary), 0.50)
  );
}

</style>