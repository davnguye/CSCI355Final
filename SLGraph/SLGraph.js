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
        var fs = require('fs');
        //Reading JSON file into string
        var data = fs.readFileSync('./nodes.json', 'utf8');
        //Parsing JSON string into object array
        var nodeArray = JSON.parse(data);
        //Populating node array
        nodeArray.forEach(node => {
            let newNode = new SLNode(node.x, node.y, node.id, node.label);
            this.nodes.push(newNode);
        });
        //Creating node relationships
        this.addNodeRel();
    }//end populate nodes
        
    //Method for creating node relationships
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
        this.nodes[5].setNeighbor(this.nodes[6], this.nodes[7]);
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
                this.edges.push({id: "G"+id, source:node.id, target: neighbor.neighbor.id, weight: neighbor.distance});
                id++;
            });
        });
    }//end populate edges

    //Method to create JSON file with graph data
    /* createGraphJSON(){
        var graphJSON = JSON.stringify(this.edges);
        var fs = require('fs');
        fs.writeFile("graph.json", graphJSON, function(error, result){
            if(error) console.log('error', error);
        });
    }//end create graph JSON
*/
    
  
}//end SL Graph class   
