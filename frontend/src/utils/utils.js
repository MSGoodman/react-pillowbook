class Button {
    constructor(name, category, icon, tooltip) {
        this.name = name;
        this.category = category;
        this.icon = icon;
        this.tooltip = tooltip;
    }
}

const buttons = [
    // Productivity
    new Button('Meeting', 'Productivity', 'fas fa-phone-volume', 'Meetings involed in'),
    new Button('Task', 'Productivity', 'fas fa-check-square', 'A measured actionable task to be completed'),
    new Button('Work', 'Productivity', 'fas fa-briefcase', 'A period of time spent working on a task'),
    new Button('Research', 'Productivity', 'fas fa-microscope', 'A period of time spent researching a particular tag/topic'),
    // Health
    new Button('Lifting', 'Health', 'fas fa-dumbbell', 'Weightlifting exercises (squats, deadlifts, rows, etc.)'),
    new Button('Cardio', 'Health', 'fas fa-running', 'Cardio exercises (running, jumprope, etc.)'),
    new Button('Toilet', 'Health', 'fas fa-toilet', 'Illnesses/Symptoms'),
    new Button('Illness', 'Health', 'fas fa-disease', 'Illnesses/Symptoms'),
    // Money
    new Button('Purchase', 'Money', 'fas fa-cash-register', 'Monetary expenditures'),
    new Button('Payment', 'Money', 'fas fa-money-bill-wave', 'Money earned'),
    // Food
    new Button('Meal', 'Food & Drink', 'fas fa-utensils', 'Meals eaten'),
    new Button('Cook', 'Food & Drink', 'fas fa-blender', 'Meals cooked'),
    new Button('Beer', 'Food & Drink', 'fas fa-beer', 'Beer drank'),
    new Button('Wine', 'Food & Drink', 'fas fa-wine-glass-alt', 'Wine drank'),
    new Button('Cocktail', 'Food & Drink', 'fas fa-glass-whiskey', 'Cocktails drank'),
    // Consumption
    new Button('Movie', 'Consumption', 'fas fa-film', 'Films watched'),
    new Button('TV', 'Consumption', 'fas fa-tv', 'TV Episodes watched'),
    new Button('Music', 'Consumption', 'fas fa-compact-disc', 'Music listened to'),
    new Button('Podcast', 'Consumption', 'fas fa-podcast', 'Podcasts listened to'),
    new Button('B. Game', 'Consumption', 'fas fa-dice', 'Board games played'),
    new Button('V. Game', 'Consumption', 'fas fa-gamepad', 'Video games played'),
    new Button('Book', 'Consumption', 'fas fa-book', 'Books read'),
    // Creation
    // Misc
    new Button('Travel', 'Misc', 'fas fa-map-signs', 'Places traveled'),
    new Button('Tag', 'Misc', 'fas fa-tags', 'Tags to be used on other items'),
]

function tryRequire(path) {
    console.log(path)
    try {
        return require(`${path}`);
    } catch (err) {
        console.log(err)
        return null;
    }
}

export { buttons, tryRequire }