function toggleCollapse(event) {
    const parent = event.target.closest('.collapsible-block');

    const folded = parent.querySelector('.collapsible-block-folded');
    folded.style.display = folded.style.display !== 'none' ? 'none' : 'block';

    const unfolded = parent.querySelector('.collapsible-block-unfolded');
    unfolded.style.display = unfolded.style.display !== 'none' ? 'none' : 'block';
}

function gotoFootnoteRef(event) {
    const target = event.target.id.split('-').pop();
    document.getElementById("footnote-" + target).scrollIntoView();
}

function gotoFootnote(event) {
    const target = event.target.text;
    console.log(target);
    document.getElementById("footnoteref-" + target).scrollIntoView();
}

window.addEventListener('DOMContentLoaded', function() {
    // recreate onClick toggle action
    const collapsibleBlock = document.querySelectorAll('.collapsible-block');
    collapsibleBlock.forEach(function (element) {
        const links = element.querySelectorAll('.collapsible-block-link');

        links.forEach( link => link.addEventListener('click', toggleCollapse));
    });

    // footnotes
    const footnotes = document.querySelectorAll('.footnoteref');
    footnotes.forEach((footnote) => footnote.addEventListener('click', gotoFootnoteRef));

    const footnoterefs = document.querySelectorAll('.footnote-footer a');
    footnoterefs.forEach((footnote) => footnote.addEventListener('click', gotoFootnote));
});