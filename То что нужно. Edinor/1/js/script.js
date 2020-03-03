
$('document').ready(function () {
    $('.contenteditable').linenumbers({ col_width: '50px' });

    emmet.require('textarea').setup({
        pretty_break: true,
        use_tab: true
    });


});



document.querySelector(".text").addEventListener('click', function (e) {
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