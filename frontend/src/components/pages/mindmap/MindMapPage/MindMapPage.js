import React, { useState, useEffect } from 'react';
import './MindMapPage.scss';
import { Graph } from "react-d3-graph";
import { Node } from '../../../../models/Node';
import Select from 'react-select'

function MindMapPage() {
    const [PBNodes, setPBNodes] = useState([]);
    const [PBLinks, setPBLinks] = useState([]);
    const [allLoaded, setAllLoaded] = useState(false);
    const [allNodes, setAllNodes] = useState([]);
    const [allRelations, setAllRelations] = useState([]);
    const [rootNode, setRootNode] = useState({});

    const nodeTypesToExclude = ['REVIEW', 'SESSION', 'FILE']
    const relationNamesToExclude = ['Review', 'Session', 'Attachment']

    function filterNode(n) {
        if (nodeTypesToExclude.includes(n.type)) return false;
        if (rootNode && rootNode.id) { return (allRelations.filter(filterRelation).map(l => l.target === n.id || l.source === n.id).some(b => b === true)) }
        return true;
    }


    function filterRelation(r) {
        if (relationNamesToExclude.includes(r.name)) return false;
        if (rootNode && rootNode.id && r.source !== rootNode.id && r.target !== rootNode.id) return false;
        return true;
    }

    useEffect(() => {
        setPBLinks(allRelations.filter(filterRelation));
        setPBNodes(allNodes.filter(filterNode));
    }, [rootNode]);

    useEffect(() => {
        Node.getAll().then(nodes => {
            setAllNodes(nodes);
            setPBNodes(nodes.filter(filterNode));
            // Then get relations
            fetch(`http://localhost:9000/relations`)
                .then(res => res.json())
                .then(data => {
                    setAllRelations(data)
                    setPBLinks(data.filter(filterRelation));
                    console.log(PBLinks)
                    if (PBNodes.length > 0) setAllLoaded(true);
                });
        })
    }, []);


    const noRootOption = { 'value': null, 'label': 'All Nodes' };

    const rootOptions = allNodes.length > 0 ? allNodes.filter(n => !nodeTypesToExclude.includes(n.type))
        .map((t, i) => ({ 'value': t, 'label': t.name }))
        : [];
    rootOptions.unshift(noRootOption);

    const rootSection =
        <div className="rootSection">
            <label htmlFor="allNode">Root Node</label>
            <Select options={rootOptions} onChange={v => setRootNode(v.value)} disabled={allNodes.length === 0} />
        </div>;

    const data = {
        nodes: PBNodes,
        links: PBLinks,
    };

    const myConfig = {
        nodeHighlightBehavior: true,
        directed: true,
        height: window.innerHeight - 150,
        width: window.innerWidth - 90,
        node: {
            highlightStrokeColor: "blue",
            labelProperty: "name"
        },
        link: {
            highlightColor: "lightblue",
            labelProperty: "name",
            renderLabel: true
        },
    };

    const graph = allLoaded ? <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={data}
        config={myConfig}
    /> : null;

    return (
        <div className="MindMapPage">
            {rootSection}
            {graph}
        </div>
    );
}

export default MindMapPage;
