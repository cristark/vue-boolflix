
let app = new Vue({
    el: '#app',
    data: {
        navMenu: ['Home','Film','Serie TV','News','La mia lista',],
        casualListFilter: [
            {
                name: 'Trends Now',
                icon: 'fas fa-angle-double-up'
            },
            {
                name: 'Popular',
                icon: 'fas fa-fire-alt'
            },
            {
                name: 'Premieres',
                icon: 'fas fa-star'
            },
            {
                name: 'Recently Added',
                icon: 'fas fa-plus'
            }
        ],
        trendsNow: [],
        textSearch: false,
        filmScr: '',
        filmList: [],
        detailsIndex: null,
        personalKey: '142a6088c254c6ad0c04405021a72539',
        lang: 'it-IT',
        baseImgUrl: 'https://image.tmdb.org/t/p/',
        imgSize: 'w342',
        imgSizeBig: 'original',
    },
    mounted() {
        // + Chiamata lista film TREND NOW +
        axios
                .get('https://api.themoviedb.org/3/movie/top_rated', {
                    params: {
                        api_key: this.personalKey,
                        language: this.lang
                    }
                })
                .then(result => {
                    this.trendsNow = result.data.results;
                })
                .catch(error => console.log('ERRORI TREND NOW: ', error));
    },
    methods: {
        findFilm() {
            // + CHIAMATA FILM RICERCA UTENTE +
            axios
                .get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        api_key: this.personalKey,
                        language: this.lang,
                        query: this.filmScr
                    }
                })
                .then(result => {
                    if (this.filmList.length > 0) {
                        this.filmList = [];
                    }

                    result.data.results.forEach(element => {
                        this.filmList.push(element);
                    });
                    console.log('FILM LISTA: ', this.filmList);
                })
                .catch(error => console.log('ERRORI FILM: ', error));

            // + CHIAMATA SERIE TV RICERCA UTENTE +
            axios
                .get('https://api.themoviedb.org/3/search/tv', {
                    params: {
                        api_key: this.personalKey,
                        language: this.lang,
                        query: this.filmScr
                    }
                })
                .then(result => {
                    result.data.results.forEach(element => {
                        this.filmList.push(element);
                    });

                    this.filmScr = '';
                    console.log(this.filmList);
                })
                .catch(error => console.log('ERRORI SERIE TV: ', error));

        },
        showDetails(indice) {
            this.detailsIndex = indice;
        }
    }
});