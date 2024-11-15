const chaptersContainer = document.querySelector('.list')
const form = document.querySelector('form')

const fetchChapters = async () => {
    const response = await fetch("http://localhost:3000/api/chapter")
    const chapters = await response.json()
    createChaptersDOM(chapters)
}

fetchChapters()

const createChaptersDOM = (chapters) => {
    const chaptersNode = chapters.map(chapter => {
        const chapterNode = document.createElement('div')
        chapterNode.classList.add('chapter')
        chapterNode.innerHTML = `<h3>${chapter.title}</h3>
                            <p class="chapter-lessons">Number of lessons : ${chapter.lessons}</p>
                            <div class="chapter-actions">
                                <button class="btn btn-primary" data-id=${chapter._id}>Voir</button>
                                <button class="btn btn-danger" data-id=${chapter._id}>Supprimer</button>
                            </div>`
        return chapterNode
    })

    chaptersContainer.innerHTML = ''
    chaptersContainer.append(...chaptersNode)

    const deleteBtns = chaptersContainer.querySelectorAll('.btn-danger')
    deleteBtns.forEach(button => {
        button.addEventListener('click', async event => {
            const idChapter = event.target.dataset.id

            await fetch(`http://localhost:3000/api/chapter/${idChapter}`, {
                method: 'DELETE'
            })

            fetchChapters()
        })
    })

    const viewBtns = chaptersContainer.querySelectorAll('.btn-primary')
    viewBtns.forEach(button => {
        button.addEventListener('click', async event => {
            const idChapter = event.target.dataset.id
            location.assign(`/public/view.html?id=${idChapter}`)
        })
    })
}

form.addEventListener('submit', async event => {
    event.preventDefault()
    const formData = new FormData(form)
    const entries = formData.entries()
    const chapter = Object.fromEntries(entries)

    if(chapter.active == "on") {
        chapter.active = true
    } else {
        chapter.active = false
    }

    const json = JSON.stringify(chapter)

    const response = await fetch("http://localhost:3000/api/chapter", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: json
    })
    fetchChapters()
})