$(document).ready(function (e) {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = e.target; // newly activated tab
        // identify the tab-pane
        var paneID = $(target).attr('href');
        // get the value of the custom data attribute to use as the iframe source
        var src = $(paneID).attr('data-src');
        //if the iframe on the selected tab-pane hasn't been loaded yet...
        if($(paneID + " iframe").attr("src") === "") {
            // update the iframe src attribute using the custom data-attribute value
            $(paneID + " iframe").attr("src",src);
        }

        resizeIframes();
    });

    resizeIframes();
});

$(window).on('resize', function (e) {
    resizeIframes();
});

function getWidthHeight() {
    var w = window,
        d = document,
        e = d.documentElement,
        b = d.querySelector('body'),
        x = w.innerWidth || e.clientWidth || b.clientWidth,
        y = w.innerHeight|| e.clientHeight|| b.clientHeight;
    return { width: x, height: y };
}

function resizeIframes() {
    var widthHeight = getWidthHeight();
    var iframes = document.querySelectorAll('iframe');
    for (var i=0; i<iframes.length; i++) {
        var iframe = iframes[i];
        iframe.height = (widthHeight.height) - (iframe.getBoundingClientRect().top + 5) + "px";
    }
}