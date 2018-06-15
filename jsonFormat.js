const jsonFormat = {
    init:function (json) {
        this.syntaxHighlight(json)
    },
    syntaxHighlight: function (json) {
        /* if (typeof json != "string") {
          json = JSON.stringify(json, undefined, 2);
        } */
        let content =''
        if (json) {
            json = JSON.stringify(json, undefined, 2);
            json = json
                .replace(/&/g, "&")
                .replace(/</g, "<")
                .replace(/>/g, ">");
            content = json.replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                function (match) {
                    var cls = "number";
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = "key";
                        } else {
                            cls = "string";
                        }
                    } else if (/true|false/.test(match)) {
                        cls = "boolean";
                    } else if (/null/.test(match)) {
                        cls = "null";
                    }
                    return '<span class="' + cls + '">' + match + "</span>";
                }
            );
        }  
        $('.json-container').find('pre').html(content)
    }
}
let json ={a:2,b:'ss',arr:[1,2,3,4]}
jsonFormat.init(json)