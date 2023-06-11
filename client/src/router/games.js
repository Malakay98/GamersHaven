// import Developers from '../views/Developers.vue';
// import Platforms from '../views/Platforms.vue';
// import Genres from '../views/Genres.vue';
// import Tags from '../views/Genres.vue';
import GamesPage from '../views/Games.vue';


const gamesRoutes = [
    {
        path: '/games',
        name: "Games",
        component: GamesPage,
    },
    // {
    //     path: '/tags',
    //     name: "Tags",
    //     component: Tags,
    // },
    // {
    //     path: '/genres',
    //     name: "Genres",
    //     component: Genres,
    // },
    // {
    //     path: '/platforms',
    //     name: "Platforms",
    //     component: Platforms,
    // },
    // {
    //     path: '/developers',
    //     name: "Developers",
    //     component: Developers,
    // },
]


export default gamesRoutes;