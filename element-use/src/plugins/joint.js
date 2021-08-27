import 'jointjs/dist/joint.core.css'

export default {
  install: function(Vue) {
    const joint = require('jointjs')
    const jq = require('jquery')
    const dagre = require('dagre')
    const graphlib = require('graphlib')
    Object.defineProperty(Vue.prototype, '$joint', { value: joint })
    //Object.defineProperty(Vue.prototype, '$', { value: jq })
    window.joint = joint;
    window.$ = jq;
    window._ = require('lodash');
    window.V = joint.V;
    window.dagre = dagre;
    window.graphlib = graphlib;
  }
}
