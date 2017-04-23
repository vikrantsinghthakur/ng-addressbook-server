var pr1 = new Promise((resolve,reject) => {
    resolve(100);
});

pr1.then(data => {
    console.log("Promise succesfully resolved with data", data);
})
.catch(err => {
    console.log("Promise rejected with error: ", err);
})