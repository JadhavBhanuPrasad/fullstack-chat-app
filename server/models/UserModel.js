const userSchema = new mongoose. Schema({
    firstName: {
        type: String,
        required: false,
        },
        lastName: {
        type: String,
        required: false,
        },
        image: {
        type: String,
        required: false,
        },
        color : {
        type: Number,
        required: false,
        },
        profileSetup: {
        type: Boolean,
        default: false,
        },
}
);