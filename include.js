
/**
 * This function get all HTML-Element, with Name '[w3-include-html]'.
 * Fetch them and add them to HTML.
 */
/*async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}*/

/**
 *  This function get all HTML-Element, with Name 'include-html'.
 * And load them into Html.
 */
function includeHTML() {
    var elements = document.querySelectorAll('[include-html]');
    var remainingElements = elements.length;
    if (remainingElements === 0) {
        allIncludedMsg();
    } else {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var url = element.getAttribute('include-html');
            if (url) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            element.innerHTML = xhr.responseText;
                        }
                        element.removeAttribute('include-html');
                        remainingElements--;
                        if (remainingElements === 0) {
                            allIncludedMsg();
                        } else {
                            // Include remaining HTML files
                            includeHTML();
                        }
                    }
                };
                xhr.open('GET', url, true);
                xhr.send();
            }
        }
    }
}

function allIncludedMsg() {
    console.log('All HTML files have been included!');
}
