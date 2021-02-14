
let app = new Vue({
    el: '#app',
    data: {
        navMenu: ['Home','Film','Serie TV','News','La mia lista',],
        casualListFilterCounter: 0,
        casualListFilter: [
            {
                name: 'Top Rated',
                api: 'top_rated',
                icon: 'fas fa-angle-double-up'
            },
            {
                name: 'Popular',
                api: 'popular',
                icon: 'fas fa-fire-alt'
            },
            {
                name: 'Now Playing',
                api: 'now_playing',
                icon: 'fas fa-star'
            },
            {
                name: 'Upcoming',
                api: 'upcoming',
                icon: 'fas fa-plus'
            }
        ],
        contentListCounter: 0,
        contentList: [
            {
                name: 'Film',
                icon: 'fas fa-film'
            },
            {
                name: 'Serie TV',
                icon: 'fab fa-youtube'
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
        this.getBestList(this.casualListFilter[this.casualListFilterCounter].api);
    },
    methods: {
        findFilm() { // + CHIAMATA FILM RICERCA UTENTE +
            /* this.getContent('movie', this.filmList); */
            this.detailsIndex = null;
            axios
                .get(`https://api.themoviedb.org/3/search/movie`, {
                    params: {
                        api_key: this.personalKey,
                        language: this.lang,
                        query: this.filmScr
                    }
                })
                .then(result => {
                    this.filmList = result.data.results;
                    console.log('LISTA FILM: ', this.filmList);

                    this.filmList.forEach(element => {
                        element.cast = '';
                        this.getCast('movie', element);
                    });
                    console.log('LISTA FILM con CAST: ',this.filmList);
                })
                .catch(error => console.log('ERRORI FILM: ', error));
        },
        findTV() { // + CHIAMATA SERIE TV RICERCA UTENTE +
            this.detailsIndex = null;
            axios
                .get(`https://api.themoviedb.org/3/search/tv`, {
                    params: {
                        api_key: this.personalKey,
                        language: this.lang,
                        query: this.filmScr
                    }
                })
                .then(result => {
                    this.filmList = result.data.results;
                    console.log('LISTA FILM: ', this.filmList);

                    this.filmList.forEach(element => {
                        element.cast = '';
                        this.getCast('tv', element);
                    });
                    console.log('LISTA FILM con CAST: ',this.filmList);
                })
                .catch(error => console.log('ERRORI FILM: ', error));
        },
        //! richiamato in un'altra funzione non stampa i risultati su HTML !
        /* getContent(cat, arr) {
            // + CHIAMATA FILM RICERCA UTENTE +
            axios
            .get(`https://api.themoviedb.org/3/search/${cat}`, {
                params: {
                    api_key: this.personalKey,
                    language: this.lang,
                    query: this.filmScr
                }
            })
            .then(result => {
                arr = result.data.results;
                console.log('LISTA FILM: ', arr);
                
                arr.forEach(element => {
                    element.cast = '';
                    this.getCast(cat, element);
                });
                console.log('LISTA FILM con CAST: ',arr);
            })
            .catch(error => console.log('ERRORI FILM: ', error));
        }, */
        getCast(cat, elementoArr) { //|Funzione chiamata CAST
            // + CHIAMATA AXIOS ATTORI +
            axios
            .get(`https://api.themoviedb.org/3/${cat}/${elementoArr.id}/credits`, {
                params: {
                    api_key: this.personalKey,
                    language: this.lang
                }
            })
            .then(result => {
                for (let i = 0; i < 5; i++) {
                    if (result.data.cast.length == 0) {
                        result.data.cast[i].name = 'Cast momentaneamente non disponibile'
                    } else {
                        elementoArr.cast += result.data.cast[i].name + ', ';
                    }
                }
                this.filmScr = '';
            })
            .catch(error => console.log('ERRORI ATTORI: ', error));
        },
        getBestList(cat) {
            axios
                .get(`https://api.themoviedb.org/3/movie/${cat}`, {
                    params: {
                        api_key: this.personalKey,
                        language: this.lang
                    }
                })
                .then(result => {
                    this.trendsNow = result.data.results;
                    console.log(this.trendsNow);
                })
                .catch(error => console.log('ERRORI TREND NOW: ', error));
        },
        showDetails(indice) {
            this.detailsIndex = indice;
        },
        scrollToSrc() {
            this.textSearch = true;
            window.scrollTo(0, 800);
        }
    }
});