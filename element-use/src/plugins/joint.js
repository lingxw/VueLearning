import 'jointjs/dist/joint.core.css'

export default {
  install: function(Vue) {
    const joint = require('jointjs')
    const jq = require('jquery')
    Object.defineProperty(Vue.prototype, '$joint', { value: joint })
    //Object.defineProperty(Vue.prototype, '$', { value: jq })
    window.$ = jq;
    window.joint = joint;
  }
}
