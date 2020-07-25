const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const insertNodeTypes =
    `INSERT INTO node_type(name, icon) 
VALUES 
    ('PERSON', 'fas fa-user'),
    ('VIDEO_GAME', 'fas fa-gamepad'),
    ('BOARD_GAME', 'fas fa-dice'),
    ('MOVIE', 'fas fa-film'),
    ('BOOK', 'fas fa-book'),
    ('CHAPTER', 'fas fa-bookmark'),
    ('GROUP', 'fas fa-user'),
    ('ALBUM', 'fas fa-record-vinyl'),
    ('SONG', 'fas fa-file-audio'),
    ('TV_SERIES', 'fas fa-tv'),
    ('TV_SEASON', 'fas fa-tv'),
    ('TV_EPISODE', 'fas fa-tv'),
    ('DISH', 'fas fa-hamburger'),
    ('RECIPE', 'fas fa-blender'),
    ('FOOD_ITEM', 'fas fa-cheese'),
    ('MEAL', 'fas fa-utensils'),
    ('DATUM', 'fas fa-tag'),
    ('BEER', 'fas fa-beer'),
    ('WINE', 'fas fa-wine-glass-alt'),
    ('TASK', 'fas fa-check-square'),
    ('MEETING', 'fas fa-people-arrows'),
    ('REVIEW', 'fas fa-star-half-alt'),
    ('SESSION', 'fas fa-clock'),
    ('DATE', 'far fa-calendar-alt'),
    ('ACTIVITY', 'fas fa-street-view'),
    ('IMAGE', 'fas fa-image'),
    ('FILE', 'fas fa-file-archive'),
    ('NOTE', 'fas fa-sticky-note'),
    ('WEBPAGE', 'fas fa-globe'),
    ('CHORE', 'fas fa-hands-wash'),
    ('PODCAST', 'fas fa-podcast'),
    ('EXERCISE_WEIGHT', 'fas fa-dumbbell'),
    ('EXERCISE_CARDIO', 'fas fa-running'),
    ('RESEARCH', 'fas fa-microscope'),
    ('TOILET', 'fas fa-toilet'),
    ('PURCHASE', 'fas fa-cash-register'),
    ('PAYMENT', 'fas fa-hand-holding-usd'),
    ('TRAVEL', 'fas fa-map-signs');`;

const migrations = [insertNodeTypes];
util.migrate(migrations, migrationPath);
