import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import { where } from "sequelize/lib/sequelize";


const headGetProjectAndUser = async () => {
    try {
        let users = await db.Project.findAll({
            where: {
                status: '1',

            },
            include: { model: db.Userstudent },
            order: [['id', 'ASC']]

        });
        if (users) {
            return {
                EM: 'Get all projectanduser success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'Can not get all projectanduser success',
                EC: 2,
                DT: users
            }
        }


    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: []
        }
    }
}
const headGetProjectApprove = async () => {
    try {
        let users = await db.Project.findAll({
            where: {
                status: '0',
            },
            order: [['id', 'ASC']]

        });
        if (users) {
            return {
                EM: 'Get Project Approve success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'Can not Project Approve success',
                EC: 2,
                DT: users
            }
        }


    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: []
        }
    }
}
const headDeleteProject = async (id) => {
    try {
        let users = await db.Project.destroy({
            where: {
                id: id,
            },
        });
        let users2 = await db.Userstudent.update(
            {
                pb1: '',
                pb2: '',
                projectId: 0
            },
            {
                where: { projectId: id }
            }

        )
        if (users && users2) {
            return {
                EM: 'Delete project success',
                EC: 0,
                DT: id,
            }
        } else {
            return {
                EM: 'Can not Delete project success',
                EC: 2,
                DT: ''
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

const headDeleteProjectRegisterUser = async (maSo, groupStudent) => {
    try {
        let data = await db.Userstudent.update(
            { projectId: 0 },
            { where: { maSo: maSo } }
        )

        let data2 = await db.Userstudent.update(
            { groupStudent: 'null' },
            { where: { groupStudent: groupStudent } }
        )
        if (data && data2) {
            return {
                EM: 'Delete Student Register Project success ',
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: 'Can not Delete ',
                EC: 1,
                DT: '',
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: ''
        }
    }
}

const headApproveProject = async (id, name) => {
    try {
        let data = await db.Project.update(
            {
                status: 1,
                nameprojectapprove: name.trim(),
                reasonrefuse: null,
                nameprojectrefuse: null
            },
            { where: { id: id } }
        )
        if (data) {
            return {
                EM: 'Đã duyệt đề tài ',
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: 'Can not Approve ',
                EC: 1,
                DT: '',
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: ''
        }
    }
}
const headRefuseProject = async (id, name, reasonrefuse) => {
    try {
        let data = await db.Project.update(
            {
                status: 2,
                reasonrefuse: reasonrefuse,
                nameprojectrefuse: name.trim(),

            },
            { where: { id: id } }
        )
        if (data) {
            return {
                EM: 'Đã từ chối đề tài ',
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: 'Can not Refuse ',
                EC: 1,
                DT: '',
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: ''
        }
    }
}

const headGetListTeacher = async () => {
    try {
        let data = await db.Userteacher.findAll({
            where: {
                [Op.and]: [
                    { groupId: { [Op.ne]: 3 } },  // Điều kiện 1
                    // { groupId: { [Op.ne]: 5 }},
                    //   { groupId: { [Op.ne]: 4 }} // Điều kiện 2
                ]

            },
            order: [['name', 'ASC']]
        });
        return {
            EM: 'Get group success',
            EC: 0,
            DT: data
        }


    } catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

const headtest = async () => {
    try {
        let data = await db.Userstudent.findAll({
            where: { projectId: { [Op.ne]: 0 } },
            include: [{ model: db.Project }, { model: db.Result },
            {
                model: db.Result, where: {
                    [Op.and]: [
                        { danhgiagiuaky: 'true' },  // Điều kiện 1
                        { danhgiacuoiky: 'true' } // Điều kiện 2
                    ]
                },
            }],
            order: [
                ['projectId', 'ASC'],
                // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'],
                ['id', 'ASC'] // Sau đó sắp xếp theo groupStudent tăng dần
            ]
        });
        return {
            EM: 'Get group success',
            EC: 0,
            DT: data
        }


    } catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

const headgetDSHoiDong = async () => {
    try {
        let data = await db.Userstudent.findAll({
            where: {
                projectId: { [Op.ne]: 0 }, // projectId khác 0
            },
            include: [
                { model: db.Project }, // Bao gồm thông tin từ bảng Project
                {
                    model: db.Result,
                    where: {
                        [Op.and]: [
                            { danhgiagiuaky: 'true' }, // Điều kiện danhgiagiuaky = true
                            { danhgiacuoiky: 'true' }, // Điều kiện danhgiacuoiky = true
                            {
                                [Op.or]: [
                                    // danhgiaphanbien1 và danhgiaphanbien2 đều bằng true
                                    {
                                        [Op.and]: [
                                            { danhgiaphanbien1: 'true' },
                                            { danhgiaphanbien2: 'true' }
                                        ]
                                    },
                                    // danhgiaphanbien1 và danhgiaphanbien3 đều bằng true
                                    {
                                        [Op.and]: [
                                            { danhgiaphanbien1: 'true' },
                                            { danhgiaphanbien3: 'true' }
                                        ]
                                    },
                                    // danhgiaphanbien2 và danhgiaphanbien3 đều bằng true
                                    {
                                        [Op.and]: [
                                            { danhgiaphanbien2: 'true' },
                                            { danhgiaphanbien3: 'true' }
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                }
            ],
            order: [
                ['projectId', 'ASC'], // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'], // Sau đó sắp xếp theo groupStudent tăng dần
                ['id', 'ASC'], // Cuối cùng sắp xếp theo id tăng dần
            ]
        });

        return {
            EM: 'Get group success',
            EC: 0,
            DT: data
        }


    } catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

const headAssignPB = async (data) => {
    try {
        let findSV2 = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { groupStudent: data.groupStudent },
                    { id: { [Op.ne]: data.id } }
                ]
            }
        })
        let ResultSV1 = await db.Result.findOne({
            where: {
                [Op.and]: [
                    { danhgiagiuaky: 'true' },  // Điều kiện 1
                    { danhgiacuoiky: 'true' },
                    { userstudentId: data.id }
                ]
            }
        })
        let ResultSV2 = await db.Result.findOne({
            where: {
                [Op.and]: [
                    { danhgiagiuaky: 'true' },  // Điều kiện 1
                    { danhgiacuoiky: 'true' },
                    { userstudentId: findSV2.id }
                ]
            }
        })
        if (data.groupStudent === 'null') {
            ////lllllll
            if (!data.pb3) {
                await db.Userstudent.update({
                    pb1: data.pb1,
                    pb2: data.pb2,

                }, {
                    where: {
                        id: data.id
                    },
                })
                return {
                    EM: 'Assign success',
                    EC: 0,
                    DT: '',
                }
            } else {
                await db.Userstudent.update({
                    pb1: data.pb1,
                    pb2: data.pb2,
                    pb3: data.pb3
                }, {
                    where: {
                        id: data.id
                    },
                })
                return {
                    EM: 'Assign success',
                    EC: 0,
                    DT: '',
                }
            }

        } else {
            if (ResultSV1) {
                if (!data.pb3) {
                    await db.Userstudent.update({
                        pb1: data.pb1,
                        pb2: data.pb2,
                    }, {
                        where: {
                            id: data.id
                        },
                    })
                } else {
                    await db.Userstudent.update({
                        pb1: data.pb1,
                        pb2: data.pb2,
                        pb3: data.pb3
                    }, {
                        where: {
                            id: data.id
                        },
                    })
                }

            }
            if (ResultSV2) {
                if (!data.pb3) {
                    await db.Userstudent.update({
                        pb1: data.pb1,
                        pb2: data.pb2,

                    }, {
                        where: {
                            id: findSV2.id
                        },
                    })
                } else {
                    await db.Userstudent.update({
                        pb1: data.pb1,
                        pb2: data.pb2,
                        pb3: data.pb3
                    }, {
                        where: {
                            id: findSV2.id
                        },
                    })
                }

            }
            if (!ResultSV1 && !ResultSV2) {
                return {
                    EM: 'Có lỗi xẩy ra',
                    EC: 1,
                    DT: '',
                }
            }
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }

        }
    }
    catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

const headPhanCongHoiDong = async (data) => {
    try {
        let findSV2 = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { groupStudent: data.groupStudent },
                    { id: { [Op.ne]: data.id } }
                ]
            }
        })
        let ResultSV1 = await db.Result.findOne({
            where: {
                [Op.and]: [
                    { danhgiagiuaky: 'true' }, // Điều kiện danhgiagiuaky = true
                    { danhgiacuoiky: 'true' }, // Điều kiện danhgiacuoiky = true
                    {
                        [Op.or]: [
                            // danhgiaphanbien1 và danhgiaphanbien2 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien2: 'true' }
                                ]
                            },
                            // danhgiaphanbien1 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                            // danhgiaphanbien2 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien2: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                        ]
                    },
                    { userstudentId: data.id }
                ]
            },
        })
        let ResultSV2 = await db.Result.findOne({
            where: {
                [Op.and]: [
                    { danhgiagiuaky: 'true' }, // Điều kiện danhgiagiuaky = true
                    { danhgiacuoiky: 'true' }, // Điều kiện danhgiacuoiky = true
                    {
                        [Op.or]: [
                            // danhgiaphanbien1 và danhgiaphanbien2 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien2: 'true' }
                                ]
                            },
                            // danhgiaphanbien1 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                            // danhgiaphanbien2 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien2: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                        ]
                    },
                    { userstudentId: findSV2.id }
                ]
            },
        })
        if (data.groupStudent === 'null') {
            ////lllllll
            await db.Userstudent.update({
                CTHD: data.CTHD,
                TK: data.TK,
                UV: data.UV
            }, {
                where: {
                    id: data.id
                },
            })
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }

        } else {
            if (ResultSV1) {
                await db.Userstudent.update({
                    CTHD: data.CTHD,
                    TK: data.TK,
                    UV: data.UV
                }, {
                    where: {
                        id: data.id
                    },
                })
            }
            if (ResultSV2) {
                await db.Userstudent.update({
                    CTHD: data.CTHD,
                    TK: data.TK,
                    UV: data.UV
                }, {
                    where: {
                        id: findSV2.id
                    },
                })
            }
            if (!ResultSV1 && !ResultSV2) {
                return {
                    EM: 'Có lỗi xẩy ra',
                    EC: 1,
                    DT: '',
                }
            }
            return {
                EM: 'Assign Hoi dong success',
                EC: 0,
                DT: '',
            }

        }
    }
    catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

const headPhanCongPoster = async (data) => {
    try {
        let findSV2 = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { groupStudent: data.groupStudent },
                    { id: { [Op.ne]: data.id } }
                ]
            }
        })
        let ResultSV1 = await db.Result.findOne({
            where: {
                [Op.and]: [
                    { danhgiagiuaky: 'true' }, // Điều kiện danhgiagiuaky = true
                    { danhgiacuoiky: 'true' }, // Điều kiện danhgiacuoiky = true
                    {
                        [Op.or]: [
                            // danhgiaphanbien1 và danhgiaphanbien2 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien2: 'true' }
                                ]
                            },
                            // danhgiaphanbien1 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                            // danhgiaphanbien2 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien2: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                        ]
                    },
                    { userstudentId: data.id }
                ]
            },
        })
        let ResultSV2 = await db.Result.findOne({
            where: {
                [Op.and]: [
                    { danhgiagiuaky: 'true' }, // Điều kiện danhgiagiuaky = true
                    { danhgiacuoiky: 'true' }, // Điều kiện danhgiacuoiky = true
                    {
                        [Op.or]: [
                            // danhgiaphanbien1 và danhgiaphanbien2 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien2: 'true' }
                                ]
                            },
                            // danhgiaphanbien1 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                            // danhgiaphanbien2 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien2: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                        ]
                    },
                    { userstudentId: findSV2.id }
                ]
            },
        })
        if (data.groupStudent === 'null') {
            ////lllllll
            await db.Userstudent.update({
                Poster1: data.Poster1,
                Poster2: data.Poster2,

            }, {
                where: {
                    id: data.id
                },
            })
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }

        } else {
            if (ResultSV1) {
                await db.Userstudent.update({
                    Poster1: data.Poster1,
                    Poster2: data.Poster2,
                }, {
                    where: {
                        id: data.id
                    },
                })
            }
            if (ResultSV2) {
                await db.Userstudent.update({
                    Poster1: data.Poster1,
                    Poster2: data.Poster2,
                }, {
                    where: {
                        id: findSV2.id
                    },
                })
            }
            if (!ResultSV1 && !ResultSV2) {
                return {
                    EM: 'Có lỗi xẩy ra',
                    EC: 1,
                    DT: '',
                }
            }
            return {
                EM: 'Assign Hoi dong success',
                EC: 0,
                DT: '',
            }

        }
    }
    catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

const headGetAllResults = async () => {
    try {
        let result = await db.Userstudent.findAll({
            where: {
                [Op.and]: [
                    { projectId: { [Op.ne]: 0 }, },  // Điều kiện 1
                    // Điều kiện 2
                ]
            },
            include: [
                {
                    model: db.Result,
                    where: {
                        diemGVHD: { [Op.ne]: null }, // Điều kiện 2: cột diemGVHD khác null
                    },
                },
                {
                    model: db.Criteria,
                }, {
                    model: db.Criteriapb,
                },
                {
                    model: db.Criteriahoidong,
                }
            ]
        });
        return {
            EM: 'Get all project success',
            EC: 0,
            DT: result
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: []
        }
    }
}
const getAllResultsEveryStudetn = async (id) => {
    try {
        let result = await db.Userstudent.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: db.Project, // Lấy thông tin từ bảng Project
                },
                {
                    model: db.Result, // Lấy thông tin từ bảng Result
                },
                {
                    model: db.Criteria, // Lấy thông tin từ bảng Criteria
                },
                {
                    model: db.Criteriapb, // Lấy thông tin từ bảng Criteriapb
                },
                {
                    model: db.Criteriahoidong, // Lấy thông tin từ bảng Criteriahoidong
                },
            ],
        });
        return {
            EM: 'Get all project success',
            EC: 0,
            DT: result
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Some thing wrongs with service',
            EC: 1,
            DT: []
        }
    }
}
const getSV2 = async () => {
    try {
        let data = await db.Userstudent.findAll({
            include: [{ model: db.Project }, { model: db.Result },
            {
                model: db.Result, where: {
                    [Op.and]: [
                        { danhgiagiuaky: 'true' },  // Điều kiện 1
                        { danhgiacuoiky: 'true' } // Điều kiện 2
                    ]
                },
            }],
            order: [
                ['projectId', 'ASC'],
                // Sắp xếp theo projectId tăng dần
                ['groupStudent', 'ASC'],
                ['id', 'ASC'] // Sau đó sắp xếp theo groupStudent tăng dần
            ]
        });
        return {
            EM: 'Assign success',
            EC: 0,
            DT: data,
        }

    }
    catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}

const headConformHoidong = async (data) => {
    try {
        let findSV2 = await db.Userstudent.findOne({
            where: {
                [Op.and]: [
                    { groupStudent: data.groupStudent },
                    { id: { [Op.ne]: data.id } }
                ]
            }
        })

        let ResultSV2 = await db.Result.findOne({
            where: {
                [Op.and]: [
                    {
                        userstudentId: findSV2.id, // projectId khác 0
                    },
                    { danhgiagiuaky: 'true' }, // Điều kiện danhgiagiuaky = true
                    { danhgiacuoiky: 'true' }, // Điều kiện danhgiacuoiky = true
                    {
                        [Op.or]: [
                            // danhgiaphanbien1 và danhgiaphanbien2 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien2: 'true' }
                                ]
                            },
                            // danhgiaphanbien1 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien1: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                            // danhgiaphanbien2 và danhgiaphanbien3 đều bằng true
                            {
                                [Op.and]: [
                                    { danhgiaphanbien2: 'true' },
                                    { danhgiaphanbien3: 'true' }
                                ]
                            },
                        ]
                    }
                ]
            },
        })
        if (data.groupStudent === 'null') {
            ////lllllll
            await db.Userstudent.update({
                hoidong: data.hoidong,

            }, {
                where: {
                    id: data.id
                },
            })
            return {
                EM: 'Assign success',
                EC: 0,
                DT: '',
            }

        } else {

            if (ResultSV2) {
                await db.Userstudent.update({
                    hoidong: data.hoidong
                }, {
                    where: {
                        groupStudent: data.groupStudent
                    },
                })
                return {
                    EM: 'Assign success',
                    EC: 0,
                    DT: '',
                }
            } else {
                await db.Userstudent.update({
                    hoidong: data.hoidong
                }, {
                    where: {
                        id: data.id
                    },
                })
                return {
                    EM: 'Assign success',
                    EC: 0,
                    DT: '',
                }
            }



        }
    }
    catch (e) {
        console.log(e)
        return {
            EM: 'error from service',
            EC: 1,
            DT: []
        }
    }
}
module.exports = {
    headGetProjectAndUser, headDeleteProject, headDeleteProjectRegisterUser,
    headGetProjectApprove, headApproveProject, headGetListTeacher, headtest, headAssignPB,
    headRefuseProject, headgetDSHoiDong, headPhanCongHoiDong, headPhanCongPoster,
    headGetAllResults, getAllResultsEveryStudetn, getSV2, headConformHoidong
}