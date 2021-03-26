var _ = require('lodash');

/**
 * Input: {
 *              “a”: {“x”: 1, “y”: 2},
 *              “b”: 3
 *        }
 Output: {“a_x”: 1, “a_y”: 2, “b”: 3}
 */
var flattenJSON = function (inputObject) {
    var queue = [];
    _.each(inputObject.queue, function(queueInput){
        var keys = _.keys(queueInput.input);
        if (_.size(keys) > 0) {
            _.each(keys, function (key) {
                var value = _.get(queueInput.input, key);
                var oldKey = _.get(queueInput, 'key','');
                if(!_.isEmpty(oldKey)){
                    oldKey = oldKey + '_'
                }
                if (typeof value === 'object') {
                    //need to check for case when the object is actually an array -
                    if(value && Array.isArray(value)){
                        _.each(value,function(val){
                            // var arr = queueInput.arr ;
                            // if(_.isEmpty(arr)){
                            //     arr = [];
                            // }else{
                            //     arr.push([])
                            // }
                            // if(typeof val === 'object'){
                            //     var queuedObject = {
                            //         'key' : oldKey + key,
                            //         input : val,
                            //         arr: arr
                            //     }
                            //     queue.push(queuedObject);
                            // }else{
                            //     inputObject.output[oldKey+key] = value;
                            // }
                            inputObject.output[oldKey+key] = value;
                        });

                    }else{
                        var queuedObject = {
                            'key' : oldKey + key,
                            input : value
                        }
                        queue.push(queuedObject)
                    }

                } else {
                    inputObject.output[oldKey+key] = value;
                    // if(_.isEmpty(queueInput.arr)){
                    //     inputObject.output[oldKey+key] = value;
                    // }else{
                    //     inputObject.output[oldKey+key] = queueInput.arr.push(value);
                    // }

                }
            });
            inputObject.queue= queue;
        }else{
            inputObject.queue= queue;
        }
    });
}


var run = function(input){
    console.log('The input = ',JSON.stringify(input));
    var inputObject = {
        queue: [ { key : '' , input : input, arr : undefined }],
        output: {}
    };

    flattenJSON(inputObject);
    while(_.size(inputObject.queue) > 0){
        flattenJSON(inputObject);
    }
    console.log("Its done. Answer = ", JSON.stringify(inputObject.output));
    return inputObject.output;
}


/**TC 1 **/
var output1 = run({
    a: { x : 1, y: 2},
    b: 3
})

/** TC 2 **/
var output2= run(1)

/** TC 3 **/
var output3 = run("")

/** TC 4 ***/
var output4= run({
    a: { x : 1, y: 2, q : { p : 1, z : 0}},
    b: 3
})

/** TC 5 ***/
var output5 = run(undefined)

/** TC 6 ***/
var output6 =run({
    a: { x : 1, y: 2, q : { p : 1, z : undefined}},
    b: 3
})

/** TC 7 ***/
var output7 = run({
    a: { x :  [1,2]},
    b: 3
})

/** TC 8 ***/
var output7 = run({
    a: { x :  [ { o : 1},{ c : { b : [] } }]}, //a_x_o:[1], a_x_c:[1]
    b: 3
})
//a_x_o : 1 , a_x_c_b : [[]]

//a: { x :  [ { o : 1},1 ]} //a_x_o : [1] , a_x : [1]


// console.log("TC1 = " ,_.eq(JSON.stringify(output1),JSON.stringify({"b":3,"a_x":1,"a_y":2})));
// console.log("TC2 = " ,_.eq(JSON.stringify(output2),JSON.stringify({})));
// console.log("TC3 = " ,_.eq(JSON.stringify(output3),JSON.stringify({})));
// console.log("TC4 = " ,_.eq(JSON.stringify(output4),JSON.stringify({"b":3,"a_x":1,"a_y":2,"a_q_p":1,"a_q_z":0})));
// console.log("TC5 = " ,_.eq(JSON.stringify(output5),JSON.stringify({})));
// console.log("TC6 = " ,_.eq(JSON.stringify(output6),JSON.stringify({"b":3,"a_x":1,"a_y":2,"a_q_p":1})));
// console.log("TC7 = " ,_.eq(JSON.stringify(output7),JSON.stringify({a:{x:[1,2]},b:3})));

var a = [];
a.push([])
console.log(JSON.stringify(a))
