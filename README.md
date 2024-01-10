## Using dedicated route configuration in vue 2.6 based project 

### Goal
  We want to use dedicated route configuration for each oem and environment determined by the environment variable, but if we use default vue .env file with vue config we can only use one environment variable for all the oem and environment.

### Process

  1. Using dotenv-cli we can use different environment variable for each oem and environment instead of using default vue .env file

  2. Using async import we can use different route configuration for each oem and environment

### Solution

  - Preequisites modules

   ```json
   "dependencies": {
    ...
    "dotenv": "^16.3.1",
    ...
  },
  "devDependencies": {
    ...
    "dotenv-cli": "^7.3.0",
    ...
  }
   ```

  - Create a file named `.env.[oem].[envmode]` in the root of the project and add the following content
  - Like this following `.env.intel.staging` for intel based development on staging environment

  ```env
  VUE_APP_API_URL=https://staging.example.com
  VUE_APP_OEM=intel
  ```
  > Note: **The prefix `VUE_APP_` is mandatory for all the environment variables**


  - Add following script for separate build for each oem

  ```json
  "scripts": {
    ...
    "serve:intel-staging": "dotenv -e .env.intel.staging -- vue-cli-service serve",
    "build:intel:staging": "dotenv -e .env.intel.staging vue-cli-service build --mode staging --dest dist/intel",
    ...
  },
  ```

  - Modify main.js or route to use the environment variable

  ```js 
  import App from './App.vue'
  import './registerServiceWorker'
  import router from './router'
  import store from './store'

  Vue.config.productionTip = false

  async function chooseOEMroute() {
    switch (process.env.VUE_APP_OEM) {
      case 'intel':
        console.log('intel');
        return (await import('./intel/router')).default;
      case 'oem':
        return (await import('./oem/router')).default;
      default:
        return (await import('./router')).default;
    }
  }

  async function initializeApp() {
    new Vue({
      router: await chooseOEMroute(),
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  initializeApp();
  ```

  - Beasuse import is async we need to use `await` keyword to get the router object

  > Note: Beacause of the async function due to import we need to use `await` keyword to get the router object
  

  - Modify router or route we want to use prefer component with different oem environment and dev mode

  ```js
  import VueRouter from 'vue-router'

  Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ '@/intel/views/Home.vue')
      //This is for intel based development
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]

  const router = new VueRouter({
    routes
  })

  export default router
  ```

  - Using lazy loading for the component is important for the build size

