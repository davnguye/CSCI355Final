/* 

Node class representing graph of SL Floor 2 

*/

class SLNode{
/*
    ====================
        CONSTRUCTOR
    ====================
*/

    constructor(xCoord = 0 , yCoord = 0, id = "" , label = ""){

        this.id = id;
        this.label = label;
        this.xCoord = xCoord;
        this.yCoord = yCoord;

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
            this.neighbors[i] = neighbors[i];      
        }//end for

    }//end set neighbors method

}//end SL Node Class