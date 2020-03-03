document.getElementById("run").addEventListener('click', function (e) {
    function prepare(content) {
        return "document.write('" +
            content
                .replace(/[\\']/g, "\\$&").replace(/\n/g, "\\n").replace(/<\/script/g, "<\\/script")
                .replace(/%/g, "%25").replace(/#/g, "%23") +
            "');";
    }

    document.getElementById("res").src = "data:text/html,<!doctype html><title>Demo</title><script>" +
        prepare("<style>" + document.getElementById("css").value + "</style>") +
        prepare(document.getElementById("html").value) +
        prepare("<script>" + document.getElementById("js").value + "<\/script>") +
        "<\/script>";
});

/* Disable minification (remove `.min` from URL path) for more info */

(function (undefined) { }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
