import Vue from 'vue'

Vue.directive('top-toast', {
  inserted(el, { value }) {
    el.style.position = 'relative'
    const parent = document.querySelector(`#${value}`).getBoundingClientRect()
    const child = el.children[0].getBoundingClientRect()

    if (child.right > parent.right) {
      el.children[0].style.left = `calc(50% - ${child.right - parent.right + 5}px)`
    } else if (child.left < parent.left) {
      el.children[0].style.left = `calc(50% + ${parent.left - child.left + 5}px)`
    }
  }
})
