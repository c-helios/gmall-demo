
let myPlugins = {}

myPlugins.install = function(Vue,options) {
    //全局指令
    Vue.directive(options.name, (element, params) => {
        // console.log("=====",params);
        element.innerHTML = params.value.toUpperCase()
    })

}
export default myPlugins