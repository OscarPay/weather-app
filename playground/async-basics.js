/**
 * Created by oscar on 7/06/17.
 */
console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('Hello');
}, 0);

console.log('Finishing up');