const tabSelected = (e, identificador) => {
    e.preventDefault();
    const parentId = document.getElementById(identificador);
    const navATags = Array.from(parentId.children);

    navATags.forEach((navATag) => {
        navATag.style = '';
    });

    e.target.style.backgroundColor = '#bcbabe';
    e.target.style.color = 'white';
};

export default tabSelected;

// generar eventListener click sobre array de elementos en cada componente donde se exporte tabSelected, en vez de añadir onClick elemento por elemento
