<template>
    <div>
        <h1>Games</h1>
        <ul>
            <li v-for="game in games" :key="game.id">{{ game.name }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'GamesPage',
    data() {
        return {
            games: [],
        };
    },
    mounted() {
        // Fetch games data from the backend API
        this.fetchGames();
    },
    methods: {
        async fetchGames() {
            try {
                const response = await fetch('http://localhost:4200/games'); // Replace with your backend API endpoint
                const data = await response.json();
                this.games = data.games;
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>