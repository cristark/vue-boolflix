
let app = new Vue({
    el: '#app',
    data: {
        filmScr: '',
        filmList: [],
        personalKey: '142a6088c254c6ad0c04405021a72539',
        lang: 'it-IT',
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
                    result.data.results.forEach(element => {
                        this.filmList.push(element);
                    });
                })
                .catch(error => console.log('ERRORI: ', error));

                console.log(this.filmList);
        }
    }
});