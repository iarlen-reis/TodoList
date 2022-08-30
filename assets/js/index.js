function Main() {
    const inputTask = document.querySelector('.inputTask');
    const buttonTask = document.querySelector('.buttonTask');
    const tasks = document.querySelector('.tasks');


    buttonTask.addEventListener('click', function(event) {
        if (!inputTask.value) return '';
        addTaskInElement(inputTask.value);
        clearInput(inputTask);

    });

    inputTask.addEventListener('keypress', function(event){
        if (event.keyCode == 13) {
            addTaskInElement(inputTask.value);
            clearInput(inputTask);
        }
    })

    function createElementLi() {
        let element = document.createElement('li');
        return element;
    }

    function clearInput(element){
        element.value = '';
        element.focus();
    }

    function addTaskInElement(task) {
        let element = createElementLi();
        element.innerText = task;
        setElementInTasks(element);
    }

    function createElementHr() {
        const hr = document.createElement('hr');
        return hr;
    }

    function createButtonDelete(element) {
        element.innerHTML += ' ';
        let button = document.createElement('button');
        button.innerHTML = 'x';
        button.setAttribute('class', 'delete');
        element.appendChild(button);
        element.appendChild(createElementHr());
        return element;
    }

    function setElementInTasks(element) {
        createButtonDelete(element);
        tasks.appendChild(element);
        saveTasks();
    }

    function saveTasks(){
        let tasksList = [];
        const tasksLis = tasks.querySelectorAll('li');
        for (let task of tasksLis) {
            let valueElement = task.innerText.slice(0, -2);
            tasksList.push(valueElement);
        }
        const taskJSON = JSON.stringify(tasksList);
        localStorage.setItem('tasks', taskJSON);
    }

    function setTasksSaves() {
        const tasks = localStorage.getItem('tasks');
        const tasksList = JSON.parse(tasks);

        for (let task of tasksList) {
            addTaskInElement(task);
        }
    }

    document.addEventListener('click', function(event) {
        const element = event.target;
        if (element.classList.contains('delete')) {
            element.parentElement.remove();
            saveTasks();
        }
    })

    setTasksSaves();
}

Main();