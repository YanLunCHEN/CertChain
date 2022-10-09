// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
contract CertChainContract {
    string storedData;
    address private owner; // variable that will contain the address of the contract deployer
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    constructor() {
        owner = msg.sender; // setting the owner the contract deployer
        //int index = 0;
        whitelistedAddresses[owner] = true;
    }
    

    // Modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _;
    }
    modifier onlyAdmin() {
        require(verifyUser(msg.sender), "Ownable: caller is not the Admin");
        _;
    }
    function changeOwner(address newOwner) public onlyOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }
    
    // White List
    mapping(address => bool) whitelistedAddresses;
    address[] private whitelisted_list;
    
    function addAdmin(address _addressToWhitelist) public onlyOwner {
        if(whitelistedAddresses[_addressToWhitelist] == true){
            revert("already in whitelist");
        }
        whitelistedAddresses[_addressToWhitelist] = true;
        whitelisted_list.push(_addressToWhitelist);
    }

    function verifyUser(address _whitelistedAddress) private view returns(bool) {
        bool userIsWhitelisted = whitelistedAddresses[_whitelistedAddress];
        return userIsWhitelisted;
    }

    function get_whitelist() public onlyOwner view returns(address[] memory){
        return whitelisted_list;
    }
    function removeAdmin(address _addressToWhitelist) public onlyOwner {
        for(uint i=0;i<whitelisted_list.length-1;i++){
            if(_addressToWhitelist == whitelisted_list[i]){
                address swap = whitelisted_list[whitelisted_list.length-1];
                whitelisted_list[whitelisted_list.length-1] = whitelisted_list[i];
                whitelisted_list[i] = swap;
            }
        }
        delete whitelisted_list[whitelisted_list.length - 1];
        whitelisted_list.pop();
        delete whitelistedAddresses[_addressToWhitelist];
    }
    
    // data storage
    
    mapping (string => data_struct) private cert_data;
    string[] private email;
    
    struct data_struct {
        bytes hash;

    }
    function set(bytes memory data,string memory _email) public onlyAdmin{
        email.push(_email);
        
        cert_data[_email].hash = data;
    }
    function set_list(bytes[] memory datas,string[] memory email_list) public onlyAdmin{
        for(uint i=0;i<datas.length;i++){
            email.push(email_list[i]);
            
            cert_data[email_list[i]].hash = datas[i];
        }
        
    }
    function get(string memory _email) public view returns (bytes memory) {
        return cert_data[_email].hash;
    }

    function update() public view onlyOwner{

    }

    function delet(string memory _email) public onlyAdmin{
        
        
        //null_data.push();
    }
    /*function get_size() public view returns (uint) {
        return 0;
    }*/
    /*function get_pre_contract_size(uint _size,address _value) public view returns (bytes memory){
        SimpleStorage myCounter = SimpleStorage(_value);
        
        return myCounter.get(_size);
    }*/
    

    //

    
}

