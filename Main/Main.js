/*var browserify = require('browserify');
var http = require('http');

http.createServer(function (req, res) {
    if (req.url === '/bundle.js') {
        res.setHeader('content-type', 'application/javascript');
        var b = browserify(__dirname + '/Main.js').bundle();
        b.on('error', console.error);
        b.pipe(res);
    }
    else res.writeHead(404, 'not found')
});*/


/*

Priority Queue class needed for dijkstras algo. Implemented using array.

*/

class PriorityQueue{
/*
    ====================
        CONSTRUCTOR
    ====================
*/

    //Constructor that contains array of arrays of elements and weights
    //which will be used as the PQ structure  
    constructor(){
        this.elements = [];
    }//end constructor

/*
    ====================
        PROPERTIES
    ====================

*/

    //Array containing elements of PQ, main PQ structure
    elements = [];

/*
    ====================
          METHODS
    ====================
*/

    //Utility method to check if PQ is empty
    isEmpty(){

        //Checking if there are no elements in the PQ
        if (this.elements.length === 0) {
            //If yes, return true
            return true;
        }//end if
        //If no, return false
        else{
            return false;
        }//end else
    }//end isEmpty method

    //Method for pushing (adding) element to PQ 
    //Passing in node and associated weight
    push(node, weight){

        //Check if the PQ is empty,
        if (this.isEmpty()) {
            /*If it is, add the pairing node and its weight as an array.
            Adding node and weight as pairing allows for checking order based weight
            when adding node */
            this.elements.push([node, weight]);
        }//end if
        else{
            //If there are values in PQ,
            //Add the node at the correct place in PQ
            /*Start loop at second place to insert node to the left of the node it is less than*/
            for (let i = 1; i < this.elements.length; i++){
                //If the inserted node weight is less than 
                //the node weight to the left of the node at current index
                if (weight < this.elements[i-1][1]) {
                    //Insert the node and weight pair to left of current index
                    this.elements.splice(i-1, 0, [node, weight]);
                    //End loop; place of node has been found
                    break;
                }//end if               
            }//end for
            //If the element was not added (is of least priority)
            if (!this.elements.includes([node, weight])) {
                //Insert the element at the back of the PQ
                this.elements.push([node, weight]);
            }//end if
        }//end else
    }//end push method

    //Method to remove and return node from front of PQ
    pop(){

        //Return the first node in the elements array (the front of PQ)
        return(this.elements.shift()[0])
    }//end pop method

}//end priority queue class




/* 

Node class representing nodes of graph of SL Floor 2 

*/


class SLNode{
/*
    ====================
        CONSTRUCTOR
    ====================
*/

    constructor(xCoord = 0.0 , yCoord = 0.0, id = "" , label = ""){

        this.id = id;
        this.label = label;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.neighbors = [];

    }//end constructor

/*
    ====================
        PROPERTIES
    ====================

*/
    //Graph Coordinates (both doubles)
    xCoord;
    yCoord;

    //Unique aplhanumeric ID consisting of one letter and unique positive integer (string)
    id;

    //Label containing name/description of node (string)
    label;

    //Neighbors of the current node
    //Neighbors are nodes that have at most one edge between them
    neighbors = [];

/*
    ====================
          METHODS
    ====================
*/
    //Method to set values for x and y coords, ids, and labels
    populate(xCoord, yCoord, id, label) {
        
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.id = id;
        this.label = label;

    }//end populate method

    //Method to add neighboring nodes
    //Varying number of neighbors can be passed in
    setNeighbor(...neighbors){

        //Adding each neighbor node to neighbors array
        for (let i = 0; i < neighbors.length; i++) {
            //Finding the difference between node and neighbor's x and y coords
            //Used in the calculation of cartesian distance between nodes
            var xDist = Math.abs(this.xCoord - neighbors[i].xCoord);
            var yDist = Math.abs(this.yCoord - neighbors[i].yCoord);
            //Neighbors list will contain neighbor node and associated distance 
            this.neighbors.push({neighbor: neighbors[i], distance: Math.hypot(xDist, yDist) });      
        }//end for

    }//end set neighbors method

}//end SL Node Class


class SLGraph{
    /*
        ====================
            CONSTRUCTOR
        ====================
    */
    
        constructor(){
    
            this.nodes = [];
            this.edges = [];
    
        }//end constructor
    
    /*
        ====================
            PROPERTIES
        ====================
    
    */
        nodes = [];
        edges = [];
    
    /*
        ====================
              METHODS
        ====================
    */

        //Method to load node data from JSON file
        //Should only be used once with initial data
        populateNodes(){
            this.nodes = [];
            //Using node.js file sync to read in node data
            //var fs = require('fs');
            //Reading JSON file into string

            var nodeArray = [	{
                id: "O",
                label: "Origin",
                x: "0",
                y: "0"
            },
            {
                id: "E0",
                label: "West Elevator",
                x: "-0.04",
                y: "0.48"
            },
            {
                id: "E1",
                label: "East Elevator",
                x: "0.16",
                y: "0.48"
            },
            {
                id: "I0",
                label: "Intersection",
                x: "0",
                y: "0.2"
            },
            {
                id: "I1",
                label: "Intersection",
                x: "-0.24",
                y: "0.2"
            },
            {
                id: "I2",
                label: "South Hall",
                x: "-0.24",
                y: "0.94"
            },
            {
                id: "I3",
                label: "SW",
                x: "-0.74",
                y: "0.94"
            },
            {
                id: "I4",
                label: "SE",
                x: "1.1599999999999999",
                y: "0.94"
            },
            {
                id: "I5",
                label: "NW",
                x: "-0.74",
                y: "2.84"
            },
            {
                id: "I6",
                label: "NE",
                x: "1.1599999999999999",
                y: "2.84"
            },
            {
                id: "I7",
                label: "West Hall",
                x: "-0.74",
                y: "1.64"
            },
            {
                id: "I8",
                label: "North Hall 247",
                x: "-0.1",
                y: "2.84"
            },
            {
                id: "I9",
                label: "North Hall 251",
                x: "0.48",
                y: "2.84"
            },
            {
                id: "I10",
                label: "East Hall",
                x: "1.1599999999999999",
                y: "1.18"
            },
            {
                id: "D0",
                label: "LD Exit",
                x: "-0.24",
                y: "0.86"
            },
            {
                id: "D1",
                label: "West Exit",
                x: "-3.14",
                y: "2.84"
            },
            {
                id: "D2",
                label: "East Exit",
                x: "1.9",
                y: "2.84"
            },
            {
                id: "D3",
                label: "Student Lounge",
                x: "0.2",
                y: "0.2"
            },
            {
                id: "B0",
                label: "Women's Restroom",
                x: "-0.84",
                y: "1.64"
            },
            {
                id: "B1",
                label: "Men's Restroom",
                x: "-0.64",
                y: "1.64"
            },
            {
                id: "R5",
                label: "SL247",
                x: "-0.1",
                y: "2.72"
            },
            {
                id: "R6",
                label: "SL251",
                x: "0.48",
                y: "2.72"
            },
            {
                id: "R13",
                label: "SL280",
                x: "1.26",
                y: "1.18"
            }]//fs.readFileSync('/nodes.json','utf8');
            //Parsing JSON string into object array
            //var nodeArray = JSON.parse(data);
            //Populating node array
            nodeArray.forEach(node => {
                let newNode = new SLNode(+node.x, +node.y, node.id, node.label);
                this.nodes.push(newNode);
            });
            //Creating node relationships
            this.addNodeRel();
        }//end populate nodes
            
        //Method for creating node relationships
        //Used only for creating initial set of nodes
        addNodeRel(){

            //Origin (LD Stairwell)
            this.nodes[0].setNeighbor(this.nodes[3]);
            //West elevator
            this.nodes[1].setNeighbor(this.nodes[3]);
            //East elevator
            this.nodes[2].setNeighbor(this.nodes[3]);
            //Stairway intersection (I0)
            this.nodes[3].setNeighbor(this.nodes[0], this.nodes[1], this.nodes[2], this.nodes[4], this.nodes[17]);
            //LD intersection (I1)
            this.nodes[4].setNeighbor(this.nodes[3], this.nodes[14]);
            //South hall intersection
            this.nodes[5].setNeighbor(this.nodes[6], this.nodes[7], this.nodes[14]);
            //Southwest corner
            this.nodes[6].setNeighbor(this.nodes[5], this.nodes[10]);
            //Southeast corner
            this.nodes[7].setNeighbor(this.nodes[5], this.nodes[13]);
            //Northwest corner
            this.nodes[8].setNeighbor(this.nodes[10], this.nodes[11], this.nodes[15]);
            //Northeast corner
            this.nodes[9].setNeighbor(this.nodes[12], this.nodes[13], this.nodes[16]);
            //Bathroom intersection
            this.nodes[10].setNeighbor(this.nodes[6], this.nodes[8], this.nodes[18], this.nodes[19]);
            //SL247 intersection
            this.nodes[11].setNeighbor(this.nodes[8], this.nodes[12], this.nodes[20]);
            //SL251 intersection
            this.nodes[12].setNeighbor(this.nodes[9], this.nodes[11], this.nodes[21]);
            //SL280 intersection
            this.nodes[13].setNeighbor(this.nodes[7], this.nodes[9], this.nodes[22]);
            //LD exit
            this.nodes[14].setNeighbor(this.nodes[4], this.nodes[5]);
            //West exit
            this.nodes[15].setNeighbor(this.nodes[8]);
            //East exit
            this.nodes[16].setNeighbor(this.nodes[9]);
            //Student lounge
            this.nodes[17].setNeighbor(this.nodes[3]);
            //Women's restroom
            this.nodes[18].setNeighbor(this.nodes[10]);
            //Men's restroom
            this.nodes[19].setNeighbor(this.nodes[10]);
            //SL247
            this.nodes[20].setNeighbor(this.nodes[11]);
            //SL251
            this.nodes[21].setNeighbor(this.nodes[12]);
            //SL280
            this.nodes[22].setNeighbor(this.nodes[13]);
        }//end addNodeNeighbor

        //Method to add graph edge
        populateEdges(){
            this.edges = [];
            var id = 0;
            //Creating a path from each node to its neighboring nodes
            //Adds two-way paths
            this.nodes.forEach(node => {
                node.neighbors.forEach( neighbor=> {
                    this.edges.push({id: "G"+id, source:node.id, target: neighbor.neighbor.id, weight: +((neighbor.distance * 9.5)/.18).toPrecision(4)});
                    id++;
                });
            });
        }//end populate edges

        //Utiltiy function to check if nodes are populated
        isNodesEmpty(){
            //Checking if nodes array is empty
            if (this.nodes.length === 0) {
                //If yes, return true
                return true;
            }//end if
            else{
                //If not empty, return false
                return false;
            }//end else
        }//end check nodes are populated

        //Utiltiy function to check if edges are populated
        isEdgesEmpty(){
            //Checking if nodes array is empty
            if (this.edges.length === 0) {
                //If yes, return true
                return true;
            }//end if
            else{
                //If not empty, return false
                return false;
            }//end else
        }//end check if edges are empty

        //Method to create JSON file with graph data
        createGraphJSON(outputFile){
            //Creating a file stream (part of node modules)
                //var fs = require('fs');
            //var fs = require('fs');
            //Loading nodes data into array
            //var nodeArr = JSON.parse(fs.readFileSync('nodes.json', 'utf8'));
            //Adjusting and adding node infor for readability
            var nodeArray = [	{
                id: "O",
                label: "Origin",
                x: 0,
                y: 0
            },
            {
                id: "E0",
                label: "West Elevator",
                x: -0.04,
                y: 0.48
            },
            {
                id: "E1",
                label: "East Elevator",
                x: 0.16,
                y: 0.48
            },
            {
                id: "I0",
                label: "Intersection",
                x: 0,
                y: 0.2
            },
            {
                id: "I1",
                label: "Intersection",
                x: -0.24,
                y: 0.2
            },
            {
                id: "I2",
                label: "South Hall",
                x: -0.24,
                y: 0.94
            },
            {
                id: "I3",
                label: "SW",
                x: -0.74,
                y: 0.94
            },
            {
                id: "I4",
                label: "SE",
                x: 1.1599999999999999,
                y: 0.94
            },
            {
                id: "I5",
                label: "NW",
                x: -0.74,
                y: 2.84
            },
            {
                id: "I6",
                label: "NE",
                x: 1.1599999999999999,
                y: 2.84
            },
            {
                id: "I7",
                label: "West Hall",
                x: -0.74,
                y: 1.64
            },
            {
                id: "I8",
                label: "North Hall 247",
                x: -0.1,
                y: 2.84
            },
            {
                id: "I9",
                label: "North Hall 251",
                x: 0.48,
                y: 2.84
            },
            {
                id: "I10",
                label: "East Hall",
                x: 1.1599999999999999,
                y: 1.18
            },
            {
                id: "D0",
                label: "LD Exit",
                x: -0.24,
                y: 0.86
            },
            {
                id: "D1",
                label: "West Exit",
                x: -3.14,
                y: 2.84
            },
            {
                id: "D2",
                label: "East Exit",
                x: 1.9,
                y: 2.84
            },
            {
                id: "D3",
                label: "Student Lounge",
                x: 0.2,
                y: 0.2
            },
            {
                id: "B0",
                label: "Women's Restroom",
                x: -0.84,
                y: 1.64
            },
            {
                id: "B1",
                label: "Men's Restroom",
                x: -0.64,
                y: 1.64
            },
            {
                id: "R5",
                label: "SL247",
                x: -0.1,
                y: 2.72
            },
            {
                id: "R6",
                label: "SL251",
                x: 0.48,
                y: 2.72
            },
            {
                id: "R13",
                label: "SL280",
                x: 1.26,
                y: 1.18
            }]
            nodeArray.forEach(node => {
                //Changing node x coords to negative
                node.x = (+node.x) * -10;
                node.y = (+node.y) * 10;
                //Making every node size 3
                node.size = 3;
            });
            //Creating JSON strings from node array and edges array
            var nodesJSON = JSON.stringify(nodeArray);
            var edgesJSON = JSON.stringify(this.edges);
            //Writing nodes to a file called outputFile (should be of extension )
            /*fs.writeFile(outputFile, '{"nodes":' + nodesJSON, function(error, result){
                if(error) console.log('error', error);
            });
            //Appending edges to output 
            fs.appendFile(outputFile, ', "edges": ' + edgesJSON+'}', function(error, result){
                if(error) console.log('error', error);
            });*/
            //localStorage.setItem("outputfile", outputFile);
            var fileString = /*fs.readFileSync(outputFile, 'utf8');*/ '{"nodes":' + nodesJSON + ', "edges": ' + edgesJSON+'}'
            return fileString;
        }//end create graph JSON

    //Method for path finding using Dijkstra's Algorithm
    dijkstra(sourceNode, targetNode){

        //Array for keeping track of distances from start node
        let distances = [];
        //Array for keeping track of path
        let path = [];
        //Priority queue used for keeping track of which nodes will be visited
        let toVisit = new PriorityQueue();
        //Setting initial distance for source node
        //Distance will be zero for the source node
        distances.push({node: sourceNode, distance: 0});
        //Add the source node to the visit order (will always be visited first)
        toVisit.push(sourceNode, 0);
        /*Set the distances from source to all other nodes to infinity*/
        this.nodes.forEach(node => {
            //If the node is not the source node,
            if (node !== sourceNode) {
                //Set the distance for current node to infinity
                distances.push({node: node, distance: Infinity});
            }//end if 
        });//end for each

        //Continue to find the shortest path while there are nodes to be visited in order
        while (!toVisit.isEmpty()) {

            //Set the current node as front of the PQ
            let currNode = toVisit.pop();

            //Finding current node index in distances where the node is the current node
            let currI = distances.map(function(x) {return x.node}).indexOf(currNode);
            //If current node is the target node
            if (currNode === targetNode) {
                //The target has been found, end the algorithm
               break;
            }//end if
            //If the current node is not the target node
            else{
                //Find the distance to each of the neighboring nodes of the current node
                currNode.neighbors.forEach(neighbor => {
                    //Finding index in distances where 
                    let neighI = distances.map(function(x) {return x.node}).indexOf(neighbor.neighbor);
                    /*Set distance as the distance from the source 
                    plus the distance from the current node to its neighbor */
                    let distance = distances[currI].distance + neighbor.distance;
                    //Check if the distance is less than the distance that is already associated with neighbor node
                    if (distance < distances[neighI].distance) {
                        //If yes, update the distance value for neighbor node
                        distances[neighI].distance = distance;
                        //Push neighbor node to PQ
                        toVisit.push(neighbor.neighbor, neighbor.distance)
                        //Add node to path connection between neighbor and current node
                        path.push({to: neighbor.neighbor, from: currNode});
                    }//end if
                });//end for each loop
            }//end else
        }//end while

        //Trace path from target node to source node
        let srcToTrgtPath = [];
        let prevNode = targetNode;

        //Continue to find previous nodes in path until reaching the source node
        while (prevNode !== sourceNode) {
            //Finding the index of the element where its 'to' node is equal to the previous Node
            let prevI = path.map(function(x) {return x.to}).indexOf(prevNode);
            //Adding nodes to the front of array to create order of source to target
            srcToTrgtPath.unshift(path[prevI].to);
            //Updating the previous node in path
            prevNode = path[prevI].from;
        }//end while
        //Add source node to front of path array
        srcToTrgtPath.unshift(sourceNode);
        let targetI = distances.map(function(x){return x.node}).indexOf(targetNode);
        //Return the path and the distance (rouned to three sig figs) to the target node from the source
        return {path: srcToTrgtPath, distance: +distances[targetI].distance.toPrecision(3)};
   }//end dijkstra
}//end SL Graph class

/*

Script that could be used in generating path given a source (g.nodes[0] in this case) and target (g.nodes[20])
Adjustment that will have to be made: File I/O is not supported in browser, but there are APIs that may be able to perform
tasks needed.

PROPOSED WAY AROUND FILE I/O: 
This link: https://www.w3schools.com/Js/js_json_parse.asp
Shows how to access JSON files from the server, could change code including file I/O to reflect this

*/

//var g = new SLGraph();

//var mypath = g.dijkstra(g.nodes[0], g.nodes[20]);


/*for (let i = 1; i < mypath.path.length; i++) {
    //Find the edge between two nodes in path
    let edge = g.edges.filter(function(x){return x.source == mypath.path[i-1].id && x.target == mypath.path[i].id});
    //Finding reverse edge (since two-way/undirected)
    let reverseEdge = g.edges.filter(function(x){return x.target == mypath.path[i-1].id && x.source == mypath.path[i].id});
    //Finding the index of the edge in edges array
    let edgeI = g.edges.indexOf(edge[0]);
    //Finding the reversed path index
    let revI = g.edges.indexOf(reverseEdge[0]);
    //Changing color of the path to yellow
    g.edges[edgeI].color = "#ffd500";
    g.edges[revI].color = "#ffd500";
}//end for*/

//g.createGraphJSON("tempData.JSON")
