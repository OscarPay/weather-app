/**
 * Created by oscar on 7/06/17.
 */
let getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Oscar'
    };

    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(31, (userObject) => {
    console.log(userObject);
});
