class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store kittens in MongoDB
        const questionSchema = new mongoose.Schema({
            name: String,
            text: [String] // A list of hobbies as string
        });

        // This model is used in the methods of this class to access kittens
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getQuestion() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async getQuestions(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        // TODO: Error handling
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }

    async addtext(questionId, text) {
        // TODO: Error handling
        const question = await this.getQuestion(questionId);
        question.text.push(text);
        return await question.save();
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