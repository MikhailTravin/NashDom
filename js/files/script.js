function indents() {
    const header = document.querySelector('.header');
    const page = document.querySelector('.other-page');

    //Оступ от шапки
    let hHeader = window.getComputedStyle(header, false).height;
    hHeader = Number(hHeader.slice(0, hHeader.length - 2));

    if (page) {
        page.style.paddingTop = hHeader + 'px';
    }

    //выпадающее меню
    const menuBody = document.querySelector('.menu__body');
    if (document.documentElement.clientWidth < 991.98) {
        menuBody.style.top = hHeader + 'px';
        menuBody.style.minHeight = `calc(100vh - ${hHeader}px)`;
        menuBody.style.height = `calc(100vh - ${hHeader}px)`;
    } else {
        menuBody.style.top = '0px';
        menuBody.style.minHeight = 'auto';
        menuBody.style.height = 'auto';
    }

    //слайдер навигация
    let pagination = document.querySelector('.banner__pagination');
    let mainHomeBody = document.querySelector('.banner__container');
    let mainHome = document.querySelector('.banner');

    if (mainHomeBody) {
        let wMainHomeBody = window.getComputedStyle(mainHomeBody, false).width;
        wMainHomeBody = Number(wMainHomeBody.slice(0, wMainHomeBody.length - 2));

        let wMainHome = window.getComputedStyle(mainHome, false).width;
        wMainHome = Number(wMainHome.slice(0, wMainHome.length - 2));

        const sumMainHome = ((wMainHome - wMainHomeBody) / 2) + 15;

        if (pagination) {
            if (document.documentElement.clientWidth > 767.98) {
                pagination.style.right = sumMainHome + 'px';
            } else {
                pagination.style.right = 'auto';
            }
        }
    }
}

window.addEventListener('scroll', () => {
    indents();
});

window.addEventListener('resize', () => {
    indents();
});

indents();

//========================================================================================================================================================

//Поиск

const buttonSearch = document.querySelector('.button-search');

if (buttonSearch) {
    const searchHeaderClose = document.querySelector('.search-header__close');
    buttonSearch.addEventListener("click", function (e) {
        document.documentElement.classList.add('search-open')
    });
    searchHeaderClose.addEventListener("click", function (e) {
        document.documentElement.classList.remove('search-open')
    });
    window.addEventListener("click", function (e) {
        let target = e.target;
        if (!target.closest('.search-header__input') & !target.closest('.button-search')) {
            document.documentElement.classList.remove('search-open')
        }
    });
}

//========================================================================================================================================================

//Направления
const buildingItems = document.querySelectorAll('.building__items');

if (buildingItems) {
    buildingItems.forEach(buildingItem => {
        const buildingClose = buildingItem.querySelector('.building__close');

        // Добавляем обработчик события click для всего элемента 
        buildingItem.addEventListener("click", function (e) {
            if (!e.target.classList.contains('building__close')) {
                buildingItem.classList.add('_active');
            }
        });

        // Добавляем обработчик события click для кнопки закрытия
        if (buildingClose) {
            buildingClose.addEventListener("click", function (e) {
                e.stopPropagation();
                buildingItem.classList.remove('_active');
            });
        }
    });

}

//========================================================================================================================================================

//Скролл 
function scrollBlock() {

    let scrollBlocks = document.querySelectorAll('.scroll');

    if (scrollBlocks) {

        let speed = 2; // Скорость скролла.
        let left = 0;
        let top = 0;
        let drag = false;
        let coorX = 0;
        let coorY = 0;

        scrollBlocks.forEach(scrollBlock => {
            scrollBlock.addEventListener('mousedown', function (e) {
                drag = true;
                coorX = e.pageX;
                coorY = e.pageY;
            });
            document.addEventListener('mouseup', function () {
                drag = false;
                left = scrollBlock.scrollLeft;
                top = scrollBlock.scrollTop;
            });
            scrollBlock.addEventListener('mousemove', function (e) {
                if (drag) {
                    this.scrollLeft = left - (e.pageX - coorX) * speed;
                    this.scrollTop = top - (e.pageY - coorY) * speed;
                }
            });
        });

    }

};

scrollBlock()

//========================================================================================================================================================

//Фильтр 

const filters = '.filter';
if (filters) {
    const buttonsSelector = `${filters} .filter__navigation`;
    const buttonSelector = `${buttonsSelector} [data-filter]`;
    const buttonActiveClass = '_active';

    const itemsSelector = `${filters} .filter-content`;
    const itemSelector = `${itemsSelector} .filter-column`;
    const itemHiddenClass = '_hide';
    const itemFilterClassPrefix = 'filter__column_';

    if (buttonsSelector) {

        document.querySelectorAll(buttonSelector).forEach(n => {
            n.addEventListener('click', onFilterButtonClick);
        });

        function onFilterButtonClick({ currentTarget: { dataset: { filter } } }) {
            const activeItemClass = itemFilterClassPrefix + filter;

            this.closest(buttonsSelector).querySelectorAll(buttonSelector).forEach(n => {
                n.classList.toggle(buttonActiveClass, n === this);
            });

            this.closest(filters).querySelectorAll(itemSelector).forEach(({ classList: cl }) => {
                cl.toggle(itemHiddenClass, filter !== 'all' && !cl.contains(activeItemClass));
            })

        }
    }

};

//Направления
const FilterDesc = document.querySelectorAll('.products__desc');

if (FilterDesc) {
    FilterDesc.forEach(desc => {

        const filterItem = desc.closest('.products__item');
        
        desc.addEventListener("click", function (e) {
            filterItem.classList.toggle('_active');
        });
    });

}