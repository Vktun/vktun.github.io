const CONTRACT_ADDRESS = "n1mW9Evh5n83F7c9XCvr4szRhVCgFu1XUSC";
 
class SmartContractApi {
    constructor(contractAdress) {
        let NebPay = require("nebpay"); 
        this.nebPay = new NebPay();
        this._contractAdress = contractAdress || CONTRACT_ADDRESS;
    }

    getContractAddress() {
        return this.contractAdress;
    }

    _simulateCall({ value = "0", callArgs = "[]", callFunction , callback }) {
        this.nebPay.simulateCall(this._contractAdress, value, callFunction, callArgs, {  
            callback: function(resp){
                if(callback){
                    callback(resp);
                }           
            }   
        });
    }
    
    _call({ value = "0", callArgs = "[]", callFunction , callback }) {
        this.nebPay.call(this._contractAdress, value, callFunction, callArgs, {  
            callback: function(resp){
                if(callback){
                    callback(resp);
                }           
            }   
        });
    } 
}

class NoteContractApi extends SmartContractApi{
    add(text, cb) {
        this._call({
            callArgs : `[${Date.now()}, "${text}"]`,
            callFunction : "add", 
            callback: cb
        });
    }

    update(noteId, text, cb) {
        this._call({
            callArgs : `[${noteId}, "${text}"]`,
            callFunction : "update", 
            callback: cb
        });
    }    

    delete(noteId, cb) {
        this._call({
            callArgs: `[${noteId}]`,
            callFunction : "delete", 
            callback: cb
        });
    }

    getTotalCount(cb) {
        this._simulateCall({
            callFunction : "total", 
            callback: cb
        });
    }
    
    get(limit, offset, noteType, cb) {
        this._simulateCall({
            callArgs : `[${limit}, ${offset}, "${noteType}"]`,
            callFunction : "get", 
            callback: cb
        });;
    }   
    getByWallet(cb) {
        this._simulateCall({
            callArgs : `[]`,
            callFunction : "getByWallet", 
            callback: cb
        });;
    }   
}