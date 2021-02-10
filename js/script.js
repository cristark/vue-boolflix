
let app = new Vue({
    el: '#app',
    data: {
        filmScr: '',
        filmList: [],
        personalKey: '142a6088c254c6ad0c04405021a72539',
        lang: 'it-IT',
        baseImgUrl: 'https://image.tmdb.org/t/p/',
        imgSize: 'w342'
    },
    methods: {
        findFilm() {
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
                    console.log(this.filmList);
                })
                .catch(error => console.log('ERRORI: ', error));


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
                .catch(error => console.log('ERRORI: ', error));

        }
    }
});