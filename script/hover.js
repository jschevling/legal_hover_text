(function(){
    'use strict';

    var hover = {

        currentHover: {},

        isHovering: false,

        hoverElement: {},

        polyfills: function polyfills() {
            // matches
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                            i = matches.length;

                        while (--i >= 0 && matches.item(i) !== this) {}
                        return i > -1;
                    };
            }
        },

        parseHoverTarget: function parseHoverTarget(e) {
            for (var target=e.target; target && target!=this; target=target.parentNode) {
                // loop parent nodes from the target to the delegation node
                try {
                    if (target.matches('.hover-element')) {
                        this.isHovering = true;
                        this.triggerHover.apply(this, [target, e]);
                        break;
                    }
                }
                catch (e) {
                    //suppress errors
                }
            }
        },

        parseClearTarget: function parseClearTarget(e) {
            for (var target=e.target; target && target!=this; target=target.parentNode) {
                // loop parent nodes from the target to the delegation node
                try {
                    if (target.matches('.hover-element')) {
                        this.isHovering = false;
                        this.clearHover.apply(this, [target, e]);
                        break;
                    }
                }
                catch (e) {
                    //suppress errors
                }
            }
        },

        bindListeners: function bindListeners() {
            document.addEventListener('mouseover', this.parseHoverTarget.bind(this), false);
            document.addEventListener('mouseout', this.parseClearTarget.bind(this), false);
        },

        fadeHover: function fadeHover(){
            this.hoverElement.style.opacity = '1';
        },

        mountHover: function mountHover(target){
            if (this.isHovering) {
                console.log(target);
                console.log(this.hoverElement);
                document.querySelector('body').appendChild(this.hoverElement);
                this.hoverElement.style.display = 'block';
                setTimeout(this.fadeHover.bind(this), 100);
            }
        },

        triggerHover: function triggerHover(target, e) {
            console.log(this.isHovering);
            var relativePosition = target.getBoundingClientRect(),
                w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
                hoverText = target.getAttribute('data-hover-content');

            this.hoverElement = document.createElement('div');
            this.hoverElement.innerHTML = hoverText;
            this.hoverElement.classList.add('hover-block');

            setTimeout(this.mountHover.bind(this, target), 2000);
        },

        clearHover: function clearHover (target, e) {
            document.querySelector('body').removeChild(this.hoverElement);
        },

        initialize: function initialize() {
            this.polyfills();
            this.bindListeners();
        },


    };

    hover.initialize();

}());
