document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const postForm = document.getElementById('post-form');
    const postView = document.getElementById('post-view');
    const newPostButton = document.getElementById('new-post');
    const savePostButton = document.getElementById('save-post');
    const postTitleInput = document.getElementById('post-title');
    const postContentInput = document.getElementById('post-content');
    const viewTitle = document.getElementById('view-title');
    const viewContent = document.getElementById('view-content');
    const viewCreated = document.getElementById('view-created');
    const viewUpdated = document.getElementById('view-updated');

    // Функция для отображения списка постов
    function displayPostList() {
        // Очищаем текущий список
        postList.innerHTML = '';
        
        // Получаем посты из local storage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];

        // Выводим каждый пост
        posts.forEach((post, index) => {
            const postItem = document.createElement('div');
            postItem.classList.add('post-item');
            postItem.innerHTML = `
                <h3>${post.title}</h3>
                <p>Дата создания: ${post.created}</p>
                <p>Дата редактирования: ${post.updated}</p>
                <button class="view-post" data-index="${index}">Просмотр</button>
            `;
            postList.appendChild(postItem);
        });
    }

    // Функция для отображения формы создания/редактирования поста
    function showPostForm() {
        postForm.classList.remove('hidden');
        postView.classList.add('hidden');
        postTitleInput.value = '';
        postContentInput.value = '';
    }

    // Функция для отображения просмотра поста
    function showPostView(index) {
        postForm.classList.add('hidden');
        postView.classList.remove('hidden');

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const post = posts[index];

        viewTitle.textContent = post.title;
        viewContent.textContent = post.content;
        viewCreated.textContent = `Дата создания: ${post.created}`;
        viewUpdated.textContent = `Дата редактирования: ${post.updated}`;
    }

    // Обработчик кнопки "Создать новый пост"
    newPostButton.addEventListener('click', () => {
        showPostForm();
    });

    // Обработчик кнопки "Сохранить пост"
    savePostButton.addEventListener('click', () => {
        const title = postTitleInput.value;
        const content = postContentInput.value;

        if (title.trim() === '' || content.trim() === '') {
            alert('Пожалуйста, заполните заголовок и текст поста.');
            return;
        }

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const currentDate = new Date().toLocaleString();

        const newPost = {
            title,
            content,
            created: currentDate,
            updated: currentDate,
        };

        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPostList();
        showPostView(posts.length - 1);
    });

    // Обработчик кнопок "Просмотр"
    postList.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-post')) {
            const index = event.target.getAttribute('data-index');
            showPostView(index);
            console.log('123456');
        }
        console.log('123456---654321');
    });

    // Инициализация при загрузке страницы
    displayPostList();
});