const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
export default[
    {
        id: uuidv4(),
        name: 'Hoc lap trinh PHP',
        level: 0 //Small
    },
    {
        id: uuidv4(),
        name: 'Hoc lap trinh Java',
        level: 1 //medium
    },
    {
        id: uuidv4(),
        name: 'Hoc lap trinh Javascript',
        level: 2 //high
    },
    {
        id: uuidv4(),
        name: 'Hoc lap trinh VueJs',
        level: 0 //small
    }
]