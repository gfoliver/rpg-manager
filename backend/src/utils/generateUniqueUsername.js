module.exports = function(id) {
    const names = [
        'wizard', 'mage', 'human', 'horse', 'dragon', 'frog', 'wolf',
        'warrior', 'creature', 'monster', 'bard', 'paladin', 'elf',
        'orc', 'dog', 'archer', 'barbarian', 'champion', 'viking', 
        'priest', 'thief', 'cowboy', 'demon', 'spy', 'dwarf'
    ]
    const adjectives = [
        'big', 'small', 'fast', 'quick', 'slow', 'tall', 'short', 'crazy',
        'mad', 'insane', 'smart', 'clever', 'strong', 'invisible', 'skinny',
        'fat', 'bright', 'brave', 'cruel', 'dangerous', 'enchanting', 'helpful',
        'high', 'huge', 'lucky', 'proud', 'rough', 'sarcastic'
    ]

    const nameId = Math.floor(Math.random() * names.length)
    const adjectiveId = Math.floor(Math.random() * adjectives.length)

    return adjectives[adjectiveId] + names[nameId] + id
}