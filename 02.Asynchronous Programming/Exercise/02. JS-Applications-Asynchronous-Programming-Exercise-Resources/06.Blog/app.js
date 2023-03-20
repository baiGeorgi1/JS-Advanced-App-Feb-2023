function attachEvents() {
    const loadBtn = document.getElementById('btnLoadPosts');
    const posts = document.getElementById('posts');
    const viewBtn = document.getElementById('btnViewPost');

    const postUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentUrl = 'http://localhost:3030/jsonstore/blog/comments';

    loadBtn.addEventListener('click', loadPosts);

    function loadPosts() {
        fetch(postUrl)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json();
            })
            .then(data => Object.entries(data).forEach((e) => {
                const option = document.createElement('option');
                option.setAttribute('value', `${e[0]}`);
                option.textContent = `${e[1].title}`;
                posts.appendChild(option);
            }));

        viewBtn.addEventListener('click', viewPost);
        function viewPost() {
            const item = posts.selectedOptions[0];
            const postDet = document.getElementById('post-title');
            const descr = document.getElementById('post-body');
            const commentsPanel = document.getElementById('post-comments');
            commentsPanel.textContent = '';
            let id = '';

            postDet.textContent = item.textContent;
            fetch(postUrl)
                .then(res => res.json())
                .then(data => Object.values(data).forEach((e) => {
                    if (e.title == item.textContent) {
                        descr.textContent = e.body;
                        id = e.id;
                    }
                }));
            fetch(commentUrl)
                .then(response => response.json())
                .then(data => Object.entries(data).forEach((elem) => {
                    if (elem[1].postId == id) {
                        const li = document.createElement('li');
                        li.id = elem[1].id;
                        li.textContent = elem[1].text;
                        commentsPanel.appendChild(li);

                    }
                }));
        }
    }
}

attachEvents();