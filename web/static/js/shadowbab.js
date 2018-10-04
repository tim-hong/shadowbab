class Card {
    constructor( skill, cost, rarity) {
        this.skill = skill;
        this.cost = cost;
        this.rarity = rarity;
    }
}

var app = new Vue({
    el: '#app',
    data: {
        cards: new Map(),
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
                    if(!this.cards.has(card['card_name'])) {
                        card_evo = ""
                        if(card['evo_skill_disc'].length > 0)
                            card_evo = "<br>Evolve: " + card['evo_skill_disc'].replace("Evolve:", "")
                        this.cards.set(card['card_name'], new Card(card['skill_disc'] + card_evo, card['cost'], card['rarity']))
                    }
                    deck.push(card['card_name'])
                });
                this.decks.push(deck)
                console.log(sorted)
                console.log(deck)
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
        },
        getRarity: function(rarity) {
            ret = "";
            switch(rarity) {
                case 1:
                    ret = "#97695e";
                    break;
                case 2:
                    ret="#b9bbc2";
                    break;
                case 3:
                    ret="#c5a778";
                    break;
                case 4:
                    ret="#a195dd"
                    break;
            }
            return ret;
        }
    },
    watch: {
        decks: function(val) {
            this.commons = val.reduce((a, b) => a.filter(c => b.includes(c)));
        }
    }
})