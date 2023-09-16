// const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');

// // Example: Get the network information
// provider.getNetwork().then(network => {
//     console.log('Connected to network:', network);
// }).catch(error => {
//     console.error('Error:', error);
// });


const Transaction = {
    async runWritingFunction(contract, functionName, functionArguments, value = null, userPrivateKey = null) {
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
    async runReadingFunction(contract, functionName, functionArguments) {
        let result = await contract.methods[functionName](...functionArguments).call();
        result = await JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === "bigint" ? value.toString() : value))
        return result;
    }
}