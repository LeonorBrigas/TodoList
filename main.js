const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');

if(window.localStorage.getItem("todos") == undefined) {
     var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}

var todosEX = window.localStorage.getItem("todos");
var todos = JSON.parse(todosEX);

// create the item (of to do in a div)
class item {
    constructor(name) {
      this.createItem(name);
    }
      createItem(name) {
       var itemBox = document.createElement('div');
       itemBox.classList.add('item');

       var input = document.createElement('input');
       input.type = "text";
       // A disabled input element is unusable and un-clickable.
        //until a given condition is met
       input.disabled = true;
       input.value = name;
       //classList property returns the class name(s) of an element
        //is useful to add, remove and toggle CSS classes on an element.
       input.classList.add('item_input');

        var edit = document.createElement('button');
        edit.classList.add('edit');
        edit.innerHTML = "EDIT";
        edit.addEventListener('click', () => this.edit(input, name));

        var remove = document.createElement("button");
        remove.innerHTML = "REMOVE";
        remove.classList.add("remove");
        remove.addEventListener("click", () => this.remove(itemBox, name));

        //insert div inside container
        container.appendChild(itemBox);

          // insert input text
          itemBox.appendChild(input);
          // insert edit button
          itemBox.appendChild(edit);
          // insert remove button
          itemBox.appendChild(remove);
        }

      // input because you just want to change the name of the task, but still have it
      // localstorage =  dados armazenados no localStorage não expiram
      // set item => store (saving)
      // get item => retrieve (reading)
      edit(input, name){
        if(input.disabled == true ){
          input.disabled = !input.disabled;
        } else {
          input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);
            todos[indexof] = input.value;
            window.localStorage.setItem("todos", JSON.stringify(todos));
          }
      }

      // itembox because it has everything concerning the task
      remove(itemBox, name){
        // parent node tag above the actual (property read only)
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        // adds/removes items to/from an array, and returns the removed item(s).
        // array.splice(index, howmany, item1, ....., itemX)
        todos.splice(index,1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
      }
}

add.addEventListener("click", check);
// All global JavaScript objects, functions, and variables automatically become members of the window object.
window.addEventListener("keydown", (e) => {
  if (e.which == 13) {
    check();
  }
})

function check() {
  if(inputValue.value != "") {
    // create a todo
    new item(inputValue.value);
    // push it to the list of todos
    todos.push(inputValue.value);
    window.localstorage.setItem("todos", JSON.stringify(todos));
    inputValue.value = "";
  }
}

for (var v = 0; v < todos.length; v++){
  new item(todos[v]);
}


new item("sport");
