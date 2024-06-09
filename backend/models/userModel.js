const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Met un nom s'il te plait"],
        },
        email: {
            type: String,
            required: [true, "Met un email s'il te plait"],
            unique: true,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Entrez un email valide s'il vous plait",
            ],
        },
        password: {
            type: String,
            required: [true, "Met un mot de passe s'il te plait"],
            minLength: [8, "Le mot de passe doit avoir au moins 8 caractères"],
            // maxLength: [23, "Le mot de passe doit pas avoir plus de 23 caractères"],
        },
        role: {
            type: String,
            required: [true],
            default: "customer",
            enum: ["customer" , "admin"]
        },
        photo: {
            type: String,
            required: [true, "Met une photo s'il te plait"],
            default: "https://i.ibb.co/4pDNDk1/avatar.png",
          },
        phone: {
           type: String,
           default: "+33",
        },
        address: {
            type: Object,
            // address, state, country
        },
        cartItems: {
            type: [Object],
        },
    },
    // createdAt and updatedAt.
    {
        timestamps: true,
    }
);

// Encrypt pass before saving to Database
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next()
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

const User = mongoose.model("User" , userSchema);
module.exports = User;