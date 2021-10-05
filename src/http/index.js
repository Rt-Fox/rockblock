

export const getBalance = (user, address) => {

    function userSetBalance(data) {
        user.setBalance(data)
    }
     return fetch(`https://api-kovan.etherscan.io/api?module=account&action=balance&address=${address}` +
             `&tag=latest` +
             `&apikey=P6IH4JB4HVQSUI1IA374NFI3KQAFEUCQ5V`, {
             method: 'GET'
         })
             .then((response) => response.json())
             .then(json => {
                 userSetBalance(json.result)
             })
             .catch(er=> console.log(er))

}
export const getContract = (web3, user, type, address_contract) => {
    function userSetContract(data) {
        let contractABI = "";
        contractABI = JSON.parse(data.result);
        if (contractABI !== ''){
            let Contract = new web3.eth.Contract(contractABI);
            Contract.options.address = address_contract
            user.setContract(Contract,type)
        } else {
            console.log("Error" );
        }
    }
    fetch(`https://api-kovan.etherscan.io/api?`+
        `module=contract`+
        `&action=getabi`+
        `&address=${address_contract}` +
        `&apikey=P6IH4JB4HVQSUI1IA374NFI3KQAFEUCQ5V`,{
        method: 'GET'
    })
        .then((response) => response.json())
        .then(response => {
            userSetContract(response)
        })
}