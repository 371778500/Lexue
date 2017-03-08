import Vue from 'vue'
// import Hello from 'src/components/Hello'
import VueRouter from 'vue-router'
import FrontIndex from 'src/views/Nav/FrontIndex'
import Carousel from 'src/components/Carousel'
import InformationBar from 'src/components/InformationBar'
import ShowCourse from 'src/views/ShowCourse'
import Login from 'src/views/Login'
require('es6-promise').polyfill()
Vue.use(VueRouter)

// describe('Hello.vue', () => {
//   it('should render correct contents', () => {
//     const vm = new Vue({
//       el: document.createElement('div'),
//       render: (h) => h(Hello)
//     })
//     expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Hello Vue!')
//   })
// })

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Login)
    })
    expect(vm.$el.querySelector('.signin-btn').textContent).to.equal('登录')
  })
})
