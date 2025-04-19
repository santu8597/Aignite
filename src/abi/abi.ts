export const contract_address = '0xef679973a7F34013E83d18453D9C7d41F6A2db83'
export const abi=[
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newItem",
                "type": "string"
            }
        ],
        "name": "addTodoItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "indexToDelete",
                "type": "uint256"
            }
        ],
        "name": "deleteTodoItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllTodoItems",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];