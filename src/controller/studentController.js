import Student from '../service/Student'

const ReadProjectFnc = async (req, res) => {
    try {
        // console.log("Check respone", req.body.data.id)
        let data = await Student.getAllProject(req.body.data.id)
        //console.log(data)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }


}

const dangkiFunc = async (req, res) => {
    try {
        //  console.log(req.body.data.id, req.body.data.projectId)
        let data = await Student.dangkiProject(req.body.data.id, req.body.data.projectId)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        console.log(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const huydangkiFunc = async (req, res) => {
    try {
        //console.log(req.body.data.id, req.body.data.projectId)
        let data = await Student.huydangkiProject(req.body.data.id, req.body.data.projectId)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //   console.log(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const ReadProjectRegisterFnc = async (req, res) => {
    try {
        let data = await Student.getAllProjectRegister(req.body.data.id)
        //  console.log("Check respone", req.body)
        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //    console.log(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}
const useRegistProjectFnc = async (req, res) => {
    try {
        let data = await Student.getAllUserRegisterProject(req.body.data.id)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //console.log(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}


const chooseGroupFnc = async (req, res) => {
    // console.log(req.body.data ) 
    try {
        let data = await Student.chooseGroup(req.body.data.ortherST, req.body.data.mystudent, req.body.data.groupST)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        // console.log(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const cancelChooseGroupFnc = async (req, res) => {
    // console.log(req.body.data ) 
    try {
        let data = await Student.cancelChooseGroup(req.body.data.groupStudent)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        // console.log(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}


const changePassword = async (req, res) => {
    //   console.log(req.body.data ) 
    try {
        let data = await Student.ChangePW(req.body.data.maSo, req.body.data.password, req.body.data.rePassword)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        // console.log(data)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}

const updateinfor = async (req, res) => {
    try {
        let data = await Student.updateIF(req.body.data.maSo, req.body.data.phone, req.body.data.email)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //  console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
} 

const allResults = async (req, res) => {
    try {
        let data = await Student.getAllResults(req.body.data.maSo)

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //  console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
} 

const allUserStudnet = async (req, res) => {
    try {
        let data = await Student.getAllUserStudent()

        return res.status(200).json({
            EM: data.EM,  // eror messageE
            EC: data.EC, // error code
            DT: data.DT, //error data
        })
        //  console.log(req.body)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',  // eror messageE
            EC: '-1', // error code
            DT: '', //error data
        })
    }
}
module.exports = {
    ReadProjectFnc, dangkiFunc, ReadProjectRegisterFnc, huydangkiFunc,
    useRegistProjectFnc, chooseGroupFnc, cancelChooseGroupFnc, changePassword, updateinfor,allResults,
    allUserStudnet
}