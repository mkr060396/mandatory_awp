class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store kittens in MongoDB

        const Schema = mongoose.Schema;

        let itemSchema = new Schema ({
            title: String, 
            item: [{
            id: int,
            description: String,
            creatorId: int,
            date: Date,
            bid: int
        }]
        });
        
        let UserSchema = new Schema ({
            user: {
            id: int,
            name: String,
            role: String,
            username: String,
            password: String
            }
        });
        

        // This model is used in the methods of this class to access kittens
        const itemModel = mongoose.model(itemModel, itemSchema);

        const userModel = mongoose.model(userModel, UserSchema);
        
        }
    

    async getItem() {
        try {
            return await this.itemModel.find({});
        } catch (error) {
            console.error("getItems:", error.message);
            return {};
        }
    }

    async getItems(id) {
        try {
            return await this.itemModel.findById(id);
        } catch (error) {
            console.error("getItem:", error.message);
            return {};
        }
    }

    async AddItem(newItem) {
        // TODO: Error handling
        let item = new this.questionModel(newItem);
        return await item.save();
    }

    async addtext(itemId, text) {
        // TODO: Error handling
        const item = await this.getItem(itemId);
        item.text.push(text);
        return await item.save();
    }

    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of kittens to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async bootstrap(count = 10) {
        const hobbies = ['sleeping', 'purring', 'eating', 'people watching'];
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function getRandomName() {
            return ['Garfield', 'Tom', 'Felix', 'Snowball'][getRandomInt(0,3)]
        }

        function getRandomHobbies() {
            const shuffled = hobbies.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, getRandomInt(1,shuffled.length));
        }

        let l = (await this.getKittens()).length;
        console.log("Kitten collection size:", l);

        if (l === 0) {
            let promises = [];

            for (let i = 0; i < count; i++) {
                let kitten = new this.kittenModel({
                    name: getRandomName(),
                    hobbies: getRandomHobbies()
                });
                promises.push(kitten.save());
            }

            return Promise.all(promises);
        }
    }
}

// We export the object used to access the kittens in the database
module.exports = mongoose => new Db(mongoose);