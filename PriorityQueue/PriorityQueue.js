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
            /*If it is, add the pairing of node and its weight as an array.
            Adding node and weight as pairing allows for checking order based on weight
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
