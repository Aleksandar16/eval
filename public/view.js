const searchParams = new URLSearchParams(window.location.search);
const chaptersContainer = document.querySelector('.container');

let idChapter;

const fetchChapter = async (id) => {
    const response = await fetch(`http://localhost:3000/api/chapter/${id}`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const chapter = await response.json();
    return chapter;
};

if (!searchParams.has('id')) {
    console.error('ID non trouvé');
} else {
    idChapter = searchParams.get('id');

    fetchChapter(idChapter).then((chapter) => {
        if (!chapter) {
            console.error('Impossible de charger le chapitre');
            return;
        }

        const chapterNode = createChapterDOM(chapter);
        chaptersContainer.innerHTML = '';
        chaptersContainer.appendChild(chapterNode);
    });
}

const createChapterDOM = (chapter) => {
    const chapterNode = document.createElement('div');
    chapterNode.classList.add('chapter');
    chapterNode.innerHTML = `
        <h3>${chapter.title}</h3>
        <p class="chapter-lessons">Number of lessons: ${chapter.lessons}</p>
        <p class="chapter-active">${chapter.active == true ? "Actif" : "Inactif"}</p>`;
    return chapterNode;
};
