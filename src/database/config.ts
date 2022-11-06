import mongoose from 'mongoose';

class Database {
    private static _connection: Database;
    private constructor() {
        const uri = <string> process.env.MONGO_URI;
        mongoose.connect(uri).then(() => {
            console.log('connect to db');
        });
    }

    public static getInstance() {
        return this._connection || (this._connection = new this()); 
    }
}

export default Database;