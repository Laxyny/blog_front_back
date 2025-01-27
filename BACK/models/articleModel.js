class ArticleModel {
    constructor(collection) {
        this.collection = collection;
    }

    async getAll() {
        return this.collection.find().toArray();
    }

    async getById(id) {
        return this.collection.findOne({ _id: id });
    }
    

    async create(newArticle) {

        const articleToInsert = {
            ...newArticle,
            createAt: new Date(),
        };

        const result = await this.collection.insertOne(articleToInsert);
        return { _id: result.insertedId, ...articleToInsert };
    }

    async updateById(id, updatedFields) {
        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedFields }
        );
        return result.matchedCount > 0;
    }

    async deleteById(id) {
        const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    }
}

module.exports = { ArticleModel };