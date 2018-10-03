class Card {
    constructor(name, skill) {
        this.name = name;
        this.skill = skill;
    }
}
var m = new Map()
var app = new Vue({
    el: '#app',
    data: {
        cards: m,
        decks: [],
        commons: [],
        deck_code: ''
    },
    methods: {
        handleSubmit() {
            fetch('/deck/'+ this.deck_code)
            .then((resp) => resp.json())
            .then(response => {
                deck = []
                response.forEach(card => {
                    if(!this.cards.has(card['normal_card_id'])) {
                        card_evo = ""
                        if(card['evo_skill_disc'].length > 0)
                            card_evo = "<br>Evolve: " + card['evo_skill_disc'].replace("Evolve:", "")
                        this.cards.set(""+ card['normal_card_id'], new Card(card['card_name'], card['skill_disc'] + card_evo))
                    }
                    deck.push(card['normal_card_id'])
                });
                this.decks.push(deck)
                console.log(this.cards)
            }
            ).catch(error => {
                console.log(error)
            })
        },
        getDescription: function(card) {
            if (this.cards.has(card))
                return this.cards.get(card).skill
            return ""
        },
        getCounts: function(deck) {
            count = {}
            deck.forEach(function(card) {
                count[card] = count[card] + 1 || 1
            });
            return count;
        },
        getUncommons: function(deck) {
            if(deck == null)
                return []
            val = [deck, this.commons]
            return val.reduce((a,b) => a.filter(c => !b.includes(c)))
        }
    },
    watch: {
        decks: function(val) {
            this.commons = val.reduce((a, b) => a.filter(c => b.includes(c)));
        }
    }
})