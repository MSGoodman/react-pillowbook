import React, { useState, useEffect } from 'react';
import './MindMapPage.scss';
import { Graph } from "react-d3-graph";

function MindMapPage() {
    const [PBNodes, setPBNodes] = useState([{ 'test': 'data' }, { 'test2': 'data2' }]);
    const [PBLinks, setPBLinks] = useState([{ 'source': "test", 'target': "test2" }]);
    const [allLoaded, setAllLoaded] = useState(false);

    useEffect(() => {
        // Get nodes first
        fetch(`http://localhost:9000/nodes`)
            .then(res => res.json())
            .then(data => {
                setPBNodes(data);
                // Then get relations
                fetch(`http://localhost:9000/relations`)
                    .then(res => res.json())
                    .then(data => {
                        setPBLinks(data);
                        // Then set up the graph
                        setAllLoaded(true);
                    });
            })
    }, []);

    // graph payload (with minimalist structure)
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
            {graph}
        </div>
    );
}

export default MindMapPage;
