document.addEventListener('DOMContentLoaded', () => {
  const postList = document.getElementById('post-list');
  const postForm = document.getElementById('post-form');
  const editForm = document.getElementById('post-edit');
  const postView = document.getElementById('post-view');
  const newPostButton = document.getElementById('new-post');
  const savePostButton = document.getElementById('save-post');
  const saveEditButton = document.getElementById('save-edit');
  const postTitleInput = document.getElementById('post-title');
  const postContentInput = document.getElementById('post-content');
  const editTitleInput = document.getElementById('edit-title');
  const editContentInput = document.getElementById('edit-content');
  const viewTitle = document.getElementById('view-title');
  const viewContent = document.getElementById('view-content');
  const viewCreated = document.getElementById('view-created');
  const viewUpdated = document.getElementById('view-updated');

  // Функция для отображения списка постов
  function displayPostList() {
    postList.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
      const postItem = document.createElement('div');
      postItem.classList.add('post-item');
      postItem.innerHTML = `
                <h3>${post.title}</h3>
                <p>Дата создания: ${post.created}</p>
                <p>Дата редактирования: ${post.updated}</p>
                <button class="view-post" data-index="${index}">Просмотр</button>
                <button class="edit-post" data-index="${index}">Редактировать</button>
            `;
      postList.appendChild(postItem);
    });
  }

  // Функция для отображения формы создания/редактирования поста
  function showPostForm() {
    postForm.classList.remove('hidden');
    postView.classList.add('hidden');
    editForm.classList.add('hidden');
    postTitleInput.value = '';
    postContentInput.value = '';
  }

  // Функция для отображения просмотра поста
  function showPostView(index) {
    postForm.classList.add('hidden');
    
    editForm.classList.add('hidden');

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

  // Обработчик кнопки "Сохранить изменения"
  saveEditButton.addEventListener('click', () => {
    const title = editTitleInput.value;
    const content = editContentInput.value;

    if (title.trim() === '' || content.trim() === '') {
      alert('Пожалуйста, заполните заголовок и текст поста.');
      return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const editIndex = document.getElementById('post-index').value
    const currentDate = new Date().toLocaleString();

    posts[editIndex].title = title
    posts[editIndex].content = content
    posts[editIndex].updated = currentDate

    localStorage.setItem('posts', JSON.stringify(posts));
    displayPostList();
    showPostView(posts.length - 1);
  });

  // Обработчик кнопок "Просмотр" и "Редактировать"
  postList.addEventListener('click', (event) => {
    if (event.target.classList.contains('view-post')) {
      const index = event.target.getAttribute('data-index');
      postView.classList.remove('hidden');
      showPostView(index);
    } else if (event.target.classList.contains('edit-post')) {
      const index = event.target.getAttribute('data-index');
      editPost(index);
    }
  });

  // Функция для редактирования поста
  function editPost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[index];

    postForm.classList.add('hidden');
    postView.classList.add('hidden');
    editForm.classList.remove('hidden');


    editTitleInput.value = post.title;
    editContentInput.value = post.content;
    document.getElementById('post-index').value = index;
  }

  // Инициализация при загрузке страницы
  displayPostList();
});
