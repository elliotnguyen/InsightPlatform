const { Web3, eth } = require('web3');
const web3 = new Web3('https://rpc-mumbai.maticvigil.com'); // Replace with your Ethereum node URL

const contractAddress = '0x9183c12A45044E52DbE3C62A3d0E3250b389A834'; // Replace with your contract address
const contractABI =[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"baseURI","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"courseID","type":"string"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokenID","type":"uint256"}],"name":"CourseBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"courseID","type":"string"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenID","type":"uint256"}],"name":"NFTMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"courseID","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"}],"internalType":"struct CourseOpeningNFT.Course","name":"course","type":"tuple"}],"name":"addCourse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"courseID","type":"string"}],"name":"buyCourse","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"fundContract","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllCourseIDs","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"courseID","type":"string"}],"name":"getCourseDetails","outputs":[{"components":[{"internalType":"string","name":"courseID","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"}],"internalType":"struct CourseOpeningNFT.Course","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"courseID","type":"string"}],"name":"getOpenNTFforCourse","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalCourses","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"grantMinterRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"mintBatch","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"string","name":"courseID","type":"string"}],"name":"ownsNFTForCourse","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"courseID","type":"string"}],"name":"removeCourse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"revokeMinterRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"showFunds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withDrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// Set the default "from" address for transactions


// // Call the functions
const privateKey = '0xfb905d07769b7dc708a318d0407134e4f90c6622ff0e429ba59f233c00e7c0d2'; // Super keyyy

// Call the functions
//const privateKey = '0x2d475580ed8a8e76134526887c2d723141d6bf349b1074d9ef72f6ce761adcca';

const contract = new web3.eth.Contract(contractABI, contractAddress);
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

web3.eth.defaultAccount = account.address;
const ethers = require('ethers');
const provider = new ethers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');


const Transaction = {
    async runWritingFunction(functionName, functionArguments, value = null, userPrivateKey = null) {
        const senderAddress = account.address;
        try {
            const txData = await contract.methods[functionName](...functionArguments).encodeABI();
            const { maxFeePerGas, maxPriorityFeePerGas } = await provider.getFeeData();
            const gasPrice = await web3.eth.getGasPrice()
            // const gasEstimate = await contract.methods[functionName](...functionArguments).estimateGas({ from: senderAddress });
            const gasLimit = 400000 + 10000;
            // const maticAmount = 0.005;
            // const weiAmount = await web3.utils.toWei(maticAmount.toString(), 'ether');

            const tx = {
                from: senderAddress,
                to: contractAddress,
                data: txData,
                // gasPrice: Number(gasPrice),
                maxFeePerGas: Number(maxFeePerGas),
                maxPriorityFeePerGas: Number(maxPriorityFeePerGas),
                gas: Number(gasLimit),
                value: value,// addCourse will run if not set value
            };

            console.log(tx)
            let prikey = userPrivateKey ? userPrivateKey : privateKey
            const signedTx = await web3.eth.accounts.signTransaction(tx, prikey);
            let result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            result = await JSON.parse(JSON.stringify(result, (key, value) =>
                typeof value === "bigint" ? value.toString() : value
            ));
            console.log(result, 'kjkjsdklfs')
            return result;
        } catch (error) {
            console.log(error)
            return false;
        }

    },
    async runReadingFunction(functionName, functionArguments) {
        let result = await contract.methods[functionName](...functionArguments).call();
        result = await JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === "bigint" ? value.toString() : value))
        return result;
    },
    async getEventDataFromTransactionHash(transactionHash, formattedEvent, inputs) {
        try {
            const receipt = await web3.eth.getTransactionReceipt(transactionHash);

            const event = receipt.logs.find(log => log.topics[0] === web3.utils.keccak256(formattedEvent));
            if (event) {
                // Decode the event data using web3.eth.abi.decodeLog
                let eventData = web3.eth.abi.decodeLog(inputs, event.data, event.topics.slice(1));
                eventData = await JSON.parse(JSON.stringify(eventData, (key, value) =>
                    typeof value === "bigint" ? value.toString() : value))
                return eventData;
            }

            return null; // Event not found
        } catch (error) {
            console.error(error);
            return error; // Rethrow the error to handle it at a higher level
        }
    },
}
module.exports = Transaction