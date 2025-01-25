import Recipe from './Recipe';

const main = document.querySelector('#main')

switch (main?.dataset?.page) {
    case 'recipes':
        new Recipe('recipes');
        break;
}