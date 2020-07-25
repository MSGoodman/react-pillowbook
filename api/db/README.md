## Database Setup
From the command line you can run `node run_migrations` and it should set up the database tables. If you want to load any fixture data into the database then you should `cd` into `fixtures` and manually run them as desired (e.g. `node F001_sample_nodes.js`)

## Database Structure
Pillowbook is basically a CRUD application on top of a directed labeled graph. If you run `F001_sample_nodes` and `F002_sample_relations` (after running the migrations) you should be able to see an example. Grab something like [DB Browser for SQLite](https://sqlitebrowser.org/) and run the following:

```
SELECT p.type AS parent_type, p.name AS parent,  r.name AS relationship, c.name AS child, c.type AS child_type, r.type FROM relation r
LEFT JOIN node p ON p.node_id = r.parent
LEFT JOIN node c ON c.node_id = r.child
WHERE p.name = 'Horizon: Zero Dawn'
```

You'll see all of the items that are children of/adjacent to `Horizon: Zero Dawn`: people/groups who have contributed to the game's creation, any tags that have been associated with it, reviews of it, and any play sessions.