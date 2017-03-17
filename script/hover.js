/* This is the method to manage hover text elements on the page. Any link with associated
 * hover text should recieve a data attribute in the following format: data-hover-content="hover text"
 * where hover text is the content of the associated text block.  */

var triggerHover = function triggerHover(e) {
    var tempTarget = e.currentTarget,
        relativePosition = tempTarget.getBoundingClientRect(),
        w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        curScroll = document.documentElement.scrollTop || document.body.scrollTop,
        hovText = document.createTextNode(tempTarget.dataset.hover_content),
        hovEl = document.createElement('div');

    //determine quadrant that target exists in, this will determine arrow orientation
    
    //apply arrow to proper side of hover block
    //
};