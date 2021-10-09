<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <search id="header-search" class="right-menu-item" />

      <div class="right-menu-item hover-effect">
        <a-tooltip color="dark" placement="bottom" :autoAdjustOverflow="false"
          :overlayStyle="{ zIndex: 1 }">
          <template #title>全局尺寸</template>
          <size-select id="size-select" />
        </a-tooltip>
      </div>

      <div class="avatar-container right-menu-item hover-effect" >
        <a-dropdown :trigger="['click']" placement="bottomCenter">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <DownOutlined />
          </div>
          <template #overlay>
            <a-menu>
              <router-link to="/profile/index">
                <a-menu-item>账户资料</a-menu-item>
              </router-link>
              <a target="_blank" href="https://github.com/weely/">
                <a-menu-item>Github</a-menu-item>
              </a>
              <a-menu-item divided>
                <span style="display:block;" @click="logout">Log Out</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import { DownOutlined } from '@ant-design/icons-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    SizeSelect,
    Search,
    DownOutlined
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: aliceblue;
  box-shadow: 0 1px 4px rgba(142, 198, 250, .7);
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    // display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 16px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 36px;
        }

        .a-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
