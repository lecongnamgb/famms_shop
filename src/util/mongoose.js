module.exports = {
    multipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },

    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },

    arrayToObject: function (array) {
        var target_array = [];
        for (var i = 0; i < array.length; i++) {
            var type_object = {};
            type_object.type = array[i];
            target_array[i] = type_object;
        }
        return target_array;
    }
}