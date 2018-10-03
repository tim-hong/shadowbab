class Card {
    constructor(name, skill) {
        this.name = name;
        this.skill = skill;
    }
}

var app = new Vue({
    el: '#app',
    data: {
        cards: new Map(),
        decks: [],
        commons: [],
        deck: [],
        deck_code: ''
    },
    methods: {
        handleSubmit() {
            fetch('/deck/'+ this.deck_code)
            .then((resp) => resp.json())
            .then(response => {
                response.forEach(card => {
                    if(!this.cards.has(card['normal_card_id'])) {
                        card_evo = ""
                        if(card['evo_skill_disc'].length > 0)
                            card_evo = "<br>Evolve: " + card['evo_skill_disc'].replace("Evolve:", "")
                        this.cards.set(card['normal_card_id'], new Card(card['card_name'], card['skill_disc'] + card_evo))
                    }
                    this.deck.push(card['normal_card_id'])
                });
            }
            ).catch(error => {
                console.log(error)
            })
        },
        getDescription: function(card) {
            if (this.cards.has(card))
                return this.cards.get(card).skill
            return ""
        }
    }
})