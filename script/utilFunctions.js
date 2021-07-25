//Latter 2 arguments should be arrays. First argument should be element.

export function addAndRemoveClasses(ele, add, remove){
    add.forEach(add => {
        ele.classList.add(add);
    });
    remove.forEach(remove => {
        ele.classList.remove(remove);
    });
}