class Button {
    constructor(name, category, icon, tooltip, type) {
        this.name = name;
        this.category = category;
        this.icon = icon;
        this.tooltip = tooltip;
        this.type = type;
    }
}

const buttons = [
    // Productivity
    new Button('Meeting', 'Productivity', 'fas fa-phone-volume', 'Meetings involed in', 'MEETING'),
    new Button('Task', 'Productivity', 'fas fa-check-square', 'A measured actionable task to be completed', 'TASK'),
    // new Button('Work', 'Productivity', 'fas fa-briefcase', 'A period of time spent working on a task'),
    // new Button('Research', 'Productivity', 'fas fa-microscope', 'A period of time spent researching a particular tag/topic'),

    // Health
    new Button('Lifting', 'Health', 'fas fa-dumbbell', 'Weightlifting exercises (squats, deadlifts, rows, etc.)', 'EXERCISE_WEIGHT'),
    new Button('Cardio', 'Health', 'fas fa-running', 'Cardio exercises (running, jumprope, etc.)', 'EXERCISE_CARDIO'),
    new Button('Toilet', 'Health', 'fas fa-toilet', 'Illnesses/Symptoms', 'TOILET'),
    // new Button('Illness', 'Health', 'fas fa-disease', 'Illnesses/Symptoms',),

    // Money
    //new Button('Purchase', 'Money', 'fas fa-cash-register', 'Monetary expenditures'),
    //new Button('Payment', 'Money', 'fas fa-money-bill-wave', 'Money earned'),

    // Food
    new Button('Meal', 'Food & Drink', 'fas fa-utensils', 'Meals eaten', 'MEAL'),
    // new Button('Cook', 'Food & Drink', 'fas fa-blender', 'Meals cooked'),
    new Button('Beer', 'Food & Drink', 'fas fa-beer', 'Beer drank', 'BEER'),
    new Button('Wine', 'Food & Drink', 'fas fa-wine-glass-alt', 'Wine drank', 'WINE'),
    new Button('Cocktail', 'Food & Drink', 'fas fa-glass-whiskey', 'Cocktails drank', 'COCKTAIL'),

    // Consumption
    new Button('Movie', 'Consumption', 'fas fa-film', 'Films watched', 'MOVIE'),
    new Button('TV', 'Consumption', 'fas fa-tv', 'TV Episodes watched', 'TV_EPISODE'),
    new Button('Music', 'Consumption', 'fas fa-compact-disc', 'Music listened to', 'ALBUM'),
    new Button('Podcast', 'Consumption', 'fas fa-podcast', 'Podcasts listened to', 'PODCAST'),
    new Button('B. Game', 'Consumption', 'fas fa-dice', 'Board games played', 'BOARD_GAME'),
    new Button('V. Game', 'Consumption', 'fas fa-gamepad', 'Video games played', 'VIDEO_GAME'),
    new Button('Book', 'Consumption', 'fas fa-book', 'Books read', 'BOOK'),

    // Creation

    // Data
    // new Button('Travel', 'Misc', 'fas fa-map-signs', 'Places traveled'),
    new Button('Person', 'Data', 'fas fa-user', 'A person; a historical figure, artist, co-worker, etc.', 'PERSON'),
    new Button('Group', 'Data', 'fas fa-users', 'A group; a band, organization, corporation, etc.', 'GROUP'),
    new Button('Location', 'Data', 'fas fa-map-marked-alt', 'A location; a country, city, store, etc.', 'LOCATION'),
    new Button('Datum', 'Data', 'fas fa-tags', 'Misc item that doesn\'t fit into other categories', 'DATUM'),
]

const nodeTypesUnsorted = [{ "name": "PERSON", "node_type_uuid": "228566dc72874572a58613a2791ec72a", "icon": "fas fa-user", "created_at": 1595999566 }, { "name": "VIDEO_GAME", "node_type_uuid": "2df98062f9827c69217a7ae03b7ab6da", "icon": "fas fa-gamepad", "created_at": 1595999566 }, { "name": "BOARD_GAME", "node_type_uuid": "840533fda631fc998bc003348cee82ab", "icon": "fas fa-dice", "created_at": 1595999566 }, { "name": "MOVIE", "node_type_uuid": "88dcc61b9f5568a4f138a3c5f9848766", "icon": "fas fa-film", "created_at": 1595999566 }, { "name": "BOOK", "node_type_uuid": "1106d54e9ca513638b6b493302fb84d6", "icon": "fas fa-book", "created_at": 1595999566 }, { "name": "CHAPTER", "node_type_uuid": "80c64496c51addb356e704c34e473b92", "icon": "fas fa-bookmark", "created_at": 1595999566 }, { "name": "GROUP", "node_type_uuid": "af70aee7209fc8b594426916dd55beff", "icon": "fas fa-user", "created_at": 1595999566 }, { "name": "ALBUM", "node_type_uuid": "6b6452948f945e1689938e6f6fcec69a", "icon": "fas fa-record-vinyl", "created_at": 1595999566 }, { "name": "SONG", "node_type_uuid": "dcc60a696646d33965f64fe8c68fe38c", "icon": "fas fa-file-audio", "created_at": 1595999566 }, { "name": "TV_SERIES", "node_type_uuid": "d3c7a375623e629fc4f06d50b88bc435", "icon": "fas fa-tv", "created_at": 1595999566 }, { "name": "TV_SEASON", "node_type_uuid": "e3432da71f7a53f6abc89a964aedcd59", "icon": "fas fa-tv", "created_at": 1595999566 }, { "name": "TV_EPISODE", "node_type_uuid": "d7c861a531c0cfc48efb527f960d5876", "icon": "fas fa-tv", "created_at": 1595999566 }, { "name": "DISH", "node_type_uuid": "47d01ae6ddb272b0253b220bbeb5c566", "icon": "fas fa-hamburger", "created_at": 1595999566 }, { "name": "RECIPE", "node_type_uuid": "36303168aa7b3de1c0e66aa6a63a8f4f", "icon": "fas fa-blender", "created_at": 1595999566 }, { "name": "FOOD_ITEM", "node_type_uuid": "8d7d5aba4ea106d972e10a16b63774c1", "icon": "fas fa-cheese", "created_at": 1595999566 }, { "name": "MEAL", "node_type_uuid": "30e0765924b9c8ce09c98ac201128d39", "icon": "fas fa-utensils", "created_at": 1595999566 }, { "name": "DATUM", "node_type_uuid": "817fa9fe63b0a246b971a5904bac01b7", "icon": "fas fa-tag", "created_at": 1595999566 }, { "name": "BEER", "node_type_uuid": "3d7e99cba379b34b40336ff559e181ee", "icon": "fas fa-beer", "created_at": 1595999566 }, { "name": "WINE", "node_type_uuid": "bc7c0be040bf4d5c1a96fecd6736ee3f", "icon": "fas fa-wine-glass-alt", "created_at": 1595999566 }, { "name": "TASK", "node_type_uuid": "ce8a01999f251f169a4b0731b25f4b75", "icon": "fas fa-check-square", "created_at": 1595999566 }, { "name": "MEETING", "node_type_uuid": "c9b21f8fbc718214fa76b0199f822c3b", "icon": "fas fa-people-arrows", "created_at": 1595999566 }, { "name": "REVIEW", "node_type_uuid": "13bd19595cdf8be241d53f6ab9851f52", "icon": "fas fa-star-half-alt", "created_at": 1595999566 }, { "name": "SESSION", "node_type_uuid": "03cbdaee14e299125765d02e59a8f5e4", "icon": "fas fa-clock", "created_at": 1595999566 }, { "name": "DATE", "node_type_uuid": "ff87bbe1f20f7fbaaca373412ff86a2b", "icon": "far fa-calendar-alt", "created_at": 1595999566 }, { "name": "ACTIVITY", "node_type_uuid": "9b63085c07944fe1b014bdc4763a643c", "icon": "fas fa-street-view", "created_at": 1595999566 }, { "name": "IMAGE", "node_type_uuid": "d1808b684ad8fe960abcdf26e325bff0", "icon": "fas fa-image", "created_at": 1595999566 }, { "name": "FILE", "node_type_uuid": "0f69ae8217e29f3d8beb94637a6545da", "icon": "fas fa-file-archive", "created_at": 1595999566 }, { "name": "NOTE", "node_type_uuid": "a90c44fd158f2f9bc878560075562692", "icon": "fas fa-sticky-note", "created_at": 1595999566 }, { "name": "WEBPAGE", "node_type_uuid": "e9e7df65817cff588e656970e52eb554", "icon": "fas fa-globe", "created_at": 1595999566 }, { "name": "CHORE", "node_type_uuid": "d1a7ce53e5bdad021ccd1eddadf39022", "icon": "fas fa-hands-wash", "created_at": 1595999566 }, { "name": "PODCAST", "node_type_uuid": "c631bc80479dc86dbf9ba939ed6293e5", "icon": "fas fa-podcast", "created_at": 1595999566 }, { "name": "EXERCISE_WEIGHT", "node_type_uuid": "fce9a4e061c35c69d08bb1dca17226ef", "icon": "fas fa-dumbbell", "created_at": 1595999566 }, { "name": "EXERCISE_CARDIO", "node_type_uuid": "78fcade148e74e7e192b7be10f1e5063", "icon": "fas fa-running", "created_at": 1595999566 }, { "name": "RESEARCH", "node_type_uuid": "e19f51a357e8b26dfec0664782d2b9f8", "icon": "fas fa-microscope", "created_at": 1595999566 }, { "name": "TOILET", "node_type_uuid": "86a439cda668cc2d8c7c99ce1719b0bf", "icon": "fas fa-toilet", "created_at": 1595999566 }, { "name": "PURCHASE", "node_type_uuid": "c1128a460142f91621095b3dc31ce736", "icon": "fas fa-cash-register", "created_at": 1595999566 }, { "name": "PAYMENT", "node_type_uuid": "d4e97d729032222f59f91901a0a7a3be", "icon": "fas fa-hand-holding-usd", "created_at": 1595999566 }, { "name": "TRAVEL", "node_type_uuid": "e97578ab9005e9e56111192c1162a317", "icon": "fas fa-map-signs", "created_at": 1595999566 }, { "name": "LOCATION" }];
const nodeTypes = nodeTypesUnsorted.sort((a, b) => {
    let comparison = 0;
    if (a.name > b.name) comparison = 1;
    else if (a.name < b.name) comparison = -1;
    return comparison;
})

function stringToTitleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (t) { return t.toUpperCase() });
}

export { buttons, nodeTypes, stringToTitleCase }