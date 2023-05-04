const todo = {
  action(e) {
    const target = e.target;
    if (target.classList.contains('todoAction')) {
      const action = target.dataset.todoAction;
      const elemItem = target.closest('.todoItem');
      if (action === 'deleted' && elemItem.dataset.todoState === 'deleted') {
        elemItem.remove();
      } else {
        elemItem.dataset.todoState = action;
        const lexicon = {
          active: 'восстановлено',
          completed: 'завершено',
          deleted: 'удалено'
        };
        const elTodoDate = elemItem.querySelector('.todoDate');
        const html = `<span>${lexicon[action]}: ${new Date().toLocaleString().slice(0, -3)}</span>`;
        elTodoDate.insertAdjacentHTML('beforeend', html);
      }
      this.save();
    } else if (target.classList.contains('todoAdd')) {
      this.add();
      this.save();
    }
  },
  add() {
    const elemText = document.querySelector('.todoText');
    if (elemText.disabled || !elemText.value.length) {
      return;
    }
    document.querySelector('.todoItems').insertAdjacentHTML('beforeend', this.create(elemText.value));
    elemText.value = '';
  },
  create(text) {
    const date = JSON.stringify({ add: new Date().toLocaleString().slice(0, -3) });
    return `<li class="todoItem" data-todo-state="active">
      <span class="todoTask">
        ${text}
        <span class="todoDate" data-todo-date="${date}">
          <span>добавлено: ${new Date().toLocaleString().slice(0, -3)}</span>
        </span>
      </span>
      <span class="todoActionRestore" data-todo-action="active"></span>
      <button class=" todoActionComplete" data-todo-action="completed"></button>
      <button class="todoActionDelete" data-todo-action="deleted"></button></li>`;
  },
  init() {
    const fromStorage = localStorage.getItem('todo');
    if (fromStorage) {
      document.querySelector('.todoItems').innerHTML = fromStorage;
    }
    document.querySelector('.todoOptions').addEventListener('change', this.update);
    document.addEventListener('click', this.action.bind(this));
  },
  update() {
    const option = document.querySelector('.todoOptions').value;
    document.querySelector('.todoItems').dataset.todoOption = option;
    document.querySelector('.todoText').disabled = option !== 'active';
  },
  save() {
    localStorage.setItem('todo', document.querySelector('.todoItems').innerHTML);
  }
};

todo.init();