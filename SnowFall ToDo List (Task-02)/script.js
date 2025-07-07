window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    // Check if the name exists in local storage
    const username = localStorage.getItem('username');

    // Only set the input field value if there's no existing value in local storage
    if (!username) {
        nameInput.value = username;
    }

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        // Get the input value
        const todoContent = e.target.elements.content.value.trim();
        const userName = nameInput.value.trim(); // Get the value of the name input

        // Check if the name input is empty
        if (userName === '') {
            alert('Please enter your name!');
            return; // Exit the function early if name input is empty
        }

        // Check if the input is not empty
        if (todoContent !== '') {
            const todo = {
                content: todoContent,
                category: e.target.elements.category.value,
                done: false,
                createdAt: new Date().getTime()
            };

            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));

            // Reset the form
            e.target.reset();

            DisplayTodos();
        } else {
            // Show a pop-up or alert to fill the to-do list
            alert('Please enter a to-do item!');
        }
    });


    function DisplayTodos() {
        const todoList = document.querySelector('#todo-list');
        todoList.innerHTML = "";

        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');

            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const edit = document.createElement('button');
            const deleteButton = document.createElement('button');

            input.type = 'checkbox';
            input.checked = todo.done;
            span.classList.add('bubble');
            if (todo.category == 'personal') {
                span.classList.add('personal');
            } else {
                span.classList.add('business');
            }
            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit.classList.add('edit');
            deleteButton.classList.add('delete');

            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
            edit.innerHTML = 'Edit';
            deleteButton.innerHTML = 'Delete';

            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(edit);
            actions.appendChild(deleteButton);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem);

            if (todo.done) {
                todoItem.classList.add('done');
            }

            input.addEventListener('change', (e) => {
                todo.done = e.target.checked;
                localStorage.setItem('todos', JSON.stringify(todos));

                if (todo.done) {
                    todoItem.classList.add('done');
                } else {
                    todoItem.classList.remove('done');
                }

                DisplayTodos();

            });

            edit.addEventListener('click', (e) => {
                const input = content.querySelector('input');
                input.removeAttribute('readonly');
                input.focus();
                input.addEventListener('blur', (e) => {
                    input.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    DisplayTodos();

                });
            });

            deleteButton.addEventListener('click', (e) => {
                todos = todos.filter(t => t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            });

        });
    }
});
