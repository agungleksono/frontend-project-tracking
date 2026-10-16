<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppToast from '@/components/AppToast.vue'

const route = useRoute()
const mobileMenuOpen = ref(false)
const sectionTitle = computed(() => route.name === 'case-new' ? 'New Registration' : route.name === 'case-detail' ? 'Case Details' : 'Case Register')
const today = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
</script>

<template>
  <v-app>
    <aside class="sidebar" :class="{ 'sidebar--open': mobileMenuOpen }">
      <router-link to="/cases" class="brand" aria-label="AFFA trademark tracker home" @click="mobileMenuOpen = false">
        <span class="brand__mark"><span>A</span></span>
        <span class="brand__text"><strong>AFFA</strong><small>Project Tracking</small></span>
      </router-link>
      <nav class="mt-10" aria-label="Main navigation">
        <router-link to="/cases" @click="mobileMenuOpen = false"><v-icon icon="mdi-view-dashboard-outline" size="24" /><span>Case Register</span></router-link>
        <router-link to="/cases/new" @click="mobileMenuOpen = false"><v-icon icon="mdi-file-document-plus-outline" size="24" /><span>New Registration</span></router-link>
      </nav>
    </aside>
    <button v-if="mobileMenuOpen" class="sidebar-backdrop" aria-label="Close menu" @click="mobileMenuOpen = false" />
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar__left">
          <button class="menu-button" type="button" aria-label="Open menu" @click="mobileMenuOpen = !mobileMenuOpen">
            <v-icon icon="mdi-menu" size="26" />
          </button>
          <div class="topbar__title">
            <strong>AFFA Project Tracking</strong>
          </div>
        </div>
        <div class="topbar__right">
          <div class="topbar__divider" />
          <div class="user-profile">
            <div class="user-avatar">
              <v-icon icon="mdi-account" size="25" />
            </div>
            <div class="user-copy">
              <strong>Project Admin</strong>
              <small>AFFA Team</small>
            </div>
            <span class="online-dot" title="Online" />
          </div>
        </div>
      </header>
      <v-main><main class="app-main"><router-view /></main></v-main>
    </div>
    <AppToast />
  </v-app>
</template>

<!-- Shell styles stay global so a stale Vue HMR scope id cannot detach the layout. -->
<style>
.sidebar {
  position: fixed;
  z-index: 300;
  inset: 0 auto 0 0;
  display: flex;
  width: 276px;
  overflow: hidden;
  flex-direction: column;
  color: white;
  background: linear-gradient(168deg, #0b63c8 0%, #07459e 57%, #0b67df 100%);
  box-shadow: 6px 0 30px rgba(8, 63, 139, 0.12);
}

.brand {
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 15px;
  height: 104px;
  padding: 0 30px;
  color: white;
  text-decoration: none;
}

.brand__mark {
  display: grid;
  width: 56px;
  height: 56px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.02), rgba(52, 158, 255, 0.68));
  box-shadow: inset 0 0 18px rgba(255, 255, 255, 0.1);
}

.brand__mark span {
  font-family: Georgia, serif;
  font-size: 27px;
  font-style: italic;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand strong {
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.brand small {
  margin-top: 7px;
  color: #b8e1ff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

nav {
  z-index: 1;
  padding: 10px 16px;
}

.nav-label {
  margin: 10px 16px 9px;
  color: #77b9ee;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.nav-label--secondary {
  margin-top: 30px;
}

nav a {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 56px;
  margin-bottom: 7px;
  padding: 0 19px;
  color: rgba(255, 255, 255, 0.92);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-decoration: none;
  transition: 0.18s ease;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.09);
  transform: translateX(2px);
}

nav a.router-link-active {
  color: white;
  background: linear-gradient(90deg, #0878fc, #2398ff);
  box-shadow: 0 8px 20px rgba(0, 62, 160, 0.22);
}

.stage-list {
  margin-left: 26px;
  padding-left: 24px;
  border-left: 1px solid rgba(152, 208, 255, 0.28);
}

.stage-list span {
  position: relative;
  display: block;
  padding: 7px 0;
  color: #cae3f8;
  font-size: 12px;
}

.stage-list span::before {
  position: absolute;
  top: 13px;
  left: -27px;
  width: 5px;
  height: 5px;
  content: '';
  border-radius: 50%;
  background: #83caff;
}

.sidebar__footer {
  z-index: 1;
  margin-top: auto;
  padding: 22px 20px 27px;
}

.sidebar__help {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  background: rgba(0, 38, 107, 0.2);
}

.sidebar__help span {
  display: flex;
  flex-direction: column;
}

.sidebar__help strong {
  font-size: 12px;
}

.sidebar__help small {
  margin-top: 3px;
  color: #9ed0f6;
  font-size: 10px;
}

.sidebar__orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(61, 151, 255, 0.2);
}

.sidebar__orb--one {
  right: -105px;
  bottom: -30px;
  width: 290px;
  height: 290px;
}

.sidebar__orb--two {
  right: 50px;
  bottom: -125px;
  width: 240px;
  height: 240px;
  background: rgba(14, 111, 230, 0.42);
}

.app-shell {
  min-height: 100vh;
  margin-left: 276px;
  background:
    radial-gradient(circle at 68% 7%, rgba(210, 232, 255, 0.55), transparent 28%),
    #f3f8fd;
}

.topbar {
  position: sticky;
  z-index: 100;
  top: 0;
  display: flex;
  min-height: 84px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 32px;
  border-bottom: 1px solid #dce8f5;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 3px 16px rgba(20, 74, 137, 0.05);
  backdrop-filter: blur(10px);
}

.topbar__left,
.topbar__right {
  display: flex;
  align-items: center;
}

.menu-button {
  display: none;
  margin-right: 14px;
  color: #07175f;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.topbar__title {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
}

.topbar__title strong {
  overflow: hidden;
  color: #07175f;
  font-size: 22px;
  font-weight: 750;
  letter-spacing: -0.025em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.topbar__title span {
  color: #0878f9;
  font-size: 14px;
  font-weight: 600;
}

.topbar__right {
  flex: 0 0 auto;
  gap: 16px;
  color: #53699f;
}

.topbar__divider {
  width: 1px;
  height: 40px;
  background: #d9e4f2;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  color: #07307e;
  border: 1px solid #d8e6fa;
  border-radius: 50%;
  background: #edf4ff;
}

.user-copy {
  display: flex;
  min-width: 94px;
  flex-direction: column;
  color: #07175f;
  line-height: 1.2;
}

.user-copy strong {
  font-size: 14px;
  font-weight: 700;
}

.user-copy small {
  margin-top: 4px;
  color: #6a7eb6;
  font-size: 12px;
}

.online-dot {
  width: 10px;
  height: 10px;
  margin-left: 2px;
  border: 2px solid #dff8ed;
  border-radius: 50%;
  background: #08b96f;
  box-sizing: content-box;
}

.app-main {
  width: min(1250px, calc(100% - 52px));
  margin: 0 auto;
  padding: 27px 0 58px;
}

.sidebar-backdrop {
  position: fixed;
  z-index: 250;
  inset: 0;
  display: none;
  border: 0;
  background: rgba(4, 20, 61, 0.48);
}

@media (max-width: 1020px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }

  .sidebar--open {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    display: block;
  }

  .app-shell {
    margin-left: 0;
  }

  .menu-button {
    display: grid;
  }

  .topbar__title strong {
    font-size: 17px;
  }
}

@media (max-width: 620px) {
  .topbar {
    min-height: 64px;
    gap: 10px;
    padding: 0 15px;
  }

  .topbar__title {
    gap: 1px;
  }

  .topbar__title strong {
    font-size: 14px;
  }

  .topbar__title span {
    font-size: 10px;
  }

  .user-copy,
  .topbar__divider,
  .online-dot {
    display: none;
  }

  .user-profile {
    gap: 0;
  }

  .user-avatar {
    width: 34px;
    height: 34px;
  }

  .app-main {
    width: calc(100% - 28px);
    padding-top: 21px;
  }
}
</style>
