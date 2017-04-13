require.config({
    baseUrl: "js/",
    paths : {
        "jquery" : "./libs/jquery.min"
    }
})
define(['jquery'],function($){
   function ValidatorInit($obj){
       $obj.bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                noempty:{
                    validators: {
                        notEmpty: {
                            message: '必填信息哦'
                        }
                    }
                }
                ,
                username: {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        }
                    //     stringLength: {
                    //         min: 6,
                    //         max: 30,
                    //         message: 'The username must be more than 6 and less than 30 characters long'
                    //     },
                    //     regexp: {
                    //         regexp: /^[a-zA-Z0-9_\.]+$/,
                    //         message: 'The username can only consist of alphabetical, number, dot and underscore'
                    //     },
                    //     remote: {
                    //         url: 'remote.php',
                    //         message: 'The username is not available'
                    //     },
                    //     different: {
                    //         field: 'password',
                    //         message: 'The username and password cannot be the same as each other'
                    //     }
                    }
                },
                email: {
                    validators: {
                        emailAddress: {
                            message: '这里填写的是一个符合格式的邮箱地址哦'
                        }
                        ,
                        notEmpty: {
                            message: '必填信息哦'
                        }
                    }
                }
                ,
                phone: {
                    validators: {
                        regexp: {/* 只需加此键值对，包含正则表达式，和提示 */
                            regexp: /^1[3458]{1}[0-9]{9}$/,
                            message: '11位的符合格式的手机号'
                        }
                        ,
                        notEmpty: {
                            message: '必填信息哦'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        identical: {
                            field: 'confirmPassword',
                            message: '密码与重复比吗必须一致'
                        },

                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        identical: {
                            field: 'password',
                            message: '密码与重复比吗必须一致'
                        },
                    }
                },
                birthday: {
                    validators: {
                        date: {
                            format: 'YYYY/MM/DD',
                            message: 'The birthday is not valid'
                        }
                    }
                },
                gender: {
                    validators: {
                        notEmpty: {
                            message: 'The gender is required'
                        }
                    }
                },
                'languages[]': {
                    validators: {
                        notEmpty: {
                            message: 'Please specify at least one language you can speak'
                        }
                    }
                },
                'programs[]': {
                    validators: {
                        choice: {
                            min: 2,
                            max: 4,
                            message: 'Please choose 2 - 4 programming languages you are good at'
                        }
                    }
                },
                captcha: {
                    validators: {
                        callback: {
                            message: 'Wrong answer',
                            callback: function(value, validator) {
                                var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
                                return value == sum;
                            }
                        }
                    }
                }
            }
        });
   }
   return {
       ValidatorInit:ValidatorInit
   }
})
