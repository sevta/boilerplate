


var Sv = function() {
    this.settings = {
        el: '#app'
    }
}   

Sv.prototype.render = function() {
    var $el = document.querySelector(this.settings.el)
    // var span = document.createElement('<span>aduh</span>')
    $el.style.background = 'tomato'
}


let a = new Sv()

a.render()

console.log(a)
