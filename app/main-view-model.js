var Observable = require("tns-core-modules/data/observable").Observable;
var api = require("./api.js");

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
        api.authenticate("nico.dewitte@vives.be", "test2")
        .then(token => {
          console.log("Auth token = " + token); 
        })
        .catch(error => {
          console.log("Auth failed " + error);
        });
    }

    return viewModel;
}

exports.createViewModel = createViewModel;