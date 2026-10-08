import User from "../model/userModel.js";


export const create = async (req, res) => {
    try {
        // naya user ko data create garne
        const newUser = new User(req.body);
        // email ko basis ma user already exist cha ki chaina check garne
        const { email } = newUser;
        // 
        const userExist = await User.findOne({ email })
        if (userExist) {
            // yedi user already exist cha bhane, 400 status code ra message return garne
            return res.status(400).json({ message: "User already exists." })
        }
        // naya user ko data save garne
        const savedData = await newUser.save();
        res.status(200).json(savedData);
    } catch (error) {
        // yedi error aayo bhane, 500 status code ra error message return garne
        res.status(500).json({ errorMessage: error.message })

    }
}

export const getAllUsers = async (req, res) => {
    try {
        // sabai user ko  data lina 
        const userData = await User.find();
        if (!userData || userData.length === 0) {
            // yedi user data empty cha bhane, 404 status code ra message return garne
            return res.status(404).json({ message: "User data not found" });
        }
        // yedi user data cha bhane, 200 status code ra user data return garne
        res.status(200).json(userData)
    } catch (error) {
        // yedi internal server error aayo bhane, 500 status code ra error message return garne
        res.status(500).json({ errorMessage: error.message })
    }
}


        
export const getUserById = async (req, res) => {
    try {
        // user ko id ko basis ma user ko data lina
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            // yedi user exist chaina bhane, 404 status code ra message return garne
            return res.status(404).json({ message: "User not found" });
        }
        // yedi user exist cha bhane, 200 status code ra user data return garne
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}


export const update = async (req, res) => {
    try {
        const id = req.params.id;
        // user exist garxa ki gardaina check garne
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        // user ko data update garne
        const updateData = await User.findByIdAndUpdate(id, req.body, {
            // id  la user ko information extract garxa req.body bata update garne ra  new : true la update vako informaiton return garna new document ma 
             new: true
        })

        res.status(200).json(updateData)

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}


export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
         // user exist garxa ki gardaina check garne
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }
        // yedi user exist garxa vane , findByIdAndDelete method le user ko data khojne ra delete garne kaam garxa
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted succesfully" })


    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}