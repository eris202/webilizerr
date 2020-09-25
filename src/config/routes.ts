import { ReportController } from "../controllers/reportController";
import { AuthController } from "../controllers/authController";
import { Container } from "typedi";
import { InvoiceController } from "../controllers/invoiceController";
import { ContactUsController } from "../controllers/contactUsController";
import { ProductPlan } from "../factories/product-plan-factory";
import User from "../model/User";

const reportController = Container.get(ReportController);
const authController = Container.get(AuthController);
const invoiceController = Container.get(InvoiceController);
const contactUsController = Container.get(ContactUsController);

const alreadyLoggedInMiddleWare = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  req.flash("message", "You cannot access the page while logged out.");
  return res.redirect("/");
};

const shouldBeLoggedInMiddleWare = (req, res, next) => {
  const backUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
  console.log("BackURL: " + backUrl);
  console.log("req.isAuthenticated(): " + req.isAuthenticated());

  if (
    backUrl.includes("http://localhost:5555/checkout?") &&
    req.isAuthenticated()
  ) {
    console.log("is authenticated in shouldBeLoggedInMiddleWare");
    return next();
  }

  if (
    backUrl.includes("http://localhost:5555/letslogin?") &&
    req.isAuthenticated()
  ) {
    const string = backUrl.replace("/letslogin?", "");
    console.log("Its A MATCH");
    return res.redirect(string);

    //return res.redirect(`${backUrl}`);
  } else {
    console.log("NOOOOO");
    return res.redirect(`/login?backUrl=${backUrl}`);
    //return next();
  }
};

const shouldBeSignUpInMiddleWare = (req, res, next) => {
  const backUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
  console.log("BackURL: " + backUrl);
  console.log(
    "req.isAuthenticated() in shouldBeSignUpInMiddleWare: " +
      req.isAuthenticated()
  );

  if (
    backUrl.includes("http://localhost:5555/checkout?") &&
    req.isAuthenticated()
  ) {
    console.log("is authenticated in shouldBeSignUpInMiddleWare");
    return next();
  }

  if (
    backUrl.includes("http://localhost:5555/letsregister?") &&
    req.isAuthenticated()
  ) {
    const string = backUrl.replace("/letsregister?", "");
    console.log("Its A MATCH");
    return res.redirect(string);

    //return res.redirect(`${backUrl}`);
  } else {
    console.log("NOOOOO");
    return res.redirect(`/register?backUrl=${backUrl}`);
    //return next();
  }
};

const shouldBeLoggedInReportMiddleWare = (req, res, next) => {
  console.log("HELLO shouldBeLoggedInReportMiddleWare");

  if (req.isAuthenticated()) {
    console.log("is authenticated in shouldBeLoggedInReportMiddleWare");
    return next();
  }
  //console.log(req);

  const backUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
  console.log("BackURL: " + backUrl);
  console.log("Original URL: " + req.originalUrl);
  console.log(backUrl.includes("http://localhost:5555/letslogin?"));

  if (backUrl.includes("http://localhost:5555/letslogin?")) {
    console.log("Its A MATCH");

    return res.redirect(`${backUrl}`);
  } else {
    console.log("NOOOOO");

    //return res.redirect(`${req.originalUrl}`);
    return next();
  }
};

const shouldHaveOneTimePayment = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    const backUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
    return res.redirect(`/login?backUrl=${backUrl}`);
  }

  const dbUser = await User.findOne({
    email: req.user.email,
    isActive: true,
  });

  if (!dbUser) {
    const backUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
    return res.redirect(`/login?backUrl=${backUrl}`);
  }

  const plan = ProductPlan.getProductConfig(dbUser.productPlan);

  if (plan.isOneTime) {
    return next();
  }

  const backUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
  return res.redirect(`/login?backUrl=${backUrl}`);
};

export interface RouteMapper {
  [key: string]: RouteDefinition[];
}

export class RouteDefinition {
  method: "post" | "get" | "put" | "delete";
  handler: (req, res, next?) => void;
  middleWares?: Array<(req, res, next) => void> = [];
}

/*
    This is kind of like a small routing framework. All you have to do is make 
    a route name. Then inside the route name you may have different handlers which
    will be HTTP method specific to different controller methods. Then the routes
    will automatically be configured with the express router.
*/
export const routes: RouteMapper[] = [
  {
    "/report/:reportId": [
      {
        method: "get",
        handler: reportController.renderReportPage,
        //middleWares: [shouldBeLoggedInReportMiddleWare],
      },
    ],
  },
  {
    "/logout": [
      {
        method: "get",
        handler: authController.logout,
      },
    ],
  },
  {
    "/letsregister": [
      {
        method: "get",
        handler: authController.viewRegisterPage,
        middleWares: [shouldBeSignUpInMiddleWare],
      },
      {
        method: "post",
        handler: authController.postRegister,
        middleWares: [shouldBeSignUpInMiddleWare],
      },
    ],
  },
  {
    "/register": [
      {
        method: "get",
        handler: authController.viewRegisterPage,
        middleWares: [alreadyLoggedInMiddleWare],
      },
      {
        method: "post",
        handler: authController.postRegister,
        middleWares: [alreadyLoggedInMiddleWare],
      },
    ],
  },
  {
    "/letslogin": [
      {
        method: "get",
        middleWares: [shouldBeLoggedInMiddleWare],
        handler: reportController.renderLoginPage,
      },
      {
        method: "post",
        middleWares: [shouldBeLoggedInMiddleWare],
        handler: reportController.renderLoginPage,
      },
    ],
  },

  {
    "/login": [
      {
        method: "get",
        handler: authController.viewLoginPage,
        middleWares: [alreadyLoggedInMiddleWare],
      },
      {
        method: "post",
        handler: authController.postLogin,
        middleWares: [alreadyLoggedInMiddleWare],
      },
    ],
  },
  {
    "/report": [
      {
        method: "get",
        handler: (req, res) => res.render("report"),
        // middleWares: [shouldBeLoggedInReportMiddleWare],
      },
    ],
  },
  {
    "/": [
      {
        method: "post",
        handler: reportController.postReport,
      },
      {
        method: "get",
        handler: reportController.viewHomePage,
      },
    ],
  },
  {
    "/hook": [
      {
        method: "post",
        handler: reportController.reportHook,
      },
    ],
  },
  {
    "/my-reports": [
      {
        method: "get",
        handler: reportController.viewMyReports,
        middleWares: [shouldBeLoggedInMiddleWare],
      },
    ],
  },
  {
    "/forgot-password": [
      {
        method: "get",
        handler: authController.viewForgotPasswordPage,
      },
      {
        method: "post",
        handler: authController.postForgotPassword,
      },
    ],
  },
  {
    "/reset-password": [
      {
        method: "get",
        handler: authController.viewResetPassword,
      },
      {
        method: "post",
        handler: authController.postResetPassword,
      },
    ],
  },
  {
    "/auth/verify": [
      {
        method: "get",
        handler: authController.verifyUserLink,
      },
    ],
  },

  {
    "/pricing": [
      {
        method: "get",
        handler: invoiceController.viewPricingPage,
      },
    ],
  },
  {
    "/checkout": [
      {
        method: "get",
        handler: invoiceController.viewCheckoutPage,
        middleWares: [shouldBeLoggedInMiddleWare],
      },
      {
        method: "post",
        handler: invoiceController.postCheckout,
        middleWares: [shouldBeLoggedInMiddleWare],
      },
    ],
  },

  {
    "/forgotpassword": [
      {
        method: "get",
        handler: authController.viewForgotPasswordPage,
        middleWares: [alreadyLoggedInMiddleWare],
      },
      {
        method: "post",
        handler: authController.postForgotPassword,
        middleWares: [alreadyLoggedInMiddleWare],
      },
    ],
  },

  {
    "/features": [
      {
        method: "get",
        handler: (req, res) => res.render("features"),
      },
    ],
  },
  {
    "/about-us": [
      {
        method: "get",
        handler: (req, res) => res.render("about-us"),
      },
    ],
  },
  {
    "/appointment": [
      {
        method: "get",
        middleWares: [shouldBeLoggedInMiddleWare, shouldHaveOneTimePayment],
        handler: (req, res) => res.render("appointment"),
      },
      {
        method: "post",
        middleWares: [shouldBeLoggedInMiddleWare, shouldHaveOneTimePayment],
        handler: invoiceController.postAppointment,
      },
    ],
  },
  {
    "/get-in-touch": [
      {
        method: "get",
        handler: contactUsController.viewContactUsForm,
      },
      {
        method: "post",
        handler: contactUsController.postContactUsForm,
      },
    ],
  },
  {
    "/terms": [
      {
        method: "get",
        handler: (req, res) => res.render("terms"),
      },
    ],
  },
  {
    "/privacy-policy": [
      {
        method: "get",
        handler: (req, res) => res.render("privacy-policy"),
      },
    ],
  },
  {
    "/thank-you": [
      {
        method: "get",
        handler: (req, res) => res.render("thank-you"),
      },
    ],
  },
  {
    "/recently-scanned": [
      {
        method: "get",
        handler: reportController.viewRecentlyScanned,
      },
    ],
  },
  {
    "/loader": [
      {
        method: "get",
        handler: (req, res) => res.render("pre-loader"),
      },
    ],
  },

  {
    "/pricing-scans": [
      {
        method: "get",
        handler: (req, res) => res.render("pricing-scans"),
      },
    ],
  },
  {
    "/pricing-service": [
      {
        method: "get",
        handler: (req, res) => res.render("pricing-service"),
      },
    ],
  },
];
