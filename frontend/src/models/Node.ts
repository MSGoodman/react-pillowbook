export class Node {
    name: string;
    type: string;
    markdown_content: string;
    node_uuid: string;
    parent_node_uuid: string;
    parent_name: string;
    parent_type: string;
    relation: string;
    relation_type: string;
    icon: string;
    vertical_image_extension: string;
    vertical_image_node: string;
    vertical_image_uuid: string;
    horizontal_image_extension: string;
    horizontal_image_node: string;
    horizontal_image_uuid: string;

    constructor(jsonStr: string) {
        const json = JSON.parse(jsonStr);

        this.name = json.name;
        this.type = json.type;
        this.markdown_content = json.markdown_content;
        this.node_uuid = json.node_uuid;
        this.parent_node_uuid = json.parent_node_uud;
        this.parent_name = json.parent_name;
        this.parent_type = json.parent_type;
        this.relation = json.relation;
        this.relation_type = json.relation_type;
        this.icon = json.icon;
        this.vertical_image_extension = json.vertical_image_extension;
        this.vertical_image_node = json.vertical_image_node;
        this.vertical_image_uuid = json.vertical_image_uuid;
        this.horizontal_image_extension = json.horizontal_image_extension;
        this.horizontal_image_node = json.horizontal_image_node;
        this.horizontal_image_uuid = json.horizontal_image_uuid;
    }

    static async get(uuid: string): Promise<Node> {
        const res = await fetch(`http://localhost:9000/nodes/${uuid}`)
            .then(res => res.text())
            .then(data => new Node(data));
        return await res;
    }

    public async createOrIgnore() {
        const res = await fetch(`http://localhost:9000/nodes/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this)
        });
        return await res.json();
    }

    public async update() {
        const res = await fetch(`http://localhost:9000/nodes/${this.node_uuid}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this)
        });
        return await res.json();
    }
}