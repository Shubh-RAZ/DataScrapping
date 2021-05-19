const MadhyaPradesh = require('./Pending/Madhyapradesh.js')
const dataMP = MadhyaPradesh.madhyaPradesh()
var madhyaData = []
dataMP.then(x=> {
    madhyaData=x
})
console.log('x',madhyaData)