




window.onload = function () {

    function highlight(code) {

        const states = {
            none: 0,
            single_quote: 1, //string
            double_quote: 2, //string
            ml_quote: 3, //string
            regex_literal: 4, //regex
            sl_comment: 5, //single line comment
            ml_commnet: 6, //multi line comment
            number_literal: 7, //12345
            keyword: 8 //function, let etc
        }

        const colors = {
            none: '#000',
            single_quote: '#aaa',
            double_quote: '#aaa',
            ml_quote: '#aaa',
            regex_literal: '#707',
            sl_comment: '#0a0',
            ml_commnet: '#0a0',
            number_literal: '#a00',
            keyword: '#00a',
            operator: '#07f'
        }

        const keywords = 'async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|of|package|private|protected|public|return|set|static|super|switch|throw|try|typeof|var|void|while|with|yield|catch|finally'.split('|');


        let output = '';
        let state = states.none;
        for (let i = 0; i < code.length; i++) {
            let char = code[i], prev = code[i - 1], next = code[i + 1];
            // Ищем однострочные коменты
            if (state == states.none && char == '/' && next == '/') {   // Начало строки
                state = states.sl_comment;
                output += '<span style="color: ' + colors.sl_comment + '">' + char;
                continue;
            }

            if (state == states.sl_comment && char == '\n') {     // Конец строки
                state = states.none;
                output += char + '</span>';
                continue
            }

            // Ищем многострочные коменты

            if (state == states.none && char == '/' && next == '*') {
                state = states.ml_commnet;
                output += '<span style="color: ' + colors.ml_commnet + '">' + char;
                continue;
            }

            if (state == states.ml_commnet && char == '/' && prev == '*') {
                state = states.none;
                output += char + '</span>';
                continue;
            }

            if (state == states.none && char == '\'') {
                state = states.single_quote;
                output += '<span style="color: ' + colors.single_quote + '">' + char;
            }

            if (state == states.single_quote && char == '\'' && prev != '\\') {
                state = states.none;
                output += char + '</span>';
                continue;
            }


            if (state == states.none && char == '"') {
                state = states.double_quote;
                output += '<span style="color: ' + colors.double_quote + '">' + char;
                continue;
            }

            if (state == states.double_quote && char == '"' && prev != '\\') {
                state = states.none;
                output += char + '</span>'
            }



            if (state == state.none && char == '`') {
                state = states.ml_quote;
                output += '<span style="color: ' + colors.ml_quote + '">' + char;
            }

            if (state == states.ml_quote && char == '`' && prev != '\\') {
                state = states.none;
                output += char + '</span>';
                continue;
            }

            // регэксп-литералы


            if (state == states.none && char == '/') {
                state = states.regex_literal;
                output += char + '<span style="color: ' + colors.regex_literal + '">' + char;
                continue;
            }

            if (state == states.regex_literal && char == '/' && prev != '\\') {
                state = states.none;
                output += char + '</span>';
            }

            if (state == states.none && /[0-9]/.test(char) && !/[0-9a-z$_]/i.test(prev)) {
                state = states.number_literal;
                output += '<span style="color: ' + colors.number_literal + '">' + char;
                continue;
            }

            if (state == states.number_literal && !/[0-9-fnx]/i.test(char)) {
                state = states.none;
                output += '</span>';    //////////   ????? ?? ///////
            }


            //  Ключевые слова

            if (state == states.none && !/[a-z0-9$_]/i.test(prev)) {
                let word = '', j = 0;

                while (code[i + j] && /[a-z]/i.test(code[i + j])) {
                    word += code[i + j];
                    j++;
                }
                if (keywords.includes(word)) {
                    state = states.keyword;
                    output += '<span style="color: ' + colors.keyword + '">'; // непонятно почему тут не нужен Char
                }
            }

            if (state == states.keyword && !/[a-z]/i.test(char)) {
                state = states.none;
                output += '</span>';
            }

            /// Подсветка операторов

            if (state == states.none && '+-/*=&|%!<>?:'.indexOf(char) != -1) {
                output += '<span style="color: ' + colors.operator + '">' + char + '</span>';
                continue;
            }

            output += char.replace('<', '&lt;');

        }
        return output.replace(/\n/gm, '<br>').replace(/\t/g, new Array(8).join('&nbsp;'))
            .replace(/^\s+|\s{2,}/g, (a) => new Array(a.length + 1).join('&nbsp;'));
    }

    let txtHtml = document.querySelector('#html');

    txtHtml.oninput = highlight(this.value);

}