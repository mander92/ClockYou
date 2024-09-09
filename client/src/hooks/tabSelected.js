const tabSelected = (e, identificador) => {
    e.preventDefault();
    const parentId = document.getElementById(identificador);
    const navATags = Array.from(parentId.children);

    navATags.forEach((navATag) => {
        navATag.style = '';
        navATag.classList.remove('activeSelectedLink');
    });

    e.target.classList.add('activeSelectedLink');
};

export default tabSelected;

// generar eventListener click sobre array de elementos en cada componente donde se exporte tabSelected, en vez de añadir onClick elemento por elemento
