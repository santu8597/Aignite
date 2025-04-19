export const FraudLoggerAbi=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "pattern",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "scamType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "detectedBy",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "accountAddress",
				"type": "address"
			}
		],
		"name": "FraudDetected",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "fraudLogs",
		"outputs": [
			{
				"internalType": "string",
				"name": "pattern",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "scamType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fraudAddr",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "accountAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFraudLogs",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "pattern",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "scamType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "fraudAddr",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "accountAddress",
						"type": "address"
					}
				],
				"internalType": "struct FraudLogger.FraudRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_pattern",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_scamType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fraudaddr",
				"type": "string"
			}
		],
		"name": "logFraud",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]