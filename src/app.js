class Node {
    constructor(x, y){
        this.selfCoordinates = [x, y];
        this.parent = null;
        this.possibleMoveList = []
    }
}



function getPossibleMoves(node){
    // takes in a node and builds a graph of possible moves.

    const nodexValue = node.selfCoordinates[0];
    const nodeyValue = node.selfCoordinates[1];

    // numbers to add to find possible moves.
    const xvalueToAdd = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
    const yvalueToAdd = [ 1, 2, 2, 1, -1, -2, -2, -1 ];

    for (let i = 0; i < 8; i++) {
   
        // Position of knight after move
        let x = nodexValue + xvalueToAdd[i];
        let y = nodeyValue + yvalueToAdd[i];

        // check if move is valid
        if (x >= 0 && y >= 0 && x < 8 && y < 8){
            const possibleMove = new Node(x, y);
            // set the child node's parent in its 'parent' property.
            possibleMove.parent = node;
            node.possibleMoveList.push(possibleMove);
        }
    }

    return node;       
}

function getShortestPath(src, dest){
    const startingNode = new Node(src[0], src[1]);
    // calculate moves for node and push into queue.
    const nodeWithMoves =  getPossibleMoves(startingNode);
    const queue = [nodeWithMoves];
    let counter = 0;
    
    while(queue.length > 0){
        const current = queue.shift();
        // checks if destination was reached.
        if (current.selfCoordinates[0] === dest[0] && current.selfCoordinates[1] === dest[1]){
            traverseShortestPath(current);
            break;
        }

        for (const child of current.possibleMoveList){
            // calculate moves for each child.
            const childWithMovesCalculated = getPossibleMoves(child);
            queue.push(childWithMovesCalculated);
        } 

    }
}

function traverseShortestPath(node){
    if (node === null){
        return;
    }
    traverseShortestPath(node.parent);
    console.log(node.selfCoordinates);
}




const path1 = getShortestPath([3,3],[0,0]);

console.log(path1);


