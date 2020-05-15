import {ReportController } from '../controllers/reportController'
import { AuthController} from '../controllers/authController'
import {Container} from 'typedi'

const reportController = Container.get(ReportController)
const authController = Container.get(AuthController)

const alreadyLoggedInMiddleWare = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }

    req.flash('message', 'You cannot access the page while logged in.')
    res.redirect("/")
}

export interface RouteMapper {
    [key: string]: RouteDefinition[]
}

export class RouteDefinition {
    method: 'post' | 'get' | 'put' | 'delete'
    handler: (req, res, next?) => void
    middleWares?: Array<(req, res, next) => void> = [] 
}

/*
    This is kind of like a small routing framework. All you have to do is make 
    a route name. Then inside the route name you may have different handlers which
    will be HTTP method specific to different controller methods. Then the routes
    will automatically be configured with the express router.
*/
export const routes: RouteMapper[] = [
    {
        '/': [
            {
                method: 'post',
                handler: reportController.postReport,
            },
            {
                method: 'get',
                handler: reportController.viewHomePage,
            }
        ]
    },
    {
        '/forgot-password': [
            {
                method: 'get',
                handler: authController.viewForgotPasswordPage
            },
            {
                method: 'post',
                handler: authController.postForgotPassword
            }
        ]
    },
    {
        '/reset-password': [
            {
                method: 'get',
                handler: authController.viewResetPassword
            },
            {
                method: 'post',
                handler: authController.postResetPassword
            }
        ]
    },
    {
        '/auth/verify': [
            {
                method: 'get',
                handler: authController.verifyUserLink,
            }
        ]
    },
    {
        '/report/:reportId': [
            {
                method: 'get',
                handler: reportController.renderReportPage
            }
        ]
    },
    {
        '/logout': [
            {
                method: 'get',
                handler: authController.logout
            }
        ]
    },
    {
        '/login': [
            {
                method: 'get',
                handler: authController.viewLoginPage,
                middleWares: [
                    alreadyLoggedInMiddleWare
                ]
            },
            {
                method: 'post',
                handler: authController.postLogin,
                middleWares: [
                    alreadyLoggedInMiddleWare
                ]
            }
        ]
    },
    {
        '/forgotpassword': [
            {
                method: 'get',
                handler: authController.viewForgotPasswordPage,
                middleWares: [
                    alreadyLoggedInMiddleWare
                ]
            },
            {
                method: 'post',
                handler: authController.postForgotPassword,
                middleWares: [
                    alreadyLoggedInMiddleWare
                ]
            }
        ]
    },
    {
        '/register': [
            {
                method: 'get',
                handler: authController.viewRegisterPage,
                middleWares: [
                    alreadyLoggedInMiddleWare
                ]
            },
            {
                method: 'post',
                handler: authController.postRegister,
                middleWares: [
                    alreadyLoggedInMiddleWare
                ]
            }
        ]
    },
    {
        '/features': [
            {
                method: 'get',
                handler: (req, res) => res.render('features')
            }
        ]
    },
    {
        '/about-us': [
            {
                method: 'get',
                handler: (req, res) => res.render('about-us')
            }
        ]
    },
    {
        '/appointment': [
            {
                method: 'get',
                handler: (req, res) => res.render('appointment')
            }
        ]
    },
    {
        '/get-in-touch': [
            {
                method: 'get',
                handler: (req, res) => res.render('get-in-touch')
            }
        ]
    },
    {
        '/thank-you': [
            {
                method: 'get',
                handler: (req, res) => res.render('thank-you')
            }
        ]
    },
]
