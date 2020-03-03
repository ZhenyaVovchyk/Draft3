
$('document').ready(function () {
    $('.text').linenumbers({ col_width: '50px' });

    emmet.require('textarea').setup({
        pretty_break: true,
        use_tab: true
    });


});



let txt = document.querySelector('#html').value;



const keywords = ('async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|',
    'get|if|implements|import|in|instanceof|interface|let|new|of|package|private|protected|public|return|set|static|super|',
    'switch|throw|try|typeof|var|void|while|with|yield|catch|finally').split('|');



function char_random() {
    var obj = document.color_form;
    var elem = obj.string.value;
    var separator = "";
    var exit_str = "";
    var colors = new Array("00", "11", "22", "33", "44", "55",
        "66", "77", "88", "99", "AA", "BB", "CC", "DD", "EE", "FF");
    elem = elem.split(obj.whois_rand.options[obj.whois_rand.selectedIndex].value);

    for (var n = 0; n <= (elem.length - 1); n++) {
        if (elem[n] == " ") exit_str += " ";
        if (elem[n] != " ") {
            separator = obj.whois_rand.options[obj.whois_rand.selectedIndex].value;
            var col1 = Math.round(Math.random() * (colors.length - 1));
            var col2 = Math.round(Math.random() * (colors.length - 1));
            var col3 = Math.round(Math.random() * (colors.length - 1));
            var size = Math.round(Math.random() * 4) + 3;
            exit_str += "<font color=\"#" + colors[col1] + colors[col2] + colors[col3] +
                "\" size=\"" + size + "\">" + elem[n] + "</font>" + separator;
        }
    }
    obj.res_code.value = exit_str;
    document.getElementById("result").innerHTML = exit_str;
}
char_random();




function char_random(str) {
    var elem = str.split("");
    var exit_str = "";
    var colors = new Array("00", "11", "22", "33", "44", "55",
        "66", "77", "88", "99", "AA", "BB", "CC", "DD", "EE", "FF");

    for (var n = 0; n <= (elem.length - 1); n++) {
        if (elem[n] == " ") exit_str += " ";
        if (elem[n] != " ") {
            var col1 = Math.round(Math.random() * (colors.length - 1));
            var col2 = Math.round(Math.random() * (colors.length - 1));
            var col3 = Math.round(Math.random() * (colors.length - 1));
            var size = Math.round(Math.random() * 4) + 3;
            exit_str += "<font color=\"#" + colors[col1] + colors[col2] + colors[col3] +
                "\" size=\"" + size + "\">" + elem[n] + "</font>";
        }
    }
    document.write(exit_str);
}







document.querySelector(".text").addEventListener('input', function (e) {
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