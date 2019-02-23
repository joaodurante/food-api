const users = [
    {id: '1', name: 'Peter parckinson', email: 'peter@gmail.com'},
    {id: '2', name: 'Bruce bane', email: 'bruce@gmail.com'}
]

export class User {
    static findAll(): Promise<any[]>{
        return Promise.resolve(users);
    }

    static findById(id: string): Promise<any>{
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id === id);
            let user = undefined;
            if(filtered.length > 0){
                let user = filtered[0];
            }
            resolve(user);
        })
    } 
}