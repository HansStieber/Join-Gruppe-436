
/**
 * This function get all HTML-Element, with Name '[include-html]'.
 * Fetch them and add them to HTML.
 *------------W3-Include---------*/
/*async function includeHTML() {
    let includeElements = document.querySelectorAll('[include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-html");
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


async function includeHTML() {
    const elements = document.querySelectorAll('[include-html]');
    const promises = [];

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const url = element.getAttribute('include-html');
        if (url) {
            const promise = new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        element.innerHTML = xhr.responseText;
                        element.removeAttribute('include-html');
                        resolve();
                    }
                };
                xhr.open('GET', url, true);
                xhr.send();
            });
            promises.push(promise);
        }
    }

    await Promise.all(promises);
}