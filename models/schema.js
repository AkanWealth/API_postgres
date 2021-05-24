const Joi = require("joi");

const schemas = {
    todos: Joi.object().keys({
        description: Joi.string().min(3).max(200).required(),
    }),
    signUp: Joi.object().keys({
        first_name: Joi.string().min(2).max(50),
        last_name: Joi.string().min(2).max(50),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().min(6).max(16).required(),
    }),
    login: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().required(),
    }),
    contact: Joi.object().keys({
        fullname: Joi.string().min(2).max(100),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        message: Joi.string().min(2),
    }),
    course: Joi.object().keys({
        title: Joi.string().min(2).max(100),
        description: Joi.string().min(3).required(),
        instructor: Joi.string().min(2),
    }),

    /* signUp: Joi.object().keys({
                            companyName: Joi.string().alphanum().min(3).max(15).required(),
                            password: Joi.string()
                                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                                .required(),
                            email: Joi.string()
                                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                                .required(),
                        }),

                        employeeSignUp: Joi.object().keys({
                            companyID: Joi.string().required(),
                            roleID: Joi.string().required(),
                            expectedWorkHours: Joi.string().required(),
                            billRateCharge: Joi.string().required(),
                            email: Joi.string()
                                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                                .required(),
                            departmentID: Joi.string(),
                            staffRole: Joi.string().required(),
                        }),

                        changePassword: Joi.object().keys({
                            password: Joi.string()
                                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                                .required(),
                        }),

                        addE_schedule: Joi.object().keys({
                            eventName: Joi.string().required(),
                            eventDateAndTime: Joi.required(),
                        }), */
};

module.exports = schemas;