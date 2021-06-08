const Joi = require("joi");

const schemas = {
    todos: Joi.object().keys({
        description: Joi.string().min(3).max(200).required(),
    }),
    signUp: Joi.object().keys({
        first_name: Joi.string().min(2).max(50).required(),
        last_name: Joi.string().min(2).max(50).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().min(6).max(16).required(),
    }),
    login: Joi.object().keys({
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().required(),
    }),

    /* contact section */
    contact: Joi.object().keys({
        contact_name: Joi.string().min(2).max(100).required(),
        contact_email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        contact_message: Joi.string().min(2).required(),
    }),
    /* Course section */
    course: Joi.object().keys({
        title: Joi.string().min(2).max(100).required(),
        description: Joi.string().min(3).required(),
        instructor: Joi.string().min(2).required(),
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