

document.getElementsByName('textarea').onclick = function test(e) {

    let colors = {
        none: '#000',
        number_literal: '#a00',
        keyword: '#00a'

    }

    let keywords = 'async,await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|package|private|protected|public|return|set|static|super|switch|throw|try|typeof|var|void|while|with|yield|catch|finally';

    let outTxt = document.querySelector('#outTxt').value;

    console.log(outTxt);
    for (let i = 0; i < outTxt.length; i++) {
        console.log(keywords[i]);
        if (outTxt[i].value === 'async') { outTxt[i].style.color = 'red'; }
    }
}



